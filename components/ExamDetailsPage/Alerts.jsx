import React from "react";

export const Alerts = () => {
  const items = [
    "سيتم إنهاء الاختبار تلقائيًا عند انتهاء الوقت.",
    "لا يمكن إيقاف المؤقت بعد بدء الاختبار.",
    "تأكد من اتصال الإنترنت طوال مدة الاختبار.",
    "تحديث الصفحة قد يؤدي لفقد الإجابات غير المحفوظة.",
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
        <AlertIcon className="text-danger w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 flex-shrink-0" />
        <h2 className="font-bold text-danger text-xl sm:text-2xl lg:text-3xl leading-tight">
          التنبيهات
        </h2>
      </div>

      {/* Alert Box */}
      <div className="w-full rounded-2xl border border-danger/25 bg-danger/10 p-4 sm:p-5 lg:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="mt-0.5">
            <AlertIcon className="text-danger w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="flex-1">
            <p className="text-danger font-semibold text-sm sm:text-base lg:text-lg leading-relaxed">
              الرجاء الانتباه للنقاط التالية قبل بدء الاختبار:
            </p>

            <ul className="mt-3 space-y-2 sm:space-y-3">
              {items.map((t, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <BulletIcon className="text-danger w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                  <span className="font-medium text-text-alt text-sm sm:text-base lg:text-lg leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>

            {/* Optional footer hint */}
            <div className="mt-4 rounded-xl bg-white/60 p-3 border border-danger/15">
              <p className="text-xs sm:text-sm text-text-alt leading-relaxed">
                نصيحة: استخدم متصفح Chrome أو Safari، وأغلق أي تبويبات/برامج ثقيلة لتجنب التقطّع.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** ✅ Icon: uses currentColor so Tailwind text-* works */
const AlertIcon = ({ className, ...props }) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_143_327)">
      <path
        opacity={0.977}
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.9766 18.8671C23.9766 19.2734 23.9766 19.6796 23.9766 20.0859C23.6416 21.6008 22.7354 22.6086 21.2578 23.1093C21.1185 23.1465 20.9779 23.1778 20.8359 23.2031C14.9297 23.2343 9.02344 23.2343 3.11719 23.2031C1.75691 22.9522 0.795975 22.1944 0.234375 20.9296C0.132767 20.6469 0.0468292 20.3657 -0.0234375 20.0859C-0.0234375 19.6796 -0.0234375 19.2734 -0.0234375 18.8671C0.0919537 18.3422 0.287266 17.8422 0.5625 17.3671C3.29687 12.3984 6.03127 7.42964 8.76562 2.46089C9.68747 1.13181 10.9609 0.561493 12.5859 0.749949C13.7016 0.951699 14.5688 1.52201 15.1875 2.46089C18.0313 7.6484 20.875 12.8359 23.7188 18.0234C23.8204 18.3061 23.9063 18.5873 23.9766 18.8671ZM11.9297 2.60151C12.6157 2.63584 13.1548 2.93272 13.5469 3.49214C16.3438 8.5859 19.1406 13.6796 21.9375 18.7734C22.2648 19.8604 21.9289 20.6651 20.9297 21.1874C20.7023 21.2686 20.468 21.3155 20.2266 21.3281C14.7266 21.3593 9.22655 21.3593 3.72656 21.3281C2.40431 21.1452 1.80274 20.3874 1.92188 19.0546C1.9898 18.825 2.08355 18.6063 2.20312 18.3984C4.96875 13.3828 7.73438 8.36714 10.5 3.35151C10.8806 2.90742 11.3571 2.65742 11.9297 2.60151Z"
      />
      <path
        opacity={0.989}
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6484 7.28836C12.2259 7.17478 12.64 7.37789 12.8906 7.89774C12.9219 9.9915 12.9219 12.0852 12.8906 14.179C12.6412 14.7056 12.2271 14.9009 11.6484 14.7649C11.3594 14.6633 11.1641 14.4681 11.0625 14.179C11.0312 12.0852 11.0312 9.9915 11.0625 7.89774C11.1728 7.60782 11.3681 7.40471 11.6484 7.28836Z"
      />
      <path
        opacity={0.949}
        fill="currentColor"
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

/** ✅ small bullet icon (triangle/alert style) */
const BulletIcon = ({ className, ...props }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12 2L22 20H2L12 2Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M12 9V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 16.5H12.01"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
