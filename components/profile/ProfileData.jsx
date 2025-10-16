import React from "react";

const ProfileData = () => {
  return (
    <main className="flex flex-col items-center flex-1 w-full">
      <div className="flex flex-col items-center relative w-full" role="main">
        <div
          className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]"
          aria-labelledby="profile-name"
        >
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[100px] aspect-[1] bg-[url(/images/Image-12422.png)] bg-cover bg-[50%_50%]"
            role="img"
            aria-label="Profile picture of محمد علي عبد الحميد"
          />

          <button className="absolute hover:scale-105 bottom-0 left-0 transition-transform duration-200">
            <EditIcon />
          </button>
        </div>
        <h1
          id="profile-name"
          className="relative flex items-center justify-center self-stretch font-bold text-text text-lg sm:text-xl md:text-2xl text-center tracking-[0] leading-[normal] mt-2 sm:mt-4"
        >
          محمد علي عبد الحميد
        </h1>
      </div>

      <button
        className="inline-flex mt-4 sm:mt-6 items-center justify-center gap-2.5 px-6 sm:px-8 md:px-12 py-3 sm:py-4 relative rounded-[20px] border-2 border-solid border-variable-collection-sup-title hover:bg-variable-collection-sup-title hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-variable-collection-sup-title focus:ring-opacity-50 transition-all duration-200 cursor-pointer w-full sm:w-auto"
        type="button"
        aria-label="تعديل الملف الشخصي"
      >
        <span className="relative flex items-center justify-center w-fit font-semibold text-text-alt text-sm sm:text-base text-left tracking-[0] leading-8 whitespace-nowrap">
          تعديل الملف الشخصي
        </span>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-x-[29px] sm:gap-y-[31px] mt-6 sm:mt-[32px]">
        <Input label="الأسم الأول" subLabel="" placeholder="" />
        <Input label="الأسم الوسط" subLabel="" placeholder="" />
        <Input label="اسم العائله" subLabel="" placeholder="" />
        <Input label="رقم الجوال" subLabel="" placeholder="" />
      </div>
    </main>
  );
};

export default ProfileData;

const EditIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="sm:w-6 sm:h-6"
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#3B82F6" />
    <path
      d="M11.4786 6.82031H7.21746C6.89457 6.82031 6.5849 6.95262 6.35659 7.18812C6.12827 7.42362 6 7.74303 6 8.07608V16.8665C6 17.1995 6.12827 17.5189 6.35659 17.7544C6.5849 17.9899 6.89457 18.1222 7.21746 18.1222H15.7397C16.0626 18.1222 16.3722 17.9899 16.6005 17.7544C16.8289 17.5189 16.9571 17.1995 16.9571 16.8665V12.4713"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3606 6.58543C15.6028 6.33564 15.9312 6.19531 16.2737 6.19531C16.6162 6.19531 16.9446 6.33564 17.1868 6.58543C17.429 6.83522 17.565 7.174 17.565 7.52726C17.565 7.88051 17.429 8.2193 17.1868 8.46908L11.7003 14.1288C11.5558 14.2778 11.3772 14.3868 11.1811 14.4459L9.43219 14.9733C9.37981 14.9891 9.32428 14.99 9.27143 14.9761C9.21857 14.9621 9.17033 14.9337 9.13175 14.8939C9.09317 14.8541 9.06567 14.8044 9.05213 14.7499C9.03858 14.6953 9.0395 14.6381 9.05478 14.584L9.56611 12.7801C9.62365 12.578 9.72957 12.394 9.87413 12.2452L15.3606 6.58543Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        {subLabel && (
          <div className="font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
            {subLabel}
          </div>
        )}
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-[60px] sm:h-[70px] md:h-[78px] gap-2.5 px-3 sm:px-4 bg-white rounded-[15px] sm:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
      />
    </div>
  );
};
