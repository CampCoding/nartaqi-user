import React from "react";

const TeacherFunFacts = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-zinc-500 to-secondary rounded-[30px] inline-flex justify-between items-center">
    <div className=" flex-1 self-stretch py-8 border-white inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white text-2xl font-medium ">طالب</div>
        <div className="self-stretch text-center  text-white text-5xl font-bold  h-[90px] flex items-center justify-center">10,000</div>
    </div>
    <div className=" flex-1 self-stretch py-8 border-x border-white inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white text-2xl font-medium ">دورة تدريبية</div>
        <div className="text-center  text-white text-5xl font-bold  h-[90px] flex items-center justify-center">40</div>
    </div>
    <div className=" flex-1 self-stretch py-8 inline-flex flex-col justify-start items-center gap-2">
        <div className="text-center justify-center text-white text-2xl font-medium ">تقييمات إيجابية</div>
        <div className=" text-center  text-white text-5xl font-bold  h-[90px] flex items-center justify-center">%95</div>
    </div>
</div>
  );
};

export default TeacherFunFacts;