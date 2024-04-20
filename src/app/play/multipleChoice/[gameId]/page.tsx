import MultipleChoice from "@/components/MultipleChoice";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const MultipleChoicePage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      Questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "multipleChoice") {
    return redirect("/quiz");
  }

  // Map Questions to questions
  const gameWithQuestions = {
    ...game,
    questions: game.Questions,
  };

  return <MultipleChoice game={gameWithQuestions} />;
};

export default MultipleChoicePage;
