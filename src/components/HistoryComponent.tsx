import { prisma } from "@/lib/db";
import { CheckSquare, Clock, Edit3 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId: userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {games.map((game) => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.gameType == "mcq" ? (
                <CheckSquare className="mr-2" />
              ) : (
                <Edit3 className="mr-2" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  href={`/statistics/${game.id}`}
                >
                  {game.topic}
                </Link>
                <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                  <Clock className="size-4 mr-2" />
                  {new Date(game.timeStarted).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.gameType == "mcq" ? "MCQ" : "Open Ended"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
