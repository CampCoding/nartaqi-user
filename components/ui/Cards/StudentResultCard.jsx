import React from "react";

export const StudentResultCard = () => {
  return (
    <main className="flex flex-col w-[426px] items-start gap-8 pt-6 pb-12 px-6 relative bg-variable-collection-white-moca rounded-[40px] border-[5px] border-solid border-variable-collection-stroke">
      <img
        className="relative self-stretch w-full aspect-[1.37] object-cover"
        alt="Academic achievement test certificate for girls - second semester - May 2024"
        src={"/images/resultImage.png"}
      />

      <button
        className="flex items-center text-white justify-center gap-2.5 px-12 py-6 relative self-stretch w-full flex-[0_0_auto] bg-primary rounded-[20px] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity duration-200"
        type="button"
        aria-label="Document certification button"
      >
        توثيق الدرجه
      </button>
    </main>
  );
};