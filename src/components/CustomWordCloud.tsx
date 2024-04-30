"use client";

import { TagCloud } from "react-tagcloud";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  formattedTopics: { value: string; count: number }[];
};

const data = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 },
];

const CustomWordCloud = ({ formattedTopics }: Props) => {
  const router = useRouter();
  return (
    <>
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={formattedTopics}
        onClick={(tag) => router.push(`/quiz?topic=/${tag.value}`)}
      />
    </>
  );
};

export default CustomWordCloud;
