import React from "react";
import { QuestionAccordion } from "./../../app/faqs/page";

const CompetitionRulesAndFaqs = () => {
  const faqs = [
    {
      id: 1,
      question: "هل التسجيل مجاني أم يحتاج إلى رسوم؟",
      answer:
        "التسجيل في المنصة مجاني تماماً، بحيث يمكنك إنشاء حساب والاطلاع على معظم المحتوىات الأساسية بدون أي رسوم. ولكن بعض الدورات أو البرامج التدريبية المتقدمة قد تكون مدفوعة، وذلك لضمان جودة المحتوى واستمرارية المنصة. ومع ذلك، نوفر دائماً عدداً من الدورات المجانية ليتمكن الجميع من الاستفادة وتجربة المنصة قبل الاشتراك في البرامج المدفوعة.",
    },
    {
      id: 2,
      question: "هل التسجيل مجاني أم يحتاج إلى رسوم؟",
      answer:
        "التسجيل في المنصة مجاني تماماً، بحيث يمكنك إنشاء حساب والاطلاع على معظم المحتوىات الأساسية بدون أي رسوم. ولكن بعض الدورات أو البرامج التدريبية المتقدمة قد تكون مدفوعة، وذلك لضمان جودة المحتوى واستمرارية المنصة. ومع ذلك، نوفر دائماً عدداً من الدورات المجانية ليتمكن الجميع من الاستفادة وتجربة المنصة قبل الاشتراك في البرامج المدفوعة.",
    },
    {
      id: 3,
      question: "هل التسجيل مجاني أم يحتاج إلى رسوم؟",
      answer:
        "التسجيل في المنصة مجاني تماماً، بحيث يمكنك إنشاء حساب والاطلاع على معظم المحتوىات الأساسية بدون أي رسوم. ولكن بعض الدورات أو البرامج التدريبية المتقدمة قد تكون مدفوعة، وذلك لضمان جودة المحتوى واستمرارية المنصة. ومع ذلك، نوفر دائماً عدداً من الدورات المجانية ليتمكن الجميع من الاستفادة وتجربة المنصة قبل الاشتراك في البرامج المدفوعة.",
    },
  ];

  return (
    <div className="mt-6 sm:mt-8 lg:mt-[32px] w-full">
      <div className="self-stretch text-center justify-center text-primary text-lg sm:text-2xl lg:text-3xl font-bold px-4 sm:px-6 lg:px-0">
        قواعد المسابقة و االأسئلة الشائعة
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[64px] mt-6 sm:mt-8 lg:mt-[32px] mb-16 sm:mb-20 lg:mb-[100px] max-w-[1312px]">
          <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6">
            {faqs.map((item) => (
              <QuestionAccordion key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionRulesAndFaqs;
