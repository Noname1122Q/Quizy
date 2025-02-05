"use client";
import { Question } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {
  const gameType = questions[0].questionType;

  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {gameType == "open_ended" && (
            <TableHead className="w-[10px] text-right">Accuracy</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, i) => (
            <TableRow className="" key={question.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                {question.question} <br />
                <br />
                <span className="font-semibold">{question.correctAnswer}</span>
              </TableCell>
              {gameType == "mcq" && (
                <TableCell
                  className={
                    question.isCorrect ? "text-green-600" : "text-red-600"
                  }
                >
                  {question.userAnswer}
                </TableCell>
              )}
              {gameType == "open_ended" && (
                <TableCell>{question.userAnswer}</TableCell>
              )}
              {gameType == "open_ended" && (
                <TableCell>{question.percentageCorrect}</TableCell>
              )}
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
