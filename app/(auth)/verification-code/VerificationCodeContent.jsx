"use client";

import { Radio } from "antd";
import React, { useState, useRef, useEffect } from "react";
import RadioButtons from "../../../components/ui/RadioButtons";
import { SaudiIcon } from "../../../public/svgs";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../../../components/ui/Container";
import { useUser } from "../../../lib/useUser";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form"; // ✅ تمت الإضافة هنا
import axios from "axios";
import toast from "react-hot-toast";
import {
  signupUser,
  userSignUpdata,
} from "../../../components/utils/Store/Slices/authntcationSlice.jsx";
import { getExecutionDateTime } from "../../../components/utils/helpers/GetDeviceTime";

const VerificationCode = () => {
  const { userSignUpdata } = useSelector((state) => state.auth);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const phone = userSignUpdata?.phone;
  useEffect(() => {
    if (!userSignUpdata) {
      router.push("/sign-up");
    }
  }, [userSignUpdata]);
  const searchParams = useSearchParams();

  const [userParams, setUserParams] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    const firstName = searchParams?.get("firstName") || "";
    const middleName = searchParams?.get("middleName") || "";
    const lastName = searchParams?.get("lastName") || "";
    const gender = searchParams?.get("gender") || "";
    const p = searchParams?.get("phone") || "";

    setUserParams({ firstName, middleName, lastName, gender, phone: p });
    if (p) setPhoneNumber(p);
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between overflow-hidden">
      <div className="flex-1 flex justify-center items-center mx-auto flex-col py-8 md:py-16 lg:py-[64px] sm:px-6 md:px-8 max-w-[604px] w-full">
        <Frame
          phone={phoneNumber ? phoneNumber : phone}
          user={userSignUpdata}
        />
      </div>
    </div>
  );
};

export default VerificationCode;

// ✅ مكوّن Frame بعد دمج react-hook-form
export const Frame = ({ phone = "", user = {} }) => {
  const { login } = useUser();
  const router = useRouter();
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(user);

  // ✅ إعداد الفورم
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const sanitized = value.replace(/\D/g, "");
    setValue(`code.${index}`, sanitized);

    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  console.log(sendCodeLoading);

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !getValues(`code.${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    pastedData.split("").forEach((digit, i) => {
      if (/^\d$/.test(digit)) setValue(`code.${i}`, digit);
    });
  };

  const resendCode = async () => {
    setSendCodeLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/send-code`,
        {
          phone: phone,
          expires_at: getExecutionDateTime(),
        }
      );
      const updatedUser = { ...user, expires_at: getExecutionDateTime() };

      dispatch(userSignUpdata(updatedUser));
      toast.success(res.data.message, { duration: 2000 });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setSendCodeLoading(false);
    }
  };
  // ✅ عند الضغط على تأكيد
  const onSubmit = async (data) => {
    setLoading(true);
    const code = data.code.join("");
    if (code.length !== 6) {
      setError("يجب إدخال 6 أرقام");
      return;
    }
    const payload = {
      phone: phone,
      code: code,
      verified_at: user.expires_at,
    };
    console.log(payload);

    try {
      const verifiedData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/verify-code`,
        payload
      );
      if (verifiedData.data.status === "success") {
        toast.success(verifiedData.data.message);
        try {
          const res = await dispatch(signupUser(user)).unwrap();
          toast.success(res.message);
          router.push("/login");
        } catch (error) {
          console.log(error);
          toast.error(error);
          router.push("/sign-up");
        }
      }
      console.log(verifiedData.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const maskPhone = (p) => {
    if (!p) return "********";
    const last4 = p.slice(-4);
    return `**** **** ${last4}`;
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)} // ✅ هنا الفورم بقى خاضع للهاندل
        className="inline-flex w-full max-w-[488px] flex-col items-center gap-6 sm:gap-7 lg:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-7 lg:py-8 relative bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-2 lg:border-[3px] border-solid border-variable-collection-stroke"
      >
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

          {/* ✅ إضافة الـ Controller لكل input بدون ما نغيّر الديزاين */}
          <div
            className="flex items-center justify-center gap-1 sm:gap-2 relative w-full flex-[0_0_auto]"
            role="group"
            aria-label="رمز التحقق"
            dir="ltr"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Controller
                key={index}
                name={`code.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={field.value}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-[10px] border-2 border-solid border-variable-collection-stroke aspect-[1] text-center text-sm sm:text-base md:text-lg font-medium text-text focus:border-primary focus:outline-none transition-colors"
                    aria-label={`رقم ${index + 1} من رمز التحقق`}
                  />
                )}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-danger text-sm mt-1">{error}</p>}

        <div className="flex flex-col items-center gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <button
            type="submit"
            disabled={loading}
            className={`"self-stretch w-full  ${
              loading ? "bg-[#3B82F6]/50 cursor-not-allowed " : ""
            } px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-primary rounded-2xl inline-flex justify-center items-center gap-2.5"
              `}
          >
            <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
              {loading ? "جاري التحقق..." : "تأكيد"}
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              resendCode();
            }}
            className="w-fit font-medium text-text-alt text-xs sm:text-sm relative flex items-center justify-center tracking-[0] leading-[normal] hover:text-primary transition-colors focus:outline-none focus:underline"
          >
            {sendCodeLoading
              ? "جاري اعادة الارسال..."
              : "إعادة إرسال رمز التحقق"}
          </button>
        </div>
      </form>
    </Container>
  );
};
