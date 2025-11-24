import React from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
  CertificationIcon,
  ShareIcon,
  HeartIcon,
  HeartFillIcon,
} from "../../public/svgs";
import Link from "next/link";
import { message } from "antd";

const RegCourseDetailsCard = ({
  courseData,
  isDone,
  onShare,
  onToggleFavorite,
  isInFavorites,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { round, roundRate } = courseData;

  // حساب التقييم
  const calculateRating = () => {
    if (!roundRate || roundRate.length === 0) return "0";
    const sum = roundRate.reduce((acc, curr) => acc + curr.rate, 0);
    return (sum / roundRate.length).toFixed(1);
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleToggleFavorite = () => {
    onToggleFavorite();
    messageApi.open({
      type: "success",
      content: !isInFavorites
        ? "تم إضافة الدورة إلى المفضلة"
        : "تم إزالة الدورة من المفضلة",
      duration: 3,
    });
  };

  return (
    <div className="w-full px-5 pt-6 bg-white rounded-[36px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)]">
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

        {/* Share and Favorite Icons */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button
            onClick={handleToggleFavorite}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 cursor-pointer active:scale-90"
            aria-label="Add to favorites"
          >
            {isInFavorites ? (
              <HeartFillIcon className="w-5 h-5 text-white fill-white" />
            ) : (
              <HeartIcon className="w-5 h-5 text-white fill-white" />
            )}
          </button>
          <button
            onClick={() => onShare(true)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 cursor-pointer active:scale-90"
            aria-label="Share course"
          >
            <ShareIcon className="w-5 h-5 text-white stroke-white" />
          </button>
        </div>
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

        <div className="w-full pt-[16px] border-b-2 border-zinc-100 inline-flex justify-between items-center">
          <div className="flex justify-start w-[202px] items-center gap-2">
            <SeatsIcon />
            <div className="justify-center text-text text-sm font-medium">
              المقاعد المتبقية: {round.capacity || "غير محدد"}
            </div>
          </div>

          <div className="flex justify-start w-[202px] items-center gap-2">
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

      <div className="flex items-center justify-center relative py-4">
        <div className="w-8 h-8 absolute right-6 aspect-[1]">
          <CycleClock />
        </div>
        <div className="relative w-[253px] h-[104px]">
          <div className="inline-flex flex-col items-center gap-3 absolute top-0 left-0">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-text text-xl tracking-[0] leading-[normal]">
              الساعات
            </div>
            <div className="relative flex items-center justify-center w-fit font-bold text-primary text-xl text-center tracking-[0] leading-[normal]">
              {round.total_hours || "غير محدد"}
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-3 absolute top-0 left-[196px]">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-text text-xl tracking-[0] leading-[normal]">
              الأيام
            </div>
            <div className="relative flex items-center justify-center w-fit font-bold text-primary text-xl text-center tracking-[0] leading-[normal]">
              {round.total_days || "غير محدد"}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white w-full pt-[45px] px-2 pb-[38px] h-[210px] border-t-4 [border-top-style:solid] border-variable-collection-stroke">
        {!(isDone === "true") && (
          <p className="absolute top-[calc(50.00%_+_43px)] left-[calc(50.00%_-_164px)] h-[30px] font-medium text-danger text-base flex items-center justify-center text-center tracking-[0] leading-[normal]">
            أكمل الدورة حتى تتمكن من تسجيل بيانات الشهادة
          </p>
        )}

        <Link
          onClick={(e) => isDone !== "true" && e.preventDefault()}
          href={isDone === "true" ? "/register-certificate" : "#"}
          className={`flex w-full justify-center px-6 py-4 ${
            isDone === "true" ? "bg-primary" : "bg-[#71717A] cursor-not-allowed"
          } rounded-[20px] items-center gap-6`}
        >
          <div className="inline-flex relative flex-[0_0_auto] items-center gap-6">
            <CertificationIcon />
            <div className="relative w-fit mt-[-1.00px] font-bold text-white text-xl flex items-center justify-center text-center tracking-[0] leading-[normal]">
              تسجيل بيانات الشهادة
            </div>
          </div>
        </Link>
      </div>
      {contextHolder}
    </div>
  );
};

export default RegCourseDetailsCard;
