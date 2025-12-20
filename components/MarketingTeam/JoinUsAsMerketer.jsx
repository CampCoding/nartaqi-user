import Link from "next/link";
import React from "react";

const JoinUsAsMerketer = () => {
  return (
    <div className="px-0 sm:px-0">
      <div className="inline-flex flex-col justify-start items-center gap-6 sm:gap-8 w-full">
        <img
          loading="lazy"
          className="self-stretch h-48 sm:h-64 lg:h-80 rounded-[20px] sm:rounded-[30px] object-cover"
          src="/images/marketer.png"
          alt="انضم إلى فريق المسوقين"
        />
        <div className="self-stretch flex flex-col justify-start items-center gap-6 sm:gap-8">
          <div className="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4">
            <h1 className="text-center text-text text-lg sm:text-2xl lg:text-3xl font-bold capitalize leading-8 sm:leading-10 lg:leading-[50px] px-4 sm:px-0">
              انضم إلى فريقنا من المسوقين بالعمولة
            </h1>
            <p className="text-center text-neutral-500 text-sm sm:text-base font-medium leading-6 sm:leading-7 px-4 sm:px-0">
              كود خصم دائم – عمولة على كل اشتراك ناجح
            </p>
          </div>
          <Link
            href={"/marketing-team/join-to-marketers"}
            className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-primary to-secondary rounded-[15px] sm:rounded-[20px] inline-flex justify-center items-center gap-2.5 hover:shadow-lg transition-shadow duration-300 w-full max-w-xs sm:w-auto"
          >
            <span className="justify-center text-neutral-50 text-sm sm:text-base font-bold leading-tight">
              ابدا التسجيل الأن
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUsAsMerketer;
