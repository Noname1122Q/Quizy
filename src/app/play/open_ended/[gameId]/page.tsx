import OpenEnded from "@/components/quiz/OpenEnded";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedQuizPage = async ({ params }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const { gameId = "" } = params || {};

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          correctAnswer: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "open_ended") {
    return redirect("/quiz");
  }

  return <OpenEnded game={game} />;
};

export default OpenEndedQuizPage;
