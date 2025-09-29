import React from "react";
import { FFIcons } from "../../public/svgs";

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
        <div className=" w-full container px-[64px] mx-auto  inline-flex justify-between items-start">
          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className="  overflow-hidden">
              <FFIcons.ReadBook
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-3xl font-bold font-noto"
              >
                10,000+
              </div>
              <div className="justify-center text-secondary text-2xl  font-semibold font-noto">
                {" "}
                الطلاب النشطون
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className=" overflow-hidden">
              <FFIcons.OnlineGraduate
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-3xl font-bold font-noto"
              >
                500+
              </div>
              <div className="text-center justify-center text-secondary text-2xl  font-semibold font-noto">
                دورات في مجالات متنوعة
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-center gap-7">
            <div className=" overflow-hidden">
              <FFIcons.Trainer
                parentClassName={"fill-primary-bg"}
                iconClassName={"fill-primary"}
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-3xl font-bold font-noto"
              >
                200+
              </div>
              <div className="justify-center text-secondary text-2xl  font-semibold font-noto">
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
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div
                dir="ltr"
                className="justify-center text-white text-3xl font-bold font-noto"
              >
                95%
              </div>
              <div className="justify-center text-secondary text-2xl  font-semibold font-noto">
                معدل رضا الطلاب
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
