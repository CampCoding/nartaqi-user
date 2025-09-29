"use client";

import { Radio } from "antd";
import React, { useState, useRef, useEffect } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerificationCode = () => {
  const [value1, setValue1] = useState("Apple");
  const [phone, setPhone] = useState("");
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

  const onChangePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  return (
    <div className=" flex justify-between overflow-hidden">
      <div className="flex-1 flex justify-center items-center mx-auto  flex-col py-[64px] max-w-[604px] ">
        <Frame />
      </div>

      {/* <div
        className="  w-[592px]  relative select-none "
        style={{
          backgroundImage: `url("/images/logo-banner.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      /> */}
    </div>
  );
};

export default VerificationCode;

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

export const Frame = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...verificationCode];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setVerificationCode(newCode);

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((code) => code === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      console.log("Verification code submitted:", code);
      // Handle verification logic here
    }
  };

  const handleResendCode = () => {
    console.log("Resending verification code...");
    // Handle resend logic here
  };

  useEffect(() => {
    // Focus on first input when component mounts
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="inline-flex max-w-[488px] flex-col items-center gap-8 px-20 py-8 relative bg-white rounded-[50px] border-[3px] border-solid border-variable-collection-stroke">
      <div className="inline-flex flex-col items-center gap-8 relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-center gap-6 relative flex-[0_0_auto]">
          <img
            className="relative w-[300px] h-[200px] aspect-[1.5]"
            alt="Authentication cuate"
            src={"/images/Authentication-cuate 2.png"}
          />

          <h1 className="self-stretch  font-bold text-text text-2xl text-center relative flex items-center justify-center tracking-[0] leading-[normal] ">
            أدخل رمز التحقق
          </h1>
        </div>

        <p className="self-stretch  font-medium text-text-alt text-base text-center relative flex items-center justify-center tracking-[0] leading-[normal] ">
          لقد أرسلنا رمزا مكونا من 6 أرقام إلى رقم الواتساب الخاص بك المنتهي بـ
          ٠٥٠ ١٢٣ ٤٥٦٧.
        </p>

        <div
          className="flex items-center justify-center gap-2 relative w-full flex-[0_0_auto]"
          role="group"
          aria-label="رمز التحقق"
          dir="ltr"
        >
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleInputChange(index, e.target.value.replace(/\D/g, ""))
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="relative w-12 h-12 bg-white rounded-[10px] border-2 border-solid border-variable-collection-stroke aspect-[1] text-center text-lg font-medium text-text focus:border-primary focus:outline-none transition-colors"
              aria-label={`رقم ${index + 1} من رمز التحقق`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <button
          onClick={() => handleSubmit()}
          className="self-stretch px-12 py-4 bg-blue-500 rounded-2xl inline-flex justify-center items-center gap-2.5"
        >
          <div className="text-right justify-center text-white text-base font-bold ">
            تأكيد
          </div>
        </button>

        <button
          onClick={handleResendCode}
          className="w-fit  font-medium text-text-alt text-sm relative flex items-center justify-center tracking-[0] leading-[normal]  hover:text-primary transition-colors focus:outline-none focus:underline"
          aria-label="إعادة إرسال رمز التحقق"
        >
          إعادة ارسال الرمز
        </button>
      </div>
    </div>
  );
};
