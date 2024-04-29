import CustomWordCloud from "@/components/CustomWordCloud";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import React from "react";

type Props = {};

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topicCount.findMany({});

  const formattedTopics = topics.map((topic) => {
    return {
      value: topic.topic,
      count: topic.count,
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>View the most popular topics</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
