import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { StudentResultCard } from "../../components/ui/Cards/StudentResultCard";
import LicturerCard from "../../components/ui/Cards/LicturerCard";

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

      <div className="container  mx-auto max-w-[1312px] gap-y-[32px] mt-[48px] mb-[100px]">
        <div className=" mb-[48px] flex items-center justify-center  font-bold text-secondary text-[40px] text-left tracking-[0] leading-[normal] [direction:rtl]">
          المدربون
        </div>
        <div className="grid grid-cols-4  gap-[27px] ">
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
          <LicturerCard />
        </div>
      </div>
    </div>
  );
};

export default Instructors;
