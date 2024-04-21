import React from "react";
import { Card } from "./ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  correctAnswers: number;
  incorrectAnswers: number;
};

const MultipleChoiceCounter = ({ correctAnswers, incorrectAnswers }: Props) => {
  return (
    <Card className="flex flex-flow items-center justify-center p-2">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-2 text-2xl text-[green]">{correctAnswers}</span>
      <Separator orientation="vertical" />
      <span className="mx-3 text-2xl text-[red]">{incorrectAnswers}</span>
      <Circle color="red" size={30} />
    </Card>
  );
};

export default MultipleChoiceCounter;
