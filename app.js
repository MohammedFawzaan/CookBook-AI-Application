async function generateRecipe(recipeName) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // Replace with your real key
      "HTTP-Referer": "http://localhost", // Or your domain
      "X-Title": "RecipeApp",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Give me the ingredients and steps to make ${recipeName}`
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  console.log(data);
  const resultText = data.choices[0].message.content;
  console.log(resultText);

  document.getElementById("result").textContent = resultText;
}

function generate() {
  const recipeName = document.getElementById("recipeInput").value;
  if (recipeName.trim() !== "") {
    generateRecipe(recipeName);
  } else {
    document.getElementById("result").textContent = "Please enter a recipe name.";
  }
}
