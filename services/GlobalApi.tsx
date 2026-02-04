import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_KEY as string);

const axiosClient = axios.create({
  baseURL: 'https://ai-recipe-generator-admin-w077.onrender.com/api',
});

const AiModel = async (prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are a helpful kitchen assistant. You must respond ONLY with the requested data. DO NOT include any introductory text, pleasantries, or conclusions. If JSON is requested, return only the JSON block. If a list is requested, return only the list items.",
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const BASE_URL = 'https://aigurulab.tech';
const GenerateAiImage = async (input: string) => await axios.post(BASE_URL + '/api/generate-image',
  {
    width: 1024,
    height: 1024,
    input: input,
    model: 'sdxl',
    aspectRatio: "1:1"
  },
  {
    headers: {
      'x-api-key': process.env.EXPO_PUBLIC_AIGURULAB_API_KEY,
      'Content-Type': 'application/json',
    },
  });

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