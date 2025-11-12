import React from "react";

function SharingWithFriendsHeroSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <main className="w-full max-w-[1312px] mx-auto h-[300px] sm:h-[400px] lg:h-[497px] flex rounded-[25px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden relative items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-[url(/images/competition-sharing-banner.png)] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <section className="h-auto w-full gap-8 sm:gap-10 lg:gap-14 flex relative flex-col items-center z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <header className="gap-6 sm:gap-8 lg:gap-[38px] self-stretch w-full flex-[0_0_auto] flex relative flex-col items-start">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-[40px] relative flex items-start justify-start self-stretch text-white text-center tracking-[0] leading-[normal] [direction:rtl]">
              شارك أصدقاءك واربح مكافآت!
            </h1>

            <p className="font-medium text-base text-start sm:text-xl lg:text-[32px] !leading-[1.5] relative flex items-start justify-start self-stretch text-white  tracking-[0]  [direction:rtl]">
              ادع أصدقاءك للانضمام إلى منصتنا التعليمية واحصل على نقاط وشارات
              مميزة تعزز مستواك. اكسب حتى 100 نقطة إضافية
            </p>
          </header>

          <button
            className="inline-flex gap-2 px-8 sm:px-12 lg:px-20 py-4 sm:py-5 lg:py-6 relative flex-[0_0_auto] bg-primary rounded-[15px] sm:rounded-[20px] shadow-[0px_6px_24px_#bac6dc33] items-center justify-center hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 w-full sm:w-auto max-w-[300px] sm:max-w-none"
            type="button"
            aria-label="ادع أصدقاءك الآن"
          >
            <span className="relative [display:-webkit-box] w-fit font-bold text-neutral-50 text-sm sm:text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [direction:rtl] items-center justify-center whitespace-nowrap">
              ادع أصدقاءك الآن
            </span>
          </button>
        </section>
      </main>
  </div>
  );
}

export default SharingWithFriendsHeroSection;
