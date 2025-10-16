"use client";

import React, { useState } from "react";
// Removed unused imports to keep things clean

import { BadgesNavs } from "../../app/(account)/my-badges/page";

const CrouseFaqs = () => {
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
    <div dir="rtl" className="w-full mb-10">
      <h1 className="text-right text-primary text-2xl  font-bold mb-6 md:mb-8">
        الأسئلة الشائعة
      </h1>

      <BadgesNavs />

      <div className="mt-6 md:mt-8 flex flex-col gap-3.5 md:gap-5">
        {faqData.map((item) => (
          <QuestionAccordion key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CrouseFaqs;

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
      dir="rtl"
      className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-4 md:py-6 bg-primary-light rounded-[16px] md:rounded-[20px] overflow-x-auto no-scrollbar"
      role="navigation"
      aria-label="قائمة التنقل"
    >
      {[...navigationItems].reverse().map((item) => (
        <button
          key={item.id}
          type="button"
          className={`px-6 md:px-10 py-3 md:py-4 rounded-[14px] md:rounded-[20px] inline-flex items-center justify-center transition-colors ${
            item.active ? "bg-primary" : "bg-white/0 hover:bg-white/60"
          }`}
          aria-current={item.active ? "page" : undefined}
        >
          <span
            className={`text-center text-sm md:text-lg leading-5 font-medium ${
              item.active ? "text-white" : "text-text"
            }`}
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
    <div className="w-full bg-white rounded-xl md:rounded-[24px] overflow-hidden">
      {/* Header as a button (better a11y) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full text-right p-4 md:p-5 flex items-center justify-between transition ${
          open ? "bg-primary" : "bg-primary-light hover:bg-primary/10"
        }`}
      >
        <span
          className={`text-sm md:text-lg leading-relaxed ${
            open ? "text-white" : "text-[#2d2d2d]"
          }`}
        >
          {item.question}
        </span>

        <span
          className={`size-9 md:size-10 flex items-center justify-center transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.2502 31.1158C36.0372 31.3292 35.7842 31.4985 35.5057 31.6141C35.2272 31.7296 34.9286 31.7891 34.6271 31.7891C34.3256 31.7891 34.027 31.7296 33.7485 31.6141C33.47 31.4985 33.217 31.3292 33.004 31.1158L24.0713 22.1831L15.1386 31.1158C14.7082 31.5463 14.1243 31.7881 13.5156 31.7881C12.9068 31.7881 12.323 31.5463 11.8925 31.1158C11.462 30.6853 11.2202 30.1015 11.2202 29.4927C11.2202 28.8839 11.462 28.3001 11.8925 27.8696L22.4598 17.3023C22.6728 17.0889 22.9258 16.9196 23.2043 16.8041C23.4828 16.6885 23.7813 16.6291 24.0829 16.6291C24.3844 16.6291 24.6829 16.6885 24.9614 16.8041C25.24 16.9196 25.4929 17.0889 25.7059 17.3023L36.2732 27.8696C37.1481 28.7445 37.1481 30.2179 36.2502 31.1158Z"
              fill={open ? "white" : "black"}
            />
          </svg>
        </span>
      </button>

      {/* Answer */}
      {open && (
        <div className="p-4 md:p-5 text-right text-text text-sm md:text-base font-medium leading-relaxed md:leading-8 border border-t-0 border-zinc-300 rounded-b-[20px]">
          {item.answer}
        </div>
      )}
    </div>
  );
};
