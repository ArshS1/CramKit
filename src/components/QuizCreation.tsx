import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { quizSchema } from "@/schemas/form/quiz";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

type Input = z.infer<typeof quizSchema>;

const QuizCreation = (props: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "multipleChoice",
    },
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a Quiz</CardTitle>
          <CardDescription>Choose a Topic!</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
