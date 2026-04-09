import React from "react";

const VerbalSection = ({ sectionTitle = "", sectionDescription = "" }) => {
  const content = sectionDescription?.replaceAll(/&nbsp;/gi, " ");

  return (
    <div
      className="
        inline-flex flex-col justify-start items-start w-full h-full
        gap-1.5 sm:gap-3 md:gap-5 lg:gap-6 xl:gap-8
        landscape:gap-1 landscape:sm:gap-1.5 landscape:md:gap-3 landscape:lg:gap-4
        p-1 sm:p-2 md:p-3 lg:p-4
        landscape:p-0.5 landscape:sm:p-1 landscape:md:p-2
      "
    >
      {/* Section Title */}
      <div className="inline-flex justify-start items-center w-full">
        <h2
          className="
            text-right text-text font-bold 
            prose prose-neutral max-w-none
            [&_*]:text-inherit
            
            text-[11px] leading-tight
            sm:text-base sm:leading-snug
            md:text-xl md:leading-normal
            lg:text-2xl
            xl:text-3xl
            
            landscape:text-[9px] landscape:leading-tight
            landscape:sm:text-[11px]
            landscape:md:text-sm landscape:md:leading-snug
            landscape:lg:text-lg
            landscape:xl:text-xl
          "
          dangerouslySetInnerHTML={{ __html: sectionTitle }}
        />
      </div>

      {/* Section Description */}
      <div
        className="
          flex-1 w-full text-right text-text-alt font-normal 
          prose prose-neutral max-w-none 
          [&_p]:text-inherit [&_span]:text-inherit [&_*]:text-inherit
          [&_p]:m-0 [&_p]:mb-1 sm:[&_p]:mb-2
          
          text-[9px] leading-snug
          sm:text-sm sm:leading-relaxed
          md:text-base md:leading-relaxed
          lg:text-lg lg:leading-loose
          xl:text-xl
          
          landscape:text-[8px] landscape:leading-tight
          landscape:sm:text-[9px] landscape:sm:leading-snug
          landscape:md:text-xs landscape:md:leading-snug
          landscape:lg:text-sm landscape:lg:leading-normal
          landscape:xl:text-base
          
          overflow-y-auto max-h-full
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default VerbalSection;
