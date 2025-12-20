import React from "react";

const BannerSection = () => {
  return (
    <div className="flex flex-col flex-1 w-full items-end gap-6 relative rounded-3xl md:rounded-[50px] overflow-hidden border-[3px] border-solid ">
      <div className="flex flex-col items-end gap-4 p-6 relative self-stretch w-full flex-[0_0_auto]">
        <h1 className=" font-bold text-secondary text-[24px] leading-10 relative self-stretch ">
          أنشئ جدولك الدراسي
        </h1>
        <p className=" text-text-alt text-base leading-7 relative self-stretch ">
          مخطط دراسة مخصص مجاني - لا حاجة لتسجيل الدخول.
        </p>
      </div>
      <img
        loading="lazy"
        className="relative flex-1 self-stretch w-full grow rounded-3xl md:rounded-[50px]  bg-cover bg-[50%_50%] "
        src="/images/FRAMEFRAME.png"
      />
    </div>
  );
};

export default BannerSection;
