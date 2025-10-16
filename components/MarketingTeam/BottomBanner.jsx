import React from "react";

export const BottomBanner = () => {
  return (
    <section className="py-4 sm:py-6 md:py-10 px-0 sm:px-0">
      <section
        className="w-full max-w-[1311px] mx-auto h-[300px] sm:h-[400px] lg:h-[481px] flex items-center justify-center rounded-[25px] sm:rounded-[35px] lg:rounded-[50px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/merketers-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col gap-8 sm:gap-8 relative items-center px-4 sm:px-6 lg:px-0 w-full max-w-[562px] mx-auto">
          <h1 className="self-stretch text-white text-2xl sm:text-3xl lg:text-[40px] text-center leading-normal relative flex items-center justify-center mt-[-1.00px] font-bold tracking-[0] px-2 sm:px-0">
            ابدأ رحلتك نحو النجاح اليوم!
          </h1>

          <button
            className="inline-flex justify-center gap-2.5 px-12 sm:px-16 lg:px-20 py-4 sm:py-5 lg:py-6 flex-[0_0_auto] rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)] relative items-center hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto max-w-xs sm:max-w-none"
            type="button"
            aria-label="ابدا التسجيل الأن"
          >
            <span className="w-fit text-neutral-50 text-sm sm:text-base text-center leading-5 whitespace-nowrap relative flex items-center justify-center mt-[-1.00px] font-bold tracking-[0]">
              ابدا التسجيل الأن
            </span>
          </button>
        </div>
      </section>
    </section>
  );
};
