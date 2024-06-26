import QuizCreation from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    topic?: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  } else {
    return <QuizCreation topicParam={searchParams.topic ?? ""} />;
  }
};

export default page;
