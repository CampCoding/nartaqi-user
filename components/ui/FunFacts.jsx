import React from "react";
import { FFIcons } from "../../public/svgs";
import Container from "./Container";

const FunFacts = () => {
  return (
    <div className="">
      <div
        className=" pt-[52px] flex pb-[54px] relative bg-gradient-to-l from-black/80 via-black/40 to-black/0"
        style={{
          backgroundImage: `url('${"/images/scrolig.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container className=" w-full  grid  grid-cols-2 gap-4 gap-y-10 md:gap-6 md:grid-cols-4">
          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.ReadBook
                className="w-20 h-20 md:w-[97px] md:h-[97px]"
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-xl sm:text-3xl font-bold font-noto leading-snug"
              >
                10,000+
              </div>
              <div className="text-center justify-center text-secondary text-base sm:text-2xl font-semibold font-noto leading-snug">
                الطلاب النشطون
              </div>
            </div>
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <div className="">
                <FFIcons.OnlineGraduate
                  className="w-20 h-20 md:w-40 md:h-[97px]"
                  parentClassName={"fill-primary-bg"}
                  iconClassName={"fill-primary"}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-xl sm:text-3xl font-bold font-noto leading-snug"
              >
                500+
              </div>
              <div className="text-center justify-center text-secondary text-base sm:text-2xl font-semibold font-noto leading-snug">
                دورات في مجالات متنوعة
              </div>
            </div>
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.Trainer
                className="w-20 h-20 md:w-40 md:h-[97px]"
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-xl sm:text-3xl font-bold font-noto leading-snug"
              >
                200+
              </div>
              <div className="text-center justify-center text-secondary text-base sm:text-2xl font-semibold font-noto leading-snug">
                مدربون معتمدون
              </div>
            </div>
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.FFStats
                className="w-20 h-20 md:w-40 md:h-[97px]"
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-xl sm:text-3xl font-bold font-noto leading-snug"
              >
                95%
              </div>
              <div className="text-center justify-center text-secondary text-base sm:text-2xl font-semibold font-noto leading-snug">
                معدل رضا الطلاب
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FunFacts;
