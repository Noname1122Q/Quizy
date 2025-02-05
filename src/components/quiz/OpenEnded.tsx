"use client";
import { cn, formatTime } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import BlankAnswerInput from "./BlankAnswerInput";
import { gameEndedSchema } from "@/schemas/otherShemas";

type Props = {
  game: Game & {
    questions: Pick<Question, "id" | "question" | "correctAnswer">[];
  };
};

const OpenEnded = ({ game }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());
  const [blankAnswer, setBlankAnswer] = useState<string>("");
  const { toast } = useToast();

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const isCorrectAnswerMutation = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;

      document.querySelectorAll("#user-blank-input").forEach((input) => {
        const inputElement = input as HTMLInputElement;
        filledAnswer = filledAnswer.replace("_____", inputElement.value);
        inputElement.value = "";
      });

      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post("/api/checkAnswer", payload);

      return response.data;
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: async (timeEnded: Date) => {
      const payload: z.infer<typeof gameEndedSchema> = {
        gameId: game.id,
        timeEnded: timeEnded,
      };
      await axios.post(`/api/game/end`, payload);
    },
    onError: () => {
      toast({ title: "Failed to save game time.", variant: "destructive" });
    },
  });

  const isChecking = isCorrectAnswerMutation.isPending;

  const handleNext = useCallback(() => {
    if (isChecking) return;
    isCorrectAnswerMutation.mutate(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to correct answer.`,
        });
        if (questionIndex == game.questions.length - 1) {
          updateGameMutation.mutate(new Date());
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [
    isCorrectAnswerMutation,
    toast,
    isChecking,
    questionIndex,
    game.questions.length,
    blankAnswer,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hasEnded]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in{" "}
          {formatTime(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants(), "mt-2")}
        >
          View Statistics <BarChart className="mr-2 size-4" />{" "}
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Topic :</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2 size-4" />
            {formatTime(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className="">{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full top-4">
        {/* <BlankAnswerInput
          answer={currentQuestion.correctAnswer}
          setBlankAnswer={setBlankAnswer}
        /> */}
        <BlankAnswerInput setBlankAnswer={setBlankAnswer} />
        <Button
          onClick={() => handleNext()}
          className="mt-2"
          disabled={isChecking}
        >
          {isChecking && <Loader2 className="animate-spin size-4" />}
          Next <ChevronRight className="size-4 mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;
