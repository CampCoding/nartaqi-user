"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
} from "../../public/svgs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "@/components/utils/Store/Slices/cartSlice";
import useHandleFavoriteActions from "../shared/Hooks/useHandleFavoriteActions";
import useEnrollInCourse from "../shared/Hooks/useEnroll";
import cx from "../../lib/cx";

const CourseDetailsCard = ({ courseData, onSubscribe, scrolled }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const round = courseData?.round || courseData;

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(!!round?.fav);

  const { items: cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  const { enroll } = useEnrollInCourse();
  const { mutate: toggleFavorite, isLoading: isFavLoading } =
    useHandleFavoriteActions();

  const roundId = round?.id;
  const studentId = user?.id;

  // ✅ Sync favorite state when API data changes
  useEffect(() => {
    setIsFavorited(!!round?.fav);
  }, [round?.fav]);

  const genderLabel = useMemo(() => {
    const genderMap = {
      male: "طلاب",
      female: "طالبات",
      both: "الجميع",
    };
    return genderMap[round?.gender] || "غير محدد";
  }, [round?.gender]);

  const isInCart = useMemo(() => {
    if (!roundId) return false;
    return cartItems.some((item) => {
      const matchById =
        item.item_id === roundId ||
        item.round_id === roundId ||
        item.round?.id === roundId;

      return matchById && item.type === "rounds";
    });
  }, [cartItems, roundId]);

  const cartItem = useMemo(() => {
    if (!roundId) return null;
    return cartItems.find((item) => {
      const matchById =
        item.item_id === roundId ||
        item.round_id === roundId ||
        item.round?.id === roundId;

      return matchById && item.type === "rounds";
    });
  }, [cartItems, roundId]);

  const ratingValue = useMemo(() => {
    const rates = courseData?.roundRate || round?.students_rates || [];
    if (!rates?.length) return "0.0";
    const sum = rates.reduce((acc, curr) => acc + Number(curr?.rate || 0), 0);
    return (sum / rates.length).toFixed(1);
  }, [courseData?.roundRate, round?.students_rates]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "غير محدد";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "غير محدد";
    return d.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const goLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleToggleCart = useCallback(async () => {
    if (!token) return goLogin();
    if (!roundId) return console.error("Round ID is undefined!");

    setIsCartLoading(true);
    try {
      if (isInCart) {
        await dispatch(
          removeFromCart({ type: "rounds", item_id: roundId })
        ).unwrap();
      } else {
        await dispatch(
          addToCart({ type: "rounds", item_id: roundId, quantity: 1 })
        ).unwrap();
      }

      // لو عندك Slice بيعمل optimistic update، ممكن تستغني عن دي
      await dispatch(getUserCart()).unwrap();
    } catch (error) {
      console.error("Failed to toggle cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  }, [token, roundId, isInCart, dispatch, goLogin]);

  const handleToggleFavorite = useCallback(() => {
    if (!token) return goLogin();
    if (!roundId) return console.error("Round ID is undefined!");

    // optimistic update
    setIsFavorited((prev) => !prev);

    toggleFavorite(
      { id: roundId, payload: { round_id: roundId } },
      {
        onError: () => {
          // rollback
          setIsFavorited((prev) => !prev);
        },
      }
    );
  }, [token, roundId, toggleFavorite, goLogin]);

  const handleSubscribe = useCallback(async () => {
    const isFull = +round.capacity - +round.students_count == 0;

    if (!token) return goLogin();
    if (!roundId) return console.error("Round ID is undefined!");
    if (!studentId) return console.error("Student ID is undefined!");
    if (isFull) return console.error("هذه الدورة ممتلئة");


    setIsEnrollLoading(true);
    try {
      const res = await enroll({
        token,
        round_id: roundId,
        student_id: studentId,
        payment_id: 1,
        // ✅ الأفضل بدل تاريخ ثابت
        end_date: round?.end_date || "2025-12-30",
      });

      if (res?.ok) onSubscribe?.(res);
    } catch (e) {
      console.error("Enroll failed:", e);
    } finally {
      setIsEnrollLoading(false);
    }
  }, [
    token,
    roundId,
    studentId,
    enroll,
    onSubscribe,
    goLogin,
    round?.end_date,
  ]);

  if (!round || !roundId) {
    return (
      <div className="w-full max-w-[460px] px-5 pt-6 bg-white rounded-[28px] shadow-lg">
        <p className="text-red-500 text-sm">Error: No round data available</p>
        <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify(courseData, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="w-full lg:text-white max-w-[460px] px-4 sm:px-5 pt-5 sm:pt-6 relative bg-white rounded-[30px] sm:rounded-[36px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Image */}
      <div
        className={cx("w-full h-52 sm:h-60 relative bg-black/20 rounded-[22px] sm:rounded-[28px] overflow-hidden", scrolled ? "hidden" : "visible")}
        style={{
          backgroundImage: `url('${round.image_url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/40 via-black/20 from-transparent" />

        <Link
          href={`/course-preview/${roundId}`}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="مشاهدة المعاينة"
        >
          <div className="p-3.5 sm:p-4 bg-secondary rounded-full shadow-[0px_0px_40px_0px_rgba(249,115,22,1)] inline-flex justify-center items-center overflow-hidden">
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

      {/* Info rows */}
      <div className="inline-flex flex-col justify-start w-full mt-4 sm:mt-5 mb-6 sm:mb-7">
        <div className="w-full pb-3 border-b border-zinc-100 inline-flex justify-between items-start gap-3">
          <div className="flex justify-start w-1/2 items-center gap-2">
            <CalenderStartIcon />
            <div className="justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
              تاريخ البداية : {formatDate(round.start_date)}
            </div>
          </div>

          <div className="flex justify-start w-1/2 items-center gap-2">
            <CalenderEndIcon />
            <div className="justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
              تاريخ الإنتهاء : {formatDate(round.end_date)}
            </div>
          </div>
        </div>

        <div className="w-full py-3 border-b border-zinc-100 inline-flex justify-between items-start gap-3">
          <div className="flex justify-start w-1/2 items-center gap-2">
            <GenderIcon />
            <div className="justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
              النوع : {genderLabel}
            </div>
          </div>

          <div className="flex justify-start w-1/2 items-center gap-2">
            <SeatsIcon />
            <div className="justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
              المقاعد المتبقية:{" "}
              {+round.capacity - +round.students_count || "غير محدد"}
            </div>
          </div>
        </div>

        <div className="w-full pt-3 inline-flex justify-between items-start gap-3">
          <div className="flex justify-start w-1/2 items-center gap-2">
            <CycleClock />
            <div className="inline-flex justify-start items-center gap-3">
              <div className="text-right justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
                الساعات : {round.total_hours || "غير محدد"}
              </div>
              <div className="text-right justify-center text-text text-xs sm:text-[13px] font-medium leading-5">
                الأيام : {round.total_days || "غير محدد"}
              </div>
            </div>
          </div>

          <div className="flex justify-start w-1/2 items-center gap-2">
            <RatingLike />
            <div className="flex items-center gap-1 text-xs sm:text-[13px] font-medium text-text">
              التقييم :
              <div className="flex items-center gap-1">
                <div className="font-semibold">{ratingValue}</div>
                <RatingStarIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="pt-3 sm:pt-4 pb-8 sm:pb-10">
        {/* <div className="justify-center text-text-alt line-through decoration-red-600 text-sm sm:text-base font-bold">
          120 ر.س
        </div> */}

        <div className="self-stretch inline-flex justify-end items-end gap-3 sm:gap-4 mt-1">
          <div className="justify-center text-primary text-xl sm:text-2xl font-bold">
            {round.price} ر.س
          </div>
          <div className="justify-center text-text text-[11px] sm:text-xs font-medium">
            (شاملة كتاب الدورة بصيغة PDF)
          </div>
        </div>

        <div className="mt-4 mb-4 sm:mb-5 w-full inline-flex justify-end items-center gap-3 sm:gap-4">
          {/* Cart */}
          <button
            type="button"
            onClick={handleToggleCart}
            disabled={isCartLoading}
            aria-label={isInCart ? "حذف من السلة" : "إضافة إلى السلة"}
            className={`flex-1 px-3 py-3 rounded-[14px] sm:rounded-[16px] border border-1 border-offset-[-1px] flex justify-center items-center gap-2 transition-all duration-200
              ${isInCart && !isCartLoading
                ? "bg-red-50 border-red-500 hover:bg-red-100 group"
                : isCartLoading
                  ? "bg-gray-50 border-gray-300 cursor-wait opacity-70"
                  : "bg-white border-secondary hover:bg-secondary group"
              }`}
          >
            {isCartLoading ? (
              <>
                <div className="spinner" />
                <span className="text-center justify-center text-gray-500 text-xs sm:text-[13px] font-bold">
                  {isInCart ? "جاري الحذف..." : "جاري الإضافة..."}
                </span>
              </>
            ) : isInCart ? (
              <>
                <svg
                  className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-center justify-center text-red-600 text-xs sm:text-[13px] font-bold">
                  حذف من السلة
                  {cartItem?.quantity > 1 && ` (${cartItem.quantity})`}
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-secondary group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-center justify-center text-secondary text-xs sm:text-[13px] font-bold group-hover:text-white transition-colors">
                  أضف الي السلة
                </span>
              </>
            )}
          </button>

          {/* Favorite */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={isFavLoading}
            aria-label={isFavorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            className={`flex px-3 py-3 rounded-[14px] sm:rounded-[16px] border border-1 border-offset-[-1px] flex justify-center items-center gap-2 transition-all duration-200
              ${isFavorited && !isFavLoading
                ? "bg-red-50 border-red-500 hover:bg-red-100 group"
                : isFavLoading
                  ? "bg-gray-50 border-gray-300 cursor-wait opacity-70"
                  : "bg-white border-secondary hover:bg-secondary group"
              }`}
          >
            {isFavLoading ? (
              <div className="spinner" />
            ) : isFavorited ? (
              <svg
                className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-secondary group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          {/* <button
            className={` px-3 py-3 rounded-[14px] sm:rounded-[16px] border border-1 border-offset-[-1px] flex justify-center items-center gap-2 transition-all duration-200`}
          ></button> */}
        </div>

        {/* Subscribe */}
        <button
          type="button"
          onClick={handleSubscribe}
          disabled={isEnrollLoading || round.capacity - round?.students_count <= 0}
          // disabled={true}
          className={` ${"disabled:!bg-gray-300 disabled:!cursor-not-allowed"}  w-full px-3.5 py-3 rounded-[14px] sm:rounded-[16px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 group
            ${isEnrollLoading
              ? "bg-gray-300 cursor-wait"
              : "bg-secondary hover:bg-secondary-warm focus:bg-primary"
            }`}
        >
          {isEnrollLoading ? <div className="spinner" /> : null}
          <span className="text-center justify-center text-slate-200 text-xs sm:text-[13px] font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
            {isEnrollLoading ? "جاري الاشتراك..." : "اشترك الأن"}
          </span>
        </button>
        <Link
          href={`/course-preview/${roundId}`}
          className={`w-full px-3.5 mt-3 bg-primary py-3 rounded-[14px] sm:rounded-[16px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 group
           `}
        >
          <span className="text-center justify-center text-slate-200 text-xs sm:text-[13px] font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
            الشروحات المجانية
          </span>
        </Link>
      </div>

      <style jsx>{`
        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid #e5e7eb;
          border-top-color: #f97316;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetailsCard;
