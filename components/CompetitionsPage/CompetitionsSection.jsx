import React from "react";
import { DailyQuizSection } from "../ui/Cards/CompetitionCard";
import Container from "../ui/Container";

const CompetitionsSection = () => {
  return (
    <div className="w-full flex items-center justify-center mt-[32px] min-h-[770px] relative overflow-hidden  bg-[url('/images/competition-banner-section-mobile.png')] md:bg-[url('/images/competition-banner-section.png')] bg-cover bg-top bg-fixed lg:bg-scroll py-4 lg:p-0">
    <Container className="grid py-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center mx-auto max-w-[1312px] w-full">
      <DailyQuizSection
        color="primary"
        buttonHoverColor="primary-dark"
        border={"primary-light"}
      />
      <DailyQuizSection
        color="primary"
        buttonHoverColor="primary-dark"
        border={"primary-light"}
      />
      <div className="md:col-span-2 xl:col-span-1 w-full max-w-[419px] mx-auto">
        <DailyQuizSection
          color="primary"
          buttonHoverColor="primary-dark"
          border={"primary-light"}
        />
      </div>
    </Container>
  </div>
  );
};

export default CompetitionsSection;


