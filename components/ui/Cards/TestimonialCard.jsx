import React from "react";

export const TestimonialCard = ({ type = "students", freeWidth = false }) => {
  const width = freeWidth ? "w-full" : "w-[485px]";
  return (
    <div
      className={`flex flex-col shadow-2xl ${width} items-start gap-6 !px-12 py-8    relative rounded-[25px] bg-white shadow-[var(--shadow-card)]`}
    >
      {/* خلفية أيقونة التخرج */}
      <div className="absolute bottom-0 left-0 aspect-[1]">
        <div
          className="relative w-[117px] h-[118px]"
          style={{
            backgroundImage: `url('/images/graduation-diploma 1 (1).svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* صورة أيقونة أعلى الكارت */}
      <div className="absolute top-[7px] right-[4px]">
        <div className="relative left-1">
          <img
            className="w-[128px] h-auto"
            alt="Graduation Icon"
            src={"/images/graduation 1.png"}
          />
        </div>
      </div>

      {/* رأس البطاقة (الصورة + الاسم + التخصص) */}
      <div className="flex w-full items-start gap-4 relative flex-[0_0_auto]">
        <img
          src={`/images/Image-48.png`}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col items-start gap-1 relative flex-1 grow">
          <div className="relative text-text text-start font-bold self-stretch mt-[-1px] text-base leading-6">
            مايكل براون
          </div>
          <div className="text-text-alt text-start text-sm leading-5 relative self-stretch">
            طالب
          </div>
        </div>

        {/* البادج */}
        {/* <div className="px-4 mr-auto py-3 bg-[color:var(--primary-light,#C2D8FC)] rounded-2xl inline-flex justify-center items-center gap-2.5">
          <div className="justify-center text-[color:var(--text)] text-xs font-medium ">
            مهارات التعليم والتدريس
          </div>
        </div> */}
      </div>

      {/* فاصل زخرفي */}
      <img
        className="relative self-stretch w-full flex-[0_0_auto]"
        alt="Divider Frame"
        src={"/images/Frame 4.png"}
      />

      {/* نص الشهادة */}
      <p className="text-base text-text-alt text-start leading-6 relative self-stretch">
        لوريم ابسوم دولور سيت اميت، كونسيكتيتور اديبيسسينغ ايليت. كورابيتور
        ايجيت ايروس فيتاي اورنا فرمنتوم فاسيليسيس. سيد تريستيكوي، نيسل ان كورسوس
        تينكيدونت، جوستو لوريم فولوتبات سيم، فيل فيفيرا سابين اركو ات اورنا.
      </p>
    </div>
  );
};
