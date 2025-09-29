import React from "react";

export const Alerts = () => {
  return (
    <div className="flex-col  items-start gap-2 flex relative">
      <div className="inline-flex items-center justify-start gap-4 relative flex-[0_0_auto]">
        <AlertIcon className="fill-danger" />
        <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-danger text-2xl tracking-[0] leading-[50px] whitespace-nowrap ">
          التنبيهات
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch w-full relative flex-[0_0_auto]">
        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
          <CheckIcon className="fill-danger" />
          <p className="items-center justify-center w-fit mt-[-1.00px]  font-medium text-text-alt text-base tracking-[0] leading-[50px] whitespace-nowrap  flex relative">
            يجب الإجابة على جميع الأسئلة خلال الوقت المحدد.
          </p>
        </div>

        <div className="flex items-center justify-start gap-6 self-stretch w-full relative flex-[0_0_auto]">
          <CheckIcon className="fill-danger" />

          <p className="items-center justify-center w-fit mt-[-1.00px]  font-medium text-text-alt text-base tracking-[0] leading-[50px] whitespace-nowrap  flex relative">
            الأسئلة من نوع اختيار من متعدد، وبعضها يحتوي على مقاطع نصية للقراءة.
          </p>
        </div>

        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
          <CheckIcon className="fill-danger" />

          <p className="items-center justify-center w-fit mt-[-1.00px]  font-medium text-text-alt text-base tracking-[0] leading-[50px] whitespace-nowrap  flex relative">
            يمكنك الانتقال بين الأسئلة بالضغط على (التإلى) أو (السابق).
          </p>
        </div>

        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
          <CheckIcon className="fill-danger" />

          <p className="items-center justify-center w-fit mt-[-1.00px]  font-medium text-text-alt text-base tracking-[0] leading-[50px] whitespace-nowrap  flex relative">
            النجاح يبدأ من نسبة 50% فأكثر.
          </p>
        </div>
      </div>
    </div>
  );
};

const AlertIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_143_327)">
      <path
        opacity={0.977}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.9766 18.8671C23.9766 19.2734 23.9766 19.6796 23.9766 20.0859C23.6416 21.6008 22.7354 22.6086 21.2578 23.1093C21.1185 23.1465 20.9779 23.1778 20.8359 23.2031C14.9297 23.2343 9.02344 23.2343 3.11719 23.2031C1.75691 22.9522 0.795975 22.1944 0.234375 20.9296C0.132767 20.6469 0.0468292 20.3657 -0.0234375 20.0859C-0.0234375 19.6796 -0.0234375 19.2734 -0.0234375 18.8671C0.0919537 18.3422 0.287266 17.8422 0.5625 17.3671C3.29687 12.3984 6.03127 7.42964 8.76562 2.46089C9.68747 1.13181 10.9609 0.561493 12.5859 0.749949C13.7016 0.951699 14.5688 1.52201 15.1875 2.46089C18.0313 7.6484 20.875 12.8359 23.7188 18.0234C23.8204 18.3061 23.9063 18.5873 23.9766 18.8671ZM11.9297 2.60151C12.6157 2.63584 13.1548 2.93272 13.5469 3.49214C16.3438 8.5859 19.1406 13.6796 21.9375 18.7734C22.2648 19.8604 21.9289 20.6651 20.9297 21.1874C20.7023 21.2686 20.468 21.3155 20.2266 21.3281C14.7266 21.3593 9.22655 21.3593 3.72656 21.3281C2.40431 21.1452 1.80274 20.3874 1.92188 19.0546C1.9898 18.825 2.08355 18.6063 2.20312 18.3984C4.96875 13.3828 7.73438 8.36714 10.5 3.35151C10.8806 2.90742 11.3571 2.65742 11.9297 2.60151Z"
      />
      <path
        opacity={0.989}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6484 7.28836C12.2259 7.17478 12.64 7.37789 12.8906 7.89774C12.9219 9.9915 12.9219 12.0852 12.8906 14.179C12.6412 14.7056 12.2271 14.9009 11.6484 14.7649C11.3594 14.6633 11.1641 14.4681 11.0625 14.179C11.0312 12.0852 11.0312 9.9915 11.0625 7.89774C11.1728 7.60782 11.3681 7.40471 11.6484 7.28836Z"
      />
      <path
        opacity={0.949}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6485 16.6653C12.593 16.5708 13.0071 16.9927 12.8907 17.931C12.6412 18.4575 12.2271 18.6528 11.6485 18.5169C11.121 18.2664 10.9257 17.8524 11.0625 17.2747C11.1728 16.9848 11.3682 16.7817 11.6485 16.6653Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_143_327">
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
      <path d="M0 0H24V24H0V0Z" />
    </g>
  </svg>
);
