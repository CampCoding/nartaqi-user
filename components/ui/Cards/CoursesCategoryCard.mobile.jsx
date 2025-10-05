import React from "react";

const CoursesCategoryCardMobile = ({
  data,
  freeWidth = false,
}) => {


  const width = freeWidth ? "w-[100%]" : "w-[177px]";


  return (
    <article 
    
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%), url('${data?.image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className={`flex flex-col ${width} h-[200px] items-start justify-end gap-2.5 px-2 py-4 relative rounded-[20px] `}>
      <div className="flex flex-col items-start justify-end gap-2 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="relative text-white font-bold w-fit mt-[-0.28px] font-cairo-bold-xs  text-pure-white-ffffff text-[length:var(--cairo-bold-xs-font-size)] text-left tracking-[var(--cairo-bold-xs-letter-spacing)] leading-[var(--cairo-bold-xs-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--cairo-bold-xs-font-style)]">
          التحصيلي
        </h2>

        <p className="relative w-fit font-cairo-regular-xs font-[number:var(--cairo-regular-xs-font-weight)] text-[#fdd4b7] text-[length:var(--cairo-regular-xs-font-size)] text-left tracking-[var(--cairo-regular-xs-letter-spacing)] leading-[var(--cairo-regular-xs-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--cairo-regular-xs-font-style)]">
          15 دورة
        </p>
      </div>
    </article>
  );
};

export default CoursesCategoryCardMobile;
