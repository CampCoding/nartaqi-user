// components/ui/Cards/TestimonialCard.jsx
import React, { useEffect } from "react";

const TestimonialCard = ({
  payload = {},
  type = "students",
  freeWidth = false,
}) => {
  const width = freeWidth ? "w-full" : "w-full max-w-[485px]";

  useEffect(() => {
    console.log(payload, "payload");
  }, [payload]);

  // ✅ Extract data from payload with multiple fallback structures
  const testimonialData = {
    // Name: check different possible keys
    studentName:
      payload?.student?.name ||
      payload?.user?.name ||
      payload?.name ||
      payload?.student_name ||
      "مستخدم",

    // Image: check different possible keys
    studentImage:
      payload?.student?.image_url ||
      payload?.student?.image_url ||
      payload?.user?.image ||
      payload?.user?.image_url ||
      payload?.image ||
      payload?.image_url ||
      "/images/Image-48.png",

    // Type
    studentType:
      payload?.type === "0" || type === "0"
        ? "طالب"
        : payload?.type === "1" || type === "1"
          ? "معلم"
          : type === "students"
            ? "طالب"
            : "معلم",

    // Rating - احتفظ بالقيمة العشرية
    rating: parseFloat(payload?.rate || payload?.rating || payload?.stars || 5),

    // Comment
    comment:
      payload?.comment ||
      payload?.review ||
      payload?.content ||
      payload?.text ||
      payload?.feedback ||
      "لا يوجد تعليق",

    // Date
    createdAt: payload?.created_at || payload?.date || new Date().toISOString(),

    // Round/Course name (optional)
    roundName: payload?.round?.name || payload?.course?.name || null,
  };

  // ✅ Generate stars with half-star support
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    const rating = Math.min(Math.max(testimonialData.rating, 0), maxStars);

    for (let i = 1; i <= maxStars; i++) {
      let starType;

      if (i <= Math.floor(rating)) {
        // نجمة كاملة
        starType = "full";
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // نجمة نصفية
        starType = "half";
      } else {
        // نجمة فارغة
        starType = "empty";
      }

      stars.push(
        <div key={i} className="w-5 h-5 sm:w-6 sm:h-6">
          {starType === "full" && <FilledStarIcon />}
          {starType === "half" && <HalfStarIcon />}
          {starType === "empty" && <OutlinedStarIcon />}
        </div>
      );
    }

    return stars;
  };

  return (
    <div
      className={`flex flex-col shadow-2xl ${width} items-center md:items-start gap-4 sm:gap-6 px-4 sm:px-6 md:!px-12 py-6 md:py-8 relative rounded-[20px] sm:rounded-[25px] bg-white shadow-[var(--shadow-card)] mx-auto`}
    >
      {/* خلفية أيقونة التخرج */}
      <div className="absolute bottom-0 left-0 aspect-[1] opacity-10 sm:opacity-100">
        <div
          className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[117px] lg:h-[118px]"
          style={{
            backgroundImage: `url('/images/graduation-diploma 1 (1).svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* صورة أيقونة أعلى الكارت */}
      <div className="absolute top-[5px] sm:top-[7px] right-[3px] sm:right-[4px] opacity-10 sm:opacity-100">
        <div className="relative left-1">
          <img
            loading="lazy"
            className="w-[90px] sm:w-[110px] lg:w-[128px] h-auto"
            alt="Graduation Icon"
            src={"/images/graduation 1.png"}
          />
        </div>
      </div>

      {/* رأس البطاقة (الصورة + الاسم + التخصص) */}
      <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-3 sm:gap-4 relative flex-[0_0_auto] z-10">
        <img
          loading="lazy"
          src={testimonialData.studentImage}
          alt={testimonialData.studentName}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = "/images/Image-48.png";
          }}
        />
        <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3 md:gap-1 relative flex-1 grow">
          <h3 className="relative text-text text-center md:text-start font-bold self-stretch mt-[-1px] text-lg sm:text-xl md:text-base lg:text-lg leading-6 sm:leading-7">
            {testimonialData.studentName}
          </h3>
          <p className="text-text-alt text-center md:text-start text-xs sm:text-sm leading-4 sm:leading-5 relative self-stretch">
            {testimonialData.studentType}
            {testimonialData.roundName && (
              <span className="text-secondary ms-1">
                • {testimonialData.roundName}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* تقييم النجوم */}
      <div
        dir="ltr"
        className="flex items-center gap-0.5 sm:gap-1 z-10"
        role="img"
        aria-label={`تقييم ${testimonialData.rating} من 5 نجوم`}
      >
        {renderStars()}
      </div>

      {/* نص الشهادة */}
      <p className="text-xs sm:text-sm md:text-base text-text-alt text-center md:text-start leading-5 sm:leading-6 relative self-stretch z-10 line-clamp-4">
        {testimonialData.comment}
      </p>
    </div>
  );
};

export default TestimonialCard;

// ⭐ نجمة كاملة
const FilledStarIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.58699 8.23594L11.185 3.00394C11.2606 2.85253 11.3769 2.72517 11.5209 2.63616C11.6648 2.54715 11.8307 2.5 12 2.5C12.1692 2.5 12.3351 2.54715 12.4791 2.63616C12.6231 2.72517 12.7394 2.85253 12.815 3.00394L15.413 8.23594L21.221 9.07994C21.3885 9.10317 21.5461 9.17303 21.6759 9.28155C21.8056 9.39007 21.9022 9.53288 21.9546 9.69367C22.0071 9.85446 22.0133 10.0268 21.9725 10.1909C21.9317 10.355 21.8456 10.5044 21.724 10.6219L17.522 14.6919L18.514 20.4419C18.641 21.1799 17.861 21.7419 17.194 21.3939L12 18.6779L6.80499 21.3939C6.13899 21.7429 5.35899 21.1799 5.48599 20.4409L6.47799 14.6909L2.27599 10.6209C2.15498 10.5033 2.06939 10.3541 2.02896 10.1903C1.98852 10.0264 1.99487 9.85451 2.04726 9.69409C2.09966 9.53367 2.19601 9.39116 2.32536 9.28277C2.45471 9.17439 2.61188 9.10446 2.77899 9.08094L8.58699 8.23594Z"
      fill="#F6CB17"
      stroke="#F6CB17"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ⭐ نجمة نصفية - جديدة!
const HalfStarIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="halfStarGradient">
        <stop offset="50%" stopColor="#F6CB17" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M8.58699 8.23594L11.185 3.00394C11.2606 2.85253 11.3769 2.72517 11.5209 2.63616C11.6648 2.54715 11.8307 2.5 12 2.5C12.1692 2.5 12.3351 2.54715 12.4791 2.63616C12.6231 2.72517 12.7394 2.85253 12.815 3.00394L15.413 8.23594L21.221 9.07994C21.3885 9.10317 21.5461 9.17303 21.6759 9.28155C21.8056 9.39007 21.9022 9.53288 21.9546 9.69367C22.0071 9.85446 22.0133 10.0268 21.9725 10.1909C21.9317 10.355 21.8456 10.5044 21.724 10.6219L17.522 14.6919L18.514 20.4419C18.641 21.1799 17.861 21.7419 17.194 21.3939L12 18.6779L6.80499 21.3939C6.13899 21.7429 5.35899 21.1799 5.48599 20.4409L6.47799 14.6909L2.27599 10.6209C2.15498 10.5033 2.06939 10.3541 2.02896 10.1903C1.98852 10.0264 1.99487 9.85451 2.04726 9.69409C2.09966 9.53367 2.19601 9.39116 2.32536 9.28277C2.45471 9.17439 2.61188 9.10446 2.77899 9.08094L8.58699 8.23594Z"
      fill="url(#halfStarGradient)"
      stroke="#F6CB17"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ⭐ نجمة فارغة
const OutlinedStarIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.58699 8.23594L11.185 3.00394C11.2606 2.85253 11.3769 2.72517 11.5209 2.63616C11.6648 2.54715 11.8307 2.5 12 2.5C12.1692 2.5 12.3351 2.54715 12.4791 2.63616C12.6231 2.72517 12.7394 2.85253 12.815 3.00394L15.413 8.23594L21.221 9.07994C21.3885 9.10317 21.5461 9.17303 21.6759 9.28155C21.8056 9.39007 21.9022 9.53288 21.9546 9.69367C22.0071 9.85446 22.0133 10.0268 21.9725 10.1909C21.9317 10.355 21.8456 10.5044 21.724 10.6219L17.522 14.6919L18.514 20.4419C18.641 21.1799 17.861 21.7419 17.194 21.3939L12 18.6779L6.80499 21.3939C6.13899 21.7429 5.35899 21.1799 5.48599 20.4409L6.47799 14.6909L2.27599 10.6209C2.15498 10.5033 2.06939 10.3541 2.02896 10.1903C1.98852 10.0264 1.99487 9.85451 2.04726 9.69409C2.09966 9.53367 2.19601 9.39116 2.32536 9.28277C2.45471 9.17439 2.61188 9.10446 2.77899 9.08094L8.58699 8.23594Z"
      stroke="#F6CB17"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
