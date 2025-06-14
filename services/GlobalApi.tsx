import OpenAI from "openai";
import axios from 'axios';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const AiModel = async (prompt: string) => {
  return await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
};

const BASE_URL = 'https://aigurulab.tech';
const GenerateAiImage = async(input:string) => await axios.post(BASE_URL + '/api/generate-image',
{
  width: 1024,
  height: 1024,
  input: input,
  model: 'sdxl',//'flux'
  aspectRatio: "1:1"//Applicable to Flux model only
},
{
  headers: {
    'x-api-key': process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
    'Content-Type': 'application/json', // Content Type
  },
})

export default { AiModel, GenerateAiImage };