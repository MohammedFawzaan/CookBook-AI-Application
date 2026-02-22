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
import { useTheme } from "@/context/ThemeContext";

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

    // Cancel flag for recipe generation
    const cancelledRef = useRef(false);

    const actionSheetRef = useRef<ActionSheetRef>(null);
    const router = useRouter();
    const { user } = useUser();
    const { colors } = useTheme();

    const showAlert = (title: string, message: string, type: AlertType = 'info') => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    };

    const handleCancel = () => {
        cancelledRef.current = true;
        setOpenLoading(false);
        setLoading(false);
        setRecipe("");
    };

    const generateRecipe = async () => {
        if (!recipe.trim()) {
            showAlert("Missing Dish Name", "Please tell us what you'd like to cook! Type in a dish name to get started.", 'warning');
            return;
        }
        setLoading(true);
        cancelledRef.current = false;
        try {
            let content = await GlobalApi.AiModel(recipe + " " + Prompt.GENERATE_RECIPE_OPTION_PROMPT);

            if (cancelledRef.current) return;

            if (!content) {
                showAlert("No Ideas Found", "Hmm, we couldn't come up with recipes for that. Try a different dish name!", 'info');
                setLoading(false);
                return;
            }
            content = content.replace(/```json|```/g, "").trim();

            let recipes = [];
            try {
                const parsed = JSON.parse(content);
                recipes = Array.isArray(parsed) ? parsed : (parsed.recipes || []);
            } catch {
                const recipeBlocks = content.split(/\d\.\s/).filter(Boolean);
                recipes = recipeBlocks.map(block => {
                    const lines = block.trim().split("\n").filter(Boolean);
                    return {
                        recipeName: lines[0]?.trim() || '',
                        description: (lines.find(l => l.startsWith("Description:")) || "").replace("Description:", "").trim(),
                        ingredients: [],
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
            if (cancelledRef.current) return;
            if (error?.message?.toLowerCase().includes('network') || error?.code === 'ECONNABORTED') {
                showAlert("No Internet", "Please check your Wi-Fi or mobile data connection and try again.", 'error');
            } else if (error?.response?.status === 429) {
                showAlert("AI is Busy", "Our AI is handling lots of requests right now. Please wait a moment and try again.", 'warning');
            } else {
                showAlert("Something Went Wrong", "We couldn't generate your recipe right now. Please try again in a moment.", 'error');
            }
        }
        setLoading(false);
        if (!cancelledRef.current) actionSheetRef.current?.show();
    };

    const generateAiImage = async (imagePrompt: string) => {
        const result = await GlobalApi.GenerateAiImage(imagePrompt);
        return result.data.image;
    };

    const generateCompleteRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        cancelledRef.current = false;
        setOpenLoading(true);

        try {
            const PROMPT = "RecipeName:" + option.recipeName + "Description" + option?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
            let content = await GlobalApi.AiModel(PROMPT);

            if (cancelledRef.current) return;

            if (!content) {
                setOpenLoading(false);
                showAlert("Recipe Unavailable", "We couldn't build this recipe right now. Please try again.", 'error');
                return;
            }
            content = content.replace(/```json|```/g, "").trim();
            const JSONContent = JSON.parse(content);

            if (cancelledRef.current) return;

            // Generate image — always has a fallback, will never crash
            let imageUrl: any = require('./../assets/images/RecipeImage.png');
            try {
                const result = await generateAiImage(JSONContent?.imagePrompt);
                if (result && !cancelledRef.current) imageUrl = result;
            } catch (e) {
                console.log("Image Gen Error (non-critical, using fallback):", e);
            }

            if (cancelledRef.current) return;

            JSONContent.recipeImage = imageUrl;

            // Final check before navigating and saving
            if (cancelledRef.current) return;

            router.push({
                pathname: '/RecipeDetails',
                params: { recipeData: JSON.stringify(JSONContent) }
            });

            // Save to DB — only if not cancelled
            try {
                await SaveToDb(JSONContent, imageUrl);
                console.log("Recipe Saved to DB");
            } catch (error: any) {
                console.log("Save Error (non-critical):", error);
            }

        } catch (error: any) {
            if (cancelledRef.current) return;
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
        if (cancelledRef.current) return;
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
                <Text style={[styles.heading, { color: colors.text }]}>Your AI Powered Kitchen Companion</Text>
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Type a dish name and let AI craft a recipe for you..."
                    placeholderTextColor={colors.placeholder}
                    multiline={true}
                    numberOfLines={2}
                    value={recipe}
                    onChangeText={setRecipe}
                    selectionColor="#2e7d32"
                    style={[styles.textInput, {
                        backgroundColor: colors.inputBg,
                        color: colors.text,
                        borderColor: colors.border,
                    }]}
                />
            </View>

            <Button label={'Generate Recipe'} onPress={generateRecipe} iconName={'sparkles'} loading={loading} />

            <LoadingDialog visible={openLoading} onCancel={handleCancel} />

            <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: colors.actionSheet }}>
                <View style={styles.actionSheetContainer}>
                    <Text style={[styles.text1, { color: colors.text }]}>Choose a Recipe</Text>
                    <View>
                        {recipeOptions?.map((item: any, index: any) =>
                            <TouchableOpacity
                                onPress={() => generateCompleteRecipe(item)}
                                key={index}
                                style={[styles.recipeOptionsView, {
                                    borderColor: colors.border,
                                    backgroundColor: colors.surface,
                                }]}
                            >
                                <Text style={[styles.text2, { color: colors.text }]}>{item?.recipeName}</Text>
                                <Text style={[styles.text3, { color: colors.textSecondary }]}>{item?.description}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ActionSheet>

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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    actionSheetContainer: {
        padding: 25,
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
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 4,
    },
    text2: {
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 4,
    },
    text3: {
        fontFamily: 'outfit',
        fontSize: 14,
        lineHeight: 20,
    },
    inputWrapper: {
        marginVertical: 10,
    },
    textInput: {
        minHeight: 80,
        width: "100%",
        padding: 15,
        borderRadius: 15,
        textAlignVertical: 'top',
        fontSize: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        borderLeftWidth: 4,
        borderLeftColor: '#2e7d32',
        borderWidth: 1,
    },
});