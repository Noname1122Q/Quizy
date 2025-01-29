import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

type Props = {
  accuracy: number;
};

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold ">Results</CardTitle>
        <Award />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5">
        {accuracy >= 90 && (
          <>
            <Trophy className="mr-4 text-yellow-500" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-500 ">
              <span>Impressive!</span>
              <span className="text-sm text-center text-black dark:text-gray-200 opacity-50">{`${accuracy} accuracy`}</span>
            </div>
          </>
        )}
        {accuracy < 90 && accuracy >= 75 && (
          <>
            <Trophy className="mr-4 text-gray-400" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-gray-400 ">
              <span>Awesome!</span>
              <span className="text-sm text-center text-black dark:text-gray-200 opacity-50">{`${accuracy} accuracy`}</span>
            </div>
          </>
        )}
        {accuracy < 75 && accuracy >= 50 && (
          <>
            <Trophy className="mr-4 text-emerald-500" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-emerald-500 ">
              <span>Good Job!</span>
              <span className="text-sm text-center text-black dark:text-gray-200 opacity-50">{`${accuracy} accuracy`}</span>
            </div>
          </>
        )}
        {accuracy < 50 && (
          <>
            <Trophy className="mr-4 text-red-500" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-red-500 ">
              <span>Nice Try!</span>
              <span className="text-sm text-center text-black dark:text-gray-200 opacity-50">{`${accuracy} accuracy`}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
