import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const gameEndedSchema = z.object({
  timeEnded: z.date(),
  gameId: z.string(),
});

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
    const { timeEnded, gameId } = gameEndedSchema.parse(body);

    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: timeEnded,
      },
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
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
