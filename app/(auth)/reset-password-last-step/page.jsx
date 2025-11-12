"use client";

import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
// import image from "./image.png";
// import image1 from "./image.svg";
// import vector2 from "./vector-2.svg";
// import vector3 from "./vector-3.svg";
// import vector from "./vector.svg";

const ResetPasswordLastStep = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleAddError = (error) => {
    setErrors({ ...errors, ...error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddError({
      newPassword: newPassword ? null : "أدخل كلمة السر",
      confirmPassword: confirmPassword ? null : "أدخل تأكيد كلمة السر",
      notMatch:
        newPassword === confirmPassword ? null : "كلمة السر غير متطابقة",
    });

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      console.log("Password reset successful");
    }
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  return (
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
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-4 relative w-full flex-[0_0_auto]"
        >
          <div className="flex flex-col items-start gap-4 relative w-full flex-[0_0_auto]">
            <PasswordInput
              label="كلمة المرور الجديدة"
              subLabel={errors?.newPassword}
              placeholder="أدخل كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              label="تأكيد كلمة المرور الجديدة"
              subLabel={
                errors[errors.confirmPassword ? "confirmPassword" : "notMatch"]
              }
              placeholder="أدخل تأكيد كلمة المرور"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 relative w-full flex-[0_0_auto]">
            <button
              onClick={handleSubmit}
              className="self-stretch disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-primary rounded-2xl lg:rounded-[20px] inline-flex justify-center items-center gap-2.5"
              disabled={
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                تغيير كلمة المرور
              </div>
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ResetPasswordLastStep;

export const PasswordInput = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "",
  placeholder = "أدخل اسمك بالكامل",
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative w-full flex-[0_0_auto]">
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
          className="justify-start h-16 sm:h-18 md:h-20 lg:h-[78px] gap-2.5 px-3 sm:px-4 pr-6 sm:pr-12 bg-white rounded-2xl lg:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full flex-[0_0_auto] text-sm sm:text-base focus:border-primary focus:outline-none"
          {...props}
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
