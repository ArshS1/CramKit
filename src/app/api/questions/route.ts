import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { quizSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// POST /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized | You must be logged in to create a quiz" }, { status: 401 });
    }

    const body = await req.json();

    const { amount, topic, type } = quizSchema.parse(body);

    let questions: any;

    if (type == "openEnded") {
      console.log("here: ", amount, topic, type);

      questions = await strict_output(
        "You are a helpful AI, that can generate a pair of questions and answers, the length of the answers should be less than 15 words, store all the pairs of the answers and return the json format as the output.",
        new Array(amount).fill(
          `You are to generate a random hard open-ended question about the ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );

      return NextResponse.json({ questions }, { status: 200 });
    } else if (type == "multipleChoice") {
      questions = await strict_output(
        "You are a helpful AI, that can generate multiple choice questions and answers, the length of each answer should not exceed 15 words)",
        new Array(amount).fill(
          `You are to generate a random multiple choice question about the ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option with max length of 15 words",
          option2: "option with max length of 15 words",
          option3: "option with max length of 15 words",
        }
      );

      return NextResponse.json({ questions }, { status: 200 });
    }

    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
  }

  // Add a default return statement
  return NextResponse.json(
    { message: "Invalid request type" },
    { status: 400 }
  );
};
