"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import FirstsCard from "../ui/Cards/FirstsCard";
import Container from "../ui/Container";

const firstsStudents = [
  { name: "إيهاب توفيق حسن", title: "تاريخ", percentage: "79%" },
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
  { name: "منى علي القحطاني", title: "الكيمياء", percentage: "85%" },
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
  { name: "محمود عبد الرحمن", title: "القانون", percentage: "82%" },
  {
    name: "نورة سعيد الشهري",
    title: "التمريض",
    percentage: "95%",
    note: "خدمة إنسانية عالية ومهارات متقدمة",
  },
  { name: "فهد ماجد العتيبي", title: "علوم سياسية", percentage: "87%" },
  {
    name: "ريم حسن الأنصاري",
    title: "التربية",
    percentage: "92%",
    note: "ابتكار في أساليب التعليم الحديثة",
  },
  { name: "طارق عبد الله مراد", title: "الهندسة المدنية", percentage: "89%" },
  {
    name: "هالة محمد منصور",
    title: "الطب البشري",
    percentage: "97%",
    note: "إنجازات في مجال الجراحة والتشخيص",
  },
  { name: "سعيد ناصر العبدلي", title: "علوم الأرض", percentage: "80%" },
];

const maxIndex = firstsStudents.reduce((maxIdx, student, idx, arr) => {
  return parseInt(student.percentage) > parseInt(arr[maxIdx].percentage)
    ? idx
    : maxIdx;
}, 0);

const [maxStudent] = firstsStudents.splice(maxIndex, 1);
const middleIndex = Math.floor(firstsStudents.length / 2);
firstsStudents.splice(middleIndex, 0, maxStudent);

const newmaxIndex = firstsStudents.reduce((maxIdx, student, idx, arr) => {
  const current = parseInt(student.percentage.replace("%", ""));
  const max = parseInt(arr[maxIdx].percentage.replace("%", ""));
  return current > max ? idx : maxIdx;
}, 0);

const SwiperEffect = () => {
  const basicsSwiperConfigrations = {
    loopFillGroupWithBlank: true,
    grabCursor: true,
    centeredSlides: true,
    initialSlide: newmaxIndex,
    spaceBetween: 0,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.2, spaceBetween: 8 },
      480: { slidesPerView: 1.5, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 10 },
      768: { slidesPerView: 2.5, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
      1280: { slidesPerView: 4, spaceBetween: 20 },
      1536: { slidesPerView: 5, spaceBetween: 30 },
      1920: { slidesPerView: 6, spaceBetween: 30 },
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
      className="w-full pt-6 sm:pt-7 md:pt-8 lg:pt-[34px] pb-8 sm:pb-10 md:pb-12 lg:pb-[83px]"
      style={{
        backgroundImage: `url('/images/Desktop - 6.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container className={"!px-0"}>
        <div className="flex flex-col mx-auto w-full sm:w-[400px] md:w-[454px] items-center gap-2 sm:gap-3 md:gap-4 relative mb-7 sm:mb-8 md:mb-12 lg:mb-[64px] px-4 sm:px-0">
          <h1 className="relative w-fit mt-[-1.00px] font-bold text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-7 sm:leading-8 md:leading-10 whitespace-nowrap">
            لوحة الشرف لهذا الشهر
          </h1>
          <p className="relative w-fit text-white text-sm sm:text-base md:text-lg text-center leading-5 sm:leading-6 md:leading-7 whitespace-nowrap">
            أغسطس 2025
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Swiper
            {...bigScreenSwiperConfigrations}
            className="mySwiper !py-6 sm:!py-8 md:!py-10"
          >
            {firstsStudents?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide flex justify-center w-fit items-center"
              >
                <FirstsCard
                  data={item}
                  icon={
                    usersIcons[Math.floor(Math.random() * usersIcons.length)]
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default SwiperEffect;

const usersIcons = [
  { bg: "#FCF0DE", icon: "#FFCB14" },
  { bg: "#FFE8D2", icon: "#CD7F32" },
  { bg: "#B1AEFF", icon: "#241EE4" },
  { bg: "#EAFFBD", icon: "#AFEA2F" },
  { bg: "#F0F0F0", icon: "#C0C0C0" },
  { bg: "#BCFFE0", icon: "#2DB577" },
  { bg: "#E6CEFF", icon: "#7E51E5" },
];