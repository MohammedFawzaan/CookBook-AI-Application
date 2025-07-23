import OpenAI from "openai";
import axios from 'axios';

const axiosClient = axios.create({
  baseURL:'https://ai-recipe-generator-admin-w077.onrender.com/api',
});

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const AiModel = async (prompt: string) => {
  return await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo-16k",
    messages: [{ role: "user", content: prompt }],
  });
};

const BASE_URL = 'https://aigurulab.tech';
const GenerateAiImage = async(input:string) => await axios.post(BASE_URL + '/api/generate-image',
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
const GetAllRecipesByLimit = (limit:number) => axiosClient.get('/recipes?sort[0]=id:desc&pagination[start]=1&pagination[limit]=' + limit);
const GetUserCreatedRecipe = (userEmail:string) => axiosClient.get('/recipes?filters[userEmail][$eq]='+userEmail+"&sort[0]=id:desc");
const CreateNewRecipe = (data:any) => axiosClient.post('/recipes', {data:data});

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