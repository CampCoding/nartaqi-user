import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import useRedirect from "../../components/shared/Hooks/useRedirect";
// import { saveContent } from "../../utils/Store/Slices/redirectSlice";
import useHandleFavoriteActions from "../../components/shared/Hooks/useHandleFavoriteActions";

const RegCourseDetailsCard = ({
  courseData,
  isDone,
  onShare,
  onToggleFavorite,
  isInFavorites,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { round, roundRate } = courseData;

  // Hooks
  const redirect = useRedirect();
  const { token } = useSelector((state) => state.auth);
  const { mutate, error, isLoading, data, isError } =
    useHandleFavoriteActions();

  // Local state for optimistic updates
  const [isFavorite, setIsFavorite] = useState(isInFavorites);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync with props when they change
  useEffect(() => {
    setIsFavorite(isInFavorites);
  }, [isInFavorites]);

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

  const handleAddToFavorite = async (id) => {
    try {
      const mustLogin = redirect({
        token,
        // action: saveContent,
        payload: {
          id,
          type: "favorite",
          link: window.location.pathname,
        },
      });

      if (!mustLogin) return;

      // Optimistic update - update UI immediately
      setIsFavorite((prev) => !prev);
      setIsUpdating(true);

      const requestPayload = {
        round_id: id,
      };

      mutate(
        { id, payload: requestPayload },
        {
          onSuccess: () => {
            // messageApi.open({
            //   type: "success",
            //   content: !isFavorite
            //     ? "تم إضافة الدورة إلى المفضلة"
            //     : "تم إزالة الدورة من المفضلة",
            //   duration: 3,
            // });

            // Call parent's toggle function if provided
            if (onToggleFavorite) {
              onToggleFavorite();
            }
          },
          onError: () => {
            // Revert on error
            setIsFavorite((prev) => !prev);
            messageApi.open({
              type: "error",
              content: "حدث خطأ في العملية",
              duration: 3,
            });
          },
          onSettled: () => {
            setIsUpdating(false);
          },
        }
      );
    } catch (error) {
      console.log(error);
      // Revert on error
      setIsFavorite((prev) => !prev);
      setIsUpdating(false);
      messageApi.open({
        type: "error",
        content: "حدث خطأ في العملية",
        duration: 3,
      });
    }
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
          <FavIconButton
            isFav={isFavorite}
            isLoading={isUpdating}
            onClick={() => handleAddToFavorite(round?.id || courseData?.id)}
          />
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

// Reusable FavIconButton component (matching CourseCard design)
const FavIconButton = ({
  isFav = false,
  onClick = () => null,
  isLoading = false,
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) {
          onClick();
        }
      }}
      className={`w-8 h-8 relative z-40 cursor-pointer ${
        isFav
          ? "bg-secondary"
          : "bg-black/30 backdrop-blur-sm border border-white/50"
      } rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 ${
        isLoading ? "opacity-70 pointer-events-none" : ""
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg
          width={18}
          height={16}
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-[18px] h-4 transition-all duration-300 ${
            isFav ? "fill-white scale-110" : "fill-white"
          }`}
        >
          <path
            d="M9 16C8.79 16 8.5764 15.9623 8.3592 15.8868C8.142 15.8114 7.9506 15.6907 7.785 15.5248L6.2325 14.099C4.6425 12.6355 3.2061 11.1836 1.9233 9.74303C0.6405 8.3025 -0.000599579 6.71442 4.20757e-07 4.97878C4.20757e-07 3.56058 0.472501 2.37624 1.4175 1.42574C2.3625 0.475247 3.54 0 4.95 0C5.745 0 6.495 0.16958 7.2 0.508741C7.905 0.847902 8.505 1.31198 9 1.90099C9.495 1.31259 10.095 0.848807 10.8 0.509646C11.505 0.170486 12.255 0.000603489 13.05 0C14.46 0 15.6375 0.475247 16.5825 1.42574C17.5275 2.37624 18 3.56058 18 4.97878C18 6.71381 17.3625 8.30552 16.0875 9.75389C14.8125 11.2023 13.365 12.6582 11.745 14.1216L10.215 15.5248C10.05 15.6907 9.8589 15.8114 9.6417 15.8868C9.4245 15.9623 9.2106 16 9 16Z"
            className={isFav ? "" : "opacity-80"}
          />
        </svg>
      )}
    </div>
  );
};

export default RegCourseDetailsCard;
