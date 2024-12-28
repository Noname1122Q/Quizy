"use client";
import React, { SetStateAction, useMemo } from "react";
import keyword_extractor from "keyword-extractor";
import { Input } from "../ui/input";

type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<SetStateAction<string>>;
};

const BLANKS = "_____";

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });

    const shuffledWords = words.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    const withBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);

    setBlankAnswer(withBlanks);

    return withBlanks;
  }, [keywords, answer, setBlankAnswer]);

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {answerWithBlanks.split(BLANKS).map((part, i) => {
          return (
            <>
              {part}
              {i == answerWithBlanks.split(BLANKS).length - 1 ? null : (
                <Input
                  key={i}
                  id="user-blank-input"
                  className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none"
                />
              )}
            </>
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
