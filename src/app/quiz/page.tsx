import QuizCreation from "@/components/quiz/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Quiz | Quizy",
};

const QuizPage = async ({}: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return <QuizCreation />;
};

export default QuizPage;
