import React from "react";
import TestimonialCard from "@/components/ui/Cards/TestimonialCard";
import Container from "../ui/Container";

const TeachersTestimonials = () => {
  return (
    <div>
      <main className="relative pb-4 bg-[linear-gradient(0deg,rgba(67,139,255,0.5)_0%,rgba(157,180,255,0.5)_32%,rgba(255,171,113,0.5)_59%,rgba(249,115,22,0.5)_80%,rgba(255,255,255,1)_96%)]">
        <header className="container mx-auto px-[64px] pt-[72px]">
          <h1 className=" font-bold text-text text-[40px]  tracking-[0] leading-[normal] ">
            أراء المعلمين
          </h1>
        </header>

        <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[23px]  mx-auto px-[64px] mt-[56px]">
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
          <TestimonialCard freeWidth={true} />
        </Container>
      </main>
    </div>
  );
};

export default TeachersTestimonials;
