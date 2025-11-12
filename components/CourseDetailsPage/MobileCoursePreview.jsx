import React from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  HeartIcon,
  HeartFillIcon,
} from "../../public/svgs";
import { ShareIcon } from "./../../public/svgs";
import { ChevronLeft } from "lucide-react";
import ShareBottomDrawer from "../shared/ShareBottomDrawer";
const MobileCoursePreview = ({
  isRegestered,
  isDone,
  onClick = () => null,
}) => {
  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);
  const courseTitle = "دورة مهارات التعامل مع اختبار القدرات العامة";
  const courseDescription =
    "في هذه الدورة الشاملة ستتعلم استراتيجيات وأساليب التدريس الفعّال التي تساعدك على توصيل المعلومة بطرق مبتكرة وجاذبة للطلاب. سنبدأ من المبادئ الأساسية للتواصل التعليمي، ثم نتدرج إلى تصميم أنشطة تفاعلية، إدارة الصف، واستخدام أدوات رقمية تدعم عملية التعلم. في نهاية الدورة ستتمكن من تطبيق ما تعلمته في مواقف تدريسية حقيقية لبناء تجربة تعليمية ناجحة.";

  const handleToggleFavorite = () => {
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);

    // Show toast message
    setToastMessage(
      newFavoritedState
        ? "تم إضافة الدورة إلى المفضلة"
        : "تم إزالة الدورة من المفضلة"
    );
    setShowToast(true);

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const courseDetails = [
    {
      id: 1,
      label: "تاريخ البداية : 15 فبراير 2026",
      icon: <CalenderStartIcon />,
    },
    {
      id: 2,
      label: "تاريخ الإنتهاء : 15 مايو 2026",
      icon: <CalenderEndIcon />,
    },
    {
      id: 3,
      label: "المقاعد المتبقية: 5",
      icon: <SeatsIcon />,
    },
    {
      id: 4,
      label: "الجنس : طلاب",
      icon: <GenderIcon />,
    },
  ];

  return (
    <main>
      <div
        className="w-full h-[280px] relative bg-black/20  overflow-hidden mb-[16px]"
        style={{
          backgroundImage: `url('${"/images/daily-competition-image.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b to-black/60 via-black/20 from-black/50"></div>

        {/* Centered play button for responsive correctness */}
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

        <div class="w-full p-5 !pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <ShareIcon
              onClick={() => setOpenShareDrawer(true)}
              className="  stroke-white w-7 h-7 cursor-pointer active:scale-90 transition-all duration-300"
            />
            <div
              onClick={handleToggleFavorite}
              className="cursor-pointer active:scale-90 transition-all duration-300"
            >
              {isFavorited ? (
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
      <ShareBottomDrawer
        open={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title="share"
        url={"https://www.google.com"}
      />
    </main>
  );
};

export default MobileCoursePreview;
