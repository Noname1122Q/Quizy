import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/styles/dashboard.css";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent";
import { prisma } from "@/lib/db";
import { ScrollArea } from "../ui/scroll-area";
import "@/styles/dashboard.css";

type Props = {};

const RecentActivityCard = async ({}: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const totalGamesPlayed = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-3 border-gray-700 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
        <CardDescription>
          You have played a total of {totalGamesPlayed} quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px] overflow-y-scroll scrollbar-hidden">
          <HistoryComponent limit={10} userId={session.user.id} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
