"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
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

// ✅ Hook deps
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../../lib/getQueryClient";
import useEnrollInCourse from "../shared/Hooks/useEnroll";
import buildShareUrl from "../../lib/buildShareUrl";
import { openShare } from "../utils/Store/Slices/shareSlice";
/** =========================
 *  Hook: useHandleFavoriteActions
 *  ========================= */
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
      console.log(error);
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

/** =========================
 *  Component: MobileCourseDetails
 *  ========================= */
const MobileCourseDetails = ({
  courseData,
  isRegestered,
  onSubscribe,
  onShareClick = () => null,
  isDone,
  onToggleFavorite, // optional
  onShare,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // ✅ local optimistic fav state
  const [localFav, setLocalFav] = useState(
    Boolean(courseData?.round?.fav ?? false)
  );

  const { round } = courseData;
  const { id: roundId } = round;

  const { items: cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);
  const { enroll } = useEnrollInCourse();

  const studentId = user?.id;
  const goLogin = useCallback(() => {
    router.push("/login");
  }, [router]);
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

  // ✅ use hook
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

  const calculateRating = () => {
    const rates = courseData.roundRate || [];
    if (rates.length === 0) return 0;
    const sum = rates.reduce((acc, curr) => acc + curr.rate, 0);
    return (sum / rates.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const genderMap = {
    male: "طلاب",
    female: "طالبات",
    both: "الجميع",
  };

  const handleToggleFavorite = () => {
    if (!token) {
      router.push("/login");
      return;
    }

    // ✅ keep old behavior if parent passed something
    if (typeof onToggleFavorite === "function") onToggleFavorite();

    // ✅ optimistic UI
    const next = !localFav;
    setLocalFav(next);

    // toast UI (local)
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // ✅ call API (payload must contain round_id غالبًا)
    toggleFavMutate(
      {
        payload: {
          round_id: round.id,
        },
      },
      {
        onError: () => {
          // rollback if failed
          setLocalFav(!next);
        },
      }
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
      label: `المقاعد المتبقية: ${
        +round.capacity - +round.students_count || "غير محدد"
      }`,
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
      <div
        className="w-full h-[280px] relative bg-black/20 overflow-hidden mb-[16px]"
        style={{
          backgroundImage: `url('${round.image_url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/60 via-black/20 from-black/50"></div>

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

        <div className="w-full p-5 !pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <ShareIcon
              onClick={() => {
                const url = buildShareUrl(roundId);
                // return
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
              className="stroke-white w-7 h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />

            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={`cursor-pointer active:scale-90 transition-all duration-300 ${
                favLoading ? "opacity-60 cursor-wait" : ""
              }`}
              aria-label="toggle favourite"
            >
              {localFav ? (
                <HeartFillIcon className="w-8 h-8 !fill-white" />
              ) : (
                <HeartIcon className="w-7 h-7 fill-white" />
              )}
            </button>
          </div>

          <ChevronLeft
            onClick={() => router.back()}
            className="stroke-white w-10 h-10"
          />
        </div>
      </div>

      <Container className="flex flex-col items-start gap-4 relative">
        <h1 className="relative self-stretch text-lg font-bold mt-[-1.00px] text-text [direction:rtl]">
          {round.name}
        </h1>

        <div className="flex flex-col items-center gap-2 relative flex-[0_0_auto]">
          {round?.description && (
            <div
              className={`relative self-stretch w-full ${
                isExpanded ? "h-auto" : "h-[50px]"
              } overflow-hidden`}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: round?.description?.replaceAll(/&nbsp;/gi, " "),
                }}
                className="font-normal text-[#5e5856] text-[12px] leading-6 flex items-center justify-center tracking-[0] [direction:rtl]"
              />
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1 relative flex-[0_0_auto] rounded-[10px] border-2 border-solid border-variable-collection-stroke cursor-pointer hover:bg-gray-50 transition-colors"
            type="button"
          >
            <span className="relative w-fit mt-[-2.00px] font-normal text-black text-xs leading-6 whitespace-nowrap flex items-center justify-center tracking-[0] [direction:rtl]">
              {isExpanded ? "عرض أقل" : "عرض المزيد"}
            </span>
          </button>
        </div>

        <div className="flex flex-col items-end gap-4 relative">
          {courseDetails.map((detail) => (
            <div
              key={detail.id}
              className="flex items-center justify-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
            >
              {detail.icon}
              <p className="relative flex items-center justify-center w-fit text-text text-[12px] text-left whitespace-nowrap [direction:rtl]">
                {detail.label}
              </p>
            </div>
          ))}

          <div className="flex justify-start gap-1 self-stretch w-full items-center relative flex-[0_0_auto]">
            <div className="inline-flex gap-2 items-center relative flex-[0_0_auto]">
              <RatingLike />
            </div>
            <div className="inline-flex gap-2 items-center relative flex-[0_0_auto]">
              <div className="relative flex items-center justify-center w-fit text-text text-[12px] whitespace-nowrap [direction:rtl]">
                التقييم :
              </div>
              <div className="mt-[-0.50px] relative flex items-center justify-center w-fit text-text text-[12px] whitespace-nowrap">
                {calculateRating()}
              </div>
              <RatingStarIcon />
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <CycleClock />
            <div className="inline-flex gap-4 items-center relative flex-[0_0_auto]">
              <div className="mt-[-1.00px] [direction:rtl] relative flex items-center justify-center w-fit text-text-duplicate text-[12px] whitespace-nowrap">
                الساعات : {round.total_hours || "غير محدد"}
              </div>
              <div className="mt-[-1.00px] [direction:rtl] relative flex items-center justify-center w-fit text-text-duplicate text-[12px] whitespace-nowrap">
                الأيام : {round.total_days || "غير محدد"}
              </div>
            </div>
          </div>
        </div>

        {!isRegestered && (
          <>
            {/* {round.round_book && (
              <div className="self-stretch px-4 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex justify-center items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-base font-normal font-['Cairo']">
                  جدول الدورة
                </div>
              </div>
            )} */}

            <div className="w-full inline-flex flex-col items-start gap-6 relative">
              <div className="items-center justify-start gap-2 self-stretch w-full flex-[0_0_auto] flex relative">
                <div className="text-primary text-2xl md:text-[30px] font-bold text-left leading-normal whitespace-nowrap relative flex items-center justify-center w-fit mt-[-1.00px] [direction:rtl]">
                  {round.price} ر.س
                </div>
                <p className="relative flex items-center justify-center w-fit text-text-duplicate text-left whitespace-nowrap [direction:rtl]">
                  (شاملة كتاب الدوره بصيغة PDF)
                </p>
              </div>

              <div className="flex-col w-full items-start justify-center gap-5 flex-[0_0_auto] flex relative">
                <div className="items-center justify-end gap-6 self-stretch w-full flex-[0_0_auto] flex relative">
                  <button
                    onClick={handleToggleCart}
                    disabled={isLoading}
                    className={`items-center justify-center gap-2.5 px-2.5 py-3 flex-1 grow rounded-[20px] border border-solid flex relative transition-all duration-200
                      ${
                        isInCart && !isLoading
                          ? "bg-red-50 border-red-500 hover:bg-red-100"
                          : isLoading
                          ? "bg-gray-50 border-gray-300 cursor-wait opacity-70"
                          : "bg-white border-orange-500 hover:bg-orange-50"
                      }
                    `}
                    type="button"
                  >
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        <span className="text-gray-500 text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px] font-bold tracking-[0] [direction:rtl]">
                          {isInCart ? "جاري الحذف..." : "جاري الإضافة..."}
                        </span>
                      </>
                    ) : isInCart ? (
                      <>
                        <svg
                          className="w-5 h-5 text-red-500"
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
                        <span className="text-red-600 text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px] font-bold tracking-[0] [direction:rtl]">
                          حذف من السلة
                          {cartItem?.quantity > 1 && ` (${cartItem.quantity})`}
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 text-orange-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-orange-500 text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px] font-bold tracking-[0] [direction:rtl]">
                          أضف الي السلة
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={
                    isEnrollLoading ||
                    round.capacity - round?.students_count <= 0
                  }
                  className="items-center justify-center gap-2.5 px-2.5 py-[18px] self-stretch w-full flex-[0_0_auto] bg-orange-500 rounded-[20px] flex relative cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  {isEnrollLoading ? <div className="spinner" /> : null}
                  <span className="text-center justify-center text-slate-200 text-base font-bold transition-colors duration-200 group-hover:text-white group-focus:text-white">
                    {isEnrollLoading ? "جاري الاشتراك..." : "اشترك الأن"}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </Container>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm mx-4">
            <div className="flex-shrink-0">
              {localFav ? (
                <HeartFillIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <span className="text-sm font-medium whitespace-nowrap text-center flex-1 [direction:rtl]">
              {localFav
                ? "تم إضافة الدورة إلى المفضلة"
                : "تم إزالة الدورة من المفضلة"}
            </span>
          </div>
        </div>
      )}

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
    </main>
  );
};

export default MobileCourseDetails;
