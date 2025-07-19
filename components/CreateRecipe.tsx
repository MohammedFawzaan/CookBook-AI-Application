import GlobalApi from "@/services/GlobalApi";
import { useRef, useState } from "react";
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Button from "./Button";
import Prompt from "./../services/Prompt";
import LoadingDialog from "./LoadingDialog";
import { useRouter } from "expo-router";

export default function CreateRecipe() {
    const [loading, setLoading] = useState(false);
    const [recipeOptions, setRecipeOptions] = useState<any>([]);
    const [recipe, setRecipe] = useState<string>("");
    const [openLoading, setOpenLoading] = useState(false);

    const actionSheetRef = useRef<ActionSheetRef>(null);

    const router = useRouter();

    const generateRecipe = async () => {
        if (!recipe) {
            Alert.alert("Please enter a food name");
            return;
        }
        console.log("Generating recipe for:", recipe);
        setLoading(true);
        try {
            const result = await GlobalApi.AiModel(recipe + " " + Prompt.GENERATE_RECIPE_OPTION_PROMPT);
            const content = result.choices[0].message?.content;

            if (!content) {
                Alert.alert("No recipe found");
                return;
            }
            console.log("AI Response:", content);

            // Split into individual recipes
            const recipeBlocks = content.split(/\d\.\s/).filter(Boolean); // split by numbered list

            const recipes = recipeBlocks.map(block => {
                const lines = block.trim().split("\n").filter(Boolean);
                const recipeNameLine = lines[0];
                const descriptionLine = lines.find(line => line.startsWith("Description:")) || "";
                const ingredientsStartIndex = lines.findIndex(line => line.trim() === "Ingredients:");

                const ingredients = ingredientsStartIndex !== -1
                    ? lines.slice(ingredientsStartIndex + 1).map(ing => ing.replace(/^-/, "").trim())
                    : [];

                return {
                    recipeName: recipeNameLine.trim(),
                    description: descriptionLine.replace("Description:", "").trim(),
                    ingredients,
                };
            });
            setRecipeOptions(recipes);
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Failed to generate recipe");
        }
        setLoading(false);
        actionSheetRef.current?.show();
    };

    const generateCompleteRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        setOpenLoading(true);

        const PROMPT = "RecipeName:" + option.recipeName + "Description" + option?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
        const result = await GlobalApi.AiModel(PROMPT);
        const content: any = result.choices[0].message?.content;
        if (!content) {
            Alert.alert("No recipe found");
            return;
        }
        //parsing into json.
        const JSONContent = JSON.parse(content);
        console.log("AI Response:", JSONContent);

        router.push({
          pathname: '/recipe-detail',
          params: {
            recipeData: JSON.stringify(JSONContent)
          }
        });

        // console.log("AI ImagePrompt:", JSONContent?.imagePrompt);
        // const imageUrl = await generateAiImage(JSONContent?.imagePrompt);

        const insertedRecordResult = await SaveToDb(JSONContent);
        console.log(insertedRecordResult);

        setRecipe('');
        setOpenLoading(false);
    }

    const generateAiImage = async (imagePrompt: string) => {
        const result = await GlobalApi.GenerateAiImage(imagePrompt);
        console.log(result.data.image);
        return result.data.image;
    }

    const SaveToDb = async (content: any) => {
        // Saving Recipe's to DataBase
        const data = {
            ...content,
            recipeImage: "imagePrompt"
        }
        setOpenLoading(false);
        const result = await GlobalApi.CreateNewRecipe(data);
        return result.data.data;
    }

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require('./../assets/images/pan.gif')} style={styles.image} />
                <Text style={styles.heading}>Your AI Powered Kitchen Companion</Text>
            </View>
            <TextInput
                placeholder="Which Cooking Recipe Do You Want"
                multiline={true}
                numberOfLines={2}
                value={recipe}
                onChangeText={setRecipe}
                style={styles.textInput}
            />
            <Button label={'Generate Recipe'} onPress={generateRecipe} iconName={'sparkles'} loading={loading} />

            <LoadingDialog visible={openLoading} />

            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetContainer}>
                    <Text style={styles.text1}>Select Recipe</Text>
                    <View>
                        {recipeOptions?.map((item: any, index: any) =>
                            <TouchableOpacity onPress={() => generateCompleteRecipe(item)} key={index} style={styles.recipeOptionsView}>
                                <Text style={styles.text2}>{item?.recipeName}</Text>
                                <Text style={styles.text3}>{item?.description}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ActionSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#9df3a1ff",
        paddingHorizontal: 7,
        borderRadius: 50,
    },
    container1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    actionSheetContainer: {
        padding: 25
    },
    image: {
        height: 65,
        width: 65,
    },
    recipeOptionsView: {
        padding: 15,
        borderWidth: 0.2,
        borderRadius: 15,
        marginTop: 15
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
    text2: {
        fontWeight: 'bold',
        fontSize: 18
    },
    text3: {
        fontFamily: 'outfit',
        color: 'gray'
    },
    textInput: {
        backgroundColor: 'white',
        height: 120,
        width: "100%",
        marginVertical: 10,
        padding: 15,
        borderRadius: 15,
        textAlignVertical: 'top',
        fontWeight: 'semibold',
        fontSize: 15,
    }
});