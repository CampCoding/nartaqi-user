"use client";

import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { CheckIcon } from "../../public/svgs";
import Container from "../../components/ui/Container";

const SupportGate = () => {
  const supportData = [
    {
      title: "إدارة حسابك الطلابي",
      description: "تعلم كيفية إدارة ملفك الشخصي كطالب والإعدادات",
      image: "/images/support_1.png",
      buttonAria: "تشغيل الفيديو التعليمي لإدارة الحساب الطلابي",
      onPlay: () => alert("تشغيل الفيديو 🎬"),
    },
    {
      title: "كيفية التسجيل في الدورات",
      description: "دليل خطوة بخطوة لتسجيل الدورة",
      image: "/images/support-2.png",
      buttonAria: "تشغيل الفيديو التعليمي لإدارة الحساب الطلابي",
      onPlay: () => alert("تشغيل الفيديو 🎬"),
    },
    {
      title: "جولة في الصف الافتراضي",
      description: "تصفح بيئة التعلم الافتراضية الخاصة بنا",
      image: "/images/support-3.png",
      buttonAria: "تشغيل الفيديو التعليمي لإدارة الحساب الطلابي",
      onPlay: () => alert("تشغيل الفيديو 🎬"),
    },
  ];

  return (
    <div>
      <PagesBanner
        title="بوابة الدعم"
        variant="normal"
        image={"/images/Frame 1000005153.png"}
        objectPosition={"100%_100%"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "بوابة الدعم",
            link: "/",
          },
        ]}
      />
      <Container className="space-y-[64px] mt-[48px] mb-[74px]">
        <div className="  grid grid-cols-1   gap-4 md:gap-[32px]">
          {supportData.map((item, index) => {
            return <SupportSection data={item} />;
          })}
        </div>
        <GuideLines />
      </Container>
    </div>
  );
};

export default SupportGate;
// import vector from "./vector.svg";

export const SupportSection = ({ data }) => {
  return (
    <article className="flex flex-col  items-start gap-4 rounded-[30px] border-[3px] border-solid bg-white p-4 md:gap-6 md:p-6 md:pb-8">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-2 self-stretch md:gap-3">
        <h1 className="self-stretch font-bold leading-tight tracking-[0] text-secondary text-xl md:text-[32px] md:leading-[normal]">
          {data.title}
        </h1>
        <p className="self-stretch   text-sm md:text-base leading-[normal] text-text">
          {data.description}
        </p>
      </header>

      {/* Main (image + button) */}
      <main className="w-full self-stretch">
        <div
          className="flex h-[240px] w-full items-center justify-center self-stretch rounded-3xl bg-cover bg-center md:h-[582px] md:rounded-[50px]"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <button
            className="flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-solid border-white bg-secondary transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-orange-300 md:h-[124px] md:w-[124px] md:border-8"
            aria-label={data.buttonAria || "تشغيل الفيديو"}
            type="button"
            onClick={data.onPlay}
          >
            <div className="relative h-7 w-7 md:h-12 md:w-12">
              {/* Play Icon */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full" // Makes SVG scale to fit its parent
              >
                <path
                  d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </main>
    </article>
  );
};

export const GuideLines = () => {
  const guidelines = [
    {
      text: "تأكد من وجود اتصال إنترنت مستقر قبل الانضمام إلى أي جلسة",
    },
    {
      text: "استخدم بيئة هادئة ومضاءة جيدا لتحسين تجربة التعلم.",
    },
    {
      text: "توجه إلى الجلسات المباشرة قبل 5 دقائق للتحقق من إعدادك",
    },
    {
      text: "احتفظ بميكروفونك مكتوما عند عدم التحدث",
    },
    {
      text: "استخدم سماعات الرأس لمنع ردود الفعل الصوتية",
    },
    {
      text: "شارك بنشاط في المناقشات عندما يطلب منك",
    },
    {
      text: "أكمل جميع المواد التمهيدية المعينة",
    },
    {
      text: "قم بتدوين الملاحظات خلال الجلسات لتحسين الاحتفاظ بالمعلومات.",
    },
  ];

  return (
    <article className="flex flex-col items-start gap-6 pt-6 pb-12 px-0 relative bg-white rounded-[30px] border-2 border-solid ">
      <header className="flex-col h-[98px] items-start gap-3 p-6 self-stretch w-full flex relative">
        <div className="flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto] mb-[-6.00px] flex relative">
          <h1 className="self-stretch mt-[-1.00px] font-bold text-[#2d2d2d] text-2xl tracking-[-0.60px] leading-6 relative ">
            إرشادات لاستخدام الصف الافتراضي
          </h1>
          <p className="self-stretch h-5  text-text-alt text-base leading-5 whitespace-nowrap relative ">
            القواعد الهامة وأفضل الممارسات
          </p>
        </div>
      </header>
      <main className="flex-col items-start gap-4 px-6 py-0 self-stretch w-full flex-[0_0_auto] flex relative">
        {guidelines.map((guideline, index) => (
          <div
            key={index}
            className="w-[550px] items-start justify-start gap-3 flex-[0_0_auto] flex relative"
          >
            <div
              className="relative w-6 h-6 z-0 aspect-[1]"
              role="img"
              aria-label="تم"
            >
              <div className="relative w-[21px] h-[21px] top-px left-px">
                <div className="relative h-[21px]">
                  <CheckIcon />
                </div>
              </div>
            </div>
            <div className="inline-flex h-5 items-center justify-start relative flex-[0_0_auto] z-[1]">
              <p className="w-fit  text-[#2d2d2d] text-sm text-left leading-5 whitespace-nowrap relative ">
                {guideline.text}
              </p>
            </div>
          </div>
        ))}
      </main>
    </article>
  );
};
