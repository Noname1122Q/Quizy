import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-8">
        <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
        <Target />
      </CardHeader>
      <div className="text-sm font-medium">
        {(Math.round(accuracy * 100) / 100).toString()}%
      </div>
    </Card>
  );
};

export default AccuracyCard;
