import React from "react";

export const StudentResultCard = () => {
  return (
    <main className="flex flex-col w-full  items-start gap-6 md:gap-8 pt-4 md:pt-6 pb-5 md:pb- px-4 md:px-6 relative bg-variable-collection-white-moca rounded-[30px] md:rounded-[40px] border-[4px] md:border-[5px] border-solid border-variable-collection-stroke">
      <img
        loading="lazy"
        className="relative self-stretch w-full  object-cover rounded-2xl"
        alt="Academic achievement test certificate for girls - second semester - May 2024"
        src={"/images/resultImage.png"}
      />

      <button
        className="flex items-center text-white justify-center gap-2.5 px-8 md:px-12 py-3  md:py-3 relative self-stretch w-full flex-[0_0_auto] bg-primary rounded-[13px] md:rounded-[20px] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity duration-200"
        type="button"
        aria-label="Document certification button"
      >
        <span className=" text-base md:text-lg font-semibold">
          توثيق الدرجه
        </span>
      </button>
    </main>
  );
};
