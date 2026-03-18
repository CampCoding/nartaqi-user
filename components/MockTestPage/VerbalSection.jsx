import React from "react";

const VerbalSection = ({ sectionTitle = "", sectionDescription = "" }) => {
  const content = sectionDescription?.replaceAll(/&nbsp;/gi, " ");

  return (
    // تقليل الـ gap بشكل كبير جداً في الموبايل بالعرض
    <div className="inline-flex flex-col justify-start items-start gap-2 sm:gap-8 landscape:gap-1 w-full">
      <div className="inline-flex justify-start items-center gap-1 sm:gap-6 landscape:gap-1 w-full">
        <div
          className="text-right justify-center text-text text-[11px] sm:text-xl md:text-3xl landscape:text-[10px] font-bold prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
        />
      </div>

      <div
        className="flex-1 w-full text-right justify-center text-text-alt text-[9px] sm:text-base md:text-xl landscape:text-[8px] font-normal leading-tight sm:leading-relaxed md:leading-10 landscape:leading-snug prose prose-neutral max-w-none [&_p]:text-inherit [&_span]:text-inherit"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

export default VerbalSection;
