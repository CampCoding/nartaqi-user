import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import CoursesFilters from "../../components/ui/CoursesFilters";
import CourseCard from "../../components/ui/Cards/CourseCard";
import Container from "../../components/ui/Container";
// import Testimonials from "../../components/Testimonials";

const TeachersCourses = () => {
  return (
    <div>
      <PagesBanner
        variant={"normal"}
        height="h-[387px]" // Fixed typo here
        title="الدورات العامة"
        image={"/images/Frame 1000005155.png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الدورات العامة",
            link: "/students-courses",
          },
        ]}
      />
      <div>
        <Container className="mt-[32px]">
          <div className="mb-[32px] md:mb-[48px]">
            <CoursesFilters />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[32px] lg:gap-[42px]">
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
            <CourseCard freeWidth={true} type="teachers" />
          </div>
        </Container>
        {/* <Testimonials title="أراء الطلاب" /> */}
      </div>
    </div>
  );
};

export default TeachersCourses;
