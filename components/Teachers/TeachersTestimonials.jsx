import React from "react";
import TestimonialCard from "../ui/Cards/TestimonialCard";

const TeachersTestimonials = () => {
  return (
    <div>
      <main className="relative  h-[862px] bg-[linear-gradient(0deg,rgba(67,139,255,0.5)_0%,rgba(157,180,255,0.5)_32%,rgba(255,171,113,0.5)_59%,rgba(249,115,22,0.5)_80%,rgba(255,255,255,1)_96%)]">
        <header className="container mx-auto px-[64px] pt-[72px]">
          <h1 className=" font-bold text-text text-[40px]  tracking-[0] leading-[normal] ">
            أراء المعلمين
          </h1>
        </header>

        <div className="grid grid-cols-3 gap-[23px] container mx-auto px-[64px] mt-[56px]">
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
        </div>
      </main>
    </div>
  );
};

export default TeachersTestimonials;
