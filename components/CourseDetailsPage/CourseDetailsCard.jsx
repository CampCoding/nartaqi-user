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
import Link from "@/components/ui/NavLink";
import { useRouter } from "next/navigation";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "@/components/utils/Store/Slices/cartSlice";
import useHandleFavoriteActions from "../shared/Hooks/useHandleFavoriteActions";
import cx from "../../lib/cx";
import toast from "react-hot-toast";
import CoursePaymentModal from "./CoursePaymentModal";

const CourseDetailsCard = ({ courseData, onSubscribe, scrolled }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const round = courseData?.round || courseData;

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(!!round?.fav);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { items: cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  const { mutate: toggleFavorite, isLoading: isFavLoading } =
    useHandleFavoriteActions();

  const roundId = round?.id;

  useEffect(() => {
    setIsFavorited(!!round?.fav);
  }, [round?.fav]);

  const genderLabel = useMemo(() => {
    const genderMap = { male: "طلاب", female: "طالبات", both: "الجميع" };
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
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  const goLogin = useCallback(() => router.push("/login"), [router]);

  const handleToggleCart = useCallback(async () => {
    if (!token) return goLogin();
    if (!roundId) return;

    setIsCartLoading(true);
    try {
      if (isInCart) {
        await dispatch(removeFromCart({ type: "rounds", item_id: roundId })).unwrap();
      } else {
        await dispatch(addToCart({ type: "rounds", item_id: roundId, quantity: 1 })).unwrap();
      }
      await dispatch(getUserCart()).unwrap();
    } catch (error) {
      console.error("Failed to toggle cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  }, [token, roundId, isInCart, dispatch, goLogin]);

  const handleToggleFavorite = useCallback(() => {
    if (!token) return goLogin();
    if (!roundId) return;

    setIsFavorited((prev) => !prev);
    toggleFavorite(
      { id: roundId, payload: { round_id: roundId } },
      { onError: () => setIsFavorited((prev) => !prev) }
    );
  }, [token, roundId, toggleFavorite, goLogin]);

  const handlePayNow = () => {
    if (!token) {
      toast.error("يجب تسجيل الدخول أولاً");
      router.push("/login");
      return;
    }
    if (round.capacity - round?.students_count <= 0) {
      toast.error("عذراً، هذه الدورة ممتلئة");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  if (!round || !roundId) {
    return (
      <div className="w-full max-w-[420px] xl:max-w-[460px] px-4 sm:px-5 pt-5 sm:pt-6 bg-white rounded-[24px] shadow-lg">
        <p className="text-red-500 text-sm">Error: No round data available</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:text-white max-w-[380px] xl:max-w-[420px] 2xl:max-w-[460px] px-4 sm:px-5 pt-5 sm:pt-6 relative bg-white rounded-[24px] sm:rounded-[30px] xl:rounded-[36px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Image */}
        <div
          className={cx(
            "w-full h-48 sm:h-52 xl:h-60 relative bg-black/20 rounded-[18px] sm:rounded-[22px] xl:rounded-[28px] overflow-hidden",
            scrolled ? "hidden" : "visible"
          )}
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
            <div className="p-3 sm:p-3.5 xl:p-4 bg-secondary rounded-full shadow-[0px_0px_40px_0px_rgba(249,115,22,1)] inline-flex justify-center items-center overflow-hidden">
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative flex justify-center items-center">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
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
        <div className="inline-flex flex-col justify-start w-full mt-4 sm:mt-5 mb-5 sm:mb-7">
          <div className="w-full pb-3 border-b border-zinc-100 inline-flex justify-between items-start gap-2 sm:gap-3">
            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <CalenderStartIcon />
              <div className="text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                تاريخ البداية : {formatDate(round.start_date)}
              </div>
            </div>

            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <CalenderEndIcon />
              <div className="text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                تاريخ الإنتهاء : {formatDate(round.end_date)}
              </div>
            </div>
          </div>

          <div className="w-full py-3 border-b border-zinc-100 inline-flex justify-between items-start gap-2 sm:gap-3">
            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <GenderIcon />
              <div className="text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                النوع : {genderLabel}
              </div>
            </div>

            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <SeatsIcon />
              <div className="text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                المقاعد المتبقية: {+round.capacity - +round.students_count || "غير محدد"}
              </div>
            </div>
          </div>

          <div className="w-full pt-3 inline-flex justify-between items-start gap-2 sm:gap-3">
            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <CycleClock />
              <div className="inline-flex justify-start items-center gap-2 sm:gap-3 flex-wrap">
                <div className="text-right text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                  الساعات : {round.total_hours || "غير محدد"}
                </div>
                <div className="text-right text-text text-[11px] sm:text-xs xl:text-[13px] font-medium leading-5">
                  الأيام : {round.total_days || "غير محدد"}
                </div>
              </div>
            </div>

            <div className="flex justify-start w-1/2 items-center gap-1.5 sm:gap-2">
              <RatingLike />
              <div className="flex items-center gap-1 text-[11px] sm:text-xs xl:text-[13px] font-medium text-text">
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
        <div className="pt-3 sm:pt-4 pb-6 sm:pb-8 xl:pb-10">
          <div className="self-stretch inline-flex justify-end items-end gap-2 sm:gap-3 xl:gap-4 mt-1 flex-wrap">
            <div className="text-primary text-lg sm:text-xl xl:text-2xl font-bold">
              {round.price} ر.س
            </div>
            {round.show_round_book == "1" && (
              <div className="text-text text-[10px] sm:text-[11px] xl:text-xs font-medium">
                (شاملة كتاب الدورة بصيغة PDF)
              </div>
            )}
          </div>

          <div className="mt-3 sm:mt-4 mb-4 sm:mb-5 w-full inline-flex justify-end items-center gap-2 sm:gap-3 xl:gap-4">
            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={isFavLoading}
              aria-label={isFavorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              className={`flex px-3 py-2.5 sm:py-3 rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] border justify-center items-center gap-2 transition-all duration-200
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
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-secondary group-hover:text-white transition-colors"
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
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            onClick={handlePayNow}
            disabled={round.capacity - round?.students_count <= 0}
            className="w-full px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 group disabled:!bg-gray-300 disabled:!cursor-not-allowed bg-secondary hover:bg-secondary-warm focus:bg-primary"
          >
            <span className="text-center text-slate-200 text-xs sm:text-[13px] font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
              اشترك الآن - {round.price} ر.س
            </span>
          </button>

          {/* Free Preview Link */}
          <Link
            href={`/course-preview/${roundId}`}
            className="w-full px-3 sm:px-3.5 mt-2.5 sm:mt-3 bg-primary py-2.5 sm:py-3 rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] inline-flex justify-center items-center gap-2.5 transition-colors duration-200 group"
          >
            <span className="text-center text-slate-200 text-xs sm:text-[13px] font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
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
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <CoursePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        round={round}
        user={user}
        hasCoupon={courseData?.has_coupon == 1}
      />
    </>
  );
};

export default CourseDetailsCard;