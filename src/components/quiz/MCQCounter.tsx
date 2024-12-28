import React from "react";
import { Card } from "../ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Separator } from "../ui/separator";

type Props = {
  numberOfCorrect: number;
  numberOfIncorrect: number;
};

const MCQCounter = ({ numberOfCorrect, numberOfIncorrect }: Props) => {
  return (
    <Card className="flex flex-row justify-center items-center p-2">
      <CheckCircle className="text-green-600" size={30} />
      <span className="mx-2 text-2xl text-green-600">{numberOfCorrect}</span>
      <Separator orientation="vertical" />
      <span className="mx-2 text-2xl text-red-600">{numberOfIncorrect}</span>
      <XCircle className="text-red-600" size={30} />
    </Card>
  );
};

export default MCQCounter;
