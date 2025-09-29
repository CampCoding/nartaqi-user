import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { QuestionAccordion } from "../faqs/page";

const JoiningCoursesConditions = () => {
  const faqs = [
    {
      id: 1,
      question: "ما هي النسبة الموزونة؟",
      answer: "",
    },
    {
      id: 2,
      question: "كيف تحسب النسبة الموزونة؟",
      answer:
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل جامعة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها.",
    },
    {
      id: 3,
      question: "ما أهمية النسبة الموزونة للالتحاق بالجامعات؟",
      answer: "",
    },
  ];

  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"النسبة الموزونة"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "النسبة الموزونة",
            link: "#",
          },
        ]}
        image={"/images/coursesJoingingConditions.png"}
      />

      <div className="container mx-auto px-[64px] mt-[32px] mb-[100px]">
        <div className="mt-8 flex flex-col gap-6">
          {faqs.map((item) => (
            <QuestionAccordion key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoiningCoursesConditions;
