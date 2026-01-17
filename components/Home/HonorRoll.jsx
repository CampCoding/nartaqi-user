"use client";

import React, { useState } from "react";

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
import Container from "../ui/Container";

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
    title: "تاريخ",
    percentage: "79%",
  },
  {
    name: "سارة عبد الله المطيري",
    title: "إدارة الأعمال",
    percentage: "96%",
    note: "تميز في القيادة وتنظيم المشاريع",
  },
  {
    name: "أحمد محمد الفاروق",
    title: "علم الحاسوب",
    percentage: "98%",
    note: "ابتكار في الذكاء الاصطناعي وتطوير البرمجيات",
  },
  {
    name: "خالد عمر الحربي",
    title: "الهندسة الميكانيكية",
    percentage: "91%",
    note: "تفوق في تصميم الأنظمة الحرارية",
  },
  {
    name: "ليلى عبد اللطيف",
    title: "الفيزياء",
    percentage: "88%",
    note: "إبداع في البحوث والتجارب العلمية",
  },
  {
    name: "منى علي القحطاني",
    title: "الكيمياء",
    percentage: "85%",
  },
  {
    name: "يوسف خالد الزهراني",
    title: "الهندسة الكهربائية",
    percentage: "93%",
    note: "مشاريع في الطاقة المتجددة والتحكم",
  },
  {
    name: "هند سامي الشريف",
    title: "علوم الأحياء",
    percentage: "90%",
    note: "بحوث مميزة في الوراثة والتقنيات الحيوية",
  },
  {
    name: "محمود عبد الرحمن",
    title: "القانون",
    percentage: "82%",
  },
  {
    name: "نورة سعيد الشهري",
    title: "التمريض",
    percentage: "95%",
    note: "خدمة إنسانية عالية ومهارات متقدمة",
  },
  {
    name: "فهد ماجد العتيبي",
    title: "علوم سياسية",
    percentage: "87%",
  },
  {
    name: "ريم حسن الأنصاري",
    title: "التربية",
    percentage: "92%",
    note: "ابتكار في أساليب التعليم الحديثة",
  },
  {
    name: "طارق عبد الله مراد",
    title: "الهندسة المدنية",
    percentage: "89%",
  },
  {
    name: "هالة محمد منصور",
    title: "الطب البشري",
    percentage: "97%",
    note: "إنجازات في مجال الجراحة والتشخيص",
  },
  {
    name: "سعيد ناصر العبدلي",
    title: "علوم الأرض",
    percentage: "80%",
  },
];

// 1. نحدد أعلى نسبة
const maxIndex = firstsStudents.reduce((maxIdx, student, idx, arr) => {
  return parseInt(student.percentage) > parseInt(arr[maxIdx].percentage)
    ? idx
    : maxIdx;
}, 0);

// 2. نجيب العنصر صاحب أعلى نسبة
const [maxStudent] = firstsStudents.splice(maxIndex, 1);

// 3. نحدد منتصف المصفوفة
const middleIndex = Math.floor(firstsStudents.length / 2);

// 4. ندخل الطالب في المنتصف
firstsStudents.splice(middleIndex, 0, maxStudent);

const newmaxIndex = firstsStudents.reduce((maxIdx, student, idx, arr) => {
  const current = parseInt(student.percentage.replace("%", ""));
  const max = parseInt(arr[maxIdx].percentage.replace("%", ""));
  return current > max ? idx : maxIdx;
}, 0);


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

  const basicsSwiperConfigrations = {
    loopFillGroupWithBlank: true,

    grabCursor: true,
    centeredSlides: true,
    initialSlide: newmaxIndex, // يبدأ من النص
    spaceBetween: 0,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 1.5, // موبايلات كبيرة
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2, // تابلت صغير
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.5, // تابلت أفقي
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3, // لابتوب متوسط
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4, // شاشات أكبر
        spaceBetween: 20,
      },
      1536: {
        slidesPerView: 5, // ديسكتوب عريض أو 2K
        spaceBetween: 30,
      },
      1920: {
        slidesPerView: 6, // شاشات 1080p واسعة
        spaceBetween: 30,
      },
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  const bigScreenSwiperConfigrations = {
    ...basicsSwiperConfigrations,
    effect: "coverflow",
    modules: [EffectCoverflow, Pagination, Navigation],
    coverflowEffect: {
      rotate: 10,
      stretch: 10,
      depth: 200,
      modifier: 1,
    },
  };

  return (
    <div
      className="  w-full pt-[34px] pb-[50px] md:pb-[83px] "
      style={{
        backgroundImage: `url('/images/Desktop - 6.png')`,
        backgroundPosition: "center",
      }}
    >
      <Container className={"!px-0"}>

      <div className="flex flex-col mx-auto md:w-[454px] items-center gap-4 relative  mb-[40px] md:mb-[64px]">
        <h1 className="relative w-fit mt-[-1.00px] font-bold text-secondary text-2xl md:text-4xl text-center leading-10 whitespace-nowrap ">
          لوحة الشرف لهذا الشهر
        </h1>
        <p className="relative w-fit  text-white text-lg text-center leading-7 whitespace-nowrap ">
          أغسطس 2025
        </p>
      </div>
      <div className="w-full flex justify-center">
        <Swiper {...bigScreenSwiperConfigrations} className="mySwiper !py-10">
          {firstsStudents?.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide flex justify-center w-fit items-center"
            >
              <FirstsCard
                data={item}
                icon={usersIcons[Math.floor(Math.random() * usersIcons.length)]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx>{`
          
        `}</style>
      </div>
      </Container>

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
