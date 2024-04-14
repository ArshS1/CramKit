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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";

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

  function onSubmit(input: Input) {
    alert(JSON.stringify(input, null, 2));
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a Quiz</CardTitle>
          <CardDescription>Choose a Topic!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>F
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be the topic of your quiz
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>F
                    <FormControl>
                      <Input
                        placeholder="Enter an amount..."
                        {...field}
                        type="number"
                        min={1}
                        max={10}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button>
                  <CopyCheck className="w-4 h-4 mr-2" />
                  Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Open Ended
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
