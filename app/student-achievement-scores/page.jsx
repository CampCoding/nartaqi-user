import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { StudentResultCard } from "../../components/ui/Cards/StudentResultCard";
import Container from "../../components/ui/Container";

const StudentAchivementScores = () => {
  return (
    <div>
      <PagesBanner
        variant="normal"
        title={" درجات الطلاب بالتحصيلي"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "درجات الطلاب",
            link: "#",
          },
        ]}
        image={"/images/students-results.png"}
      />

      <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4    gap-4 md:gap-4 mt-[32px] mb-[100px]">
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
      </Container>
    </div>
  );
};

export default StudentAchivementScores;
