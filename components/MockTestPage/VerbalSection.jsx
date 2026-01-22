import React from "react";

const VerbalSection = ({ sectionTitle = "", sectionDescription = "" }) => {


  const content = sectionDescription?.replaceAll(/&nbsp;/gi, " ") 


  console.log("sectionDescription" ,sectionDescription)

  return (
    <div className="inline-flex flex-col justify-start items-start gap-8">
      <div className="inline-flex justify-end items-center gap-6">
        <div className="text-right justify-center text-text text-3xl font-bold prose prose-neutral" dangerouslySetInnerHTML={{ __html: sectionTitle }} />

      </div>
      <div className="flex-1 text-right justify-center text-text-alt text-xl font-normal leading-10 prose prose-neutral " dangerouslySetInnerHTML={{
        __html: content
      }} />
    </div>
  );
};

export default VerbalSection;
