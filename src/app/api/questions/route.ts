import { convertGeminiResponseToJSON, generateGeminiResponse } from "@/lib/ai";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { amountOfQuestions, type, topic } = quizCreationSchema.parse(body);

    let questions: any;

    const geminiResponse = await generateGeminiResponse(
      topic,
      amountOfQuestions,
      type
    );

    const finalJSONData = await convertGeminiResponseToJSON(geminiResponse);

    questions = finalJSONData;

    return NextResponse.json(
      {
        questions,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
};
