// POST /api/game

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized | You must be logged in to create a quiz" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { amount, topic, type } = quizSchema.parse(body);

    // connect to db
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStart: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    const response = await fetch(`${process.env.API_URL}/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        topic,
        type,
      }),
    });

    const data = await response.json();

    if (type == "multipleChoice") {
      type multipleChoiceQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };

      let multipleChoiceQuestionData: any[] = data.questions.map(
        (question: multipleChoiceQuestion) => {
          let options = [
            question.answer,
            question.option1,
            question.option2,
            question.option3,
          ];
          options = options.sort(() => Math.random() - 0.5); // randomize the options
          return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(options),
            gameId: game.id,
            questionType: "multipleChoice",
          };
        }
      );

      await prisma.question.createMany({
        data: multipleChoiceQuestionData,
      });
    } else if (type == "openEnded") {
      type openEndedQuestion = {
        question: string;
        answer: string;
      };

      let openEndedQuestionsData: any[] = data.questions.map(
        (question: openEndedQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "openEnded",
          };
        }
      );

      await prisma.question.createMany({
        data: openEndedQuestionsData,
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
