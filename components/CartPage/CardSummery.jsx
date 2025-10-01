import Link from "next/link";
import React from "react";

const CardSummery = () => {
  return (
    <div className="w-[389px] h-[513px] p-8 bg-white rounded-[30px] shadow-[-5px_10px_50px_0px_rgba(249,115,22,0.50)] inline-flex flex-col justify-start items-start gap-4">
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="text-right h-[60px] flex items-center justify-center  text-3xl font-bold ">
          ملخص الطلب
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-right justify-center text-sup-title text-base font-semibold ">
              المجموع الفرعي
            </div>
            <div className="text-right justify-center text-sup-title text-base font-bold ">
              475 ر.س
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-right justify-center text-sup-title text-base font-semibold ">
              الخصم
            </div>
            <div className="text-right justify-center text-secondary text-base font-bold ">
              - 50 ر.س
            </div>
          </div>
        </div>
        <div className="self-stretch py-4 pb-7 border-t-[3px] border-stroke- inline-flex justify-between items-start">
          <div className="text-right justify-center text-secondary text-2xl font-bold ">
            المجموع
          </div>
          <div className="text-right justify-center text-secondary text-2xl font-bold ">
            425 ر.س
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-right justify-center text-text text-xs font-bold ">
            إضافة كوبون
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <div className="flex-1 px-2 py-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-500 flex justify-end items-center gap-4">
              <input
                placeholder="كود كوبون"
                className=" placeholder:text-sup-title w-full text-right justify-center text-text-alt text-[10px] font-bold "
              />
            </div>
            <div className="self-stretch cursor-pointer hover:scale-105 transition-all px-6 py-2 bg-secondary rounded-[10px] flex justify-end items-center gap-2.5">
              <div className="text-right  justify-center text-white text-[10px] font-bold ">
                إستخدام
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/checkout"} className="self-stretch hover:scale-105 transition-all cursor-pointer px-2 py-3 bg-secondary rounded-[10px] inline-flex justify-center items-center gap-2.5">
        <div className="text-right justify-center text-white text-base font-bold ">
          دفع
        </div>
      </Link>
    </div>
  );
};

export default CardSummery;
