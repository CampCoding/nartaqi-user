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

const CourseBriefOverview = ({isRegistered}) => {
  return (
    <div className=" grid-cols-1 space-y-[32px]  ">
      <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
        <div className="self-stretch text-right justify-center text-text text-xl font-bold ">
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
        <div className="self-stretch text-right justify-center text-text text-xl font-bold ">
          لمن هذه الدورة؟
        </div>
        <div className=" text-right justify-center text-text-alt text-base leading-loose font-medium ">
          لمعلمين والمعلمات في مختلف المراحل الدراسية المدربين في المجالات
          المهنية والتعليمية الطلاب الجامعيين أو حديثي التخرج الراغبين في دخول
          مجال التدريس أي شخص يسعى لتطوير مهاراته في الإلقاء والعرض والتدريب
        </div>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
        <div className="self-stretch text-right justify-center text-text text-xl font-bold ">
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
        <Link href={"/teacher-overview/123"} className="flex justify-between items-center hover:bg-primary-light rounded-[20px] p-3">
          <div className="flex justify-end items-center gap-[5px]">
            <img
              className="w-11 h-11 relative rounded-[50px]"
              src="https://placehold.co/45x45"
            />
            <div className="inline-flex flex-col justify-start items-start">
              <div className="justify-center text-text text-xl font-semibold  leading-loose">
                {" "}
                جون سميث
              </div>
              <div className="justify-center text-text-alt text-base leading-loose font-medium ">
                محاضر في إتقان التدريس الفعال{" "}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-end items-end gap-2">
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-center text-text text-xl font-medium ">
                (1450) 4.5
              </div>
              <div className="relative overflow-hidden">
                <RatingStarIcon width={20} height={20} />
              </div>
            </div>
            <div className="inline-flex justify-start items-end gap-1.5">
              <div className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 flex items-center justify-center left-[4px] top-[4px] absolute bg-blue-100 rounded-full">
                  <CourseDetailsInstagramIcon />
                </div>
              </div>
              <div className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 flex items-center justify-center left-[4px] top-[4px] absolute bg-blue-100 rounded-full">
                  <CourseDetailsLinkedinIcon />
                </div>
              </div>
              <div className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 left-[4px] flex justify-center items-center top-[4px] absolute bg-blue-100 rounded-full">
                  <CourseDetailsFacebookIcon />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="self-stretch text-right justify-center text-black text-base font-medium ">
          مدرب معتمد في التدريس الفعّال، بخبرة أكثر من ٨ سنوات في تطوير أساليب
          التعليم وتطبيق استراتيجيات حديثة لرفع كفاءة المتعلمين.
        </div>
      </div>
    {
      !isRegistered &&
      <div className="self-stretch w-full inline-flex justify-end !mt-[48px] items-start gap-12">
        <div className="flex-1 px-12 py-6 bg-primary rounded-[20px] flex justify-center items-center gap-2">
          <div className="w-6 h-6 relative overflow-hidden">
            <FileIcon />
          </div>
          <div className="text-right justify-center text-white text-base font-medium ">
            المحتوي المجاني
          </div>
        </div>
        <div className="flex-1 px-12 py-6  bg-secondary rounded-[20px] flex justify-center items-center gap-2">
          <div className="text-right justify-center text-white text-base font-medium ">
            اشترك الان
          </div>
        </div>
      </div>
    }
    </div>
  );
};

export default CourseBriefOverview;
