"use client";

import { Radio } from "antd";
import React, { useState } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const [value1, setValue1] = useState("Apple");
  const [phone , setPhone] = useState("")
  const plainOptions = ["Apple", "Pear", "Orange"];
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const router = useRouter();

  const [selected, setSelected] = useState("unconfirmed");

  const handleSendVerificationCode = () => {
    router.push(`/verification-code?phone=${phone}`);
  };

  const onChangePhone = ({target: { value } }) => {
    setPhone(value)
  };

  return (
    <div className=" flex justify-between overflow-hidden">
      <div className="flex-1 flex justify-center items-center mx-auto  flex-col py-[64px] max-w-[604px] ">
        <div className="inline-flex flex-col items-center gap-4 relative mb-[48px]">
          <img
            className="relative w-[100px] h-[95.42px] aspect-[1.05]"
            alt="Mask group"
            src={"/images/logo.svg"}
          />

          <p className="relative flex items-center justify-center w-fit  font-bold text-text text-2xl text-left tracking-[0] leading-[normal] ">
            هل نسيت كلمة المرور؟{" "}
          </p>
        </div>
        <div className="mx-auto w-full   space-y-[32px] ">
          <div className="grid grid-cols-3 gap-4  mb-4 ">
            <div className="col-span-3">
              <TelephoneInput
                onChange={onChangePhone}
                label="رقم الجوال"
                subLabel=""
                placeholder="ادخل رقم جوالك"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSendVerificationCode()}
              type="button"
              className="w-full px-12 py-6 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5"
            >
              <div className="text-right justify-center text-white text-base font-bold ">
                إرسال رمز التحقق
              </div>
            </button>
            <div className="  text-center justify-center">
              <span className="text-primary text-sm font-bold "> </span>
              <Link
                href={"/login"}
                className="text-primary text-sm font-bold  underline"
              >
                تسجيل الدخول{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="  w-[592px]  relative select-none "
        style={{
          backgroundImage: `url("/images/logo-banner.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default ForgetPassword;

export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-[62px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
      />
    </div>
  );
};

export const TelephoneInput = ({
  label = "رقم الجوال",
  subLabel = "(مثال: ٥٠٠٠٠٠٠٠٠)",
  placeholder = "123456789",
  ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative w-full">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <div className=" h-[62px] justify-between px-4 py-0 bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
        <input
          dir="ltr"
          className="justify-center w-full font-normal text-text placeholder-[#c8c9d5] text-base text-right tracking-[0] leading-[normal] flex items-center relative"
          placeholder={placeholder}
          {...props}
        />
        <div className="inline-flex items-center gap-2.5 px-4  relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke">
          <div
            dir="ltr"
            className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-base text-right tracking-[0] leading-[normal]"
          >
            +966
          </div>
          <SaudiIcon />
        </div>
      </div>
    </div>
  );
};

export const PasswordInput = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
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
          className="justify-start h-[62px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
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
