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
} from "../../public/svgs";

const CourseDetailsCard = () => {
  return (
    <div className="w-[502px] px-[26px] pt-[32px]  relative bg-white rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <div
        className="w-full  h-72 relative bg-black/20 rounded-[40px] overflow-hidden"
        style={{
          backgroundImage: `url('${"/images/Frame 1000004932.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/40 via-black/20 from-transparent"></div>

        <div className="w-16 left-[193px] top-[111px] absolute inline-flex flex-col justify-start items-center gap-2">
          <div className="self-stretch p-5 bg-secondary rounded-[100px] shadow-[0px_0px_50px_0px_rgba(249,115,22,1.00)] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="w-6 h-6 relative flex justify-center items-center">
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
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className=" inline-flex flex-col justify-start w-full mt-[24px] mb-[35px] ">
        <div className="  w-full pb-[16px] border-b-2 border-zinc-100 inline-flex  justify-between items-center">
          <div className="flex justify-start w-[202px] items-center gap-2">
            <CalenderStartIcon />
            <div className="justify-center text-text text-sm font-medium ">
              تاريخ البداية : 15 فبراير 2026{" "}
            </div>
          </div>

          <div className="flex justify-start w-[202px] items-center gap-2">
            <CalenderEndIcon />
            <div className="justify-center text-text text-sm font-medium ">
              تاريخ الإنتهاء : 15 مايو 2026{" "}
            </div>
          </div>
        </div>
        <div className="  w-full py-[16px] border-b-2 border-zinc-100 inline-flex  justify-between items-center">
          <div className="flex justify-start w-[202px] items-center gap-2">
            <GenderIcon />
            <div className="justify-center text-text text-sm font-medium ">
              النوع : معلمين
            </div>
          </div>

          <div className="flex justify-start w-[202px] items-center gap-2">
            <SeatsIcon />
            <div className="justify-center text-text text-sm font-medium ">
              المقاعد المتبقية: 5{" "}
            </div>
          </div>
        </div>
        <div className="  w-full pt-[16px] border-b-2 border-zinc-100 inline-flex  justify-between items-center">
          <div className="flex justify-start w-[202px] items-center gap-2">
            <CycleClock />
            <div className="inline-flex justify-start items-center gap-4">
              <div className="text-right justify-center text-text text-sm font-medium ">
                الساعات : 15
              </div>
              <div className="text-right justify-center text-text text-sm font-medium ">
                الأيام : 5
              </div>
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

      <div className="pt-[16px] pb-[68px] ">
        <div className="self-stretch inline-flex justify-end items-center gap-4">
          <div className="justify-center text-primary text-3xl font-bold ">
            95 ر.س
          </div>
          <div className="justify-center text-text text-base font-medium ">
            (شاملة كتاب الدوره بصيغة PDF)
          </div>
        </div>

        <div className=" mt-[16px] mb-[20px] self-stretch w-full inline-flex justify-end items-center gap-6 ">
          <div className="flex-1 px-2.5 py-4 bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-secondary flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-secondary text-base font-bold ">
              أضف الي السله
            </div>
          </div>
          <div
            data-property-1="false"
            className="w-14 h-14 p-2 flex justify-center items-center relative bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-secondary inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden"
          >
            <CourseHeartIcon />
          </div>
        </div>
        <button
          type="button"
          className="self-stretch w-full px-2.5 py-4 bg-secondary rounded-[20px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 hover:bg-secondary-warm focus:bg-primary group"
        >
          <span className="text-center justify-center text-slate-200 text-base font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
            اشترك الأن
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
