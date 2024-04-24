import React from "react";
import keywordExtractor from "keyword-extractor";

type Props = {
  answer: string;
};

const BLANKS = "-----";

const BlankAnswerInput = ({ answer }: Props) => {
  const keywords = React.useMemo(() => {
    const words = keywordExtractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffleWords = words.sort(() => Math.random() - 0.5);
    return shuffleWords.slice(0, 2);
  }, [answer]);

  const insertBlanks = React.useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    return answerWithBlanks;
  }, [answer, keywords]);

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text- xl font-semibold">
        {insertBlanks.split(BLANKS).map((word, index) => (
          <>
            {word}
            {index < insertBlanks.split(BLANKS).length - 1 && (
              <input
                type="text"
                id="user-blank-input"
                className="text-center border-b-2 border-black dark:border-white w-28 focus:border-b-4 focus:outline-none "
              />
            )}
          </>
        ))}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
