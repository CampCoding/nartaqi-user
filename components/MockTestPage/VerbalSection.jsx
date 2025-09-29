import React from "react";

const VerbalSection = () => {
  return (
      <div className="w-[584px]  inline-flex flex-col justify-start items-start gap-8">
        <div className=" inline-flex justify-end items-center gap-6">
          <div className="text-right justify-center text-text text-3xl font-bold font-['Cairo']">
            القسم اللفظي
          </div>
        </div>
        <div className=" flex-1 text-right justify-center text-text-alt text-xl font-normal font-['Cairo'] leading-10">
          القسم اللفظي
          <br />
          يتكون القسم اللفظي من مجموعة من الأسئلة التي تقيس قدرة الطالب على فهم
          المقروء، واستنتاج المعاني، وتحليل النصوص. يتم عرض فقرة نصية قصيرة أو
          جمل متتابعة، يليها عدد من الأسئلة متعددة الخيارات، بحيث يختار الطالب
          الإجابة الصحيحة من بين الخيارات المتاحة.
          <br />
          <br />
          تشمل أنواع الأسئلة ما يلي:
          <br />
          <br />
          أسئلة الفهم والاستيعاب: تهدف إلى قياس قدرة الطالب على فهم الفكرة
          الرئيسة والتفاصيل المهمة في النص.
          <br />
          <br />
          أسئلة المعاني والمفردات: تطلب من الطالب تحديد معنى كلمة أو جملة في
          سياقها الصحيح.
        </div>
      </div>
  );
};

export default VerbalSection;
