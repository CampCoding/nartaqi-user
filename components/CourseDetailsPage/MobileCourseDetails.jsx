"use client";
import React from "react";
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
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";

const MobileCourseDetails = ({
  courseData,
  isRegestered,
  isDone,
  onToggleFavorite,
  onShare,
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const { round } = courseData;

  // حساب متوسط التقييم
  const calculateRating = () => {
    const rates = courseData.roundRate || [];
    if (rates.length === 0) return 0;
    const sum = rates.reduce((acc, curr) => acc + curr.rate, 0);
    return (sum / rates.length).toFixed(1);
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Gender mapping
  const genderMap = {
    male: "طلاب",
    female: "طالبات",
    both: "الجميع",
  };

  const handleToggleFavorite = () => {
    onToggleFavorite();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
      label: `المقاعد المتبقية: ${"غير محدد"}`,
      icon: <SeatsIcon />,
    },
    {
      id: 4,
      label: `الجنس : ${"غير محدد"}`,
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
              onClick={() => onShare(true)}
              className="stroke-white w-7 h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />
            <div
              onClick={handleToggleFavorite}
              className="cursor-pointer active:scale-90 transition-all duration-300"
            >
              {round.fav ? (
                <HeartFillIcon className="w-8 h-8 !fill-white" />
              ) : (
                <HeartIcon className="w-7 h-7 fill-white" />
              )}
            </div>
          </div>

          <ChevronLeft
            onClick={() => router.back()}
            className="stroke-white w-10 h-10"
          />
        </div>
      </div>

      <Container className="flex flex-col items-start gap-4 relative">
        <h1 className="relative self-stretch text-lg font-bold mt-[-1.00px] text-text flex items-center justify-center [direction:rtl]">
          {round.name}
        </h1>

        <div className="flex flex-col items-center gap-2 relative flex-[0_0_auto]">
          <div
            className={`relative self-stretch w-full ${
              isExpanded ? "h-auto" : "h-[50px]"
            } overflow-hidden`}
          >
            <p className="font-normal text-[#5e5856] text-[12px] leading-6 flex items-center justify-center tracking-[0] [direction:rtl]">
              {round.description}
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1 relative flex-[0_0_auto] rounded-[10px] border-2 border-solid border-variable-collection-stroke cursor-pointer hover:bg-gray-50 transition-colors"
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
                الساعات : {round.time_show || "غير محدد"}
              </div>
              <div className="mt-[-1.00px] [direction:rtl] relative flex items-center justify-center w-fit text-text-duplicate text-[12px] whitespace-nowrap">
                الأيام : غير محدد
              </div>
            </div>
          </div>
        </div>

        {!isRegestered && (
          <>
            {round.round_book && (
              <div className="self-stretch px-4 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex justify-center items-center gap-2">
                <div className="text-center justify-center text-zinc-800 text-base font-normal font-['Cairo']">
                  جدول الدورة
                </div>
              </div>
            )}

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
                    className="items-center justify-center gap-2.5 px-2.5 py-4 flex-1 grow bg-white rounded-[20px] border border-solid border-orange-500 flex relative cursor-pointer hover:bg-orange-50 transition-colors"
                    type="button"
                  >
                    <span className="text-orange-500 text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px] font-bold tracking-[0] [direction:rtl]">
                      أضف الي السلة
                    </span>
                  </button>
                </div>

                <button
                  className="items-center justify-center gap-2.5 px-2.5 py-[18px] self-stretch w-full flex-[0_0_auto] bg-orange-500 rounded-[20px] flex relative cursor-pointer hover:bg-orange-600 transition-colors"
                  type="button"
                >
                  <span className="text-[#e8ecf3] text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px] font-bold tracking-[0] [direction:rtl]">
                    اشترك الأن
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
              {round.fav ? (
                <HeartFillIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <span className="text-sm font-medium whitespace-nowrap text-center flex-1 [direction:rtl]">
              {round.fav
                ? "تم إضافة الدورة إلى المفضلة"
                : "تم إزالة الدورة من المفضلة"}
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

export default MobileCourseDetails;
