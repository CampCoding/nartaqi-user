

import React from 'react'

function SharingWithFriendsHeroSection() {
  return (
    <div>
      <main className="w-[1312px] mx-auto h-[497px] flex rounded-[50px] overflow-hidden relative items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-[url(/images/competition-sharing-banner.png)] bg-[100%_100%]">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        {/* Content */}
        <section className="h-[337px] -ml-px w-[879px] gap-14 flex relative flex-col items-center z-10">
          <header className="gap-[38px] self-stretch w-full flex-[0_0_auto] flex relative flex-col items-center">
            <h1 className="mt-[-1.00px]  font-bold text-[40px] relative flex items-center justify-center self-stretch text-white text-center tracking-[0] leading-[normal] [direction:rtl]">
              شارك أصدقاءك واربح مكافآت!
            </h1>

            <p className=" font-medium text-2xl relative flex items-center justify-center self-stretch text-white text-center tracking-[0] leading-[normal] [direction:rtl]">
              ادع أصدقاءك للانضمام إلى منصتنا التعليمية واحصل على نقاط وشارات
              مميزة تعزز مستواك.
              <br />
              اكسب حتى 100 نقطة إضافية
            </p>
          </header>

          <button
            className="inline-flex gap-2 px-20 py-6 relative flex-[0_0_auto] bg-primary rounded-[20px] shadow-[0px_6px_24px_#bac6dc33] items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            type="button"
            aria-label="ادع أصدقاءك الآن"
          >
            <span className="relative [display:-webkit-box] w-fit  font-bold text-neutral-50 text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [direction:rtl] items-center justify-center">
              ادع أصدقاءك الآن
            </span>
          </button>
        </section>
      </main>
    </div>
  )
}

export default SharingWithFriendsHeroSection