"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordData } from "../../../components/utils/Store/Slices/authntcationSlice.jsx";
import { codeSchema } from "../../../components/utils/Schema/Code.js";
import Loading from "../../../components/shared/Loading.jsx";

const ResetPasswordCode = () => {
  const [sendingCode, setSendingCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600); // ⏱️ 10 دقايق
  const router = useRouter();
  const { resetPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!resetPassword?.phone) {
    useEffect(() => {
      router.push("/reset-password");
    }, []);

    return (
      <Container>
        <Loading />
      </Container>
    );
  } // ✅ عد تنازلي كل ثانية
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ فورم
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: { activationCode: "" },
  });

  // ✅ إرسال الكود من جديد
  const resendCode = async () => {
    setSendingCode(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/forgot/send-code`,
        { phone: resetPassword.phone }
      );

      toast.success(res.data.message, { duration: 2000 });
      setTimer(600); // ⏳ يبدأ العد من جديد بعد الإرسال
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإرسال");
    } finally {
      setSendingCode(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        phone: resetPassword?.phone,
        code: data.activationCode,
        verified_at: resetPassword?.expires_at,
      };
      console.log(payload);

      const { data: resData } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/forgot/verify-code`,
        { ...payload }
      );

      if (resData?.statusCode === 200) {
        toast.success(resData.message, { duration: 2000 });
        dispatch(resetPasswordData(payload));
        router.push(`/reset-password-last-step`);
      } else {
        toast.error(resData.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء التحقق");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      <div className="flex flex-col mx-auto my-6 sm:my-8 md:my-10 lg:my-[42px] w-full max-w-[638px] lg:h-[641px] items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 relative bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-2 lg:border-[3px] border-solid border-variable-collection-stroke">
        <header className="flex flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-6 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="w-fit mt-[-1.00px] font-bold text-text text-lg sm:text-xl md:text-2xl relative flex items-center justify-center tracking-[0] leading-[normal] text-center px-2">
              إعادة تعيين كلمة المرور
            </h1>

            <p className="self-stretch font-medium text-text-alt text-sm sm:text-base text-center relative flex items-center justify-center tracking-[0] leading-[normal] px-2">
              الرجاء إدخال كود التفعيل المكون من 6 أرقام المرسل إلى رقم هاتفك.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 lg:gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="self-stretch mt-[-1.00px] font-medium text-text-alt text-sm sm:text-base text-center relative flex items-center justify-center tracking-[0] leading-[normal]">
              الخطوة 2 من 3
            </div>

            <div
              className="relative self-stretch w-full h-3 sm:h-4 lg:h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
              role="progressbar"
              aria-valuenow="66"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progress: Step 2 of 3"
            >
              <div className="w-[66.66%] mr-auto h-3 sm:h-4 lg:h-[18px] bg-primary rounded-[50px]" />
            </div>
          </div>
        </header>

        <main className="flex flex-col lg:h-[299px] items-start gap-6 sm:gap-7 lg:gap-8 relative self-stretch w-full lg:mb-[-45.00px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-6 sm:gap-7 lg:gap-8 relative self-stretch w-full"
          >
            <div className="relative self-stretch w-full flex-[0_0_auto]">
              <label htmlFor="activation-code" className="sr-only">
                أدخل كود التفعيل
              </label>
              <input
                id="activation-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder="أدخل كود التفعيل"
                maxLength="6"
                dir="ltr"
                {...register("activationCode")}
                className={`flex items-center text-center justify-center gap-2.5 px-3 sm:px-4 py-4 sm:py-5 lg:py-6 relative self-stretch w-full bg-white rounded-2xl lg:rounded-[20px] border-2 border-solid ${
                  errors.activationCode ? "border-danger" : "border-[#c8c9d5]"
                } font-normal text-[#c8c9d5] text-sm sm:text-base tracking-[0] leading-[normal] text-text placeholder:text-[#c8c9d5] focus:border-primary focus:outline-none`}
                aria-describedby="code-help"
              />
              {errors.activationCode && (
                <p className="text-danger text-sm mt-2">
                  {errors.activationCode.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-4.5 lg:py-5 relative self-stretch w-full bg-primary hover:scale-105 transition rounded-xl lg:rounded-[15px] hover:bg-foundation-bluedarker duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="التالي - المتابعة إلى الخطوة التالية"
              >
                <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                  {loading ? "جاري التحقق" : "التالي"}
                </div>
              </button>

              <button
                type="button"
                onClick={resendCode}
                disabled={sendingCode || timer > 0}
                className={`w-fit font-bold text-primary text-sm sm:text-base relative flex items-center justify-center tracking-[0] leading-[normal] hover:text-primary focus:text-primary focus:outline-none focus:underline transition-colors duration-200 cursor-pointer mt-2 ${
                  sendingCode || timer > 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {sendingCode
                  ? "جاري الإرسال..."
                  : timer > 0
                  ? `إعادة الإرسال بعد ${formatTime(timer)}`
                  : "إعادة ارسال كود التفعيل"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </Container>
  );
};

export default ResetPasswordCode;
