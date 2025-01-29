"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomWordCloud from "./CustomWordCloud";

type Props = {};

const HotTopicsCard = (props: Props) => {
  return (
    <Card className="col-span-4 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>Select a topic to start a quiz on it!</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
