import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {
  let gameType = questions[0].questionType;

  return (
    <Table className="mt-4">
      <TableCaption>End of List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[16px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {gameType === "openEnded" && (
            <TableHead className="w-[10px] text-right">Accuracy</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        <>
          {questions.map((question, index) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{question.question}</TableCell>
              <br />
              <br />
              <span className="font-semibold">{question.answer}</span>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
