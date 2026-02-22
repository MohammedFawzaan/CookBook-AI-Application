import GlobalApi from "@/services/GlobalApi";
import { useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Button from "./Button";
import Prompt from "./../services/Prompt";
import LoadingDialog from "./LoadingDialog";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import CustomAlert, { AlertType } from "./CustomAlert";

export default function CreateRecipe() {
    const [loading, setLoading] = useState(false);
    const [recipeOptions, setRecipeOptions] = useState<any>([]);
    const [recipe, setRecipe] = useState<string>("");
    const [openLoading, setOpenLoading] = useState(false);

    // Custom alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<AlertType>('info');

    const actionSheetRef = useRef<ActionSheetRef>(null);
    const router = useRouter();
    const { user } = useUser();

    const showAlert = (title: string, message: string, type: AlertType = 'info') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    };

    const generateRecipe = async () => {
        if (!recipe.trim()) {
            showAlert("Missing Dish Name", "Please tell us what you'd like to cook! Type in a dish name to get started.", 'warning');
            return;
        }
        console.log("Generating recipe for:", recipe);
        setLoading(true);
        try {
            let content = await GlobalApi.AiModel(recipe + " " + Prompt.GENERATE_RECIPE_OPTION_PROMPT);

            if (!content) {
                showAlert("No Ideas Found", "Hmm, we couldn't come up with recipes for that. Try a different dish name!", 'info');
                setLoading(false);
                return;
            }
            content = content.replace(/```json|```/g, "").trim();

            let recipes = [];
            try {
                const parsed = JSON.parse(content.replace(/```json|```/g, "").trim());
                recipes = Array.isArray(parsed) ? parsed : (parsed.recipes || []);
            } catch (jsonError) {
                const recipeBlocks = content.split(/\d\.\s/).filter(Boolean);
                recipes = recipeBlocks.map(block => {
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
            }

            if (!recipes.length) {
                showAlert("No Recipes Found", "We couldn't find any recipes for that dish. Try something else!", 'info');
                setLoading(false);
                return;
            }

            setRecipeOptions(recipes);
        } catch (error: any) {
            console.error("Recipe generation error:", error);
            if (error?.message?.toLowerCase().includes('network') || error?.code === 'ECONNABORTED') {
                showAlert("No Internet", "Please check your Wi-Fi or mobile data connection and try again.", 'error');
            } else if (error?.response?.status === 429) {
                showAlert("AI is Busy", "Our AI is handling lots of requests right now. Please wait a moment and try again.", 'warning');
            } else {
                showAlert("Something Went Wrong", "We couldn't generate your recipe right now. Please try again in a moment.", 'error');
            }
        }
        setLoading(false);
        if (recipeOptions.length > 0) actionSheetRef.current?.show();
    };

    const generateAiImage = async (imagePrompt: string) => {
        const result = await GlobalApi.GenerateAiImage(imagePrompt);
        return result.data.image;
    };

    const generateCompleteRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        setOpenLoading(true);

        try {
            const PROMPT = "RecipeName:" + option.recipeName + "Description" + option?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
            let content = await GlobalApi.AiModel(PROMPT);

            if (!content) {
                setOpenLoading(false);
                showAlert("Recipe Unavailable", "We couldn't build this recipe right now. Please try again.", 'error');
                return;
            }
            content = content.replace(/```json|```/g, "").trim();
            const JSONContent = JSON.parse(content);

            // Generate image — always has a fallback, will never crash
            let imageUrl = require('./../assets/images/RecipeImage.png');
            try {
                const result = await generateAiImage(JSONContent?.imagePrompt);
                if (result) imageUrl = result;
            } catch (e) {
                console.log("Image Gen Error (non-critical, using fallback):", e);
            }

            JSONContent.recipeImage = imageUrl;

            router.push({
                pathname: '/RecipeDetails',
                params: { recipeData: JSON.stringify(JSONContent) }
            });

            // Save to DB — non-blocking, user still sees recipe
            try {
                await SaveToDb(JSONContent, imageUrl);
                console.log("Recipe Saved to DB");
            } catch (error: any) {
                console.log("Save Error (non-critical):", error);
            }

        } catch (error: any) {
            console.error("Complete recipe error:", error);
            setOpenLoading(false);
            if (error?.message?.toLowerCase().includes('network') || error?.code === 'ECONNABORTED') {
                showAlert("No Internet", "Please check your connection and try again.", 'error');
            } else if (error?.response?.status === 429) {
                showAlert("AI is Busy", "Our AI is handling lots of requests right now. Please wait a moment and try again.", 'warning');
            } else {
                showAlert("Recipe Failed", "Something went wrong while building your recipe. Please try again.", 'error');
            }
            return;
        }

        setRecipe('');
        setOpenLoading(false);
    };

    const SaveToDb = async (content: any, imageUrl: any) => {
        const { imagePrompt, ...rest } = content;
        const data = {
            ...rest,
            recipeImage: typeof imageUrl === 'string' ? imageUrl : '',
            userEmail: user?.primaryEmailAddress?.emailAddress
        };
        setOpenLoading(false);
        const result = await GlobalApi.CreateNewRecipe(data);
        return result.data.data;
    };

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require('./../assets/images/pan.gif')} style={styles.image} />
                <Text style={styles.heading}>Your AI Powered Kitchen Companion</Text>
            </View>

            {/* Improved TextInput Area */}
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Type a dish name and let AI craft a recipe for you..."
                    placeholderTextColor="#858b95ff"
                    multiline={true}
                    numberOfLines={2}
                    value={recipe}
                    onChangeText={setRecipe}
                    selectionColor="#2e7d32"
                    style={styles.textInput}
                />
            </View>

            <Button label={'Generate Recipe'} onPress={generateRecipe} iconName={'sparkles'} loading={loading} />

            <LoadingDialog visible={openLoading} />

            <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: 'white' }}>
                <View style={styles.actionSheetContainer}>
                    <Text style={styles.text1}>Choose a Recipe</Text>
                    <View>
                        {recipeOptions?.map((item: any, index: any) =>
                            <TouchableOpacity
                                onPress={() => generateCompleteRecipe(item)}
                                key={index}
                                style={styles.recipeOptionsView}
                            >
                                <Text style={styles.text2}>{item?.recipeName}</Text>
                                <Text style={styles.text3}>{item?.description}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ActionSheet>

            {/* Custom Alert */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        borderRadius: 50,
    },
    container1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
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
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 15,
        borderColor: '#e0e0e0',
        backgroundColor: '#fafafa',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    text2: {
        fontWeight: '700',
        fontSize: 17,
        color: '#1a1a1a',
        marginBottom: 4,
    },
    text3: {
        fontFamily: 'outfit',
        color: '#777',
        fontSize: 14,
        lineHeight: 20,
    },
    inputWrapper: {
        marginVertical: 10,
    },
    textInput: {
        backgroundColor: 'white',
        minHeight: 80,
        width: "100%",
        padding: 15,
        borderRadius: 15,
        textAlignVertical: 'top',
        fontSize: 15,
        color: '#1a1a1a',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        borderLeftWidth: 4,
        borderLeftColor: '#2e7d32',
        borderWidth: 1,
        borderColor: '#e8e8e8',
    }
});