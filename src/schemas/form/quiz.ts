import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long." }),
  type: z.enum(["mcq", "open_ended"]),
  amountOfQuestions: z
    .number()
    .min(1, { message: "Number of question cannot be less than 1." })
    .max(10, { message: "Number of questions cannot be more than 10." }),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});
