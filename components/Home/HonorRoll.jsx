"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";

// import "../../HomePage/NotiRump/swiperStyle.css";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// import "swiper/css/effect-coverflow";
import FirstsCard from "../ui/Cards/FirstsCard";

const image =
  "http://localhost:3001/static/media/BestSeller_1.dd174a5ab0afd31bca8a.png";

export const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-chevrons-right"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 7l5 5l-5 5"></path>
    <path d="M13 7l5 5l-5 5"></path>
  </svg>
);

export const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11 7l-5 5l5 5" />
    <path d="M17 7l-5 5l5 5" />
  </svg>
);

const firstsStudents = [
  {
    name: "إيهاب توفيق حسن",
    title: "تخصص غير محدد",
    percentage: "79%",
  },
  {
    name: "سارة عبد الله المطيري",
    title: "إدارة الأعمال",
    percentage: "96%",
    note: "إنجازات العام الحالي مع ميزات متنوعة",
  },
  {
    name: "أحمد محمد الفاروق",
    title: "علم الحاسوب",
    percentage: "98%",
    note: "أداء متطور وابتكار في العمل",
  },
  {
    name: "خالد عمر الحربي",
    title: "Mechanical Engineering",
    percentage: "94%",
    note: "التزام الجدي بالإنجازات المستمرة طوال العام",
  },
  {
    name: "ليلى عبد اللطيف",
    title: "تخصص غير محدد",
    percentage: "92%",
  },
  {
    name: "إيهاب توفيق حسن",
    title: "تخصص غير محدد",
    percentage: "79%",
  },
  {
    name: "سارة عبد الله المطيري",
    title: "إدارة الأعمال",
    percentage: "96%",
    note: "إنجازات العام الحالي مع ميزات متنوعة",
  },
  {
    name: "أحمد محمد الفاروق",
    title: "علم الحاسوب",
    percentage: "98%",
    note: "أداء متطور وابتكار في العمل",
  },
  {
    name: "خالد عمر الحربي",
    title: "Mechanical Engineering",
    percentage: "94%",
    note: "التزام الجدي بالإنجازات المستمرة طوال العام",
  },
  {
    name: "ليلى عبد اللطيف",
    title: "تخصص غير محدد",
    percentage: "92%",
  },
  {
    name: "إيهاب توفيق حسن",
    title: "تخصص غير محدد",
    percentage: "79%",
  },
  {
    name: "سارة عبد الله المطيري",
    title: "إدارة الأعمال",
    percentage: "96%",
    note: "إنجازات العام الحالي مع ميزات متنوعة",
  },
  {
    name: "أحمد محمد الفاروق",
    title: "علم الحاسوب",
    percentage: "98%",
    note: "أداء متطور وابتكار في العمل",
  },
  {
    name: "خالد عمر الحربي",
    title: "Mechanical Engineering",
    percentage: "94%",
    note: "التزام الجدي بالإنجازات المستمرة طوال العام",
  },
  {
    name: "ليلى عبد اللطيف",
    title: "تخصص غير محدد",
    percentage: "92%",
  },
];

const SwiperEffect = () => {
  // Sort and restructure the array before rendering
  const sortedStudents = [...firstsStudents].sort(
    (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
  );

  // Get top 3
  const topThree = sortedStudents.slice(0, 3);

  // Rest of students
  const others = sortedStudents.slice(3);

  // Merge them: top 3 in front
  const arrangedStudents = [...topThree, ...others];

  return (
    <div
      className="h-[867px] w-full pt-[34px]"
      style={{
        backgroundImage: `url('/images/Desktop - 6.png')`,
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col mx-auto w-[454px] items-center gap-4 relative">
        <h1 className="relative w-fit mt-[-1.00px] font-bold text-secondary text-4xl text-center leading-10 whitespace-nowrap ">
          لوحة الشرف لهذا الشهر
        </h1>
        <p className="relative w-fit  text-white text-lg text-center leading-7 whitespace-nowrap ">
          أغسطس 2025
        </p>
      </div>

      <Swiper
        loopFillGroupWithBlank={true}
        // ------------------------
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        // slidesPerView={"auto"}
        // pagination={true}
        spaceBetween={0}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        coverflowEffect={{
          rotate: 10,
          stretch: 50,
          depth: 200,
          modifier: 1,
        }}
        className="mySwiper !p-[86px]"
      >
        {arrangedStudents?.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <FirstsCard
              data={item}
              icon={usersIcons[Math.floor(Math.random() * usersIcons.length)]}
            />
          </SwiperSlide>
        ))}

        <div className="custom-navigation pet_food">
          {/* <div className="custom-prev">{arrowLeft}</div>
          <div className="custom-next">{arrowRight}</div> */}
        </div>

        {/* <div className="custom-prev">{arrowLeft}</div>
    <div className="custom-next">{arrowRight}</div> */}
      </Swiper>
    </div>
  );
};

export default SwiperEffect;

const usersIcons = [
  {
    bg: "#FCF0DE",
    icon: "#FFCB14",
  },
  {
    bg: "#FFE8D2",
    icon: "#CD7F32",
  },
  {
    bg: "#B1AEFF",
    icon: "#241EE4",
  },
  {
    bg: "#EAFFBD",
    icon: "#AFEA2F",
  },
  {
    bg: "#F0F0F0",
    icon: "#C0C0C0",
  },
  {
    bg: "#BCFFE0",
    icon: "#2DB577",
  },
  {
    bg: "#E6CEFF",
    icon: "#7E51E5",
  },
];
