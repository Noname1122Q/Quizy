"use client";
import React, { SetStateAction } from "react";
import { Input } from "../ui/input";

type Props = {
  setBlankAnswer: React.Dispatch<SetStateAction<string>>;
};

const BlankAnswerInput = ({ setBlankAnswer }: Props) => {
  return (
    <div className="flex justify-start w-full mt-4">
      <Input
        onChange={(e) => setBlankAnswer(e.target.value as string)}
        id="user-blank-input"
        className="text-center border-b-2 border-black dark:border-white w-full h-10 focus:border-2 focus:border-b-4 focus:outline-none"
      />
    </div>
  );
};

export default BlankAnswerInput;
