"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

type Props = {
  finished: boolean;
};

const loadingTexts = [
  "Setting up the basics...",
  "Adding questions and options...",
  "Finalizing quiz structure...",
  "Harnessing the knowledge of cosmos...",
  "Utilising the capabilities of AI...",
];

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [loadingText, setLoadingtext] = useState<string>(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingtext(loadingTexts[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[80vw] flex flex-col items-center">
      <Image src={"/loading.gif"} alt="loading..." width={400} height={400} />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingQuestions;
