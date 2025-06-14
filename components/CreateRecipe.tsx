import GlobalApi from "@/services/GlobalApi";
import { useRef, useState } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import Prompt from "./../services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDialog";

export default function CreateRecipe() {
    const [loading, setLoading] = useState(false);
    const [recipeOptions, setRecipeOptions] = useState<any>([]);
    const [recipe, setRecipe] = useState<string>("");
    const [openLoading, setOpenLoading] = useState(false);

    const actionSheetRef = useRef<ActionSheetRef>(null);

    const generateRecipe = async () => {
        if (!recipe) {
            Alert.alert("Please enter a food name");
            return;
        }
        console.log("Generating recipe for:", recipe);
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

        actionSheetRef.current?.show();
    };

    const generateCompleteRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        setOpenLoading(true);

        const PROMPT = "RecipeName:" + option.recipeName + "Description" + option?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
        const result = await GlobalApi.AiModel(PROMPT);
        const content:any = result.choices[0].message?.content;
        if (!content) {
            Alert.alert("No recipe found");
            return;
        }
        const JSONContent = JSON.parse(content);
        console.log("AI Response:", JSONContent);

        console.log("AI ImagePrompt:", JSONContent?.imagePrompt);
        await generateAiImage(JSONContent?.imagePrompt);

        setOpenLoading(false);
    }

    const generateAiImage = async (imagePrompt: string) => {
        const result = await GlobalApi.GenerateAiImage(imagePrompt);
        console.log(result.data.image);
    }

    const SaveToDb = () => {
        // Saving Recipe's to DataBase
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <TextInput
                placeholder="Enter food name"
                value={recipe}
                onChangeText={setRecipe}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    width: "100%",
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />
            <Button title="Generate" onPress={generateRecipe} />
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
    actionSheetContainer: {
        padding: 25
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
    }
});