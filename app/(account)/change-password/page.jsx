"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Eye } from "lucide-react";
import { changePasswordSchema } from "../../../components/utils/Schema/ChangePassword.Schema.js";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form Data:", data);
    const payload = {
      current_password: data?.oldPassword,
      new_password: data?.newPassword,
      new_password_confirmation: data?.confirmPassword,
    };
    console.log(payload);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/change_password`,
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          toast.error(value[0]);
        }
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="w-full">
      <div className="h-[60px] sm:h-[75px] flex items-center self-stretch text-center justify-center text-text text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-[48px]">
        تغيير كلمة المرور
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-[15px]"
      >
        <PasswordInput
          label="كلمة المرور القديمة"
          placeholder="أدخل كلمة المرور القديمة"
          error={errors.oldPassword?.message}
          {...register("oldPassword")}
        />

        <PasswordInput
          label="كلمة المرور الجديدة"
          placeholder="أدخل كلمة المرور الجديدة"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <PasswordInput
          label="تأكيد كلمة المرور"
          placeholder="أعد إدخال كلمة المرور الجديدة"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          className="w-full mt-6 sm:mt-8 px-8 sm:px-12 py-4 sm:py-5 bg-primary rounded-xl sm:rounded-2xl inline-flex justify-center items-center gap-2.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200"
        >
          <div className="text-center text-white text-lg sm:text-xl font-bold">
            تغيير كلمة المرور
          </div>
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
export const PasswordInput = ({
  label,
  subLabel,
  placeholder,
  error,
  ...props
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex w-full flex-1 flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative w-full">
        <div className="font-bold text-text text-sm sm:text-base">{label}</div>
        {subLabel && (
          <div className="font-medium text-danger text-sm sm:text-base">
            {subLabel}
          </div>
        )}
      </div>

      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...props}
          className={`h-[60px] sm:h-[70px] md:h-[78px] px-4 pr-12 bg-white rounded-[15px] sm:rounded-[20px] border-2 flex items-center w-full text-sm sm:text-base focus:outline-none transition-all duration-200
          ${
            error
              ? "border-danger focus:border-danger"
              : "border-[#c8c9d5] focus:ring-2 focus:ring-primary focus:border-primary"
          }
        `}
        />

        <div
          onClick={() => setShow(!show)}
          className="cursor-pointer absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </div>
      </div>

      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
};
