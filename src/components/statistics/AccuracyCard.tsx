"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-8">
        <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
        <Target />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium ">
          {(Math.round(accuracy * 100) / 100).toString()}%
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
