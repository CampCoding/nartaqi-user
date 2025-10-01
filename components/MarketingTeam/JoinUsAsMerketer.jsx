import Link from "next/link";
import React from "react";

const JoinUsAsMerketer = () => {
  return (
    <div>
      <div className=" inline-flex flex-col justify-start items-center gap-8">
        <img
          className="self-stretch h-80 rounded-[30px]"
          src="/images/marketer.png"
        />
        <div className="self-stretch flex flex-col justify-start items-center gap-8">
          <div className="self-stretch flex flex-col justify-start items-center gap-4">
            <div className="text-right justify-center text-text text-3xl font-bold  capitalize leading-[50px]">
              انضم إلى فريقنا من المسوقين بالعمولة
            </div>
            <div className="text-right justify-center text-neutral-500 text-base font-medium  leading-7">
              كود خصم دائم – عمولة على كل اشتراك ناجح
            </div>
          </div>
          <Link href={"/marketing-team/join-to-marketers"} className="px-12 py-6 bg-gradient-to-r from-primary to-secondary rounded-[20px] inline-flex justify-center items-center gap-2.5">
            <div className="justify-center text-neutral-50 text-base font-bold  leading-tight">
              ابدا التسجيل الأن
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUsAsMerketer;
