import React from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
  CourseHeartIcon,
  CertificationIcon,
} from "../../public/svgs";
import Link from "next/link";

const RegCourseDetailsCard = ({ isDone }) => {
  return (
    <div className="w-full  px-5 pt-6 relative bg-white rounded-[36px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <div
        className="w-full h-60 relative bg-black/20 rounded-[28px] overflow-hidden"
        style={{
          backgroundImage: `url('${"/images/Frame 1000004932.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/40 via-black/20 from-transparent"></div>
        <div
          href={"/course-preview/123"}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-4 bg-secondary rounded-full shadow-[0px_0px_40px_0px_rgba(249,115,22,1)] inline-flex justify-center items-center overflow-hidden">
            <div className="w-5 h-5 relative flex justify-center items-center">
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5241 15.2741C1.85783 15.6841 1 15.2048 1 14.4224L1 2.00157C1 1.21925 1.85783 0.739905 2.5241 1.14992L12.6161 7.36032C13.2506 7.75082 13.2506 8.67321 12.6161 9.06371L2.5241 15.2741Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col justify-start w-full mt-5 mb-7">
        <div className="w-full pb-3.5 border-b-2 border-zinc-100 inline-flex justify-between items-center">
          <div className="flex justify-start w-[200px] items-center gap-2">
            <CalenderStartIcon />
            <div className="justify-center text-text text-sm font-medium">
              تاريخ البداية : 15 فبراير 2026
            </div>
          </div>

          <div className="flex justify-start w-[200px] items-center gap-2">
            <CalenderEndIcon />
            <div className="justify-center text-text text-sm font-medium">
              تاريخ الإنتهاء : 15 مايو 2026
            </div>
          </div>
        </div>

        <div className="  w-full pt-[16px] border-b-2 border-zinc-100 inline-flex  justify-between items-center">
          <div className="flex justify-start w-[202px] items-center gap-2">
            <SeatsIcon />
            <div className="justify-center text-text text-sm font-medium ">
              المقاعد المتبقية: 5{" "}
            </div>
          </div>

          <div className="  flex justify-start w-[202px] items-center gap-2">
            <RatingLike />
            <div className="flex items-center gap-1">
              التقييم :{" "}
              <div className="flex items-center gap-1">
                <div>4.5</div>
                <div>
                  <RatingStarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center relative py-4">
        <div className=" w-8 h-8 absolute right-6 aspect-[1]">
          <CycleClock />
        </div>
        <div className="relative w-[253px] h-[104px]">
          <div className="inline-flex flex-col items-center gap-3 absolute top-0 left-0">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold  text-text text-xl tracking-[0] leading-[normal] ">
              الساعات
            </div>

            <div className="relative flex items-center justify-center w-fit  font-bold text-primary text-xl text-center tracking-[0] leading-[normal]">
              15
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-3 absolute top-0 left-[196px]">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-text text-xl tracking-[0] leading-[normal] ">
              الأيام
            </div>

            <div className="relative flex items-center justify-center w-fit  font-bold text-primary text-xl text-center tracking-[0] leading-[normal]">
              05
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white   w-full pt-[45px] px-2 pb-[38px] h-[210px] border-t-4  [border-top-style:solid] border-variable-collection-stroke ">
        {!(isDone == "true") && (
          <p className="absolute   top-[calc(50.00%_+_43px)] left-[calc(50.00%_-_164px)] h-[30px]  font-medium text-danger text-base flex items-center justify-center text-center tracking-[0] leading-[normal] ">
            أكمل الدورة حتى تتمكن من تسجيل بيانات الشهادة
          </p>
        )}

        <Link
          onClick={(e) => isDone != "true" && e.preventDefault()}
          href={isDone == "true" ? "/register-certificate" : "#"}
          className={`flex w-full justify-center px-6 py-4  ${
            isDone == "true" ? "bg-primary" : "bg-[#71717A] cursor-not-allowed"
          }  rounded-[20px] items-center gap-6`}
        >
          <div className="inline-flex relative flex-[0_0_auto] items-center gap-6">
            <CertificationIcon />
            <div className="relative w-fit mt-[-1.00px]  font-bold text-white text-xl flex items-center justify-center text-center tracking-[0] leading-[normal] ">
              تسجيل بيانات الشهادة
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegCourseDetailsCard;
