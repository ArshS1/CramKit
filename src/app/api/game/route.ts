// POST /api/game

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
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
  }
}
