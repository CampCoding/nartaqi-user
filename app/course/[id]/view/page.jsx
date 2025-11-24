"use client";

import React from "react";
import Container from "../../../../components/ui/Container";
import CourseTitle from "../../../../components/CourseDetailsPage/CourseTitle";
import ExamDetailsHeader from "../../../../components/ExamDetailsPage/ExamDetailsHeader";
import VideoPlayer from "./../../../../components/ui/Video";

const Page = () => {
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

  const [start, setStart] = React.useState(false);

  return (
    <div>
      <div>
        <CourseTitle
          title="إتقان التدريس الفعال - معلمين"
          breadcrumbs={[
            { title: "الرئيسية", link: "/" },
            { title: "إتقان التدريس الفعال - معلمين", link: "#" },
            { title: "تدريب", link: "#" },
            { title: "الدرس الأول", link: "#" },
          ]}
        />

        <div className="">
          <Container className={"!p-0"}>
            <VideoPlayer
              defaultPlay={true}
              rootClassName={start ? "" : "hidden"}
            />
          </Container>
          <Container className={"flex flex-col gap-[10px] "}>
            <main className="w-full self-stretch">
              <div
                className="flex h-[240px] w-full items-center justify-center self-stretch rounded-3xl bg-cover bg-center md:h-[455px] md:rounded-[50px]"
                style={{
                  backgroundImage: `url(${"/images/support-2.png"})`,
                  display: start ? "none" : "",
                }}
              >
                <button
                  onClick={() => setStart(true)}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-solid border-white bg-secondary transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-orange-300 md:h-[124px] md:w-[124px] md:border-8"
                  aria-label={"تشغيل الفيديو"}
                  type="button"
                  // onClick={()=> console.log("play")}
                >
                  <div className="relative h-7 w-7 md:h-12 md:w-12">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
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
            <ExamDetailsHeader
              title={"تدريب كيفية إعداد خطة درس ناجحة"}
              description={
                "هذا التدريب  يهدف إلى قياس مدى إلمامك بأهم استراتيجيات التدريس الفعّال، وإدارة الصف بشكل احترافي، وتقييم الطلاب بطرق مبتكرة."
              }
            />
          </Container>
        </div>
        <Container>
          <div className="flex w-full  mt-[30px] md:mt-[80px] mb-[50px] md:px-4">
            <button
              type="button"
              aria-label="تفاصيل الأختبار"
              className="
      inline-flex items-center justify-center mx-auto gap-2.5
      w-full md:w-auto
      px-6  md:px-20
      py-4  md:py-4
      relative rounded-xl md:rounded-[20px]
      bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]
      cursor-pointer
      shadow-sm
      transition
      hover:opacity-95 active:opacity-90
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]/60
    "
            >
              <span
                className="
      relative flex items-center justify-center w-fit
      mt-[-1.00px]
      font-bold text-white
      text-sm sm:text-base
      leading-normal md:leading-[50px]
      whitespace-nowrap [direction:rtl]
    "
              >
                تفاصيل الأختبار
              </span>
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Page;
