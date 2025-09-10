import React from "react";

export const HeaderHero = () => {
  return (
    <div className=" flex-1 h-[775px] flex items-center justify-center">
      <div
        style={{
          backgroundImage: "url('/images/Header, hero 9.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          flex: 1,
          color: "white",
        }}
        className=" w-full h-full py-[73px] px-[86.5px] "
      >
        <div className="w-[714px]  ">
          <h1 className=" w-[714px] font-[700] h-[154px] flex flex-col justify-center   text-white text-[52px] leading-[60px] overflow-hidden text-ellipsis ">
            ابنِ مستقبلك مع أفضل الدورات{" "}
            <span className="text-foundation-orangenormal">التعليمية</span>
          </h1>
        </div>
        <p className=" w-[703px] h-[86px]   text-white text-2xl leading-7 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] [direction:rtl]">
          انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات
          متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل
          مستقبلك.
        </p>
        
        <button
          className=" mt-[52px] inline-flex items-center justify-center gap-2 px-16 py-7 relative rounded-[25px] bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)] cursor-pointer transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          aria-label="اكتشف المزيد"
        >
          <span className="relative font-noto font-[700] w-fit font-Inter text-neutral-50 text-base text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [direction:rtl]">
            اكتشف المزيد
          </span>
        </button>
      </div>
    </div>
  );
};
