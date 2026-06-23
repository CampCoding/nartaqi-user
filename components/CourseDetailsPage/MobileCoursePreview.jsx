"use client";

import React, { useCallback } from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  HeartIcon,
  HeartFillIcon,
  ShareIcon,
} from "../../public/svgs";
import { ChevronLeft } from "lucide-react";
import ShareBottomDrawer from "../shared/ShareBottomDrawer";
import { useRouter } from "next/navigation";
import useHandleFavoriteActions from "@/components/shared/Hooks/useHandleFavoriteActions";
import toast from "react-hot-toast";
import buildShareUrl from "../../lib/buildShareUrl";
import { useDispatch } from "react-redux";
import { openShare } from "../utils/Store/Slices/shareSlice";

const MobileCoursePreview = ({
  courseData,
  onClick = () => null,
  onShareClick = () => null,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);

  const { mutate: toggleFavMutate, isLoading: favLoading } =
    useHandleFavoriteActions();

  const initialFav = !!courseData?.round?.fav || !!courseData?.fav || false;
  const [isFavorited, setIsFavorited] = React.useState(initialFav);

  React.useEffect(() => {
    const nextFav = !!courseData?.round?.fav || !!courseData?.fav || false;
    setIsFavorited(nextFav);
  }, [courseData?.round?.fav, courseData?.fav]);

  const handleToggleFavorite = () => {
    if (favLoading) return;

    const prev = isFavorited;
    const next = !prev;

    setIsFavorited(next);

    const roundId = courseData?.round?.id;

    if (!roundId) {
      setIsFavorited(prev);
      toast.error("لا يمكن تحديث المفضلة: معرّف الدورة غير متوفر");
      return;
    }

    toggleFavMutate(
      { round_id: roundId },
      {
        onError: (err) => {
          setIsFavorited(prev);
          toast.error(
            err?.response?.data?.message || "حدث خطأ أثناء تحديث المفضلة"
          );
        },
      }
    );
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

  const getRemainingSeats = () => {
    const capacity = parseInt(courseData?.round?.capacity);
    const enrolled =
      parseInt(courseData?.round?.students_count) ||
      parseInt(courseData?.round?.enrolled_students_count);

    if (!capacity || isNaN(capacity)) return "غير محدد";
    if (!enrolled || isNaN(enrolled)) return capacity;

    const remaining = capacity - enrolled;
    return remaining > 0 ? remaining : 0;
  };

  const getGenderText = (gender) => {
    if (!gender) return "غير محدد";
    switch (gender.toLowerCase()) {
      case "male":
        return "طلاب";
      case "female":
        return "طالبات";
      case "both":
        return "طلاب وطالبات";
      default:
        return "غير محدد";
    }
  };

  const courseDetails = [
    {
      id: 1,
      label: `تاريخ البداية : ${formatDate(courseData?.round?.start_date)}`,
      icon: <CalenderStartIcon />,
    },
    {
      id: 2,
      label: `تاريخ الإنتهاء : ${formatDate(courseData?.round?.end_date)}`,
      icon: <CalenderEndIcon />,
    },
    {
      id: 3,
      label: `المقاعد المتبقية: ${getRemainingSeats()}`,
      icon: <SeatsIcon />,
    },
    {
      id: 4,
      label: `الجنس : ${getGenderText(courseData?.round?.gender)}`,
      icon: <GenderIcon />,
    },
  ];

  return (
    <main>
      {/* Hero */}
      <div
        className="w-full h-[220px] sm:h-[280px] md:h-[340px] relative bg-black/20 overflow-hidden mb-3 sm:mb-4"
        style={{
          backgroundImage: `url('${courseData?.round?.image_url ||
            "/images/daily-competition-image.png"
            }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/60 via-black/20 from-black/50" />

        <div
          onClick={() => onClick()}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
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
        </div>

        {/* Top bar */}
        <div className="w-full px-4 sm:px-5 pt-8 sm:pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-[22px]">
            <ShareIcon
              onClick={() => {
                const url = buildShareUrl();
                setOpenShareDrawer(true);
                onShareClick?.(courseData);
                dispatch(
                  openShare({
                    url,
                    title: courseData?.name || "مشاركة الدورة",
                    summary: courseData?.description || "",
                    image: courseData?.image_url || "",
                  })
                );
              }}
              className="stroke-white w-6 h-6 sm:w-7 sm:h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />

            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={`cursor-pointer active:scale-90 transition-all duration-300 ${favLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              aria-label="toggle favorite"
            >
              {isFavorited ? (
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

      {/* Body */}
      <div className="px-4 sm:px-5 md:px-6 space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text leading-snug">
          {courseData?.round?.name || "غير محدد"}
        </h2>

        {courseData?.round?.description && (
          <p
            className="text-text-alt text-xs sm:text-sm md:text-base leading-relaxed prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{
              __html: courseData?.round?.description.replaceAll(
                /&nbsp;/gi,
                " "
              ),
            }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {courseDetails.map((detail) => (
            <div
              key={detail.id}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                {detail.icon}
              </div>
              <span className="text-xs sm:text-sm md:text-base text-text line-clamp-1">
                {detail.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ShareBottomDrawer
        open={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title="مشاركة الدورة"
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </main>
  );
};

export default MobileCoursePreview;