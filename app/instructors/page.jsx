import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { StudentResultCard } from "../../components/ui/Cards/StudentResultCard";
import Container from "../../components/ui/Container";
import { LecturerCard } from "../../components/ui/Cards/LicturerCard";
const Instructors = () => {
  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"المدربون"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "المدربون",
            link: "#",
          },
        ]}
        image={"/images/trainers.png"}
      />

      <Container className=" gap-y-[32px] mt-[48px] mb-[100px]">
      <h2 className="mb-8 text-center font-bold text-secondary text-3xl leading-tight md:mb-12 md:text-[40px] md:leading-normal [direction:rtl]">
  المدربون
</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4   gap-3 sm:gap-4 md:gap-[27px] ">
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
          <LecturerCard />
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
