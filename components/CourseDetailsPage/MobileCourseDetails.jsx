import React from "react";
import {
  CalenderEndIcon,
  CalenderStartIcon,
  GenderIcon,
  SeatsIcon,
  CycleClock,
  RatingLike,
  RatingStarIcon,
  CourseHeartIcon,
  HeartIcon,
  FileTextIcon,
  FeaturePlannerFileIcon,
  CertificationIcon,
} from "../../public/svgs";
import Link from "next/link";
import { ShareIcon } from "./../../public/svgs";
import { ChevronLeft, FileIcon, FileText } from "lucide-react";
import Container from "../ui/Container";
const MobileCourseDetails = ({ isRegestered, isDone }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const courseTitle = "دورة مهارات التعامل مع اختبار القدرات العامة";
  const courseDescription =
    "في هذه الدورة الشاملة ستتعلم استراتيجيات وأساليب التدريس الفعّال التي تساعدك على توصيل المعلومة بطرق مبتكرة وجاذبة للطلاب. سنبدأ من المبادئ الأساسية للتواصل التعليمي، ثم نتدرج إلى تصميم أنشطة تفاعلية، إدارة الصف، واستخدام أدوات رقمية تدعم عملية التعلم. في نهاية الدورة ستتمكن من تطبيق ما تعلمته في مواقف تدريسية حقيقية لبناء تجربة تعليمية ناجحة.";

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
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
        <Link
          href={"/course-preview/123"}
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

        <div class="w-full p-5 !pt-10 h-8 relative flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <ShareIcon className="  stroke-white w-7 h-7" />
            <HeartIcon className=" w-7 h-7" />
          </div>

          <ChevronLeft className="stroke-white w-10 h-10" />
        </div>
      </div>

      <Container className="flex  flex-col items-start gap-4 relative">
        <h1 className="relative self-stretch text-lg font-bold mt-[-1.00px] font-cairo-bold-lg text-text text-[length:var(--cairo-bold-lg-font-size)] leading-[var(--cairo-bold-lg-line-height)]  flex items-center justify-center tracking-[var(--cairo-bold-lg-letter-spacing)] [direction:rtl] [font-style:var(--cairo-bold-lg-font-style)]">
          {courseTitle}
        </h1>

        <div className="flex flex-col  items-center gap-2 relative flex-[0_0_auto]">
          <div
            className={`relative self-stretch w-full ${
              isExpanded ? "h-auto" : "h-[50px]"
            } overflow-hidden`}
          >
            <p className="   font-normal text-[#5e5856] text-[12px] leading-6 flex items-center justify-center tracking-[0] [direction:rtl]">
              {courseDescription}
            </p>
          </div>

          <button
            onClick={handleToggleExpand}
            className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1 relative flex-[0_0_auto] rounded-[10px] border-2 border-solid border-variable-collection-stroke cursor-pointer hover:bg-gray-50 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "عرض أقل" : "عرض المزيد"}
          >
            <span className="relative w-fit mt-[-2.00px]  font-normal text-black text-xs leading-6 whitespace-nowrap flex items-center justify-center tracking-[0] [direction:rtl]">
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

              {typeof detail.label === "string" ? (
                <p className="relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text text-[12px] text-text text-left   whitespace-nowrap [direction:rtl] ">
                  {detail.label}
                </p>
              ) : (
                <div className="relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text text-[12px] text-text text-left   whitespace-nowrap [direction:rtl] ">
                  {detail.label}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-start gap-1 self-stretch w-full items-center relative flex-[0_0_auto]">
            <div className="inline-flex gap-2 items-center relative flex-[0_0_auto]">
              <RatingLike />
            </div>
            <div className="inline-flex gap-2 items-center relative flex-[0_0_auto]">
              <div className="relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text text-[12px] text-text text-left   whitespace-nowrap [direction:rtl] ">
                التقييم :
              </div>
              <div className="mt-[-0.50px] relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text text-[12px] text-text   whitespace-nowrap ">
                4.5
              </div>
              <RatingStarIcon />
              {/* <img className="relative w-6 h-6 aspect-[1]" alt="Rate" src={rate1} /> */}
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <CycleClock />
            <div className="inline-flex gap-4 items-center relative flex-[0_0_auto]">
              <div className="mt-[-1.00px] [direction:rtl] relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text-duplicate text-[12px] text-text   whitespace-nowrap ">
                الساعات : 15
              </div>
              <div className="mt-[-1.00px] [direction:rtl] relative flex items-center justify-center w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-text-duplicate text-[12px] text-text   whitespace-nowrap ">
                الأيام : 5
              </div>
            </div>
          </div>
        </div>

        <>
          {isRegestered ? (
            <div className="relative bg-white   w-full   [border-top-style:solid] space-y-4 ">
              <Link
                onClick={(e) => isDone != "true" && e.preventDefault()}
                href={isDone == "true" ? "/register-certificate" : "#"}
                className={`flex w-full justify-center px-6 py-4  ${
                  isDone == "true"
                    ? "bg-primary"
                    : "bg-[#71717A] cursor-not-allowed"
                }  rounded-[20px] items-center gap-6`}
              >
                <div className="inline-flex relative flex-[0_0_auto] items-center gap-6">
                  <CertificationIcon width={23} height={29} />
                  <div className="relative w-fit mt-[-1.00px]  font-bold text-white text-base flex items-center justify-center text-center tracking-[0] leading-[normal] ">
                    تسجيل بيانات الشهادة
                  </div>
                </div>
              </Link>
              {!(isDone == "true") && (
                <p className="  font-medium text-danger text-sm flex items-center justify-center text-center tracking-[0] leading-[normal] ">
                  أكمل الدورة حتى تتمكن من تسجيل بيانات الشهادة
                </p>
              )}
            </div>
          ) : (
            <>
              <div class="self-stretch px-4 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex justify-center items-center gap-2">
                <FileText className="w-5 h-5 " />
                <div class="text-center justify-center text-zinc-800 text-base font-normal font-['Cairo']">
                  جدول الدورة
                </div>
              </div>

              <div className=" w-full inline-flex flex-col items-start gap-6 relative">
                <div className="items-center justify-start gap-2 self-stretch w-full flex-[0_0_auto] flex relative">
                  <div className="text-primary  text-2xl md:text-[30px] font-bold text-left leading-[var(--cairo-bold-3xl-line-height)] whitespace-nowrap relative flex items-center justify-center w-fit mt-[-1.00px] font-cairo-bold-3xl   [direction:rtl] [font-style:var(--cairo-bold-3xl-font-style)]">
                    95 ر.س
                  </div>
                  <p className="relative flex items-center justify-center w-fit font-cairo-regular-base  text-text-duplicate  text-left tracking-[var(--cairo-regular-base-letter-spacing)] leading-[var(--cairo-regular-base-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--cairo-regular-base-font-style)]">
                    (شاملة كتاب الدوره بصيغة PDF)
                  </p>
                </div>

                <div className="flex-col w-full items-start justify-center gap-5 flex-[0_0_auto] flex relative">
                  <div className="items-center justify-end gap-6 self-stretch w-full flex-[0_0_auto] flex relative">
                    <button
                      className="items-center justify-center gap-2.5 px-2.5 py-4 flex-1 grow bg-white rounded-[20px] border border-solid border-orange-500 flex relative cursor-pointer hover:bg-orange-50 transition-colors"
                      type="button"
                      aria-label="أضف الي السلة"
                    >
                      <span className="text-orange-500 text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold tracking-[0] [direction:rtl]">
                        أضف الي السلة
                      </span>
                    </button>
                  </div>

                  <button
                    className="items-center justify-center gap-2.5 px-2.5 py-[18px] self-stretch w-full flex-[0_0_auto] bg-orange-500 rounded-[20px] flex relative cursor-pointer hover:bg-orange-600 transition-colors"
                    type="button"
                    aria-label="اشترك الأن"
                  >
                    <span className="text-[#e8ecf3] text-base text-center leading-[normal] relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold tracking-[0] [direction:rtl]">
                      اشترك الأن
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      </Container>
    </main>
  );
};

export default MobileCourseDetails;
