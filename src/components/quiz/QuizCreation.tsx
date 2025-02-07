"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BookOpen, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingQuestions from "../LoadingQuestions";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

type Props = {};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({}: Props) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const router = useRouter();

  const getQuestionsMutation = useMutation({
    mutationFn: async ({ amountOfQuestions, type, topic }: Input) => {
      const response = await axios.post(`/api/game`, {
        amountOfQuestions,
        topic,
        type,
      });

      return response.data;
    },
  });

  const isLoading = getQuestionsMutation.isPending;

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amountOfQuestions: 5,
      topic: "",
      type: "mcq",
    },
  });

  const onSubmit = (input: Input) => {
    setShowLoader(true);
    getQuestionsMutation.mutate(
      {
        amountOfQuestions: input.amountOfQuestions,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId }) => {
          setFinished(true);
          setTimeout(() => {
            if (form.getValues("type") == "mcq") {
              router.push(`/play/mcq/${gameId}`);
            } else {
              router.push(`/play/open_ended/${gameId}`);
            }
          }, 2000);
        },
        onError: () => {
          setShowLoader(false);
        },
      }
    );
  };

  form.watch();

  if (showLoader) {
    return <LoadingQuestions finished={finished} />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic ..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a topic</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountOfQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount ..."
                        {...field}
                        type="number"
                        min={1}
                        max={10}
                        onChange={(e) => {
                          const value = e.target.value;
                          form.setValue(
                            "amountOfQuestions",
                            value ? parseInt(value) : 0
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("type", "mcq");
                  }}
                  className="w-1/2 rounded-none rounded-l-lg"
                  variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                  }
                >
                  <CheckSquare className="size-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  type="button"
                  onClick={() => {
                    form.setValue("type", "open_ended");
                  }}
                  className="w-1/2 rounded-none rounded-r-lg"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                >
                  <BookOpen className="size-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
