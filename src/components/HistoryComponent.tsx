import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStart: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {games.map((game) => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.gameType === "multipleChoice" ? (
                <CopyCheck className="mr-2" />
              ) : (
                <Edit2 className="mr-2" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  href={`/statistics/${game.id}`}
                  className="text-base font-medium leading-none underline"
                >
                  {game.topic}
                </Link>
                <p className="flex items-cetner px-2 py-1 text-sm text-white rounded-lg w-fit bg-slate-800">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(game.timeStart).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.gameType === "multipleChoice"
                    ? "Multiple Choice"
                    : "Open Ended"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
