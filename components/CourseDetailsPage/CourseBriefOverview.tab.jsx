import React from "react";
import {
  CourseDetailsFacebookIcon,
  CourseDetailsInstagramIcon,
  CourseDetailsLinkedinIcon,
  FileIcon,
  RatingStarIcon,
  VideoCameraIcon,
} from "../../public/svgs";
import Link from "next/link";

const CourseBriefOverview = ({ isRegistered }) => {
  return (
    <div className=" grid-cols-1 space-y-[32px]  ">
      <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
        <div className="self-stretch text-right justify-center text-text text-lg font-bold ">
          مقدمة عن الدورة:
        </div>
        <div className=" text-right justify-center text-text-alt text-base leading-loose font-medium ">
          في هذه الدورة الشاملة ستتعلم استراتيجيات وأساليب التدريس الفعّال التي
          تساعدك على توصيل المعلومة بطرق مبتكرة وجاذبة للطلاب. سنبدأ من المبادئ
          الأساسية للتواصل التعليمي، ثم نتدرج إلى تصميم أنشطة تفاعلية، إدارة
          الصف، واستخدام أدوات رقمية تدعم عملية التعلم. في نهاية الدورة ستتمكن
          من تطبيق ما تعلمته في مواقف تدريسية حقيقية لبناء تجربة تعليمية ناجحة.
        </div>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
        <div className="self-stretch text-right justify-center text-text text-lg font-bold ">
          لمن هذه الدورة؟
        </div>
        <div className=" text-right justify-center text-text-alt text-base leading-loose font-medium ">
          لمعلمين والمعلمات في مختلف المراحل الدراسية المدربين في المجالات
          المهنية والتعليمية الطلاب الجامعيين أو حديثي التخرج الراغبين في دخول
          مجال التدريس أي شخص يسعى لتطوير مهاراته في الإلقاء والعرض والتدريب
        </div>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
        <div className="self-stretch text-right justify-center text-text text-lg font-bold ">
          أهداف الدورة:
        </div>
        <div className=" text-right justify-center text-text-alt text-base leading-loose font-medium ">
          فهم أسس ومبادئ التدريس الفعّال إتقان مهارات التواصل وبناء علاقة
          إيجابية مع المتعلمين تصميم دروس وأنشطة تعليمية محفزة وتفاعلية إدارة
          الصف بطرق عملية تحافظ على تركيز وانضباط المتعلمين التعرف على أدوات
          رقمية وتقنيات حديثة تدعم العملية التعليمية تقييم وتحسين الأداء
          التدريسي باستمرار
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        {/* Link Card: Stacks vertically on mobile, becomes a row on desktop */}
        <Link
          href={"/teacher-overview/123"}
          className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center hover:bg-primary-light rounded-[20px] p-3"
        >
          {/* --- Teacher Info --- */}
          <div className="flex justify-start items-center gap-3 md:gap-[5px]">
            <img
              className="w-11 h-11 relative rounded-full"
              src="https://placehold.co/45x45"
              alt="جون سميث"
            />
            <div className="inline-flex flex-col justify-start items-start">
              {/* Responsive font size for name */}
              <div className="justify-center text-text text-base md:text-lg font-semibold leading-loose">
                جون سميث
              </div>
              {/* Responsive font size for title */}
              <div className="justify-center text-text-alt text-sm md:text-base leading-loose font-medium">
                محاضر في إتقان التدريس الفعال
              </div>
            </div>
          </div>

          {/* --- Rating & Socials --- */}
          {/* Aligns to the start (right in RTL) on mobile, and end on desktop */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="inline-flex justify-start items-center gap-2">
              {/* Responsive font size for rating */}
              <div className="justify-center text-text text-base md:text-lg font-medium">
                (1450) 4.5
              </div>
              <div className="relative overflow-hidden">
                <RatingStarIcon width={20} height={20} />
              </div>
            </div>
            <div className="inline-flex justify-start items-end gap-1.5">
              {/* Simplified and responsive social icons */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                  <CourseDetailsInstagramIcon />
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                  <CourseDetailsLinkedinIcon />
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                  <CourseDetailsFacebookIcon />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* The description text is already responsive by nature */}
        <div className="self-stretch text-right justify-center text-black text-sm md:text-base font-medium">
          مدرب معتمد في التدريس الفعّال، بخبرة أكثر من ٨ سنوات في تطوير أساليب
          التعليم وتطبيق استراتيجيات حديثة لرفع كفاءة المتعلمين.
        </div>
      </div>
      {!isRegistered && (
        <>
          {/* Main container: Stacks vertically on mobile, horizontally on desktop */}
          <div className="self-stretch w-full flex flex-col gap-4 mt-8 lg:flex-row lg:justify-end lg:!mt-[48px] lg:items-start lg:gap-12">
            {/* Button 1: Responsive padding */}
            <div className="flex-1 px-6 py-4 lg:px-12 lg:py-6 bg-primary rounded-[20px] flex justify-center items-center gap-2">
              <div className="w-6 h-6 relative overflow-hidden">
                <FileIcon />
              </div>
              <div className="text-right justify-center text-white text-base font-medium">
                المحتوي المجاني
              </div>
            </div>

            {/* Button 2: Responsive padding */}
            <div className="flex-1 px-6 py-4 lg:px-12 lg:py-6 bg-secondary rounded-[20px] flex justify-center items-center gap-2">
              <div className="text-right justify-center text-white text-base font-medium">
                اشترك الان
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseBriefOverview;
