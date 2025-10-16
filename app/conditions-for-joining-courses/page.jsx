import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { QuestionAccordion } from "../faqs/page";
import Container from "../../components/ui/Container";

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
        title={"شروط الالتحاق بالدورات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "شروط الالتحاق بالدورات",
            link: "#",
          },
        ]}
        image={"/images/coursesJoingingConditions.png"}
      />

      <Container className="mt-[32px] mb-[100px]">
        <div className="mt-8 flex flex-col gap-6">
          {faqs.map((item) => (
            <QuestionAccordion key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default JoiningCoursesConditions;
