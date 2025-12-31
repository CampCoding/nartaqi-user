"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export const Timer = ({
  currentQuestionIndex = 0,
  totalQuestions = 1,
  initialSeconds = 0,
  timeRemaining,
  formattedTime,
  onTimeUp,
  isStarted,
  setIsStarted,
  examData
}) => {
  // Use formattedTime from props if available (controlled by parent), otherwise use local state
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const hasFiredRef = useRef(false);
  const intervalRef = useRef(null);

  // If formattedTime is provided, use it (parent controls timer)
  const useParentTimer = formattedTime !== undefined && timeRemaining !== undefined;

  // Reset when initialSeconds changes (only if not using parent timer)
  useEffect(() => {
    if (!useParentTimer) {
      setRemainingSeconds(initialSeconds);
      hasFiredRef.current = false;
    }
  }, [initialSeconds, useParentTimer]);

  // Ticking logic (only if not using parent timer)
  useEffect(() => {
    if (useParentTimer) return; // Parent handles timer
    
    if (!isStarted || remainingSeconds <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isStarted, remainingSeconds, useParentTimer]);

  // Fire onTimeUp exactly once when we hit 0
  useEffect(() => {
    const currentTime = useParentTimer ? timeRemaining : remainingSeconds;
    if (currentTime === 0 && !hasFiredRef.current && isStarted) {
      hasFiredRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsStarted?.(false);
      onTimeUp?.();
    }
  }, [timeRemaining, remainingSeconds, onTimeUp, setIsStarted, isStarted, useParentTimer]);

  const timeLabel = useMemo(() => {
    if (useParentTimer && formattedTime) {
      return formattedTime;
    }
    const m = Math.floor(remainingSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(remainingSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }, [remainingSeconds, formattedTime, useParentTimer]);

  return (
    <div className="flex flex-col  md:items-center gap-4 md:flex-row justify-between w-full mb-12 sm:mb-16 lg:mb-20">
      <div className="flex flex-col  order-2 md:order-1 justify-center items-start gap-6 sm:gap-8 lg:gap-10">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-text text-right sm:text-right">
            {examData?.exam_info?.title || "الاختبار"}
        </div>
        {isStarted && (
          <div className="text-text-alt text-xl sm:text-2xl lg:text-3xl font-medium text-center sm:text-right">
            {`السؤال ${currentQuestionIndex + 1} من ${totalQuestions}`}
          </div>
        )}
      </div>

      <div
        className="flex items-center  order-1 md:order-2    w-fit  py-4 md:min-h-[80px]  justify-end gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-6 lg:px-12  sm:py-3 lg:py-4 bg-primary-light rounded-lg sm:rounded-xl lg:rounded-2xl"
        aria-live="polite"
        aria-atomic="true"
      >
        <ClockReminderIcon className="fill-primary w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7" />
        <div className="font-bold text-text text-sm sm:text-base lg:text-lg leading-tight sm:leading-relaxed text-center sm:text-right whitespace-nowrap">
          {`الوقت المتبقي:\u00A0\u00A0${timeLabel}`}
        </div>
      </div>
    </div>
  );
};

const ClockReminderIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.914}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1016 0.67871C11.3517 0.6709 12.6016 0.67871 13.8516 0.702147C14.6174 1.00735 14.8909 1.56204 14.6719 2.36621C14.387 2.9659 13.9104 3.23152 13.2422 3.16308C13.2275 3.51873 13.2431 3.87029 13.2891 4.21777C14.9476 4.46147 16.4476 5.07863 17.7891 6.06933C18.0462 5.83566 18.2962 5.59346 18.5391 5.34277C18.2641 5.08351 18.0063 4.81004 17.7656 4.52246C17.7442 4.30776 17.8301 4.1437 18.0234 4.03027C18.8311 3.45878 19.7061 3.33378 20.6484 3.65527C21.8388 4.24662 22.3466 5.20754 22.1719 6.53808C22.0577 7.05568 21.8155 7.50099 21.4453 7.87402C21.3203 7.96777 21.1953 7.96777 21.0703 7.87402C20.8281 7.63182 20.586 7.38966 20.3438 7.14746C20.0931 7.39032 19.8509 7.64035 19.6172 7.89746C21.7071 10.8668 22.1056 14.0543 20.8125 17.46C19.5667 20.1901 17.5119 22.0103 14.6484 22.9209C10.6793 23.8788 7.32769 22.8554 4.59375 19.8506C2.33782 16.9193 1.8222 13.7006 3.04688 10.1943C3.3809 9.36952 3.81058 8.60391 4.33594 7.89746C4.10227 7.64035 3.86008 7.39032 3.60938 7.14746C3.36719 7.38966 3.125 7.63182 2.88281 7.87402C2.75781 7.96777 2.63282 7.96777 2.50781 7.87402C1.81586 7.14521 1.5893 6.29363 1.82813 5.31933C2.33636 3.93573 3.32855 3.33416 4.80469 3.51465C5.32228 3.62883 5.7676 3.87102 6.14063 4.24121C6.20161 4.32861 6.21727 4.42236 6.1875 4.52246C5.94685 4.81004 5.68903 5.08351 5.41406 5.34277C5.65692 5.59346 5.90696 5.83566 6.16406 6.06933C7.50553 5.07863 9.00553 4.46147 10.6641 4.21777C10.71 3.87029 10.7257 3.51873 10.7109 3.16308C9.64144 3.16396 9.14925 2.63271 9.23438 1.56933C9.3758 1.12327 9.66488 0.826389 10.1016 0.67871ZM10.4297 1.24121C11.4611 1.2334 12.4923 1.24121 13.5234 1.26465C13.9897 1.34573 14.185 1.61917 14.1094 2.08496C14.0202 2.31467 13.8562 2.4631 13.6172 2.53027C12.5235 2.56152 11.4297 2.56152 10.3359 2.53027C9.84441 2.33628 9.71161 2.00034 9.9375 1.52246C10.0814 1.38439 10.2454 1.29064 10.4297 1.24121ZM11.3203 3.16308C11.7578 3.16308 12.1953 3.16308 12.6328 3.16308C12.6328 3.49121 12.6328 3.81933 12.6328 4.14746C12.1953 4.14746 11.7578 4.14746 11.3203 4.14746C11.3203 3.81933 11.3203 3.49121 11.3203 3.16308ZM19.6172 4.05371C20.8249 4.17551 21.4968 4.83957 21.6328 6.0459C21.611 6.45371 21.4782 6.82088 21.2344 7.14746C20.3359 6.24901 19.4375 5.3506 18.5391 4.45215C18.8631 4.21153 19.2224 4.07872 19.6172 4.05371ZM3.86719 4.10058C4.43426 4.0116 4.94986 4.12879 5.41406 4.45215C4.51563 5.3506 3.61719 6.24901 2.71875 7.14746C2.21548 6.42455 2.19986 5.69016 2.67188 4.94433C2.97461 4.52395 3.37305 4.2427 3.86719 4.10058ZM11.0859 4.75683C14.2289 4.56145 16.8304 5.63958 18.8906 7.99121C20.8615 10.5178 21.4084 13.3303 20.5313 16.4287C19.5234 19.3115 17.5781 21.2568 14.6953 22.2646C11.6001 23.1499 8.78757 22.603 6.25781 20.624C3.89861 18.5641 2.8283 15.9625 3.04688 12.8193C3.54989 9.25641 5.44833 6.76421 8.74219 5.34277C9.50766 5.05768 10.2889 4.86235 11.0859 4.75683ZM4.94531 5.78808C5.19431 6.00587 5.42869 6.24024 5.64844 6.49121C5.33592 6.77246 5.03906 7.06932 4.75781 7.38183C4.51632 7.16377 4.28194 6.93723 4.05469 6.70215C4.36106 6.4036 4.65794 6.09891 4.94531 5.78808ZM18.9609 5.78808C19.2796 6.08326 19.5921 6.38794 19.8984 6.70215C19.6712 6.93723 19.4368 7.16377 19.1953 7.38183C18.9141 7.06932 18.6172 6.77246 18.3047 6.49121C18.5244 6.2559 18.7432 6.02152 18.9609 5.78808ZM11.2734 6.25683C14.7231 6.14105 17.2309 7.60979 18.7969 10.6631C19.9591 13.574 19.5529 16.2459 17.5781 18.6787C15.2141 21.0955 12.425 21.7596 9.21094 20.6709C6.91032 19.6867 5.41814 17.9913 4.73438 15.585C4.09816 12.603 4.90285 10.0795 7.14844 8.01465C8.35336 7.02938 9.72835 6.44344 11.2734 6.25683Z"
    />
    <path
      opacity={0.909}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2734 5.64788C14.8903 5.52188 17.5543 7.03749 19.2656 10.1948C20.2307 12.3414 20.3088 14.5133 19.5 16.7104C18.1473 19.7806 15.7958 21.4759 12.4453 21.7963C9.44026 21.8805 7.05746 20.7164 5.29688 18.3041C3.79537 15.9639 3.49849 13.4795 4.40626 10.851C5.70512 7.80999 7.99416 6.07561 11.2734 5.64788ZM11.2734 6.25725C9.72835 6.44386 8.35337 7.0298 7.14844 8.01507C4.90285 10.08 4.09817 12.6034 4.73438 15.5854C5.41815 17.9918 6.91032 19.6871 9.21094 20.6713C12.425 21.76 15.2141 21.0959 17.5781 18.6791C19.5529 16.2463 19.9591 13.5744 18.7969 10.6635C17.2309 7.61021 14.7231 6.14147 11.2734 6.25725Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.967}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8359 6.96155C12.0006 6.9323 12.1335 6.97918 12.2344 7.10218C12.2657 7.78969 12.2657 8.47716 12.2344 9.16468C12.114 9.30859 11.9655 9.33985 11.7891 9.25843C11.7566 9.23382 11.7332 9.20255 11.7188 9.16468C11.6875 8.47716 11.6875 7.78969 11.7188 7.10218C11.7515 7.04635 11.7905 6.99948 11.8359 6.96155Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.868}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.28907 8.83407C7.40575 8.82461 7.51515 8.84804 7.6172 8.90439C7.82814 9.11532 8.03907 9.32626 8.25001 9.5372C8.41051 9.9392 8.27767 10.1033 7.85157 10.0294C7.62503 9.80284 7.39843 9.57625 7.17189 9.3497C7.05939 9.13829 7.09843 8.9664 7.28907 8.83407Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.866}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4297 8.83597C16.8033 8.83316 16.9205 9.00505 16.7813 9.3516C16.5547 9.57814 16.3281 9.80474 16.1016 10.0313C15.7187 10.1172 15.5703 9.9688 15.6563 9.58597C15.9091 9.32516 16.167 9.07517 16.4297 8.83597Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.913}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6953 10.6172C15.0046 10.6256 15.1217 10.7818 15.0469 11.0859C14.125 12.0078 13.2032 12.9297 12.2813 13.8516C12.2657 14.3985 12.25 14.9453 12.2344 15.4922C12.0625 15.6797 11.8907 15.6797 11.7188 15.4922C11.6875 14.8359 11.6875 14.1797 11.7188 13.5234C12.6917 12.5269 13.6839 11.5582 14.6953 10.6172Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.907}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.36717 13.4287C6.05483 13.4209 6.74235 13.4287 7.42967 13.4522C7.57386 13.5746 7.60513 13.723 7.52342 13.8975C7.45724 13.9587 7.3791 13.9978 7.28905 14.0147C6.63017 14.0582 5.97392 14.0425 5.3203 13.9678C5.18553 13.7701 5.20119 13.5904 5.36717 13.4287Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.907}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5234 13.4287C17.2111 13.4209 17.8986 13.4287 18.5859 13.4522C18.7433 13.592 18.7667 13.756 18.6563 13.9443C18.5907 13.9784 18.5204 14.0019 18.4453 14.0147C17.8516 14.0459 17.2578 14.0459 16.6641 14.0147C16.4156 13.9633 16.3297 13.8149 16.4063 13.5693C16.4552 13.5284 16.4943 13.4815 16.5234 13.4287Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.87}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.89844 17.3656C8.2418 17.3418 8.3746 17.4981 8.29688 17.8344C8.07033 18.0609 7.84374 18.2875 7.61719 18.5141C7.18749 18.6469 7.03908 18.4985 7.17188 18.0688C7.40916 17.8236 7.65137 17.5892 7.89844 17.3656Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.87}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7734 17.3663C15.9056 17.3544 16.0306 17.3779 16.1484 17.4366C16.3594 17.6475 16.5703 17.8584 16.7812 18.0694C16.914 18.4991 16.7656 18.6475 16.3359 18.5147C16.1094 18.2881 15.8828 18.0615 15.6562 17.835C15.6028 17.6512 15.6419 17.495 15.7734 17.3663Z"
      fill="#EBF3FE"
    />
    <path
      opacity={0.967}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8359 18.1178C11.9986 18.0885 12.1314 18.1354 12.2344 18.2585C12.2657 18.9616 12.2657 19.6647 12.2344 20.3678C12.0625 20.4928 11.8907 20.4928 11.7188 20.3678C11.6875 19.6647 11.6875 18.9616 11.7188 18.2585C11.7677 18.2175 11.8068 18.1707 11.8359 18.1178Z"
      fill="#EBF3FE"
    />
  </svg>
);
