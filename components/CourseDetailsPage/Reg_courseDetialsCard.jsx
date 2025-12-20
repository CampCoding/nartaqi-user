"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
  CertificationIcon,
  ShareIcon,
} from "../../public/svgs";
import Link from "next/link";
import { message } from "antd";
import { useSelector } from "react-redux";
import useRedirect from "../../components/shared/Hooks/useRedirect";
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

  const redirect = useRedirect();
  const { token } = useSelector((state) => state.auth);
  const { mutate } = useHandleFavoriteActions();

  const [isFavorite, setIsFavorite] = useState(!!isInFavorites);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsFavorite(!!isInFavorites);
  }, [isInFavorites]);

  const ratingValue = useMemo(() => {
    if (!roundRate || roundRate.length === 0) return "0.0";
    const sum = roundRate.reduce((acc, curr) => acc + Number(curr.rate || 0), 0);
    return (sum / roundRate.length).toFixed(1);
  }, [roundRate]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "غير محدد";
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleAddToFavorite = useCallback(
    (id) => {
      try {
        const mustLogin = redirect({
          token,
          payload: {
            id,
            type: "favorite",
            link: typeof window !== "undefined" ? window.location.pathname : "/",
          },
        });

        if (!mustLogin) return;

        // optimistic
        setIsFavorite((prev) => !prev);
        setIsUpdating(true);

        mutate(
          { id, payload: { round_id: id } },
          {
            onSuccess: () => {
              onToggleFavorite?.();
            },
            onError: () => {
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
        setIsFavorite((prev) => !prev);
        setIsUpdating(false);
        messageApi.open({
          type: "error",
          content: "حدث خطأ في العملية",
          duration: 3,
        });
      }
    },
    [mutate, redirect, token, onToggleFavorite, messageApi]
  );

  const roundId = round?.id || courseData?.id;

  return (
    <div className="overflow-hidden w-full bg-white rounded-[22px] sm:rounded-[28px] lg:rounded-[34px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.14)] sm:shadow-[0px_6px_25px_0px_rgba(0,0,0,0.22)]">
      {/* inner padding */}
      <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-4 sm:pb-5">
        {/* Cover */}
        <div
          className="w-full h-40 sm:h-48 lg:h-56 relative bg-black/20 rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden"
          style={{
            backgroundImage: `url('${round.image_url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b to-black/45 via-black/20 from-transparent" />

          {/* Share + Fav */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2 sm:gap-2.5">
            <FavIconButton
              isFav={isFavorite}
              isLoading={isUpdating}
              onClick={() => handleAddToFavorite(roundId)}
            />

            <button
              type="button"
              onClick={() => onShare?.(true)}
              className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 cursor-pointer active:scale-90"
              aria-label="مشاركة الدورة"
            >
              <ShareIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white stroke-white" />
            </button>
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 sm:mt-5">
          {/* Dates */}
          <div className="w-full pb-3 sm:pb-3.5 border-b-2 border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-4">
            <div className="flex w-full sm:w-[200px] items-center gap-2">
              <CalenderStartIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="text-text text-xs sm:text-[13px] font-medium leading-relaxed line-clamp-1">
                تاريخ البداية : {formatDate(round.start_date)}
              </div>
            </div>

            <div className="flex w-full sm:w-[200px] items-center gap-2">
              <CalenderEndIcon className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="text-text text-xs sm:text-[13px] font-medium leading-relaxed line-clamp-1">
                تاريخ الإنتهاء : {formatDate(round.end_date)}
              </div>
            </div>
          </div>

          {/* Seats + Rating */}
          <div className="w-full py-3 sm:py-3.5 border-b-2 border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-4">
            <div className="flex w-full sm:w-[200px] items-center gap-2">
              <SeatsIcon className="w-5 h-5 flex-shrink-0" />
              <div className="text-text text-xs sm:text-[13px] font-medium leading-relaxed line-clamp-1">
                المقاعد المتبقية: {round.capacity || "غير محدد"}
              </div>
            </div>

            <div className="flex w-full sm:w-[200px] items-center gap-2">
              <RatingLike className="w-5 h-5 flex-shrink-0" />
              <div className="flex items-center text-xs sm:text-[13px] font-medium gap-1">
                التقييم :
                <span className="flex items-center gap-1">
                  <span>{ratingValue}</span>
                  <RatingStarIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hours / Days */}
        <div className="flex items-center justify-center relative py-4 sm:py-5">
          <div className="w-7 h-7 lg:w-8 lg:h-8 absolute right-3 sm:right-4 lg:right-5 aspect-[1]">
            <CycleClock className="w-full h-full" />
          </div>

          <div className="relative w-full max-w-[300px] flex justify-around items-center">
            <div className="inline-flex flex-col items-center gap-1.5">
              <div className="font-bold text-text text-sm">الساعات</div>
              <div className="font-bold text-primary text-sm text-center">
                {round.total_hours || "غير محدد"}
              </div>
            </div>

            <div className="inline-flex flex-col items-center gap-1.5">
              <div className="font-bold text-text text-sm">الأيام</div>
              <div className="font-bold text-primary text-sm text-center">
                {round.total_days || "غير محدد"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate CTA */}
      <div className="relative bg-white w-full pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-5 lg:px-6 pb-6 sm:pb-7 lg:pb-8 min-h-[175px] sm:min-h-[190px] border-t-4 [border-top-style:solid] border-variable-collection-stroke">
        {isDone !== "true" && (
          <p className="mb-4 font-medium text-danger text-xs sm:text-sm flex items-center justify-center text-center leading-relaxed">
            أكمل الدورة حتى تتمكن من تسجيل بيانات الشهادة
          </p>
        )}

        <Link
          onClick={(e) => isDone !== "true" && e.preventDefault()}
          href={isDone === "true" ? "/register-certificate" : "#"}
          className={[
            "flex w-full justify-center items-center gap-3",
            "px-5 sm:px-6 py-3 sm:py-3.5",
            "rounded-[14px] sm:rounded-[16px] lg:rounded-[18px]",
            isDone === "true"
              ? "bg-primary hover:opacity-95"
              : "bg-[#71717A] cursor-not-allowed",
            "transition-opacity",
          ].join(" ")}
        >
          <CertificationIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="font-bold text-white text-sm sm:text-[15px] text-center">
            تسجيل بيانات الشهادة
          </span>
        </Link>
      </div>

      {contextHolder}
    </div>
  );
};

// ✅ Fav icon button (same design, but semantic button + sizes tuned)
const FavIconButton = ({
  isFav = false,
  onClick = () => null,
  isLoading = false,
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) onClick();
      }}
      aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      className={[
        "w-9 h-9 sm:w-10 sm:h-10",
        "relative z-40",
        "rounded-[10px]",
        "inline-flex justify-center items-center overflow-hidden",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        isFav
          ? "bg-secondary"
          : "bg-black/30 backdrop-blur-sm border border-white/50",
        isLoading ? "opacity-70 pointer-events-none" : "",
      ].join(" ")}
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
          className={[
            "w-[18px] h-4",
            "transition-all duration-300",
            isFav ? "fill-white scale-110" : "fill-white",
          ].join(" ")}
        >
          <path
            d="M9 16C8.79 16 8.5764 15.9623 8.3592 15.8868C8.142 15.8114 7.9506 15.6907 7.785 15.5248L6.2325 14.099C4.6425 12.6355 3.2061 11.1836 1.9233 9.74303C0.6405 8.3025 -0.000599579 6.71442 4.20757e-07 4.97878C4.20757e-07 3.56058 0.472501 2.37624 1.4175 1.42574C2.3625 0.475247 3.54 0 4.95 0C5.745 0 6.495 0.16958 7.2 0.508741C7.905 0.847902 8.505 1.31198 9 1.90099C9.495 1.31259 10.095 0.848807 10.8 0.509646C11.505 0.170486 12.255 0.000603489 13.05 0C14.46 0 15.6375 0.475247 16.5825 1.42574C17.5275 2.37624 18 3.56058 18 4.97878C18 6.71381 17.3625 8.30552 16.0875 9.75389C14.8125 11.2023 13.365 12.6582 11.745 14.1216L10.215 15.5248C10.05 15.6907 9.8589 15.8114 9.6417 15.8868C9.4245 15.9623 9.2106 16 9 16Z"
            className={isFav ? "" : "opacity-80"}
          />
        </svg>
      )}
    </button>
  );
};

export default RegCourseDetailsCard;
