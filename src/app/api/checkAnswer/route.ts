import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { compareTwoStrings } from "string-similarity";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { questionId, userAnswer } = checkAnswerSchema.parse(body);

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return NextResponse.json(
        {
          message: "Question not found",
        },
        { status: 404 }
      );
    }

    await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer,
      },
    });

    if (question.questionType === "multipleChoice") {
      const isCorrect =
        question.answer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();

      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          isCorrect,
        },
      });
      return NextResponse.json(
        {
          isCorrect,
        },
        { status: 200 }
      );
      
    }
    else if (question.questionType === "openEnded") {
      let percentageSimilarity = compareTwoStrings(
        question.answer.toLowerCase().trim(),
        userAnswer.toLowerCase().trim()
      );
      percentageSimilarity = Math.round(percentageSimilarity * 100);

      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          percentageCorrect: percentageSimilarity,
        },
      });
      return NextResponse.json(
        {
          percentageCorrect: percentageSimilarity,
        },
        { status: 200 }
      );
      
    }
  } catch (error) {
    if (error instanceof ZodError) {
      NextResponse.json(error.issues, { status: 400 });
    }
  }
}
