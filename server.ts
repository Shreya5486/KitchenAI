import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crashing if GEMINI_API_KEY is not set immediately
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined in the workspace secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "chefbook-build",
        },
      },
    });
  }
  return aiClient;
}

// Full Recipe Schema for Type-safe Recipe Engine Output
const recipeResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Clear, appetizing title of the recipe." },
    description: { type: Type.STRING, description: "A creative and welcoming 1-2 sentence culinary summary of the dish." },
    prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 mins'." },
    cookTime: { type: Type.STRING, description: "Cooking time, e.g., '25 mins'." },
    servings: { type: Type.INTEGER, description: "Default number of servings, e.g., 2 or 4." },
    ingredients: {
      type: Type.ARRAY,
      description: "List of ingredients required.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the ingredient, e.g., 'fresh spinach leaves'." },
          quantity: { type: Type.NUMBER, description: "Decimal/fraction quantity, e.g., 2, 1.5, 0.5 (must be a number for multiplication scaling)." },
          unit: { type: Type.STRING, description: "Unit of measurement, e.g., 'cups', 'g', 'tbsp', 'units', 'pieces'." },
          swaps: {
            type: Type.ARRAY,
            description: "Suggested substitute ingredients for dietary or availability swaps.",
            items: { type: Type.STRING }
          }
        },
        required: ["name", "quantity", "unit", "swaps"]
      }
    },
    steps: {
      type: Type.ARRAY,
      description: "Step-by-step preparation steps.",
      items: {
        type: Type.OBJECT,
        properties: {
          instruction: { type: Type.STRING, description: "Clear and highly detailed instruction for this cooking step." },
          durationMinutes: { type: Type.INTEGER, description: "Optional time estimate for this specific step in minutes, or null if not time-bound." }
        },
        required: ["instruction"]
      }
    },
    nutrition: {
      type: Type.OBJECT,
      description: "Nutritional information per serving.",
      properties: {
        calories: { type: Type.STRING, description: "Est. calories per serving (e.g., '420 kcal')." },
        protein: { type: Type.STRING, description: "Est. protein content (e.g., '18g')." },
        carbs: { type: Type.STRING, description: "Est. carbohydrates content (e.g., '45g')." },
        fat: { type: Type.STRING, description: "Est. fat content (e.g., '12g')." }
      },
      required: ["calories", "protein", "carbs", "fat"]
    },
    chefTip: { type: Type.STRING, description: "A professional chef tip or trick to perfect this specific recipe." }
  },
  required: ["title", "description", "prepTime", "cookTime", "servings", "ingredients", "steps", "nutrition", "chefTip"]
};

