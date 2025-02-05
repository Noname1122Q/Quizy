"use client";
import { formatTime } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeStarted, timeEnded }: Props) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-8">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {formatTime(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
