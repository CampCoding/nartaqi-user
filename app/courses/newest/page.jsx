import React from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Testimonials from "../../../components/Testimonials";

const TeachersCourses = () => {
  return (
    <div>
      {/* variant = "large" or "normal" */}
      <PagesBanner
        variant={"normal"}
        title="احدث الدورات"
        image={"/images/Frame 1000005155.png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "احدث الدورات",
            link: "#",
          },
        ]}
      />
      <div className="container mx-auto  w-full max-w-[1312px] mt-[32px]">
        <div className=" mb-[48px]">
          <CoursesFilters />
        </div>
        <div className="grid grid-cols-3 gap-[24px] ">
          <CourseCard
            isRegistered
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard
            freeWidth={true}
            type="teachers"
            buttonStyle="notnormal"
          />
          <CourseCard freeWidth={true} type="teachers" />
        </div>
      </div>
      <Testimonials title="أراء المعلمين" />
    </div>
  );
};

export default TeachersCourses;
