"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Container from "../../../components/ui/Container";
// import image from "./image.png";

const ResetPasswordPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    router.push("/reset-password-code");
  };

  const handleBackToLogin = () => {
    // Handle navigation back to login
    console.log("Navigate back to login");
  };

  return (
    <Container>
      <div className="flex mx-auto my-6 sm:my-8 md:my-10 lg:my-[42px] flex-col max-w-[638px] w-full lg:h-[641px] items-center gap-8 sm:gap-10 md:gap-12 lg:gap-14 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 relative bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border-2 lg:border-[3px] border-solid border-variable-collection-stroke">
        <header className="flex flex-col items-center justify-center gap-3 md:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="w-fit mt-[-1.00px] font-bold text-text text-lg sm:text-xl md:text-2xl relative flex items-center justify-center tracking-[0] leading-[normal] text-center px-2">
            إعادة تعيين كلمة المرور
          </h1>

          <div className="flex flex-col items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="self-stretch mt-[-1.00px] font-medium text-text-alt text-sm sm:text-base text-center relative flex items-center justify-center tracking-[0] leading-[normal]">
              الخطوة 1 من 3
            </div>

            <div
              className="relative self-stretch w-full h-3 sm:h-4 lg:h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
              role="progressbar"
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progress: Step 1 of 3"
            >
              <div className="w-[33.3333333%] mr-auto h-3 sm:h-4 lg:h-[18px] bg-primary rounded-[50px]" />
            </div>
          </div>
        </header>

        <main className="flex flex-col items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end gap-2 relative self-stretch w-full flex-[0_0_auto]"
          >
            <label
              htmlFor="phone-number"
              className="self-stretch mt-[-1.00px] font-bold text-text text-sm sm:text-base relative flex items-center justify-center tracking-[0] leading-[normal] text-center"
            >
              رقم الجوال
            </label>

            <div className="flex items-center justify-end gap-2.5 px-3 sm:px-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl lg:rounded-[20px] border-2 border-solid border-[#c8c9d5] focus-within:border-primary">
              <input
                id="phone-number"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="ادخل رقم جوالك"
                className="w-full mt-[-2.00px] py-4 sm:py-5 lg:py-6 font-normal text-text text-sm sm:text-base relative flex items-center justify-center tracking-[0] leading-[normal] placeholder:text-[#c8c9d5] bg-transparent border-none outline-none"
                dir="rtl"
                aria-required="true"
              />
            </div>
          </form>

          <div className="flex flex-col items-center justify-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-4.5 lg:py-5 relative self-stretch w-full flex-[0_0_auto] bg-primary hover:scale-105 transition rounded-xl lg:rounded-[15px] hover:bg-foundation-bluedarker duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Submit phone number"
            >
              <div className="text-right justify-center text-white text-sm sm:text-base font-bold">
                التالي
              </div>
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-fit font-bold text-foundation-bluedarker text-xs sm:text-sm underline relative flex items-center justify-center tracking-[0] leading-[normal] hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foundation-bluedarker focus:ring-offset-2 rounded-sm mt-2"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </main>
      </div>
    </Container>
  );
};

export default ResetPasswordPage;
