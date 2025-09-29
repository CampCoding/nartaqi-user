import React from "react";
import { InfoIcon } from "./../../public/svgs";

const MockTestReview = () => {
  return (
    <div className="min-h-screen  bg-white pt-[48px] pb-[32px]">
      <div className="container max-w-[1312px]  mx-auto ">
        <div className="text-center  mb-[16px] justify-center text-text text-3xl font-bold  leading-[50px]">
          قسم المراجعة
        </div>
        <div className=" w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-start items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold  leading-[50px]">
              التعليمات
            </div>
          </div>
        </div>
        <div className=" text-right justify-center">
          <span className="text-black text-base font-bold ">
            فيما يلي ملخص الإجاباتك يمكنك مراجعة اسئلتك بثلاث (3) طرق مختلفة
          </span>
          <span className="text-black text-base font-medium leading-loose ">
            <br />
            الأزرار الموجودة في الركن السفلي الأيسر تطابق هذه الخيارات:
            <br />
            <br />
            1- زر مراجعة الكل: قم بمراجعة كل أسئلتك وإجاباتك
            <br />
            2- زر مراجعة الغير مكتمل: قم بمراجعة الأسئلة غير المكتملة.
            <br />
            3- زر المميز بعلامة: قم بمراجعة الأسئلة المميزة بعلامة للمراجعة،
            انقر فوق رمز التمييز لتغيير حالة المراجعة.
            <br />
            <br />
            يمكنك أيضاً النقر فوق رقم السؤال للانتقال مباشرة إلى موقعه في
            الاختبار.
          </span>
        </div>

        <div className=" w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-between mt-[32px] items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold  leading-[50px]">
            القسم اللفظي
            </div>
          </div>

          <div className="text-right justify-center text-text text-2xl font-semibold font-['Cairo'] leading-[50px]">24 أسئلة غير مكتمله</div>
        </div>


        <div className="grid grid-cols-3 border-2 border-[#E4E4E7] rounded-[30px] overflow-hidden ">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        </div>



      </div>
        
    </div>
  );
};

export default MockTestReview;


// import React from "react";
// import image from "./image.svg";
// import vector2 from "./vector-2.svg";
// import vector from "./vector.svg";

export const Review = ({isFlagged = true , isCompleted = true}) => {
  return (
    <div className="flex items-center justify-between border border-[#E4E4E7] !px-4 !py-6 ">

    <div className="flex items-center justify-start gap-2  relative">
      {
        isFlagged ? <FilledFlagIcon/> : <OutlinedFlagIcon />
      }
      <div className="relative w-fit  font-medium text-text text-base text-right tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
        سؤال 1
      </div>

    </div>

    <div className="justify-start text-red-700 text-base font-medium font-noto">غير مكتمل</div>
    </div>
  );
};


const FilledFlagIcon =  (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      fill="#3B82F6"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const OutlinedFlagIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);