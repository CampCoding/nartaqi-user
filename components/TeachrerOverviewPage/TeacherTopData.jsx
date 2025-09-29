


import React from 'react'

import {
  CourseDetailsFacebookIcon,
  CourseDetailsInstagramIcon,
  CourseDetailsLinkedinIcon,
  FileIcon,
  RatingStarIcon,
  VideoCameraIcon,
} from "../../public/svgs";

const TeacherTopData = () => {
  return (
    <div className="flex flex-col gap-[48px]">
    <div className="flex justify-between items-center">
      <div className="flex justify-end items-center gap-[5px]">
        <img
          className="w-11 h-11 relative rounded-[50px]"
          src="/images/Image-48.png"
        />
        <div className="inline-flex flex-col justify-start items-start">
          <div className="justify-center text-text text-2xl font-semibold  leading-loose">
            {" "}
            جون سميث
          </div>
          <div className="justify-center text-stone-600 text-base font-medium ">
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
    </div>

    <div className=" text-right justify-center  leading-loose ">
      <span className="text-text text-xl font-medium ">
        جون سميث هو أحد أبرز المدربين والخبراء في مجال التعليم والتطوير
        التربوي، يمتلك خبرة تمتد لأكثر من 15 عامًا في تدريب المعلمين وصقل
        مهاراتهم على استخدام أحدث استراتيجيات وأساليب التدريس الفعّال. حصل
        على درجة الماجستير في التربية من جامعة عالمية مرموقة، إلى جانب
        العديد من الشهادات الدولية المتخصصة في التعليم الرقمي وإدارة الصفوف
        الدراسية الحديثة.
        <br />
        عمل جون سميث مع عدد من المدارس والجامعات والمؤسسات التعليمية حول
        العالم، وساهم في تصميم برامج تدريبية مبتكرة تستهدف رفع كفاءة
        المعلمين وتحسين جودة التعليم. قام بتقديم أكثر من 250 دورة تدريبية
        وورشة عمل في مجالات مثل: إدارة الصف، استراتيجيات التعليم التفاعلي،
        تطوير المناهج، والتحفيز الأكاديمي للطلاب.
        <br />
        داخل منصتنا، يقدم جون سميث مجموعة من الدورات المميزة، مثل:
        <br />
      </span>
      <span className="text-text text-xl font-medium ">
        Effective Teaching Mastery – إتقان التدريس الفعّال.
        <br />
        Classroom Management Excellence – استراتيجيات إدارة الصف.
        <br />
        Active Learning Techniques – تقنيات التعلم النشط.
        <br />
        Modern Assessment Methods – طرق التقييم الحديثة.
        <br />
      </span>
      <span className="text-text text-xl font-medium ">
        ويحظى جون سميث بتقييمات عالية من المتدربين الذين يؤكدون أن برامجه
        التدريبية ساعدتهم بشكل مباشر في تحسين تجربتهم التعليمية وتحقيق نتائج
        ملموسة داخل الصف.
      </span>
    </div>
  </div>
  )
}

export default TeacherTopData
