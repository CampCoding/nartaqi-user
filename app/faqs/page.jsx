"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import { BadgesNavs } from "../(account)/my-badges/page";

const FAQs = () => {
  const faqData = [
    {
      id: 1,
      question: "هل التسجيل مجاني أم يحتاج إلى رسوم؟",
      answer:
        "التسجيل في المنصة مجاني تماماً، بحيث يمكنك إنشاء حساب والاطلاع على معظم المحتويات الأساسية بدون أي رسوم. ولكن بعض الدورات أو البرامج التدريبية المتقدمة قد تكون مدفوعة، وذلك لضمان جودة المحتوى واستمرارية المنصة. ومع ذلك، نوفر دائماً عدداً من الدورات المجانية ليتمكن الجميع من الاستفادة وتجربة المنصة قبل الاشتراك في البرامج المدفوعة.",
    },
    {
      id: 2,
      question: "هل يمكن استرجاع رسوم الدورة في حال لم تعجبني؟",
      answer:
        "نعم، يمكنك طلب استرجاع الرسوم خلال 7 أيام من تاريخ الدفع إذا لم تبدأ الدورة، وفقاً لسياسة الاسترجاع الخاصة بنا.",
    },
    {
      id: 3,
      question: "هل يمكنني استخدام المنصة على الهاتف المحمول؟",
      answer:
        "بالتأكيد! المنصة متوافقة مع جميع الأجهزة سواء كانت حواسيب أو هواتف ذكية أو أجهزة لوحية.",
    },
    {
      id: 4,
      question: "هل هناك دعم فني متوفر؟",
      answer:
        "نعم، نحن نقدم دعم فني متوفر على مدار الساعة طوال أيام الأسبوع من خلال خدمة الدعم عبر البريد الإلكتروني أو من خلال صفحة الدعم على الموقع.",
    },
  ];

  return (
    <div>
      <PagesBanner
        title={"الأسئلة الشائعة"}
        variant="normal"
        objectPosition="object-[50%_50%]"
        image={"/images/faq-banner.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "الأسئلة الشائعة", link: "/students-courses" },
        ]}
      />

      <Container className="mt-[48px]">
        <div className="text-right justify-center text-primary  text-3xl md:text-5xl font-bold  mb-8">
          الأسئلة الشائعة
        </div>

        <BadgesNavs />

        <div className="mt-8 flex flex-col gap-4 md:gap-6">
          {faqData.map((item) => (
            <QuestionAccordion key={item.id} item={item} />
          ))}
        </div>
      </Container>

      <AnswerNotFound />
    </div>
  );
};

export default FAQs;

export const NavigationItems = () => {
  const navigationItems = [
    { id: 1, text: "الدعم الفني", active: false },
    { id: 2, text: "التسجيل والدفع", active: false },
    { id: 3, text: "دورات", active: false },
    { id: 4, text: "عام", active: false },
    { id: 5, text: "الكل", active: true },
  ];

  return (
    <nav
      className="flex h-[116px] items-center px-4 py-6 relative bg-primary-light rounded-[20px]"
      role="navigation"
      aria-label="Navigation menu"
    >
      {navigationItems.reverse().map((item) => (
        <button
          key={item.id}
          className={`${
            item.padding
          } rounded-[20px] py-[24px]  px-[64px] items-center justify-center relative flex-[0_0_auto] ${
            item.active ? "bg-primary" : ""
          }`}
          type="button"
          aria-current={item.active ? "page" : undefined}
        >
          <span
            className={`${
              item.active ? "text-white text-bold " : "text-text"
            } relative w-fit text-xl text-center leading-5  whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {item.text}
          </span>
        </button>
      ))}
    </nav>
  );
};

export const QuestionAccordion = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl md:rounded-[30px] overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        // CHANGED: Reduced padding on mobile (`p-4`) and restored it for medium screens (`md:p-6`).
        className={`self-stretch p-4 gap-3 md:p-6 transition  flex justify-between items-center cursor-pointer ${
          open ? "bg-primary" : "bg-primary-light hover:!bg-primary-bg"
        }`}
      >
        <div
          className="text-right text-sm leading-loose md:text-lg"
          style={{
            color: open ? "#fff" : "#2d2d2d",
          }}
        >
          {item.question}
        </div>
        <div
          className={`size-10 md:size-12 flex items-center justify-center transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.2502 31.1158C36.0372 31.3292 35.7842 31.4985 35.5057 31.6141C35.2272 31.7296 34.9286 31.7891 34.6271 31.7891C34.3256 31.7891 34.027 31.7296 33.7485 31.6141C33.47 31.4985 33.217 31.3292 33.004 31.1158L24.0713 22.1831L15.1386 31.1158C14.7082 31.5463 14.1243 31.7881 13.5156 31.7881C12.9068 31.7881 12.323 31.5463 11.8925 31.1158C11.462 30.6853 11.2202 30.1015 11.2202 29.4927C11.2202 28.8839 11.462 28.3001 11.8925 27.8696L22.4598 17.3023C22.6728 17.0889 22.9258 16.9196 23.2043 16.8041C23.4828 16.6885 23.7813 16.6291 24.0829 16.6291C24.3844 16.6291 24.6829 16.6885 24.9614 16.8041C25.24 16.9196 25.4929 17.0889 25.7059 17.3023L36.2732 27.8696C37.1481 28.7445 37.1481 30.2179 36.2502 31.1158Z"
              fill={open ? "white" : "black"}
            />
          </svg>
        </div>
      </div>

      {/* Answer */}
      {open && (
        <div
          // CHANGED: Reduced padding and line-height for mobile for better readability.
          className="p-4 md:p-6 text-right text-text text-base font-medium leading-relaxed md:leading-[36px] border-2 border-t-0 border-zinc-500 overflow-hidden rounded-b-[30px]"
          style={{
            outlineTop: open ? "solid" : "none",
          }}
        >
          {item.answer}
        </div>
      )}
    </div>
  );
};

  const AnswerNotFound = () => {
    return (
      <div
      className="
        flex flex-col items-center justify-center
        px-4
        h-auto py-10 md:py-0 md:h-[276px]
        mt-10 md:mt-[64px]
        mb-16 md:mb-[105px]
      "
      style={{
        backgroundImage: `url('/images/FRAME (3).png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[202px]">
        <div className="
          font-bold text-[#2d2d2d] leading-normal text-2xl md:text-[32px] text-center
          overflow-hidden text-ellipsis whitespace-nowrap
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        ">
          لم تجد إجابتك؟
        </div>
      </div>
    
      <div className="w-full max-w-[307px] mt-3 md:mt-[24px] mb-6 md:mb-[32px]">
        <p className="
          text-text-alt text-xl md:text-2xl text-center leading-normal
          overflow-hidden text-ellipsis
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        ">
          فريق الدعم لدينا هنا للمساعدة
        </p>
      </div>
    
      <button
        type="button"
        aria-label="الاتصال الدعم"
        className="
          inline-flex items-center justify-center gap-2
         w-auto
          px-6 md:px-8 py-3 md:py-4
          bg-primary rounded-[20px] cursor-pointer
          transition-colors hover:bg-secondary-dark
          focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
        "
      >
        <span className="
          text-neutral-50 text-sm md:text-base font-bold leading-5 text-center
          overflow-hidden text-ellipsis whitespace-nowrap
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        ">
          الاتصال بالدعم
        </span>
      </button>
    </div>
    
    );
  };
