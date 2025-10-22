"use client";

import { Radio } from "antd";
import React, { useState, useRef, useEffect } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Container from "../../../components/ui/Container";

const VerificationCode = () => {
  const [value1, setValue1] = useState("Apple");
  const [phone, setPhone] = useState("");

  const [userParams, setUserParams] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
  });
  const plainOptions = ["Apple", "Pear", "Orange"];
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState("unconfirmed");

  const onChangePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  useEffect(() => {
    const firstName = searchParams?.get("firstName") || "";
    const middleName = searchParams?.get("middleName") || "";
    const lastName = searchParams?.get("lastName") || "";
    const gender = searchParams?.get("gender") || "";
    const p = searchParams?.get("phone") || "";

    setUserParams({ firstName, middleName, lastName, gender, phone: p });
    if (p) setPhone(p);
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between overflow-hidden">
      <div className="flex-1 flex justify-center items-center mx-auto flex-col py-8 md:py-16 lg:py-[64px] sm:px-6 md:px-8 max-w-[604px] w-full">
        <Frame phone={phone} user={userParams} />
      </div>

      {/* <div
        className="w-full h-32 sm:h-48 md:h-64 lg:w-[592px] lg:h-auto relative select-none"
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
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base"
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
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <div className="h-12 sm:h-14 md:h-[62px] justify-between px-3 sm:px-4 py-0 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
        <input
          dir="ltr"
          className="justify-center w-full font-normal text-text placeholder-[#c8c9d5] text-sm sm:text-base text-right tracking-[0] leading-[normal] flex items-center relative"
          placeholder={placeholder}
          {...props}
        />
        <div className="inline-flex items-center gap-1 sm:gap-2.5 px-2 sm:px-4 relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke">
          <div
            dir="ltr"
            className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-sm sm:text-base text-right tracking-[0] leading-[normal]"
          >
            +966
          </div>
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <SaudiIcon />
          </div>
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
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {subLabel}
        </div>
      </div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 pr-10 sm:pr-12 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base"
        />
        <div
          onClick={() => setShow(!show)}
          className="cursor-pointer absolute !top-1/2 left-2 sm:left-4 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6"
        >
          <Eye className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export const Frame = ({ phone = "", user = {} }) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]);
  const router = useRouter();
  const [error, setError] = useState("");

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

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      console.log("Verification code submitted:", code);
      // TODO: Call your backend to verify the code here.
      router.push("/");
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

  const maskPhone = (p) => {
    if (!p) return "********";
    const last4 = p.slice(-4);
    return `**** **** ${last4}`;
  };

  return (
    <Container>
      <div className="inline-flex w-full max-w-[488px] flex-col items-center gap-6 sm:gap-7 lg:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-7 lg:py-8 relative bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-2 lg:border-[3px] border-solid border-variable-collection-stroke">
        <div className="inline-flex flex-col items-center gap-6 sm:gap-7 lg:gap-8 relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-4 sm:gap-5 lg:gap-6 relative flex-[0_0_auto]">
            <img
              className="relative w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48 lg:w-[300px] lg:h-[200px] aspect-[1.5] object-contain"
              alt="Authentication cuate"
              src={"/images/Authentication-cuate 2.png"}
            />

            <h1 className="self-stretch font-bold text-text text-lg sm:text-xl md:text-2xl text-center relative flex items-center justify-center tracking-[0] leading-[normal] px-2">
              أدخل رمز التحقق
            </h1>
          </div>

          <p className="self-stretch  font-medium text-text-alt text-base text-center relative flex items-center justify-center tracking-[0] leading-[normal] ">
            لقد أرسلنا رمزا مكونا من 6 أرقام إلى رقم الواتساب الخاص بك المنتهي
            بـ {maskPhone(phone)}.
          </p>

          <div
            className="flex items-center justify-center gap-1 sm:gap-2 relative w-full flex-[0_0_auto]"
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
                className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-[10px] border-2 border-solid border-variable-collection-stroke aspect-[1] text-center text-sm sm:text-base md:text-lg font-medium text-text focus:border-primary focus:outline-none transition-colors"
                aria-label={`رقم ${index + 1} من رمز التحقق`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <button
            onClick={() => handleSubmit()}
            className="self-stretch px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5"
          >
            <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
              تأكيد
            </div>
          </button>

          <button
            onClick={handleResendCode}
            className="w-fit font-medium text-text-alt text-xs sm:text-sm relative flex items-center justify-center tracking-[0] leading-[normal] hover:text-primary transition-colors focus:outline-none focus:underline"
            aria-label="إعادة إرسال رمز التحقق"
          >
            إعادة ارسال الرمز
          </button>
        </div>
      </div>
    </Container>
  );
};
