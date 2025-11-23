"use client";

import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgetPasswordSchema } from "../../../components/utils/Schema/ForgetPassword.schema.js";
import axios from "axios";
import toast from "react-hot-toast";
import { clearResetPasswordData } from "../../../components/utils/Store/Slices/authntcationSlice.jsx";
import LoadingPage from "../../../components/shared/Loading.jsx";
import { getExecutionDateTime } from "../../../components/utils/helpers/GetDeviceTime";

// ✅ Schema التحقق من الباسورد

const ResetPasswordLastStep = () => {
  const { resetPassword } = useSelector((state) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (!resetPassword?.code || !resetPassword?.phone) {
    useEffect(() => {
      router.push("/reset-password-code");
    }, []);

    return (
      <Container>
        <LoadingPage />
      </Container>
    );
  }

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resendCode = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/forgot/send-code`,
        { phone: resetPassword?.phone }
      );
      console.log(res);

      toast.success(res.data.message, { duration: 2000 });
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      phone: resetPassword?.phone,
      code: resetPassword?.code,
      password: data?.password,
      password_confirmation: data?.confirmPassword,
    };
    try {
      console.log(getExecutionDateTime());

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/forgot/reset`,
        payload
      );
      if (res.data.statusCode === 200) {
        toast.success(res.data.message, { duration: 2000 });
        dispatch(clearResetPasswordData());
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      if (error.response.data.statusCode === 408) {
        resendCode();
        router.push("/reset-password-code");
      }
    } finally {
      setLoading(false);
    }
    console.log("Password reset data:", data);
  };
  console.log(errors);

  return (
    <>
      {resetPassword ? (
        <Container>
          <div className="flex mx-auto my-6 sm:my-8 md:my-10 lg:my-[40px] flex-col w-full max-w-[638px] items-center gap-6 sm:gap-7 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 relative bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-2 lg:border-[3px] border-solid border-variable-collection-stroke">
            <header className="flex flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-6 relative w-full flex-[0_0_auto]">
              <div className="flex flex-col items-center gap-2 relative w-full flex-[0_0_auto]">
                <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-text text-lg sm:text-xl md:text-2xl tracking-[0] leading-[normal] text-center px-2">
                  إعادة تعيين كلمة المرور
                </h1>

                <p className="font-medium text-text-alt text-center relative flex items-center justify-center text-sm sm:text-base tracking-[0] leading-[normal] px-2">
                  الرجاء تعيين كلمة مرور جديدة لحسابك.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 lg:gap-4 relative w-full flex-[0_0_auto]">
                <div className="mt-[-1.00px] font-medium text-text-alt text-center relative flex items-center justify-center text-sm sm:text-base tracking-[0] leading-[normal]">
                  الخطوة 3 من 3
                </div>

                <div
                  className="relative w-full h-3 sm:h-4 lg:h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Progress: Step 3 of 3"
                >
                  <div className="relative -top-px w-full h-3 sm:h-4 lg:h-[18px] bg-primary rounded-[50px]" />
                </div>
              </div>
            </header>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-4 relative w-full flex-[0_0_auto]"
            >
              <div className="flex flex-col items-start gap-4 relative w-full flex-[0_0_auto]">
                <PasswordInput
                  name="password"
                  label="كلمة المرور الجديدة"
                  subLabel={errors.password?.message}
                  placeholder="أدخل كلمة المرور الجديدة"
                  {...register("password")}
                  trigger={trigger}
                />
                <PasswordInput
                  name="confirmPassword"
                  label="تأكيد كلمة المرور الجديدة"
                  subLabel={errors.confirmPassword?.message}
                  placeholder="أدخل تأكيد كلمة المرور"
                  {...register("confirmPassword")}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 relative w-full flex-[0_0_auto]">
                <button
                  type="submit"
                  className={`self-stretch ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }  px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-primary rounded-2xl lg:rounded-[20px] inline-flex justify-center items-center gap-2.5`}
                >
                  <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                    {loading
                      ? "جاري تغيير كلمة المرور..."
                      : "تغيير كلمة المرور"}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="h-screen bg-white"></div>
        </Container>
      )}
    </>
  );
};

export default ResetPasswordLastStep;

// ✅ نفس الـ design بالضبط، مع إضافة الفاليديشن
export const PasswordInput = ({
  name,
  label = "الاسم رباعي باللغة العربية",
  subLabel = "",
  placeholder = "أدخل اسمك بالكامل",
  trigger,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
          {label}
        </div>
        {subLabel && (
          <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
            {subLabel}
          </div>
        )}
      </div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className="justify-start h-16 sm:h-18 md:h-20 lg:h-[78px] gap-2.5 px-3 sm:px-4 pr-6 sm:pr-12 bg-white rounded-2xl lg:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full flex-[0_0_auto] text-sm sm:text-base focus:border-primary focus:outline-none"
          {...props}
          onBlur={(e) => {
            props.onBlur?.(e); // ✅ يخلي RHF يحافظ على شغله
            trigger?.(name); // ✅ يشغّل التحقق لما المستخدم يسيب الحقل
          }}
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
