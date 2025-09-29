import React from "react";

export const BottomBanner = () => {
  return (
    <section className="bg-gradient-to-b from-primary-bg to-white">
      <section
        className="w-[1311px] mx-auto h-[481px] flex items-center justify-center rounded-[50px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/merketers-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      
      >
        <div className="flex h-[175px] -ml-px w-[462px] flex-col gap-8 relative items-center">
          <h1 className="self-stretch text-white text-[40px] text-center leading-[normal] relative flex items-center justify-center mt-[-1.00px]  font-bold tracking-[0] ">
            ابدأ رحلتك نحو النجاح البوم!
          </h1>

          <button
            className="inline-flex justify-center gap-2.5 px-20 py-6 flex-[0_0_auto] rounded-[20px] bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)] relative items-center hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
            aria-label="ابدا التسجيل الأن"
          >
            <span className="w-fit text-neutral-50 text-base text-left leading-5 whitespace-nowrap relative flex items-center justify-center mt-[-1.00px]  font-bold tracking-[0] ">
              ابدا التسجيل الأن
            </span>
          </button>
        </div>
      </section>
    </section>
  );
};
