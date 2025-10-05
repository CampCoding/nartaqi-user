import React from "react";
import { DailyQuizSection } from "../ui/Cards/CompetitionCard";

const CompetitionsSection = () => {
  return (
    <main className="w-full flex items-center justify-center mt-[32px]    min-h-[770px] relative overflow-hidden bg-[url('/images/competition-banner-section.png')] bg-cover bg-center">
      <div className="container grid grid-cols-3 justify-items-center mx-auto max-w-[1312px]">
        <DailyQuizSection
          color="primary"
          buttonHoverColor="primary-dark"
          border={"primary-light"}
        />
        <DailyQuizSection
          color="secondary"
          buttonHoverColor="secondary-dark"
          border={"secondary-light"}
        />
        <DailyQuizSection
          color="warning"
          buttonHoverColor="warning-dark"
          border={"warning-light"}
        />
      </div>
    </main>
  );
};

export default CompetitionsSection;
