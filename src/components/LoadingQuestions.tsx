import Image from "next/image";
import React from "react";
import { Progress } from "./ui/progress";
import { set } from "date-fns";

type Props = {
  finished: boolean;
};

const LOADING_TEXTS = [
  "Getting the questions ready...",
  "Almost there...",
  "Loading...",
  "Just a moment...",
  "Just a few more seconds...",
];

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState(LOADING_TEXTS[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * LOADING_TEXTS.length);
      setLoadingText(LOADING_TEXTS[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) {
          return 100;
        }
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
      return () => clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image
        src={"/loading.gif"}
        width={400}
        height={400}
        alt="Loading Animation..."
      />

      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl"> {loadingText}</h1>
    </div>
  );
};

export default LoadingQuestions;
