import React from "react";
// import iconParkSolidCheckOne2 from "./icon-park-solid-check-one-2.svg";
// import iconParkSolidCheckOne3 from "./icon-park-solid-check-one-3.svg";
// import iconParkSolidCheckOne from "./icon-park-solid-check-one.svg";
// import image from "./image.svg";
// import info1 from "./info-1.svg";
export const Instructions = () => {
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-4 lg:gap-6 w-full">
      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 lg:gap-4 w-full">
        <InfoIcon className="fill-primary w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 flex-shrink-0" />
        <div className="font-bold text-primary text-xl sm:text-2xl lg:text-3xl leading-tight">
          التعليمات
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 sm:gap-4 lg:gap-6 w-full">
        <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 w-full">
          <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-text-alt text-sm sm:text-base lg:text-lg leading-tight sm:leading-relaxed flex-1">
            يجب الإجابة على جميع الأسئلة خلال الوقت المحدد.
          </p>
        </div>

        <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 w-full">
          <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-text-alt text-sm sm:text-base lg:text-lg leading-tight sm:leading-relaxed flex-1">
            الأسئلة من نوع اختيار من متعدد، وبعضها يحتوي على مقاطع نصية للقراءة.
          </p>
        </div>

        <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 w-full">
          <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-text-alt text-sm sm:text-base lg:text-lg leading-tight sm:leading-relaxed flex-1">
            يمكنك الانتقال بين الأسئلة بالضغط على (التالي) أو (السابق).
          </p>
        </div>

        <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 w-full">
          <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-text-alt text-sm sm:text-base lg:text-lg leading-tight sm:leading-relaxed flex-1">
            النجاح يبدأ من نسبة 50% فأكثر.
          </p>
        </div>
      </div>
    </div>
  );
};
const InfoIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_143_280)">
      <path
        opacity={0.965}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9453 0.681354C14.8806 0.450653 18.1384 1.81003 20.7187 4.75948C23.191 7.94918 23.8785 11.4961 22.7812 15.4001C21.5077 19.0485 19.0468 21.5095 15.3984 22.7829C11.4944 23.8802 7.94747 23.1927 4.75776 20.7204C1.49558 17.8416 0.190889 14.24 0.843701 9.91573C1.66381 6.04924 3.85912 3.27582 7.42964 1.59542C8.56308 1.1207 9.73495 0.816012 10.9453 0.681354ZM11.9296 2.18135C15.2938 2.2812 17.9735 3.67182 19.9687 6.35323C21.8626 9.20773 22.2376 12.2546 21.0937 15.4939C19.7561 18.6594 17.4202 20.6672 14.0859 21.5173C10.433 22.1902 7.31578 21.198 4.73433 18.5407C2.21336 15.5447 1.58836 12.1853 2.85933 8.4626C4.19694 5.29709 6.53287 3.28928 9.86714 2.43917C10.555 2.29849 11.2425 2.21255 11.9296 2.18135Z"
      />
      <path
        opacity={0.952}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.789 5.60277C12.2247 5.55088 12.5294 5.72277 12.7031 6.1184C12.7343 6.41526 12.7343 6.71216 12.7031 7.00902C12.4191 7.51513 12.0207 7.63232 11.5078 7.36059C11.3856 7.26974 11.2997 7.15256 11.2499 7.00902C11.2082 6.66149 11.2238 6.31776 11.2968 5.97777C11.4295 5.80532 11.5936 5.68031 11.789 5.60277Z"
      />
      <path
        opacity={0.986}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0078 8.88184C10.7267 8.87401 11.4454 8.88184 12.164 8.90528C12.4176 8.98698 12.5973 9.15105 12.7031 9.39747C12.7344 12.21 12.7344 15.0225 12.7031 17.835C12.4521 18.3302 12.0693 18.463 11.5547 18.2334C11.4687 18.1475 11.3828 18.0615 11.2968 17.9756C11.2271 15.4628 11.2037 12.9471 11.2265 10.4287C10.8044 10.4365 10.3825 10.4287 9.9609 10.4053C9.46403 10.2122 9.29996 9.86069 9.46871 9.35059C9.57156 9.1008 9.75123 8.94456 10.0078 8.88184Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_143_280">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CheckIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_143_290"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={1}
      width={22}
      height={22}
    >
      <path
        d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
        fill="white"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M8 12L11 15L17 9"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#mask0_143_290)">
      <path d="M0 0H24V24H0V0Z" fill="#3B82F6" />
    </g>
  </svg>
);
