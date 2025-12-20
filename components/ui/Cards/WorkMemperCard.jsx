import React from "react";

const WorkMemperCard = ({ data, color }) => {
  return (
    <div className="  w-full md:w-auto p-6 py-8 md:p-12 bg-white rounded-[30px] outline outline-2 outline-offset-[-2px] outline-slate-400 inline-flex flex-col justify-start items-center gap-6">
      <img
        loading="lazy"
        className="w-[124px] h-[124px]  relative rounded-full object-cover"
        src={data.image}
      />
      <div className="size- flex flex-col justify-start items-center gap-4">
        <div className="self-stretch flex flex-col justify-start items-center">
          <div className="self-stretch text-center justify-center leading-normal text-text text-base font-medium ">
            {data.name}
          </div>
          <div className="justify-center text-primary leading-normal text-base font-medium ">
            {data.email}
          </div>
        </div>
        <div
          className={` px-6 py-2  rounded-[20px] inline-flex justify-center items-center gap-2.5`}
          style={{
            backgroundColor: color || "#F97316",
          }}
        >
          <div className="justify-center text-white text-sm font-bold leading-normal ">
            {data.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkMemperCard;
