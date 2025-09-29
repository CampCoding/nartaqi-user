import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import CoursesFilters from "../../components/ui/CoursesFilters";
import CourseCard from "./../../components/ui/Cards/CourseCard";
import Testimonials from "../../components/Testimonials";

const TeachersCourses = () => {
  return (
    <div>
      {" "}
      {/* variant = "large" or "normal" */}
      <PagesBanner
        variant={"normal"}
        title="الرخصة المهنية"
        image={"/images/Frame 1000005155.png"}
      />
      <div className="mt-[32px] mb-[48px]">
        <CoursesFilters />
      </div>
      <div className="grid grid-cols-3 gap-[48px] container mx-auto px-[64px]">
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" buttonStyle="notnormal" />
        <CourseCard freeWidth={true} type="teachers" />
      </div>
      <Testimonials title="أراء المعلمين" />
    </div>
  );
};

export default TeachersCourses;
