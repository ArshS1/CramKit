import React from "react";
import keywordExtractor from "keyword-extractor";

type Props = {
  answer: string;
};

const BlankAnswerInput = ({ answer }: Props) => {
    const keywords = React.useMemo(() => {
        return keywordExtractor.extract(answer, {
            language: "english",
            remove_digits: true,
            return_changed_case: false,
            remove_duplicates: false,
        });
    }, []);

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text- xl font-semibold"></h1>
    </div>
  );
};

export default BlankAnswerInput;
