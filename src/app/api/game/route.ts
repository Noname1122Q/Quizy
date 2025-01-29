import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";
import { McqQuestion, OpenEndedQuestion } from "@/types/quizTypes";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const baseApiUrl = process.env.BASE_API_URL;

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in!" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { topic, type, amountOfQuestions } = quizCreationSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic: topic,
      },
    });

    const { data } = await axios.post(`${baseApiUrl}/api/questions`, {
      amountOfQuestions,
      topic,
      type,
    });

    if (type == "mcq") {
      let questions = data.questions.map((question: McqQuestion) => {
        return {
          question: question.question,
          correctAnswer: question.correctAnswer,
          options: question.options,
          gameId: game.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({
        data: questions,
      });
    } else if (type == "open_ended") {
      let questions = data.questions.map((question: OpenEndedQuestion) => {
        return {
          question: question.question,
          correctAnswer: question.correctAnswer,
          gameId: game.id,
          questionType: "open_ended",
        };
      });

      console.log(questions);

      await prisma.question.createMany({
        data: questions,
      });
    }

    return NextResponse.json({
      gameId: game.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json(
        {
          error: error,
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
}
