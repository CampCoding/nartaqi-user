import React from "react";
import { CloseIcon, RatingStarIcon } from "../../public/svgs";
// import vector2 from "./vector-2.svg";

export const MobileCartItem = ({ data, onRemove }) => {
  const courseData = {
    image: "/images/Frame 1000004932.png",
    title: "دورة مهارات التعامل مع اختبار القدرات العامة",
    rating: 4.5,
    category: "مهارات التعليم والتدريس",
    price: "95 ر.س",
    instructor: {
      name: "جون سميث",
      avatar: "/images/image-24.png",
    },
    badge: "طالبات",
  };

  return (
    <article className="flex w-full  items-start justify-start relative bg-white rounded-[20px] overflow-hidden border-2 border-solid border-variable-collection-stroke">
      <div
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%), url("${courseData?.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative self-stretch w-[146px] bg-[linear-gradient(0deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.25)_100%)]"
      >
        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2 absolute top-3 right-3 bg-[#f08b9b] rounded-[10px] border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] before:[background:linear-gradient(134deg,rgba(127,127,129,0.2)_0%,rgba(228,228,231,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
          <span className="w-fit  font-normal text-white text-[10px] text-left leading-[12.5px] whitespace-nowrap [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
            {courseData.badge}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full items-start px-0 py-4 relative">
        <div className="flex flex-col items-start gap-4 pt-0 pb-2 px-0 pl-4 relative self-stretch w-full flex-[0_0_auto]">
          <header className="flex items-start justify-between pl-0 pr-2 py-0 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="flex-1 font-cairo-bold-xs   text-[length:var(--cairo-bold-xs-font-size)] leading-[var(--cairo-bold-xs-line-height)] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[var(--cairo-bold-xs-letter-spacing)] ">
              {courseData.title}
            </h1>
            <CloseIcon
              onClick={onRemove}
              width={30}
              height={30}
              className=" left-2 cursor-pointer active:bg-red-200 rounded-full"
            />
          </header>

          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between pl-0 pr-2 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] bg-[#c2d8fc] rounded-[10px]">
                <span className="w-[99px]  font-normal  text-[10px] text-left leading-[12.5px] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                  {courseData.category}
                </span>
              </div>
              <div className="inline-flex items-center justify-center gap-1 relative flex-[0_0_auto]">
                <div
                  className="inline-flex items-center gap-0.5 relative flex-[0_0_auto]"
                  role="img"
                  aria-label={`Rating: ${courseData.rating} out of 5`}
                >
                  <span className="w-fit  font-medium  text-[10px] leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                    {courseData.rating}
                  </span>
                  <RatingStarIcon />
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between pl-0 pr-2 pt-2 pb-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-variable-collection-stroke">
              <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                <img
                  className="relative w-4 h-4 rounded-xl bg-cover bg-[50%_50%]"
                  src={courseData.instructor.avatar}
                  alt={`${courseData.instructor.name} avatar`}
                />
                <span className="w-fit  font-medium  text-[10px] text-left leading-[normal] [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                  المدرس: {courseData.instructor.name}
                </span>
              </div>
              <div className="w-fit font-cairo-bold-base font-bold text-blue-500 text-[length:var(--cairo-bold-base-font-size)] text-center leading-[var(--cairo-bold-base-line-height)] whitespace-nowrap [direction:rtl] relative flex items-center justify-center mt-[-1.00px] tracking-[var(--cairo-bold-base-letter-spacing)] ">
                {courseData.price}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
};
