"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  CourseCalenderIcon,
  FileTextIcon,
  RatingStarIcon,
  ShareIcon,
} from "../../../public/svgs";
import Link from "next/link";
import { useUser } from "../../../lib/useUser";
import { Icon } from "@iconify/react";
import { formatDate, formatDateBackEnd } from "../../utils/helpers/date";
import { useSelector } from "react-redux";

const CourseCard = ({
  freeWidth = false,
  course = {},
  payload = {},
  type = "0",
  buttonStyle = "normal",
  isRegistered = false,
  isInFav = false,
}) => {
  const width = freeWidth ? "w-full " : "w-full lg:max-w-[351px]";
  console.log(course);
  const { token } = useSelector((state) => state.auth);

  const enrolled = true;
  console.log({ token, enrolled });

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (isInFav) {
      setIsFav(isInFav);
    }
  }, [isInFav]);

  const Button = () => {
    if (buttonStyle === "normal") {
      return (
        <Link
          href={
            isRegistered ? "/course/123?reg=true&done=false" : "/course/123"
          }
          className="flex-1 px-3 sm:px-4 py-3 bg-secondary rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2.5 transition-shadow duration-200 hover:shadow-[0_4px_12px_var(--color-secondary,rgba(59,130,246,0.25))]"
        >
          <div className="justify-center text-bg text-xs sm:text-sm font-semibold">
            {token && payload.enrolled
              ? "ادخل الدورة"
              : token
              ? "التحق بالدورة"
              : "التحق بالدورة"}
          </div>
        </Link>
      );
    } else {
      return (
        <Link
          href={isRegistered ? "/course/123?reg=true&done=true" : "/course/123"}
          className="w-full self-stretch px-3 sm:px-4 py-3 bg-gradient-to-r from-primary to-secondary rounded-[8px] sm:rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 transition-all duration-200 cursor-pointer hover:from-secondary hover:to-primary hover:scale-105 hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
        >
          <div className="justify-center text-bg text-xs sm:text-sm font-semibold">
            {token && payload.enrolled
              ? "ادخل الدورة"
              : token
              ? "التحق بالدورة"
              : "التحق بالدورة"}
          </div>
        </Link>
      );
    }
  };

  return (
    <Fragment>
      <div
        className={`${width} block rounded-[25px] sm:rounded-[30px] p-[2px] bg-gradient-to-b from-[#3B82F6] to-[#F97316] mx-auto`}
      >
        <div className="bg-white pb-6 sm:pb-8 h-full rounded-[23px] sm:rounded-[28px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-2">
          <div
            className="self-stretch h-40 sm:h-48 pt-[20px] sm:pt-[24px] px-[14px] sm:px-[16px] relative bg-black/25 rounded-tl-[20px] sm:rounded-tl-[20px] rounded-tr-[20px] sm:rounded-tr-[20px] overflow-hidden"
            style={{
              backgroundImage: `url('${payload?.image_url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-3 sm:px-4 py-2 absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary rounded-[8px] sm:rounded-[10px] inline-flex items-center gap-[5px] sm:gap-[7px]">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <CourseCalenderIcon date={payload?.start_date} />
              </div>
              <div className="justify-center text-white text-[9px] sm:text-[10px] font-medium">
                يبدأ: {formatDateBackEnd(payload?.start_date)}
              </div>
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <div className="flex justify-between gap-5  items-center">
                <FavIcon onClick={() => setIsFav(!isFav)} isFav={isFav} />
                {payload?.free !== "0" && (
                  <div className="flex justify-center px-3 py-1  group hover:bg-white hover:text-secondary   rounded-lg items-center bg-secondary">
                    <span className="text-white group-hover:text-secondary transition-all">
                      مجاني
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="self-stretch px-2 sm:px-3 flex flex-col justify-start items-start gap-1">
            <div className="self-stretch text-black text-right justify-center text-text text-sm sm:text-base font-bold">
              {payload?.name}
            </div>
            <div className="self-stretch text-right justify-center text-text-alt text-xs sm:text-sm font-normal leading-relaxed">
              {payload?.goal}
            </div>
          </div>

          <div className="text-black self-stretch p-2 sm:p-3 flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center gap-2">
              <div className="px-2 sm:px-2.5 py-2 sm:py-3 bg-primary-bg rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2.5 flex-1 min-w-0">
                <div className="justify-center text-text text-[10px] sm:text-xs font-medium truncate">
                  {payload?.course?.name}
                </div>
              </div>
              <div className="px-4 sm:px-9 py-2 bg-[#3b82f640] rounded-[8px] sm:rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#CEDFFC] flex justify-center items-center gap-2.5 flex-shrink-0">
                <div className="justify-center text-alt text-[10px] sm:text-xs font-medium">
                  {type === "0" ? "طلاب" : "معلمين"}
                </div>
              </div>
            </div>

            <div className="text-black self-stretch inline-flex justify-between items-center gap-2">
              <div className="flex justify-start items-center gap-[5px] flex-1 min-w-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-primary w-full h-full"
                  >
                    <path d="M11.992 20C12.0407 20.18 12.1077 20.356 12.193 20.528C12.2783 20.7007 12.3743 20.858 12.481 21H5.616C5.15533 21 4.771 20.846 4.463 20.538C4.155 20.23 4.00067 19.8457 4 19.385V4.615C4 4.155 4.15433 3.771 4.463 3.463C4.77167 3.155 5.156 3.00067 5.616 3H16.385C16.845 3 17.2293 3.15433 17.538 3.463C17.8467 3.77167 18.0007 4.156 18 4.616V11.735C17.8533 11.7143 17.6867 11.704 17.5 11.704C17.3133 11.704 17.1467 11.714 17 11.734V4.617C17 4.463 16.936 4.32167 16.808 4.193C16.68 4.06433 16.5387 4 16.384 4H11.5V10.192L9.5 9L7.5 10.192V4H5.616C5.462 4 5.32067 4.064 5.192 4.192C5.06333 4.32 4.99933 4.461 5 4.615V19.385C5 19.5383 5.064 5.6793 5.192 19.808C5.32 19.9367 5.461 20.0007 5.615 20H11.992ZM17.5 21.692C16.386 21.692 15.441 21.304 14.665 20.528C13.8883 19.752 13.5 18.8067 13.5 17.692C13.5 16.5787 13.8883 15.6337 14.665 14.857C15.441 14.0803 16.386 13.692 17.5 13.692C18.614 13.692 19.5593 14.0803 20.336 14.857C21.1127 15.6337 21.5007 16.5787 21.5 17.692C21.4993 18.8053 21.1113 19.7507 20.336 20.528C19.5607 21.3053 18.6153 21.6933 17.5 21.692ZM16.635 19.577L19.365 17.654L16.635 15.731V19.577ZM11.992 4H5H17H11.5H11.992Z" />
                  </svg>
                </div>
                <div className="justify-center text-text text-[10px] sm:text-xs font-medium truncate">
                  الدروس : 12
                </div>
              </div>
              <div className="flex justify-start items-center gap-[5px] flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary w-5 h-5 sm:w-6 sm:h-6"
                >
                  <g clipPath="url(#clip0_966_3515)">
                    <path
                      opacity="0.933"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.9766 12.3516C23.9766 12.7891 23.9766 13.2266 23.9766 13.6641C23.8601 14.007 23.6257 14.2336 23.2734 14.3438C22.5861 14.3672 21.8986 14.375 21.2109 14.3672C21.2109 15.4297 21.2109 16.4922 21.2109 17.5547C21.9142 17.5469 22.6174 17.5547 23.3203 17.5781C23.5073 17.7635 23.5073 17.951 23.3203 18.1406C15.7578 18.1719 8.1953 18.1719 0.632812 18.1406C0.445817 17.951 0.445817 17.7635 0.632812 17.5781C1.33576 17.5547 2.03889 17.5469 2.74219 17.5547C2.74219 16.4922 2.74219 15.4297 2.74219 14.3672C2.02111 14.3868 1.30237 14.3634 0.585938 14.2969C0.291919 14.1669 0.0887944 13.956 -0.0234375 13.6641C-0.0234375 13.2422 -0.0234375 12.8203 -0.0234375 12.3984C0.0145043 12.353 0.0613795 12.314 0.117188 12.2813C0.24122 12.258 0.36622 12.2501 0.492188 12.2578C0.484378 10.789 0.492188 9.32026 0.515625 7.85157C0.646303 6.70525 1.27912 6.02556 2.41406 5.81251C3.21094 5.78125 4.00781 5.78125 4.80469 5.81251C5.9182 6.01979 6.55102 6.68382 6.70312 7.8047C6.72656 9.289 6.73439 10.7734 6.72656 12.2578C6.90267 12.2377 7.06673 12.2689 7.21875 12.3516C7.28011 12.5656 7.30355 12.7844 7.28906 13.0078C7.6328 13.0078 7.97658 13.0078 8.32031 13.0078C8.30255 12.783 8.32598 12.5642 8.39062 12.3516C8.41406 12.3281 8.4375 12.3047 8.46094 12.2813C8.60072 12.2579 8.74134 12.2501 8.88281 12.2578C8.87498 10.7421 8.88281 9.22651 8.90625 7.71095C9.08592 6.625 9.71873 5.99218 10.8047 5.81251C11.6016 5.78125 12.3984 5.78125 13.1953 5.81251C14.3737 6.03779 15.0066 6.74875 15.0938 7.94532C15.1172 9.38275 15.125 10.8203 15.1172 12.2578C15.2431 12.2501 15.3682 12.258 15.4922 12.2813C15.5301 12.2957 15.5613 12.3191 15.5859 12.3516C15.6301 12.5672 15.6458 12.786 15.6328 13.0078C15.9922 13.0078 16.3515 13.0078 16.7109 13.0078C16.7032 12.8041 16.711 12.601 16.7344 12.3984C16.7734 12.3594 16.8125 12.3203 16.8516 12.2813C16.9913 12.2579 17.132 12.2501 17.2734 12.2578C17.2656 10.6952 17.2734 9.13276 17.2969 7.57032C17.5192 6.56673 18.1364 5.98079 19.1484 5.81251C19.9453 5.78125 20.7422 5.78125 21.5391 5.81251C22.598 5.96514 23.2308 6.56668 23.4375 7.6172C23.4609 9.16398 23.4688 10.7109 23.4609 12.2578C23.6478 12.2349 23.8197 12.2661 23.9766 12.3516ZM2.64844 6.39845C3.40026 6.3804 4.15026 6.40384 4.89844 6.46876C5.49961 6.6324 5.88239 7.01523 6.04688 7.6172C6.07031 9.16398 6.07814 10.7109 6.07031 12.2578C4.42969 12.2578 2.78906 12.2578 1.14844 12.2578C1.12629 10.6618 1.14973 9.06803 1.21875 7.47657C1.48882 6.83884 1.96538 6.4795 2.64844 6.39845ZM10.9922 6.39845C11.7596 6.38026 12.5252 6.4037 13.2891 6.46876C13.9097 6.63639 14.2926 7.03482 14.4375 7.66407C14.4609 9.19525 14.4688 10.7265 14.4609 12.2578C12.8047 12.2578 11.1484 12.2578 9.49219 12.2578C9.48436 10.8203 9.49219 9.38275 9.51562 7.94532C9.61983 7.05217 10.112 6.53654 10.9922 6.39845ZM19.3828 6.39845C20.1502 6.38026 20.9159 6.4037 21.6797 6.46876C22.3314 6.68298 22.7142 7.12829 22.8281 7.8047C22.8516 9.289 22.8594 10.7734 22.8516 12.2578C21.1953 12.2578 19.539 12.2578 17.8828 12.2578C17.875 10.7734 17.8828 9.289 17.9062 7.8047C17.9754 7.23582 18.2644 6.82173 18.7734 6.56251C18.9778 6.48831 19.181 6.43361 19.3828 6.39845ZM0.632812 12.9141C2.64844 12.9141 4.66406 12.9141 6.67969 12.9141C6.68747 13.1334 6.67964 13.3521 6.65625 13.5703C6.59934 13.6429 6.52903 13.6976 6.44531 13.7344C4.58594 13.7657 2.72656 13.7657 0.867188 13.7344C0.783469 13.6976 0.713156 13.6429 0.65625 13.5703C0.63285 13.3521 0.625041 13.1334 0.632812 12.9141ZM8.97656 12.9141C10.9922 12.9141 13.0078 12.9141 15.0234 12.9141C15.0462 13.1578 15.015 13.3922 14.9297 13.6172C14.8751 13.668 14.8126 13.7071 14.7422 13.7344C12.8985 13.7657 11.0547 13.7657 9.21094 13.7344C9.10936 13.6953 9.03905 13.625 9 13.5234C8.97661 13.3209 8.96878 13.1178 8.97656 12.9141ZM17.3672 12.9141C19.3984 12.9141 21.4297 12.9141 23.4609 12.9141C23.534 13.2677 23.4246 13.5412 23.1328 13.7344C21.3047 13.7657 19.4766 13.7657 17.6484 13.7344C17.5341 13.6981 17.4481 13.6278 17.3906 13.5234C17.3672 13.3209 17.3594 13.1178 17.3672 12.9141ZM7.24219 13.6172C7.6185 13.6017 7.9935 13.6173 8.36719 13.6641C8.45138 14.0217 8.67014 14.2482 9.02344 14.3438C9.72637 14.3672 10.4295 14.375 11.1328 14.3672C11.1328 15.4297 11.1328 16.4922 11.1328 17.5547C8.91408 17.5547 6.6953 17.5547 4.47656 17.5547C4.47656 16.4922 4.47656 15.4297 4.47656 14.3672C5.17987 14.375 5.883 14.3672 6.58594 14.3438C6.92883 14.2119 7.14759 13.9697 7.24219 13.6172ZM15.6328 13.6172C16.0078 13.6172 16.3828 13.6172 16.7578 13.6172C16.8187 13.9985 17.0374 14.2407 17.4141 14.3438C18.1014 14.3672 18.7889 14.375 19.4766 14.3672C19.4766 15.4297 19.4766 16.4922 19.4766 17.5547C17.2734 17.5547 15.0703 17.5547 12.8672 17.5547C12.8672 16.4922 12.8672 15.4297 12.8672 14.3672C13.5548 14.375 14.2424 14.3672 14.9297 14.3438C15.2996 14.2316 15.534 13.9895 15.6328 13.6172ZM3.39844 14.3672C3.55469 14.3672 3.71094 14.3672 3.86719 14.3672C3.86719 15.4297 3.86719 16.4922 3.86719 17.5547C3.71094 17.5547 3.55469 17.5547 3.39844 17.5547C3.39844 16.4922 3.39844 15.4297 3.39844 14.3672ZM11.7891 14.3672C11.9297 14.3672 12.0703 14.3672 12.2109 14.3672C12.2109 15.4297 12.2109 16.4922 12.2109 17.5547C12.0703 17.5547 11.9297 17.5547 11.7891 17.5547C11.7891 16.4922 11.7891 15.4297 11.7891 14.3672ZM20.1328 14.3672C20.289 14.3672 20.4453 14.3672 20.6016 14.3672C20.6016 15.4297 20.6016 16.4922 20.6016 17.5547C20.4453 17.5547 20.289 17.5547 20.1328 17.5547C20.1328 16.4922 20.1328 15.4297 20.1328 14.3672Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_966_3515">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="justify-center text-text text-[10px] sm:text-xs font-medium">
                  المقاعد المتبقية: 5
                </div>
              </div>
            </div>

            <div className="text-black self-stretch inline-flex justify-between items-center gap-2">
              <div className="h-8 sm:h-9 flex justify-start items-center gap-1 flex-1 min-w-0">
                <div className="justify-center text-text text-[9px] sm:text-[10px] font-medium">
                  التقيمات :
                </div>
                <div className="flex justify-start items-center gap-0.5">
                  <div className="justify-center text-text text-[9px] sm:text-[10px] font-medium">
                    4.5
                  </div>
                  <div className="w-3 h-3 relative overflow-hidden">
                    <RatingStarIcon />
                  </div>
                </div>
                <div className="justify-center text-text text-[9px] sm:text-[10px] font-medium">
                  (32 تقييمًا)
                </div>
              </div>
              <div className="flex justify-start items-center gap-[5px] flex-shrink-0">
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 relative rounded-xl"
                  src={payload?.teacher?.image_url || "/images/image-24.png"}
                  alt={payload?.teacher?.name}
                />
                <div className="justify-center text-text text-[9px] sm:text-[10px] font-medium truncate">
                  المدرس: {payload?.teacher?.name}
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch px-2 sm:px-3 inline-flex justify-start items-center gap-4 sm:gap-8">
            <div className="flex justify-start items-center gap-2">
              <div className="group cursor-pointer transition-all w-12 sm:w-16 inline-flex flex-col justify-start items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 p-px transition-all bg-slate-300/20 rounded-[8px] sm:rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-500 group-hover:outline-secondary inline-flex justify-center items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 relative overflow-hidden">
                    <FileTextIcon
                      className={
                        "stroke-[#2D2D2D] transition-all group-hover:stroke-secondary"
                      }
                    />
                  </div>
                </div>
                <div className="self-stretch text-center justify-center text-text group-hover:text-secondary text-[9px] sm:text-[10px] font-normal">
                  جدول الدورة
                </div>
              </div>
              <div className="group cursor-pointer w-12 sm:w-16 inline-flex flex-col justify-start items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 p-px bg-slate-300/20 rounded-[8px] sm:rounded-[10px] outline outline-1 group-hover:outline-secondary outline-offset-[-1px] outline-zinc-500 inline-flex justify-center items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 relative overflow-hidden">
                    <ShareIcon
                      className={
                        "stroke-[#2D2D2D] transition-all group-hover:stroke-secondary"
                      }
                    />
                  </div>
                </div>
                <div className="self-stretch group-hover:text-secondary text-center justify-center text-text text-[9px] sm:text-[10px] font-normal">
                  مشاركة
                </div>
              </div>
            </div>
            <Button />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseCard;

export const MobileCourseCard = ({ freeWidth }) => {
  const courseData = {
    badge: "طالبات",
    title: "دورة مهارات التعامل مع اختبار القدرات العامة",
    category: "مهارات التعليم والتدريس",
    remainingSeats: 5,
    lessonsCount: 12,
    rating: 4.5,
    instructorName: "جون سميث",
    instructorImage: "/image-24.png",
  };

  const width = freeWidth ? "w-full" : "w-[351px]";

  return (
    <article
      className={`flex flex-col ${width} items-start gap-2 pt-0 pb-2 px-0 relative bg-white rounded-[20px] overflow-hidden border-2 border-solid border-variable-collection-stroke`}
    >
      <header
        style={{
          backgroundImage: `url('${"/images/teacher-course-banner.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative self-stretch w-full h-[100px] bg-[linear-gradient(0deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.25)_100%)]"
      >
        <span
          className="inline-flex items-center justify-center gap-2.5 px-4 py-2 absolute top-3 left-3 bg-[#f08b9b] rounded-[10px] border-[none] "
          role="status"
          aria-label={courseData.badge}
        >
          <span className="w-fit  font-normal text-white text-[10px] leading-[12.5px] whitespace-nowrap [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
            {courseData.badge}
          </span>
        </span>
      </header>

      <div className="flex flex-col text-xs font-bold items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-start gap-2.5 px-2 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="flex-1 font-cairo-bold-xs font-[number:var(--cairo-bold-xs-font-weight)] text-text text-[length:var(--cairo-bold-xs-font-size)] leading-[var(--cairo-bold-xs-line-height)] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[var(--cairo-bold-xs-letter-spacing)] [font-style:var(--cairo-bold-xs-font-style)]">
            {courseData.title}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-3 px-0 py-3 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center justify-start gap-6 px-2 py-0 relative self-stretch w-full flex-[0_0_auto]">
            <span className="inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] bg-[#c2d8fc] rounded-[10px]">
              <span className="w-[99px]  font-normal text-text text-[10px] text-left leading-[12.5px] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                {courseData.category}
              </span>
            </span>
          </div>

          <div className="flex items-start justify-between px-2 py-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-normal text-primary text-[10px] text-left tracking-[0] leading-[12.5px] whitespace-nowrap [direction:rtl]">
                الدروس : {courseData.lessonsCount}
              </span>
            </div>
            <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-normal text-primary text-[10px] text-left tracking-[0] leading-[12.5px] whitespace-nowrap [direction:rtl]">
                المقاعد المتبقية: {courseData.remainingSeats}
              </span>
            </div>
          </div>

          <footer className="flex items-center justify-between pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-variable-collection-stroke">
            <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
              <img
                className="relative w-4 h-4 rounded-xl bg-cover bg-[50%_50%]"
                src={"/images/Image-48.png"}
                alt={courseData.instructorName}
              />
              <span className="w-fit [font-family:'Cairo-Medium',Helvetica] font-medium text-text text-[10px] text-left leading-[normal] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                المدرس: {courseData.instructorName}
              </span>
            </div>
            <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
              <div
                className="inline-flex items-center gap-0.5 relative flex-[0_0_auto]"
                role="img"
                aria-label={`تقييم ${courseData.rating} من 5`}
              >
                <span className="w-fit [font-family:'Cairo-Medium',Helvetica] font-medium text-text text-[10px] leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                  {courseData.rating}
                </span>
                <RatingStarIcon />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
};

const FavIcon = ({ isFav = false, onClick = () => null }) => {
  return (
    <div
      onClick={onClick}
      className={`w-7 h-7 sm:w-8 sm:h-8 relative z-40 cursor-pointer ${
        isFav ? "bg-secondary" : "border border-white"
      } rounded-[8px] sm:rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-all duration-200`}
    >
      <svg
        width={16}
        height={14}
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white w-4 h-4 sm:w-[18px] sm:h-4"
      >
        <path d="M9 16C8.79 16 8.5764 15.9623 8.3592 15.8868C8.142 15.8114 7.9506 15.6907 7.785 15.5248L6.2325 14.099C4.6425 12.6355 3.2061 11.1836 1.9233 9.74303C0.6405 8.3025 -0.000599579 6.71442 4.20757e-07 4.97878C4.20757e-07 3.56058 0.472501 2.37624 1.4175 1.42574C2.3625 0.475247 3.54 0 4.95 0C5.745 0 6.495 0.16958 7.2 0.508741C7.905 0.847902 8.505 1.31198 9 1.90099C9.495 1.31259 10.095 0.848807 10.8 0.509646C11.505 0.170486 12.255 0.000603489 13.05 0C14.46 0 15.6375 0.475247 16.5825 1.42574C17.5275 2.37624 18 3.56058 18 4.97878C18 6.71381 17.3625 8.30552 16.0875 9.75389C14.8125 11.2023 13.365 12.6582 11.745 14.1216L10.215 15.5248C10.05 15.6907 9.8589 15.8114 9.6417 15.8868C9.4245 15.9623 9.2106 16 9 16Z" />
      </svg>
    </div>
  );
};
