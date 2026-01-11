"use client";

import React from "react";
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

const MobileCoursePreview = ({ courseData, onClick = () => null }) => {
  const router = useRouter();
  console.log("courseDataDetails" , courseData )

  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);

  // ✅ Hook
  const { mutate: toggleFavMutate, isLoading: favLoading } =
    useHandleFavoriteActions();

  // ✅ optimistic state
  const initialFav =
    !!courseData?.round?.fav || !!courseData?.fav || false;

  const [isFavorited, setIsFavorited] = React.useState(initialFav);

  // ✅ keep UI in sync when courseData updates after refetch
  React.useEffect(() => {
    const nextFav =
      !!courseData?.round?.fav || !!courseData?.fav || false;
    setIsFavorited(nextFav);
  }, [courseData?.round?.fav, courseData?.fav]);

  const handleToggleFavorite = () => {
    if (favLoading) return;

    const prev = isFavorited;
    const next = !prev;

    // optimistic UI
    setIsFavorited(next);

    // call API
    const roundId = courseData?.round?.id;

    if (!roundId) {
      // rollback (no id)
      setIsFavorited(prev);
      toast.error("لا يمكن تحديث المفضلة: معرّف الدورة غير متوفر");
      return;
    }

    toggleFavMutate(
      { round_id: roundId },
      {
        onError: (err) => {
          // rollback
          setIsFavorited(prev);
          toast.error(
            err?.response?.data?.message || "حدث خطأ أثناء تحديث المفضلة"
          );
        },
      }
    );
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // حساب المقاعد المتبقية
  const getRemainingSeats = () => {
    const capacity = parseInt(courseData?.round?.capacity);
    // ✅ عندك أكثر من اسم محتمل من الـ API
    const enrolled =
      parseInt(courseData?.round?.students_count) ||
      parseInt(courseData?.round?.enrolled_students_count);

    if (!capacity || isNaN(capacity)) return "غير محدد";
    if (!enrolled || isNaN(enrolled)) return capacity; // لو مش موجودة اعتبر كله متاح

    const remaining = capacity - enrolled;
    return remaining > 0 ? remaining : 0;
  };

  // ترجمة الجنس
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
      <div
        className="w-full h-[280px] relative bg-black/20 overflow-hidden mb-[16px]"
        style={{
          backgroundImage: `url('${
            courseData?.round?.image_url || "/images/daily-competition-image.png"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/60 via-black/20 from-black/50" />

        <div
          onClick={() => onClick()}
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
        </div>

        {/* ✅ className بدل class */}
        <div className="w-full p-5 !pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <ShareIcon
              onClick={() => setOpenShareDrawer(true)}
              className="stroke-white w-7 h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />

            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favLoading}
              className={`cursor-pointer active:scale-90 transition-all duration-300 ${
                favLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              aria-label="toggle favorite"
            >
              {isFavorited ? (
                <HeartFillIcon className="w-8 h-8 !fill-white" />
              ) : (
                <HeartIcon className="w-7 h-7 fill-white" />
              )}
            </button>
          </div>

          <ChevronLeft
            onClick={() => router.back()}
            className="stroke-white w-10 h-10 cursor-pointer"
          />
        </div>
      </div>

      {/* عرض تفاصيل الدورة */}
      <div className="px-4 space-y-4">
        <h2 className="text-2xl font-bold text-text">
          {courseData?.round?.name || "غير محدد"}
        </h2>
        <p className="text-text-alt text-sm leading-relaxed">
          {courseData?.round?.description || "غير محدد"}
        </p>

        <div className="grid grid-cols-1 gap-3">
          {courseDetails.map((detail) => (
            <div
              key={detail.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-6 h-6">{detail.icon}</div>
              <span className="text-sm text-text">{detail.label}</span>
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
