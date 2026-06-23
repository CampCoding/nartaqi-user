"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "@/components/ui/NavLink";
import { ChevronLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
  HeartIcon,
  HeartFillIcon,
  ShareIcon,
} from "../../public/svgs";

import Container from "../ui/Container";

import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "@/components/utils/Store/Slices/cartSlice";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../../lib/getQueryClient";
import buildShareUrl from "../../lib/buildShareUrl";
import { openShare } from "../utils/Store/Slices/shareSlice";
import CoursePaymentModal from "./CoursePaymentModal";

function useHandleFavoriteActions() {
  const { token } = useSelector((state) => state.auth);

  const toggleFavorite = async ({ payload }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/favourite/toggle_favourite`,
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ");
      throw error;
    }
  };

  const { mutate, error, isLoading, data, isError } = useMutation({
    mutationKey: ["toggleFavorite"],
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getUserFavorite"]);
      queryClient.invalidateQueries(["homeData"]);
      queryClient.invalidateQueries(["NewestRounds"]);
      toast.success(data?.message || "تم التحديث");
    },
    retry: 1,
  });

  return { mutate, error, isLoading, data, isError };
}

const MobileCourseDetails = ({
  courseData,
  isRegestered,
  onSubscribe,
  onShareClick = () => null,
  isDone,
  onToggleFavorite,
  onShare,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [localFav, setLocalFav] = useState(
    Boolean(courseData?.round?.fav ?? false)
  );

  const { round } = courseData;
  const { id: roundId } = round;

  const pathname = usePathname();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state?.auth ?? {});

  const goLogin = useCallback(() => router.push("/login"), [router]);

  const handleSubscribe = useCallback(() => {
    if (!token) return goLogin();
    if (!roundId) return;

    const isFull = +round.capacity - +round.students_count === 0;
    if (isFull) {
      toast.error("هذه الدورة ممتلئة");
      return;
    }

    setIsPaymentModalOpen(true);
  }, [token, roundId, round, goLogin]);

  const { mutate: toggleFavMutate, isLoading: favLoading } =
    useHandleFavoriteActions();

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
    return cartItems.find((item) => item.round_id === round.id);
  }, [cartItems, round.id]);

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

  const calculateRating = () => {
    const rates = courseData.roundRate || [];
    if (rates.length === 0) return 0;
    const sum = rates.reduce((acc, curr) => acc + curr.rate, 0);
    return (sum / rates.length).toFixed(1);
  };

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "غير محدد";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "غير محدد";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  const genderMap = { male: "طلاب", female: "طالبات", both: "الجميع" };

  const handleToggleFavorite = () => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (typeof onToggleFavorite === "function") onToggleFavorite();

    const next = !localFav;
    setLocalFav(next);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    toggleFavMutate(
      { payload: { round_id: round.id } },
      { onError: () => setLocalFav(!next) }
    );
  };

  const courseDetails = [
    {
      id: 1,
      label: `تاريخ البداية : ${formatDate(round.start_date)}`,
      icon: <CalenderStartIcon />,
    },
    {
      id: 2,
      label: `تاريخ الإنتهاء : ${formatDate(round.end_date)}`,
      icon: <CalenderEndIcon />,
    },
    {
      id: 3,
      label: `المقاعد المتبقية: ${+round.capacity - +round.students_count || "غير محدد"}`,
      icon: <SeatsIcon />,
    },
    {
      id: 4,
      label: `النوع : ${genderMap[round.gender] || "غير محدد"}`,
      icon: <GenderIcon />,
    },
  ];

  return (
    <main>
      {/* Hero Image */}
      <div
        className="w-full h-[220px] sm:h-[280px] md:h-[340px] relative bg-black/20 overflow-hidden mb-3 sm:mb-4"
        style={{
          backgroundImage: `url('${round.image_url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/60 via-black/20 from-black/50" />

        <Link
          href={`/course-preview/${round.id}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-3 sm:p-4 bg-secondary rounded-full shadow-[0px_0px_40px_0px_rgba(249,115,22,1)] inline-flex justify-center items-center overflow-hidden">
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

        {/* Top bar */}
        <div className="w-full px-4 sm:px-5 pt-8 sm:pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-[22px]">
            <ShareIcon
              onClick={() => {
                const url = buildShareUrl(roundId);
                onShareClick?.(courseData);
                dispatch(
                  openShare({
                    url,
                    title: round?.name || "مشاركة الدورة",
                    summary: round?.description || "",
                    image: round?.image_url || "",
                  })
                );
              }}
              className="stroke-white w-6 h-6 sm:w-7 sm:h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />

            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={`cursor-pointer active:scale-90 transition-all duration-300 ${favLoading ? "opacity-60 cursor-wait" : ""
                }`}
              aria-label="toggle favourite"
            >
              {localFav ? (
                <HeartFillIcon className="w-7 h-7 sm:w-8 sm:h-8 !fill-white" />
              ) : (
                <HeartIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              )}
            </button>
          </div>

          <ChevronLeft
            onClick={() => router.back()}
            className="stroke-white w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
          />
        </div>
      </div>

      <Container className="flex flex-col items-start gap-3 sm:gap-4 relative">
        {/* Title */}
        <h1 className="relative self-stretch text-base sm:text-lg md:text-xl font-bold mt-[-1px] text-text [direction:rtl] leading-snug">
          {round.name}
        </h1>

        {/* Description */}
        <div className="flex flex-col items-center gap-2 relative flex-[0_0_auto] w-full">
          {round?.description && (
            <div
              className={`relative self-stretch w-full ${isExpanded ? "h-auto" : "h-[48px] sm:h-[50px]"
                } overflow-hidden`}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: round?.description?.replaceAll(/&nbsp;/gi, " "),
                }}
                className="font-normal prose prose-neutral text-[#5e5856] text-[11px] sm:text-[12px] md:text-sm leading-6 [direction:rtl]"
              />
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1 rounded-[10px] border-2 border-solid border-variable-collection-stroke cursor-pointer hover:bg-gray-50 transition-colors"
            type="button"
          >
            <span className="font-normal text-black text-[11px] sm:text-xs leading-6 whitespace-nowrap [direction:rtl]">
              {isExpanded ? "عرض أقل" : "عرض المزيد"}
            </span>
          </button>
        </div>

        {/* Course details */}
        <div className="flex flex-col items-end gap-3 sm:gap-4 relative w-full">
          {courseDetails.map((detail) => (
            <div
              key={detail.id}
              className="flex items-center justify-start gap-2 relative self-stretch w-full"
            >
              {detail.icon}
              <p className="text-text text-[11px] sm:text-[12px] md:text-sm text-left whitespace-nowrap [direction:rtl]">
                {detail.label}
              </p>
            </div>
          ))}

          <div className="flex justify-start gap-1 self-stretch w-full items-center">
            <div className="inline-flex gap-2 items-center">
              <RatingLike />
            </div>
            <div className="inline-flex gap-2 items-center">
              <div className="text-text text-[11px] sm:text-[12px] md:text-sm whitespace-nowrap [direction:rtl]">
                التقييم :
              </div>
              <div className="text-text text-[11px] sm:text-[12px] md:text-sm whitespace-nowrap">
                {calculateRating()}
              </div>
              <RatingStarIcon />
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 relative self-stretch w-full">
            <CycleClock />
            <div className="inline-flex gap-3 sm:gap-4 items-center flex-wrap">
              <div className="[direction:rtl] text-text-duplicate text-[11px] sm:text-[12px] md:text-sm whitespace-nowrap">
                الساعات : {round.total_hours || "غير محدد"}
              </div>
              <div className="[direction:rtl] text-text-duplicate text-[11px] sm:text-[12px] md:text-sm whitespace-nowrap">
                الأيام : {round.total_days || "غير محدد"}
              </div>
            </div>
          </div>
        </div>

        {!isRegestered && (
          <div className="w-full inline-flex flex-col items-start gap-4 sm:gap-6 relative">
            {/* Price */}
            <div className="items-center justify-start gap-2 self-stretch w-full flex flex-wrap">
              <div className="text-primary text-xl sm:text-2xl md:text-[28px] font-bold text-left leading-normal whitespace-nowrap [direction:rtl]">
                {round.price} ر.س
              </div>
              {round.show_round_book == "1" && (
                <p className="text-text-duplicate text-[10px] sm:text-xs md:text-sm text-left [direction:rtl]">
                  (شاملة كتاب الدوره بصيغة PDF)
                </p>
              )}
            </div>

            <div className="flex-col w-full items-start justify-center gap-3 sm:gap-5 flex relative">
              {/* {round?.own == 1 ? ( ... )} */}
              {round?.own == 1 ? (
                <Link
                  href={`/course/${round.id}`}
                  className="items-center justify-center gap-2.5 px-2.5 py-3.5 sm:py-[18px] self-stretch w-full bg-orange-500 rounded-[16px] sm:rounded-[20px] flex cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  <span className="text-center text-slate-200 text-sm sm:text-base font-bold">
                    عرض الدورة
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={round.capacity - round?.students_count <= 0}
                  className="items-center justify-center gap-2.5 px-2.5 py-3.5 sm:py-[18px] self-stretch w-full bg-orange-500 rounded-[16px] sm:rounded-[20px] flex cursor-pointer hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-center text-slate-200 text-sm sm:text-base font-bold">
                    التحاق بالدورة
                  </span>
                </button>
              )}

              <Link
                href={
                  pathname?.startsWith("/course-preview")
                    ? `/course/${round.id}`
                    : `/course-preview/${round.id}`
                }
                className="items-center justify-center gap-2.5 px-2.5 py-3.5 sm:py-[18px] self-stretch w-full bg-secondary rounded-[16px] sm:rounded-[20px] flex cursor-pointer hover:opacity-90 transition-colors"
              >
                <span className="text-center text-white text-sm sm:text-base font-bold">
                  {pathname?.startsWith("/course-preview")
                    ? "الرجوع للدورة"
                    : "الشروحات المجانية"}
                </span>
              </Link>
            </div>
          </div>
        )}
      </Container>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300 px-4 w-full max-w-sm">
          <div className="bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="flex-shrink-0">
              {localFav ? (
                <HeartFillIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap text-center flex-1 [direction:rtl]">
              {localFav
                ? "تم إضافة الدورة إلى المفضلة"
                : "تم إزالة الدورة من المفضلة"}
            </span>
          </div>
        </div>
      )}

      <CoursePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        round={round}
        user={user}
        hasCoupon={courseData?.has_coupon == 1}
      />

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
    </main>
  );
};

export default MobileCourseDetails;