// API Endpoint to generate or refine recipes with Fault Injection support
app.post("/api/generate-recipe", async (req, res) => {
  const { ingredients, refinement, currentRecipe, simulatedFault, outputLanguage } = req.body;

  try {
    // 1. Check for simulated error / fault injection
    if (simulatedFault) {
      if (simulatedFault === "server_error") {
        return res.status(500).json({
          error: "Simulated Server Error",
          message: "A database or internal service failed to respond (Simulated Code 500)."
        });
      }

      if (simulatedFault === "timeout") {
        // Deliberately delay 35 seconds to let client 30-second timeout trigger
        await new Promise((resolve) => setTimeout(resolve, 35000));
        return res.json({
          title: "Too Late Recipe",
          description: "This should not be seen if the client timed out properly."
        });
      }

      if (simulatedFault === "malformed_json") {
        // Return a raw unparseable string with invalid syntax
        return res.send("{\n  \"title\": \"Unfinished Masterpiece\",\n  \"description\": \"Oops, this JSON is broken on purpose because a bracket is missing,\n  \"prepTime\": \"10 mins\"\n");
      }

      if (simulatedFault === "wrong_shape") {
        // Return JSON with wrong schema entirely
        return res.json({
          error_code: "SCHEMA_MISMATCH",
          data: {
            randomMessage: "This is a dummy shape to test validation failures. None of the required recipe keys exist.",
            timestamp: Date.now()
          }
        });
      }
    }

    // 2. Validate input
    if (!ingredients && !refinement) {
      return res.status(400).json({ error: "Missing ingredients or refinement instructions." });
    }

    // Initialize Recipe API client
    const ai = getAiClient();

    let systemPrompt = `You are an elite gourmet chef and nutrition expert. 
Your goal is to formulate a single, cohesive, fully structured recipe based STRICTLY and ONLY on the user's available ingredients.
The recipe should be highly relevant and realistic, utilizing the ingredients supplied by the user. Do NOT add other major or secondary ingredients (such as vegetables, meat, carbs, dairy, or cheese) unless they were explicitly listed by the user.
You are strictly forbidden from suggesting a dish that requires extra major ingredients that the user did not type.
You are only allowed to assume the user has water, salt, black pepper, and 1 standard cooking oil or fat (e.g., vegetable oil, olive oil, or butter) as basic pantry staples. All other ingredients of the recipe must come strictly from the user's input list.
If the user provides arbitrary, vague, or non-sensical text instead of ingredients, maintain absolute professionalism: interpret it as culinary context or extract something edible, or return an adaptive, creative recipe.
Ensure all measurements in the 'ingredients' array are numeric (e.g., '1.5' instead of '1 1/2' or 'one and a half') so they can be scaled mathematically by multiplying with servings.

BILINGUAL INPUT CAPABILITY:
The user can input ingredients in English, Hindi (Devanagari script, e.g., "आलू, प्याज, टमाटर"), or Hinglish (Hindi written in Roman/English characters, e.g., "aloo, pyaz, tamatar"). You must translate, understand, and use these ingredients perfectly.

BILINGUAL OUTPUT CAPABILITY:
The requested output language is: "${outputLanguage || 'auto'}".
- If outputLanguage is "hi" (Hindi), or if outputLanguage is "auto" and the user's input is predominantly in Hindi or Hinglish, then you MUST generate the text content values of the recipe (such as the title, description, step instructions, swaps, ingredients names, and chef tip) in natural, clear, high-quality Hindi.
- CRITICAL: Even if generating Hindi text values, the JSON structure keys (such as "title", "description", "ingredients", "name", "quantity", "unit", "swaps", "steps", "instruction", "durationMinutes", "nutrition", "calories", "protein", "carbs", "fat", "chefTip") MUST remain exactly in English as specified by the responseSchema, so that the client-side system can parse and display it perfectly. Do not translate the JSON keys!`;

    let userPrompt = "";

    if (refinement && currentRecipe) {
      // Refinement Loop
      userPrompt = `The user wants to refine the following existing recipe:
${JSON.stringify(currentRecipe, null, 2)}

User request for refinement: "${refinement}"

Please update the recipe according to their refinement request (e.g., swap ingredients, make it spicier, change servings, make it vegan/vegetarian). Keep all other unchanged aspects of the recipe intact. Ensure the output strictly conforms to the requested JSON structure.
If the target output language is Hindi ("hi"), write the updated text values in Hindi.`;
    } else {
      // Initial recipe generation
      userPrompt = `Please look at the ingredients the user has:
"${ingredients}"

Your task is to suggest a delicious, realistic food recipe that can be made with ONLY these ingredients.
CRITICAL REQUIREMENT: Do NOT add other major ingredients (like chicken, pasta, tomatoes, cheese, flour, etc.) unless they are explicitly typed in the user's list. If the user only has eggs and butter, suggest scrambled eggs or an omelette. Do not suggest pasta or chicken dishes unless the user has those!
Incorporate the provided ingredients as the primary, required elements of the dish. 
If minor pantry staples (e.g. salt, water, cooking oil, butter, black pepper) are necessary to make it a complete and tasty recipe, you may add them as well.
Suggest 2-3 suitable alternative 'swaps' for each ingredient to give the user flexibility.
If the target output language is Hindi ("hi") or detected as Hindi, return the values in rich, natural Hindi, using English JSON keys.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: recipeResponseSchema,
        temperature: 0.7,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      return res.status(500).json({ error: "Empty response returned from the model." });
    }

    // Try parsing the JSON to verify integrity
    let parsedData;
    try {
      parsedData = JSON.parse(responseText.trim());
    } catch (parseErr) {
      console.error("JSON parse failed on recipe engine output. Attempting cleanup...", responseText);
      // Fallback regex parsing to recover from raw markdown backticks if returned despite schema
      const jsonRegex = /\{[\s\S]*\}/;
      const match = responseText.match(jsonRegex);
      if (match) {
        parsedData = JSON.parse(match[0].trim());
      } else {
        throw parseErr;
      }
    }

    // Double-check basic shape compliance
    if (!parsedData.title || !parsedData.ingredients || !Array.isArray(parsedData.ingredients) || !parsedData.steps) {
      return res.status(500).json({
        error: "Malformed Shape",
        message: "Model response parsed successfully but was missing required fields.",
        raw: parsedData
      });
    }

    return res.json(parsedData);

  } catch (error: any) {
    console.error("Recipe generation failed:", error);
    return res.status(500).json({
      error: "API_ERROR",
      message: error.message || "An error occurred while communicating with the Gourmet chef."
    });
  }
});

// Endpoint to check status of the API key configuration
app.get("/api/status", (req, res) => {
  const apiKeyPresent = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" && process.env.GEMINI_API_KEY.trim() !== "";
  res.json({
    apiKeyConfigured: apiKeyPresent,
    nodeEnv: process.env.NODE_ENV || "development"
  });
});

// Setup Vite Dev Server / Static Files Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
