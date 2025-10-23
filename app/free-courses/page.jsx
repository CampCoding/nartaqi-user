"use client";

import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import CoursesFilters from "../../components/ui/CoursesFilters";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import CoursesCategoryCard from "../../components/ui/Cards/CoursesCategoryCard";
import CourseCard from "../../components/ui/Cards/CourseCard";
import Link from "next/link";
import CoursesCategoryCardMobile from "../../components/ui/Cards/CoursesCategoryCard.mobile";
import Container from "../../components/ui/Container";

const FreeCourses = () => {
  const CoursesCategoryCardData = [
    {
      image: "/images/Frame 1000004851.png",
      title: "التكنولوجيا التعليمية",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004852.png",
      title: " إدارة الفصل الدراسي",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004849.png",
      title: " منهجيات التدريس",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004851.png",
      title: "التكنولوجيا التعليمية",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004852.png",
      title: " إدارة الفصل الدراسي",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004849.png",
      title: " منهجيات التدريس",
      courses: 15,
    },
  ];
  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"الشروحات المجانية"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الشروحات المجانية",
            link: "#",
          },
        ]}
        image={"/images/Frame 1000005155.png"}
      />
      <Container className=" my-[32px]">
        <div className="  mb-[32px] md:mb-[48px]">
          <CoursesFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-colss-2 lg:grid-cols-3 gap-4 sm-gap-6 md:gap-[32px] lg:gap-[42px] ">
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
      </Container>
    </div>
  );
};

export default FreeCourses;
