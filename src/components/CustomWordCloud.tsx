import { useTheme } from "next-themes";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const data = [
    {
        text:   "Talent",
        value:  4,
    }, 
    {
        text: "Innovation",
        value: 3,
    }
]

const fontSizeMapper = (word: any) => Math.log2(word.value) * 5 + 16;

const CustomWordCloud = (props: Props) => {
  const theme = useTheme();

  return (
    <>
      <D3WordCloud
        height={550}
        data={data}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "#ffffff" : "#000000"}
      />
    </>
  );
};

export default CustomWordCloud;
