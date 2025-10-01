"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Timer } from "../../../../components/ExamPage/Timer";
import ExamContent from "../../../../components/ExamPage/ExamContent";
import { FixedResultHero } from "../../../../components/ExamPage/FixedResultHero";

const mockQuestions = [
  {
    type: "mcq",
    text: "ما المساحة المظللة في الشكل المقابل؟",
    imageUrl: "/images/exam.png", // أو ممكن تحط رابط للصورة لو عندك
    options: [
      { id: 1, label: "16" },
      { id: 2, label: "15" },
      { id: 3, label: "17" },
      { id: 4, label: "18" },
    ],
  },
  {
    type: "mcq",
    text: "أي من الاستراتيجيات التالية تُعزز التعلم النشط داخل الصف؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "المحاضرة التقليدية فقط" },
      { id: 2, label: "المناقشات التفاعلية بين الطلاب" },
      { id: 3, label: "الحفظ والتلقين المباشر" },
      { id: 4, label: "الاستماع الصامت للمعلم" },
    ],
  },
  {
    type: "mcq",
    text: "ما هي أفضل طريقة لتقييم الفهم؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "اختبار واحد في نهاية الفصل" },
      { id: 2, label: "تقييمات مستمرة ومتنوعة" },
      { id: 3, label: "الواجبات المنزلية فقط" },
      { id: 4, label: "الحضور والغياب" },
    ],
  },
  {
    type: "mcq",
    text: "اختر الأداة المناسبة للتعلم التعاوني",
    imageUrl: undefined,
    options: [
      { id: 1, label: "محاضرة مسجلة" },
      { id: 2, label: "مستندات مشتركة" },
      { id: 3, label: "كتاب ورقي" },
      { id: 4, label: "إعلانات المنصة" },
    ],
  },
  {
    type: "boolean",
    text: "تعد المناقشات الصفية وسيلة فعالة لرفع التفاعل",
    imageUrl: undefined,
  },
  {
    type: "text",
    text: "اذكر مثالاً على نشاط تعلّم قائم على المشاريع.",
    imageUrl: undefined,
  },
  {
    type: "mcq",
    text: "أي من الوسائل التالية تساعد على تعزيز التفكير النقدي؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "تشجيع الأسئلة المفتوحة" },
      { id: 2, label: "الحفظ والاستظهار" },
      { id: 3, label: "تكرار المحاضرة" },
      { id: 4, label: "الاعتماد على الملخصات فقط" },
    ],
  },
  {
    type: "mcq",
    text: "ما الطريقة الأنسب لتحفيز الطلاب؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "تجاهل إنجازاتهم" },
      { id: 2, label: "تقديم تغذية راجعة إيجابية" },
      { id: 3, label: "زيادة الواجبات المنزلية" },
      { id: 4, label: "تقليل وقت الاستراحة" },
    ],
  },
  {
    type: "mcq",
    text: "أي من الأنشطة التالية يُعزز التعلم بالممارسة؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "حل المشكلات الواقعية" },
      { id: 2, label: "الاستماع فقط" },
      { id: 3, label: "قراءة النصوص دون مناقشة" },
      { id: 4, label: "الجلوس السلبي داخل الفصل" },
    ],
  },
  {
    type: "mcq",
    text: "أفضل وسيلة لتشجيع العمل الجماعي هي:",
    imageUrl: undefined,
    options: [
      { id: 1, label: "إجراء مشروع جماعي" },
      { id: 2, label: "تكليف فردي فقط" },
      { id: 3, label: "إلقاء محاضرة" },
      { id: 4, label: "قراءة صامتة" },
    ],
  },
  {
    type: "mcq",
    text: "ما الأداة الرقمية التي تساعد في التعلم التفاعلي؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "سبورة تفاعلية" },
      { id: 2, label: "كتاب تقليدي" },
      { id: 3, label: "نشرات ورقية" },
      { id: 4, label: "إعلانات مطبوعة" },
    ],
  },
  {
    type: "mcq",
    text: "أي من هذه الطرق يُسهم في التعلم الذاتي؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "البحث عبر الإنترنت" },
      { id: 2, label: "الاعتماد على المعلم فقط" },
      { id: 3, label: "حفظ النصوص دون فهم" },
      { id: 4, label: "تكرار الحلول الجاهزة" },
    ],
  },
  {
    type: "mcq",
    text: "كيف يمكن للمدرس معرفة احتياجات الطلاب الفردية؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "عبر التقييمات التشخيصية" },
      { id: 2, label: "إعطاء نفس الدرس للجميع" },
      { id: 3, label: "إهمال الفروق الفردية" },
      { id: 4, label: "الاعتماد على الحضور فقط" },
    ],
  },
  {
    type: "mcq",
    text: "ما أفضل طريقة لغرس مهارة حل المشكلات؟",
    imageUrl: undefined,
    options: [
      { id: 1, label: "تقديم مواقف حياتية حقيقية" },
      { id: 2, label: "الاعتماد على التلقين" },
      { id: 3, label: "حفظ القوانين فقط" },
      { id: 4, label: "إعادة كتابة المذكرات" },
    ],
  },
];

const ExamPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = mockQuestions.length;
  const [answeredMap, setAnsweredMap] = useState({}); // { [index]: any }
  const [flaggedMap, setFlaggedMap] = useState({}); // { [index]: true }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSelectOption = useCallback((index, value) => {
    setAnsweredMap((prev) => ({ ...prev, [index]: value }));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  const handleJumpTo = useCallback((index) => setCurrentIndex(index), []);

  const initialSeconds = useMemo(() => 60 * 60, []); // 60 minutes

  const handleTimeUp = useCallback(() => {
    // TODO: submit answers or navigate
    console.log("Time is up", answeredMap);
  }, [answeredMap]);

  const [isStarted, setIsStarted] = useState(false);

  const handleSubmitTheExam = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto flex flex-col px-[64px] py-[48px]">
      <Timer
        currentQuestionIndex={currentIndex}
        totalQuestions={total}
        initialSeconds={initialSeconds}
        onTimeUp={handleTimeUp}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
      <ExamContent
        questions={mockQuestions}
        currentIndex={currentIndex}
        answeredMap={answeredMap}
        flaggedMap={flaggedMap}
        onSelectOption={handleSelectOption}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpTo={handleJumpTo}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        onSubmit={handleSubmitTheExam}
      />
     <FixedResultHero open={isSubmitted} setOpen={setIsSubmitted} />
    </div>
  );
};

export default ExamPage;
