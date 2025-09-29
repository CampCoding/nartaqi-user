"use client";

import React from "react";
import { Eye } from "lucide-react";

const ChangePassword = () => {
  return (
    <div className="">
      <div className=" h-[75px] flex items-center self-stretch text-center justify-center text-text text-4xl font-bold mb-[48px]">
        تغيير كلمة المرور {" "}
      </div>
      <ul className="space-y-[15px]">
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
      <div className=" w-full mt-8 px-12 py-5 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5">
        <div className="text-right justify-center text-white text-xl text-bold ">
          تغيير كلمة المرور
        </div>
      </div>
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
      <div className="justify-between flex items-center relative  w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="justify-start h-[78px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative  w-full flex-[0_0_auto]"
          {...props}
        />
        <div
          onClick={() => setShow(!show)}
          className=" cursor-pointer absolute !top-1/2 left-4 -translate-y-1/2"
        >
          <Eye />
        </div>
      </div>
    </div>
  );
};
