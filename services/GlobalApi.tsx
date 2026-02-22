import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_KEY as string);

const axiosClient = axios.create({
  baseURL: 'https://ai-recipe-generator-admin-w077.onrender.com/api'
  // baseURL: 'http://10.138.34.156:1337/api'
});

const AiModel = async (prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: "You are a helpful kitchen assistant. You must respond ONLY with the requested data. DO NOT include any introductory text, pleasantries, or conclusions. If JSON is requested, return only the JSON block. If a list is requested, return only the list items.",
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const uploadToCloudinary = async (base64Image: string) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        file: base64Image,
        upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      }
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary Upload Details:", error?.response?.data || error.message);
    return null;
  }
};

const GenerateAiImage = async (input: string) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${process.env.EXPO_PUBLIC_GEMINI_KEY}`,
      {
        instances: [{ prompt: input }],
        parameters: {
          sampleCount: 1,
          outputMimeType: "image/jpeg",
          outputCompressionQuality: 40
        }
      }
    );

    if (response.data && response.data.predictions && response.data.predictions.length > 0) {
      const base64Image = `data:image/jpeg;base64,${response.data.predictions[0].bytesBase64Encoded}`;

      // Upload to Cloudinary immediately
      const cloudinaryUrl = await uploadToCloudinary(base64Image);

      if (cloudinaryUrl) {
        return { data: { image: cloudinaryUrl } };
      }
    }

    throw new Error("Generation failed");
  } catch (error) {
    console.error("Error generating/uploading image:", error);
    // Fallback to Pollinations AI
    const encodedPrompt = encodeURIComponent(input);
    const seed = Math.floor(Math.random() * 1000000);
    return { data: { image: `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${seed}&model=flux` } };
  }
};

const GetCategory = () => axiosClient.get('/categories?populate=*');
const GetRecipeByCategory = (category: string) => axiosClient.get('/recipes?filters[category][$eq]=' + category);
const GetAllRecipeList = () => axiosClient.get('/recipes?sort[0]=id:desc');
const GetAllRecipesByLimit = (limit: number) => axiosClient.get('/recipes?sort[0]=id:desc&pagination[start]=1&pagination[limit]=' + limit);
const GetUserCreatedRecipe = (userEmail: string) => axiosClient.get('/recipes?filters[userEmail][$eq]=' + userEmail + "&sort[0]=id:desc");
const CreateNewRecipe = (data: any) => axiosClient.post('/recipes', { data: data });

export default {
  AiModel,
  GenerateAiImage,
  GetCategory,
  CreateNewRecipe,
  GetRecipeByCategory,
  GetAllRecipeList,
  GetAllRecipesByLimit,
  GetUserCreatedRecipe
};