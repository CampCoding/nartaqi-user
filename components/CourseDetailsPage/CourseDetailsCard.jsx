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
import Link from "next/link";

const CourseDetailsCard = ({ courseData, onToggleFavorite }) => {
  const { round } = courseData;

  // حساب متوسط التقييم
  const calculateRating = () => {
    const rates = courseData.roundRate || [];
    if (rates.length === 0) return 0;
    const sum = rates.reduce((acc, curr) => acc + curr.rate, 0);
    return (sum / rates.length).toFixed(1);
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Gender mapping
  const genderMap = {
    male: "معلمين",
    female: "معلمات",
    both: "الجميع",
  };

  return (
    <div className="w-full max-w-[460px] px-5 pt-6 relative bg-white rounded-[36px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <div
        className="w-full h-60 relative bg-black/20 rounded-[28px] overflow-hidden"
        style={{
          backgroundImage: `url('${round.image_url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/40 via-black/20 from-transparent"></div>

        <Link
          href={`/course-preview/${round.id}`}
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
        </Link>
      </div>

      <div className="inline-flex flex-col justify-start w-full mt-5 mb-7">
        <div className="w-full pb-3.5 border-b-2 border-zinc-100 inline-flex justify-between items-center">
          <div className="flex justify-start w-[200px] items-center gap-2">
            <CalenderStartIcon />
            <div className="justify-center text-text text-sm font-medium">
              تاريخ البداية : {formatDate(round.start_date)}
            </div>
          </div>

          <div className="flex justify-start w-[200px] items-center gap-2">
            <CalenderEndIcon />
            <div className="justify-center text-text text-sm font-medium">
              تاريخ الإنتهاء : {formatDate(round.end_date)}
            </div>
          </div>
        </div>

        <div className="w-full py-3.5 border-b-2 border-zinc-100 inline-flex justify-between items-center">
          <div className="flex justify-start w-[200px] items-center gap-2">
            <GenderIcon />
            <div className="justify-center text-text text-sm font-medium">
              النوع : غير محدد
            </div>
          </div>

          <div className="flex justify-start w-[200px] items-center gap-2">
            <SeatsIcon />
            <div className="justify-center text-text text-sm font-medium">
              المقاعد المتبقية: {"غير محدد"}
            </div>
          </div>
        </div>

        <div className="w-full pt-3.5 border-b-2 border-zinc-100 inline-flex justify-between items-center">
          <div className="flex justify-start w-[200px] items-center gap-2">
            <CycleClock />
            <div className="inline-flex justify-start items-center gap-4">
              <div className="text-right justify-center text-text text-sm font-medium">
                الساعات : {"غير محدد"}
              </div>
              <div className="text-right justify-center text-text text-sm font-medium">
                الأيام : غير محدد
              </div>
            </div>
          </div>

          <div className="flex justify-start w-[200px] items-center gap-2">
            <RatingLike />
            <div className="flex items-center gap-1">
              التقييم :
              <div className="flex items-center gap-1">
                <div>{calculateRating()}</div>
                <div>
                  <RatingStarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-12">
        <div className="justify-center text-text-alt line-through decoration-red-600 text-lg font-bold">
          120 ر.س
        </div>{" "}
        <div className="self-stretch inline-flex justify-end items-end gap-4">
          <div>
            <div className="justify-center text-primary text-2xl font-bold">
              {round.price} ر.س
            </div>
          </div>
          <div className="justify-center text-text text-sm font-medium">
            (شاملة كتاب الدورة بصيغة PDF)
          </div>
        </div>
        <div className="mt-4 mb-5 w-full inline-flex justify-end items-center gap-4">
          <button
            type="button"
            className="flex-1 px-3.5 py-3 bg-white rounded-[16px] outline outline-1 outline-offset-[-1px] outline-secondary flex justify-center items-center"
          >
            <span className="text-center justify-center text-secondary text-sm font-bold">
              أضف الي السلة
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleFavorite}
            className="w-12 h-12 p-2 flex justify-center items-center bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-secondary"
          >
            <CourseHeartIcon fill={round.fav ? "#F97316" : "none"} />
          </button>
        </div>
        <button
          type="button"
          className="w-full px-3.5 py-3.5 bg-secondary rounded-[16px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 hover:bg-secondary-warm focus:bg-primary group"
        >
          <span className="text-center justify-center text-slate-200 text-sm font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
            اشترك الأن
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
