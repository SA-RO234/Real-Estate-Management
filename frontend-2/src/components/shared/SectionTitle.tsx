import React from "react";

interface SectionTitleProps {
  title: string;
  subTitle: string;
}

const SectionTitle = ({ title, subTitle }: SectionTitleProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto text-center mb-8 md:mb-10 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
