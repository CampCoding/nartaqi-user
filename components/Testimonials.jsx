import React from "react";
import { TestimonialCard } from "./ui/Cards/TestimonialCard";
import Container from "./ui/Container";

const Testimonials = ({ title = "أراء المعلمين" }) => {
  return (
    <div>
      <main
        className="
        relative
      pb-[32px]
        bg-[linear-gradient(0deg,rgba(67,139,255,0.5)_0%,rgba(157,180,255,0.5)_32%,rgba(255,171,113,0.5)_59%,rgba(249,115,22,0.5)_80%,rgba(255,255,255,1)_96%)]
      "
      >
        <Container>
          <header className=" pt-8 sm:pt-12 md:pt-[72px]">
            <h1 className="font-bold text-text text-2xl sm:text-3xl md:text-[40px] leading-normal tracking-[0]">
              {title}
            </h1>
          </header>

          <div
            className="
          mt-6 sm:mt-10 md:mt-[56px]
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-4 sm:gap-6 md:gap-[23px]
        "
          >
            <TestimonialCard freeWidth />
            <TestimonialCard freeWidth />
            <TestimonialCard freeWidth />
            <TestimonialCard freeWidth />
            <TestimonialCard freeWidth />
            <TestimonialCard freeWidth />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Testimonials;
