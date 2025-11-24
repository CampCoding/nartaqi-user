import React from "react";

const TestimonialCard = ({
  payload = {},
  type = "students",
  freeWidth = false,
}) => {
  const width = freeWidth ? "w-full" : "w-full max-w-[485px]";

  // Extract data from payload with fallbacks
  const testimonialData = {
    studentName: payload?.student?.name || "مايكل براون",
    studentImage: payload?.student?.image || "/images/Image-48.png",
    studentType: type === "0" ? "طالب" : "معلم",
    rating: payload?.rate || 4,
    comment:
      payload?.comment ||
      "لوريم ابسوم دولور سيت اميت، كونسيكتيتور اديبيسسينغ ايليت. كورابيتور ايجيت ايروس فيتاي اورنا فرمنتوم فاسيليسيس. سيد تريستيكوي، نيسل ان كورسوس تينكيدونت، جوستو لوريم فولوتبات سيم، فيل فيفيرا سابين اركو ات اورنا.",
    createdAt: payload?.created_at || new Date().toISOString(),
  };

  // Generate stars based on rating (max 5)
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    const rating = Math.min(Math.max(testimonialData.rating, 0), maxStars); // Clamp between 0-5

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <div key={i} className="w-5 h-5 sm:w-6 sm:h-6">
          {i <= rating ? <FilledStarIcon /> : <OutlinedStarIcon />}
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
            className="w-[90px] sm:w-[110px] lg:w-[128px] h-auto"
            alt="Graduation Icon"
            src={"/images/graduation 1.png"}
          />
        </div>
      </div>

      {/* رأس البطاقة (الصورة + الاسم + التخصص) */}
      <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-3 sm:gap-4 relative flex-[0_0_auto] z-10">
        <img
          src={testimonialData.studentImage}
          alt={testimonialData.studentName}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = "/images/Image-48.png"; // Fallback image on error
          }}
        />
        <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3 md:gap-1 relative flex-1 grow">
          <h3 className="relative text-text text-center md:text-start font-bold self-stretch mt-[-1px] text-lg sm:text-xl md:text-base lg:text-lg leading-6 sm:leading-7">
            {testimonialData.studentName}
          </h3>
          <p className="text-text-alt text-center md:text-start text-xs sm:text-sm leading-4 sm:leading-5 relative self-stretch">
            {testimonialData.studentType}
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
      <p className="text-xs sm:text-sm md:text-base text-text-alt text-center md:text-start leading-5 sm:leading-6 relative self-stretch z-10">
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

const OutlinedStarIcon = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.58699 7.23594L10.185 2.00394C10.2606 1.85253 10.3769 1.72517 10.5209 1.63616C10.6648 1.54715 10.8307 1.5 11 1.5C11.1692 1.5 11.3351 1.54715 11.4791 1.63616C11.6231 1.72517 11.7394 1.85253 11.815 2.00394L14.413 7.23594L20.221 8.07994C20.3885 8.10317 20.5461 8.17303 20.6759 8.28155C20.8056 8.39007 20.9022 8.53288 20.9546 8.69367C21.0071 8.85446 21.0133 9.02676 20.9725 9.19089C20.9317 9.35503 20.8456 9.5044 20.724 9.62194L16.522 13.6919L17.514 19.4419C17.641 20.1799 16.861 20.7419 16.194 20.3939L11 17.6779L5.80499 20.3939C5.13899 20.7429 4.35899 20.1799 4.48599 19.4409L5.47799 13.6909L1.27599 9.62094C1.15498 9.50332 1.06939 9.3541 1.02896 9.19026C0.988524 9.02641 0.994866 8.85451 1.04726 8.69409C1.09966 8.53367 1.19601 8.39116 1.32536 8.28277C1.45471 8.17439 1.61188 8.10446 1.77899 8.08094L7.58699 7.23594Z"
      stroke="#F6CB17"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
