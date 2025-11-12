import React, { useEffect, useState } from "react";
import { useUser } from "../../../lib/useUser";

export const VerificationCodeModal = ({ show, setShow, setIsVerified }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const { login, user } = useUser();
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setVerificationCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode.length === 4) {
      await login({ phone: user?.phone, password: "1234", type: "marketer" });

      setIsVerified(true);
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  return show ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-[790px] min-h-[320px] flex flex-col items-center rounded-[30px] shadow-xl p-8">
        {/* Header */}
        <header className="text-[24px] font-bold text-gray-800 mt-4 mb-6 ">
          أدخل رمز التحقق
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 items-center w-full"
        >
          {/* Input */}
          <div className="w-full">
            <label htmlFor="verification-code" className="sr-only text-text">
              رمز التحقق (4 أرقام)
            </label>
            <input
              id="verification-code"
              type="text"
              value={verificationCode}
              onChange={handleInputChange}
              placeholder="رمز التحقق (4 أرقام)"
              maxLength="4"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-[16px] text-right text-xl font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary "
              aria-describedby="verification-code-help"
              required
            />
            <div id="verification-code-help" className="sr-only">
              أدخل رمز التحقق المكون من 4 أرقام
            </div>
          </div>

          {/* Button */}
          <button
            disabled={!verificationCode || verificationCode.length !== 4}
            type="submit"
            className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed max-w-[200px] px-8 py-4 bg-secondary text-white text-base font-bold rounded-[16px] shadow-md transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            تأكيد
          </button>
        </form>
      </div>
    </div>
  ) : null;
};
