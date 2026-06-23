import React, { useEffect } from "react";

const TestimonialCard = ({
  payload = {},
  type = "students",
  freeWidth = false,
}) => {
  const width = freeWidth ? "w-full" : "w-full max-w-[485px]";

  const testimonialData = {
    studentName:
      payload?.student?.name ||
      payload?.user?.name ||
      payload?.name ||
      payload?.student_name ||
      "مستخدم",

    studentImage:
      payload?.student?.image_url ||
      payload?.student?.image_url ||
      payload?.user?.image ||
      payload?.user?.image_url ||
      payload?.image ||
      payload?.image_url ||
      "/images/Image-48.png",

    studentType:
      payload?.type === "0" || type === "0"
        ? "طالب"
        : payload?.type === "1" || type === "1"
          ? "معلم"
          : type === "students"
            ? "طالب"
            : "معلم",

    rating: parseFloat(payload?.rate || payload?.rating || payload?.stars || 5),

    comment:
      payload?.comment ||
      payload?.review ||
      payload?.content ||
      payload?.text ||
      payload?.feedback ||
      "لا يوجد تعليق",

    createdAt: payload?.created_at || payload?.date || new Date().toISOString(),

    roundName: payload?.round?.name || payload?.course?.name || null,
  };

  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    const rating = Math.min(Math.max(testimonialData.rating, 0), maxStars);

    for (let i = 1; i <= maxStars; i++) {
      let starType;

      if (i <= Math.floor(rating)) {
        starType = "full";
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        starType = "half";
      } else {
        starType = "empty";
      }

      stars.push(
        <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
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
      className={`flex flex-col shadow-2xl ${width} items-center md:items-start gap-3 sm:gap-4 md:gap-6 px-4 sm:px-5 md:!px-10 lg:!px-12 py-5 sm:py-6 md:py-8 relative rounded-[16px] sm:rounded-[20px] md:rounded-[25px] bg-white shadow-[var(--shadow-card)] mx-auto`}
    >
      {/* خلفية أيقونة التخرج */}
      <div className="absolute bottom-0 left-0 aspect-[1] opacity-10 sm:opacity-100">
        <div
          className="relative w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[117px] lg:h-[118px]"
          style={{
            backgroundImage: `url('/images/graduation-diploma 1 (1).svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* صورة أيقونة أعلى الكارت */}
      <div className="absolute top-[3px] sm:top-[5px] md:top-[7px] right-[2px] sm:right-[3px] md:right-[4px] opacity-10 sm:opacity-100">
        <div className="relative left-0.5 sm:left-1">
          <img
            loading="lazy"
            className="w-[70px] sm:w-[90px] md:w-[110px] lg:w-[128px] h-auto"
            alt="Graduation Icon"
            src={"/images/graduation 1.png"}
          />
        </div>
      </div>

      {/* رأس البطاقة */}
      <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-2.5 sm:gap-3 md:gap-4 relative flex-[0_0_auto] z-10">
        <img
          loading="lazy"
          src={testimonialData.studentImage}
          alt={testimonialData.studentName}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = "/images/Image-48.png";
          }}
        />
        <div className="flex flex-col items-center md:items-start gap-1.5 sm:gap-2 md:gap-1 relative flex-1 grow min-w-0">
          <h3 className="relative text-text text-center md:text-start font-bold self-stretch mt-[-1px] text-base sm:text-lg md:text-base lg:text-lg leading-5 sm:leading-6 md:leading-7">
            {testimonialData.studentName}
          </h3>
          <p className="text-text-alt text-center md:text-start text-[11px] sm:text-xs md:text-sm leading-4 sm:leading-5 relative self-stretch">
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
      <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-text-alt text-center md:text-start leading-4 sm:leading-5 md:leading-6 relative self-stretch z-10 line-clamp-4">
        {testimonialData.comment}
      </p>
    </div>
  );
};

export default TestimonialCard;

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