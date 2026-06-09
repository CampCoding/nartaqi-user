"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  CourseCalenderIcon,
  FileTextIcon,
  RatingStarIcon,
  SeatsIcon,
  ShareIcon,
} from "../../../public/svgs";
import Link from "next/link";
import { formatDateBackEnd } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import useRedirect from "../../shared/Hooks/useRedirect";
import { saveContent } from "../../utils/Store/Slices/redirectSlice";
import useHandleFavoriteActions from "../../shared/Hooks/useHandleFavoriteActions";
import { openShare } from "../../utils/Store/Slices/shareSlice";
import cx from "../../../lib/cx";

// helpers
const toBool = (v) => String(v) === "1" || v === true || v === 1;
const toNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// ✅ Helper: check if course has ended
const isCourseEnded = (endDate) => {
  if (!endDate) return false;
  try {
    const end = new Date(endDate);
    const now = new Date();
    end.setHours(23, 59, 59, 999);
    return now > end;
  } catch {
    return false;
  }
};

const CourseCard = ({
  freeWidth = false,
  payload = {},
  type = "0",
  buttonStyle = "normal",
  isRegistered = false,
  isInFav = false,
  onShareClick = () => {},
}) => {
  const redirect = useRedirect();
  const { mutate } = useHandleFavoriteActions();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const width = freeWidth ? "w-full" : "w-full lg:max-w-[351px]";

  // ✅ normalize values coming from backend
  const roundId = payload?.id;
  const isFree = useMemo(() => String(payload?.free) !== "0", [payload?.free]);
  const favFromPayload =
    payload?.favorite ?? payload?.fav ?? payload?.is_favorite;
  const initialFav = useMemo(
    () => toBool(favFromPayload) || !!isInFav,
    [favFromPayload, isInFav]
  );

  // ✅ Check if course has ended
  const courseEnded = useMemo(
    () => isCourseEnded(payload?.end_date),
    [payload?.end_date]
  );

  // ✅ Check if user owns/enrolled in the course
  const userOwnsCourse = useMemo(
    () => toBool(payload?.own) || toBool(payload?.enrolled) || isRegistered,
    [payload?.own, payload?.enrolled, isRegistered]
  );

  // ✅ Show rate button if course ended AND user owns it
  const showRateButton = courseEnded && userOwnsCourse;

  // ✅ Check if user already rated
  const alreadyRated = useMemo(
    () => toBool(payload?.user_rated || payload?.is_rated),
    [payload?.user_rated, payload?.is_rated]
  );

  // Local state for optimistic update
  const [isFavorite, setIsFavorite] = useState(initialFav);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openShareDrawer, setOpenShareDrawer] = useState(false);

  // Sync with payload when it changes
  useEffect(() => {
    setIsFavorite(initialFav);
  }, [initialFav]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    return roundId ? `${origin}/course/${roundId}` : window.location.href;
  }, [roundId]);

  const courseLink = useMemo(() => {
    if (!roundId) return "#";
    if (isRegistered) {
      const done = buttonStyle === "normal" ? "false" : "true";
      return `/course/${roundId}?reg=true&done=${done}`;
    }
    return `/course/${roundId}`;
  }, [roundId, isRegistered, buttonStyle]);

  // ✅ Rate course link
  const rateCourseLink = useMemo(() => {
    if (!roundId) return "#";
    return `/courses/${roundId}/rate-course`;
  }, [roundId]);

  const handleAddToFavorite = async (id) => {
    if (!id) return;
    if (isUpdating) return;

    try {
      const mustLogin = redirect({
        token,
        action: saveContent,
        payload: {
          id,
          type: "favorite",
          link: typeof window !== "undefined" ? window.location.pathname : "/",
        },
      });

      if (!mustLogin) return;

      setIsFavorite((prev) => !prev);
      setIsUpdating(true);

      mutate(
        { id, payload: { round_id: id } },
        {
          onError: () => {
            setIsFavorite((prev) => !prev);
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
    }
  };

  const Button = () => {
    // ✅ Rate Button - يظهر تحت زرار العرض بنفس العرض
    const RateButton = () => {
      if (!showRateButton) return null;

      if (alreadyRated) {
        return (
          <div className="w-full px-3 sm:px-4 py-3 bg-green-50 border border-green-300 rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-green-600 text-xs sm:text-sm font-semibold">
              تم التقييم
            </span>
          </div>
        );
      }

      return (
        <Link
          href={rateCourseLink}
          className="w-full px-3 sm:px-4 py-3 bg-primary  rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <div className="text-white text-xs sm:text-sm font-semibold">
            قيّم الدورة
          </div>
        </Link>
      );
    };

    if (buttonStyle === "normal") {
      return (
        <div className="flex-1 flex flex-col gap-2">
          {/* ✅ View Course Button */}
          <Link
            href={courseLink}
            className="w-full px-3 sm:px-4 py-3 bg-secondary rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2.5 transition-shadow duration-200 hover:shadow-[0_4px_12px_var(--color-secondary,rgba(59,130,246,0.25))]"
          >
            <div className="justify-center text-bg text-xs sm:text-sm font-semibold">
              عرض الدورة
            </div>
          </Link>

          {/* ✅ Rate Button - تحت زرار العرض */}
          <RateButton />
        </div>
      );
    }

    // Gradient style
    return (
      <div className="flex-1 flex flex-col gap-2">
        <Link
          href={courseLink}
          className="w-full self-stretch px-3 sm:px-4 py-3 bg-gradient-to-r from-primary to-secondary rounded-[8px] sm:rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2.5 transition-all duration-200 cursor-pointer hover:from-secondary hover:to-primary hover:scale-105 hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
        >
          <div className="justify-center text-bg text-xs sm:text-sm font-semibold">
            {token && payload?.enrolled ? "ادخل الدورة" : "التحق بالدورة"}
          </div>
        </Link>

        {/* ✅ Rate Button - تحت زرار التحق بالدورة */}
        <RateButton />
      </div>
    );
  };
  const rating = useMemo(() => {
    const n = toNum(payload?.rating, null);
    return n === null ? "-" : n.toFixed(1);
  }, [payload?.rating]);

  const buildShareUrl = () => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    const id = payload?.id;
    return id ? `${origin}/course/${id}` : window.location.href;
  };

  return (
    <Fragment>
      <div
        className={`${width} h-full block rounded-[25px] sm:rounded-[30px] p-[2px] bg-gradient-to-b from-[#3B82F6] to-[#F97316] mx-auto`}
      >
        <div className="bg-white pb-6 sm:pb-8 h-full rounded-[23px] sm:rounded-[28px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-2">
          {/* Cover */}
          <div
            className="self-stretch h-40 sm:h-48 pt-[20px] sm:pt-[24px] px-[14px] sm:px-[16px] relative bg-black/25 rounded-tl-[inherit] rounded-tr-[inherit] overflow-hidden"
            style={{
              backgroundImage: `url('${
                payload?.image_url || "/images/Image-48.png"
              }')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Start date badge */}
            <div className="px-3 sm:px-4 py-2 absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary rounded-[8px] sm:rounded-[10px] inline-flex items-center gap-[5px] sm:gap-[7px]">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <CourseCalenderIcon />
              </div>
              <div className="justify-center text-white text-[9px] sm:text-[10px] font-medium">
                يبدأ: {formatDateBackEnd(payload?.start_date)}
              </div>
            </div>

            {/* Fav + Free */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <div className="flex justify-between gap-5 items-center">
                <FavIcon
                  isFav={isFavorite}
                  isLoading={isUpdating}
                  onClick={() => handleAddToFavorite(roundId)}
                />

                {isFree && (
                  <div className="flex justify-center px-3 py-1 group hover:bg-white hover:text-secondary rounded-lg items-center bg-secondary">
                    <span className="text-white group-hover:text-secondary transition-all">
                      مجاني
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title + Price */}
          <div className="self-stretch px-2 sm:px-3 flex flex-col justify-start items-start gap-1">
            <div className="self-stretch text-right text-text text-sm sm:text-base font-bold">
              <div className="flex justify-between items-center gap-3 min-h-[32px]">
                <span className="line-clamp-1">{payload?.name}</span>

                {!isFree && (
                  <div className="flex justify-center hover:bg-secondary hover:text-white transition-all cursor-default items-center bg-secondary-light px-3 py-1 rounded-lg whitespace-nowrap">
                    {toNum(payload?.price, 0)} ر.س{" "}
                  </div>
                )}
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: payload?.description }}
              className="self-stretch prose prose-neutral text-right text-text-alt text-xs sm:text-sm font-normal leading-relaxed line-clamp-2 h-[45px]"
            />
          </div>

          {/* Details */}
          <div className="self-stretch p-2 sm:p-3 flex flex-col gap-3">
            <div className=" inline-flex justify-between items-center gap-2">
              <div className=" !w-fit px-2 sm:px-5 py-2 sm:py-3 bg-primary-bg rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2.5  ">
                <div className="text-text text-[10px] sm:text-xs font-medium truncate">
                  {payload?.course?.name || "—"}
                </div>
              </div>

              <div
                className={cx(
                  "px-4 text-alt text-[10px] sm:text-xs font-medium  sm:px-9 py-2 bg-primary-bg rounded-[8px] sm:rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#CEDFFC] text-black flex justify-center items-center flex-shrink-0",
                  payload.gender == "female" ? "!bg-[#F8B9D4]" : ""
                )}
              >
                {payload.gender == "female"
                  ? "طالبات"
                  : payload.gender == "both"
                    ? "الجميع"
                    : "طلاب"}
              </div>
            </div>

            <div className="self-stretch inline-flex justify-between items-center gap-2">
              {/* Lessons count */}
              <div className="flex justify-start items-center gap-[5px] flex-1 min-w-0">
                <div className="w-5 h-5 flex  items-center justify-center sm:w-6 sm:h-6 flex-shrink-0">
                  <FileTextIcon className="stroke-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-text text-[10px] sm:text-xs font-medium truncate">
                  الدروس :{" "}
                  {payload?.lessons_count ?? payload?.lessonsCount ?? "—"}
                </div>
              </div>

              {/* Seats */}
              <div className="flex justify-center items-center gap-[5px] flex-shrink-0">
                <div className="w-5 h-5 flex  items-center justify-center sm:w-6 sm:h-6 flex-shrink-0">
                  <SeatsIcon className="stroke-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-text text-[10px] sm:text-xs font-medium">
                  المقاعد المتبقية:{" "}
                  {payload?.capacity - payload?.students_count}
                </div>
              </div>
            </div>

            <div className="self-stretch inline-flex justify-between items-center gap-2">
              {/* Rating */}
              <div className="h-8 sm:h-9 flex justify-start items-center gap-1 flex-1 min-w-0">
                <div className="text-text text-[9px] sm:text-[10px] font-medium">
                  التقييمات :
                </div>
                <div className="flex items-center gap-0.5">
                  <div className="text-text text-[9px] sm:text-[10px] font-medium">
                    {rating}
                  </div>
                  <div className="w-3 h-3 overflow-hidden">
                    <RatingStarIcon />
                  </div>
                </div>
                <div className="text-text text-[9px] sm:text-[10px] font-medium">
                  ({toNum(payload?.ratings_count, 0)})
                </div>
              </div>

              {/* Teachers */}
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="flex justify-start items-center gap-[5px]">
                  <Avatar.Group maxCount={4} size="small">
                    {(payload?.teachers || []).map((instructor) => (
                      <Tooltip title={instructor?.name} key={instructor?.id}>
                        <Avatar
                          className="bg-white"
                          src={instructor?.image_url}
                          alt={instructor?.name}
                        />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="self-stretch px-2 sm:px-3 inline-flex justify-start items-center gap-4 sm:gap-8">
            <div className="flex justify-start items-center gap-2">
              {payload?.round_road_map_book_url && (
                <a
                  href={payload.round_road_map_book_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group cursor-pointer transition-all w-12 sm:w-16 inline-flex flex-col justify-start items-center gap-1"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 p-px transition-all bg-slate-300/20 rounded-[8px] sm:rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-500 group-hover:outline-secondary inline-flex justify-center items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 overflow-hidden">
                      <FileTextIcon className="stroke-[#2D2D2D] transition-all group-hover:stroke-secondary" />
                    </div>
                  </div>
                  <div className="self-stretch text-center text-text group-hover:text-secondary text-[9px] sm:text-[10px] font-normal">
                    جدول الدورة
                  </div>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  const url = buildShareUrl();
                  setOpenShareDrawer(true);
                  onShareClick?.(payload);
                  dispatch(
                    openShare({
                      url,
                      title: payload?.name || "مشاركة الدورة",
                      summary: payload?.description || "",
                      image: payload?.image_url || "",
                    })
                  );
                }}
                className="group cursor-pointer w-12 sm:w-16 inline-flex flex-col justify-start items-center gap-1"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 p-px bg-slate-300/20 rounded-[8px] sm:rounded-[10px] outline outline-1 group-hover:outline-secondary outline-offset-[-1px] outline-zinc-500 inline-flex justify-center items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 overflow-hidden">
                    <ShareIcon className="stroke-[#2D2D2D] transition-all group-hover:stroke-secondary" />
                  </div>
                </div>
                <div className="self-stretch group-hover:text-secondary text-center text-text text-[9px] sm:text-[10px] font-normal">
                  مشاركة
                </div>
              </button>
            </div>

            <Button />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseCard;

const FavIcon = ({
  isFav = false,
  onClick = () => null,
  isLoading = false,
}) => {
  return (
    <button
      type="button"
      aria-label={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) onClick();
      }}
      className={`w-7 h-7 sm:w-8 sm:h-8 relative z-40 cursor-pointer
        ${
          isFav
            ? "bg-secondary"
            : "bg-black/30 backdrop-blur-sm border border-white/50"
        }
        rounded-[8px] sm:rounded-[10px] inline-flex justify-center items-center overflow-hidden
        transition-all duration-300 hover:scale-110 active:scale-95
        ${isLoading ? "opacity-70 pointer-events-none" : ""}
      `}
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
          width={16}
          height={14}
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 sm:w-[18px] sm:h-4 transition-all duration-300 ${
            isFav ? "fill-white scale-110" : "fill-white"
          }`}
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
