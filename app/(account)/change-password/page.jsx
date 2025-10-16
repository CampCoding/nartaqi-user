"use client";

import React from "react";
import { Eye } from "lucide-react";

const ChangePassword = () => {
  return (
    <div className="w-full">
      <div className="h-[60px] sm:h-[75px] flex items-center self-stretch text-center justify-center text-text text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-[48px]">
        تغيير كلمة المرور
      </div>

      <ul className="space-y-4 sm:space-y-[15px]">
        <li>
          <PasswordInput
            label="كلمة المرور القديمة"
            placeholder="أدخل كلمة المرور القديمة"
          />
        </li>
        <li>
          <PasswordInput
            label="كلمة المرور الجديدة"
            placeholder="أدخل كلمة المرور الجديدة"
          />
        </li>
        <li>
          <PasswordInput
            label="تأكيد كلمة المرور"
            placeholder="أعد إدخال كلمة المرور الجديدة"
          />
        </li>
      </ul>

      <button className="w-full mt-6 sm:mt-8 px-8 sm:px-12 py-4 sm:py-5 bg-primary rounded-xl sm:rounded-2xl inline-flex justify-center items-center gap-2.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200">
        <div className="text-center text-white text-lg sm:text-xl font-bold">
          تغيير كلمة المرور
        </div>
      </button>
    </div>
  );
};

export default ChangePassword;

export const PasswordInput = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "",
  placeholder = "أدخل اسمك بالكامل",
  ...props
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex w-full flex-1 flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative w-full flex-[0_0_auto]">
        <div className="font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        {subLabel && (
          <div className="font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
            {subLabel}
          </div>
        )}
      </div>

      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="justify-start h-[60px] sm:h-[70px] md:h-[78px] gap-2.5 px-4 pr-12 bg-white rounded-[15px] sm:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full flex-[0_0_auto] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          {...props}
        />
        <div
          onClick={() => setShow(!show)}
          className="cursor-pointer absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
