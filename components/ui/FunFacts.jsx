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
        <Container className=" w-full  grid  grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.ReadBook
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-2xl sm:text-3xl font-bold font-noto leading-snug"
              >
                10,000+
              </div>
              <div className="text-center justify-center text-secondary text-lg sm:text-2xl font-semibold font-noto leading-snug">
                الطلاب النشطون
              </div>
            </div>  
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.OnlineGraduate
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-2xl sm:text-3xl font-bold font-noto leading-snug"
              >
                500+
              </div>
              <div className="text-center justify-center text-secondary text-lg sm:text-2xl font-semibold font-noto leading-snug">
                دورات في مجالات متنوعة
              </div>
            </div>
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.Trainer
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-2xl sm:text-3xl font-bold font-noto leading-snug"
              >
                200+
              </div>
              <div className="text-center justify-center text-secondary text-lg sm:text-2xl font-semibold font-noto leading-snug">
                مدربون معتمدون
              </div>
            </div>
          </div>

          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="overflow-hidden">
              <FFIcons.FFStats
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-2xl sm:text-3xl font-bold font-noto leading-snug"
              >
                95%
              </div>
              <div className="text-center justify-center text-secondary text-lg sm:text-2xl font-semibold font-noto leading-snug">
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
