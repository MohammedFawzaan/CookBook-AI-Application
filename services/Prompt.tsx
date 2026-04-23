const PROMPTS = {
    GENERATE_RECIPE_OPTION_PROMPT:
        `Based on the user's request, generate exactly 3 creative recipe variants. 
    CRITICAL: You must strictly follow the user's intended dish and core ingredients. For example - if the user asks for "Chicken Biryani", all 3 variants must contain chicken and be recognizable as Biryani.
    Return a valid JSON array of objects with these exact fields:
    - recipeName: Descriptive name including the core requested ingredient with a relevant emoji.
    - description: A concise 2-line summary.
    - ingredients: A list of exactly 3 main ingredients (must include the user's core ingredient).
    Output JSON only.`,

    GENERATE_COMPLETE_RECIPE_PROMPT: `
    Generate a comprehensive, detailed recipe based on the provided Name and Description. 
    Strictly follow this JSON structure and provide ONLY valid JSON.
    Fields:
    - recipeName: The name of the dish.
    - description: A mouth-watering description.
    - ingredients: An array of objects, each with { "name": string, "icon": emoji, "quantity": string }.
    - steps: An array of strings with detailed, professional step-by-step instructions.
    - calories: A single integer representing total calories.
    - cookTime: A single integer representing the cook time in minutes (e.g., 30). Do NOT use strings.
    - serveTo: A single integer representing the number of servings.
    - category: A string. Choose exactly one from [Breakfast, Lunch, Dinner, Salad, Dessert, Fastfood, Drink, Cake]. This is REQUIRED.
    - imagePrompt: A detailed, professional food photography prompt. Describe a high-resolution, close-up shot of the finished dish on a rustic plate, with dramatic lighting, vibrant colors, and fresh garnish. Avoid text or people in the image.
    Response must be a SINGLE JSON object.`
}

export default PROMPTS;