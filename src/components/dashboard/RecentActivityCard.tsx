"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/styles/dashboard.css";

type Props = {};

const RecentActivityCard = (props: Props) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 1000); // Hide scrollbar 1s after scrolling stops
  };

  return (
    <Card className="col-span-4 lg:col-span-3 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
        <CardDescription>
          You have played a total of {0} quizzes
        </CardDescription>
      </CardHeader>
      <CardContent
        onScroll={handleScroll}
        className={`max-w-[580px] overflow-y-scroll ${
          isScrolling ? "scrollbar-visible" : "scrollbar-hidden"
        }`}
      >
        {/* Add your scrollable content here */}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
