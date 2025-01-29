// import { HfInference } from "@huggingface/inference";

// type QuizQuestion = {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   explanation: string;
// };

// export type QuizResponse = {
//   topic: string;
//   quesions: QuizQuestion[];
// };

// const huggingface_access_token = process.env.HUGGINGFACE_ACCESS_TOKEN;

// const hf = new HfInference(huggingface_access_token);

// export async function generateMcqQuiz(
//   topic: string,
//   amountOfQuestions: number
// ) {
// const prompt = `Generate ${amountOfQuestions} multiple-choice questions on the topic "${topic}".
// Return the response as a JSON array with the structure :
// [
//   {
//     "question": "string",
//     "options" : ["string", "string", "string", "string"],
//     "correctAnswer": "string",
//     "explanation": "string"
// }
// ] `;

//   try {
//     const response = await hf.textGeneration({
//       model: "gpt2",
//       inputs: prompt,
//       parameters: { max_new_token: 500 },
//     });

//     // const quiz: QuizResponse = JSON.parse(response.generated_text);
//     const quiz = response.generated_text;
//     return quiz;
//   } catch (error) {
//     console.error("Error in quiz generation!", error);
//     throw new Error("Failed to generate quiz");
//   }
// }

import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";

const gemini_api_key = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateGeminiResponse(
  topic: string,
  amountOfQuestions: number,
  type: string
) {
  let prompt = "";

  if (type === "mcq") {
    prompt = `Generate ${amountOfQuestions} multiple-choice questions on the topic "${topic}".
  Return the response as a JSON array with the structure :
  [
    {
      "question": "string",
      "options" : ["string", "string", "string", "string"],
      "correctAnswer": "string",
  }
  ] `;
  }

  if (type === "open_ended") {
    prompt = `Generate ${amountOfQuestions} easy to moderate open-ended questions on the topic "${topic}" with the word limit of 25 words for both the question and the answer.
  Return the response as a JSON array with the structure :
  [
    {
      "question": "string",
      "correctAnswer": "string",
  }
  ] `;
  }

  try {
    const result = await model.generateContent(prompt);

    return result;
  } catch (error) {
    console.error("Error in quiz generation!", error);
    throw new Error("Failed to generate quiz");
  }
}

export async function convertGeminiResponseToJSON(
  geminiResponse: GenerateContentResult
) {
  const jsonStart =
    geminiResponse.response.candidates![0].content.parts[0].text!.indexOf("[");
  const jsonEnd =
    geminiResponse.response.candidates![0].content.parts[0].text!.lastIndexOf(
      "]"
    ) + 1;
  const jsonString =
    geminiResponse.response.candidates![0].content.parts[0].text!.slice(
      jsonStart,
      jsonEnd
    );

  const jsonData = JSON.parse(jsonString);

  return jsonData;
}
