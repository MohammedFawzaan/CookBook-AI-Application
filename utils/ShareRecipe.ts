import { Share } from 'react-native';

function formatRecipeText(recipe: any): string {
    let text = `🍳 ${recipe.recipeName || 'Untitled Recipe'}\n`;
    text += `━━━━━━━━━━━━━━━━\n\n`;

    if (recipe.description) {
        text += `${recipe.description}\n\n`;
    }

    // Stats line
    const stats = [];
    if (recipe.calories) stats.push(`🔥 ${recipe.calories} cal`);
    if (recipe.cookTime) stats.push(`⏱️ ${recipe.cookTime}`);
    if (recipe.serveTo) stats.push(`👥 Serves ${recipe.serveTo}`);
    if (stats.length > 0) text += `${stats.join(' | ')}\n\n`;

    // Ingredients
    if (recipe.ingredients?.length > 0) {
        text += `Ingredients:\n`;
        recipe.ingredients.forEach((item: any) => {
            const qty = item.quantity ? ` - ${item.quantity}` : '';
            text += `• ${item.icon || ''} ${item.ingredient}${qty}\n`;
        });
        text += `\n`;
    }

    // Steps
    if (recipe.steps?.length > 0) {
        text += `Steps:\n`;
        recipe.steps.forEach((step: string, i: number) => {
            text += `${i + 1}. ${step}\n`;
        });
        text += `\n`;
    }

    text += `━━━━━━━━━━━━━━━━━\n`;
    text += `Made with CookBook AI 🧑‍🍳 by Mohammed Fawzaan.`;

    return text;
}

export async function shareRecipe(recipe: any): Promise<void> {
    try {
        const text = formatRecipeText(recipe);
        await Share.share({
            message: text,
            title: recipe.recipeName || 'CookBook AI Recipe',
        });
    } catch (error) {
        console.log('Share failed:', error);
    }
}
