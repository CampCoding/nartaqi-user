import React, { useState } from "react";
import { Copy as CopyIcon } from "lucide-react";

/**
 * BankCard
 * - Responsive design with smaller sizes
 * - Copy buttons with 2s "Copied!" feedback
 * - RTL labels/values
 * - Optimized for mobile and desktop
 */
const BankCard = ({
  bankName = "مصرف الراجحي",
  logoSrc = "/images/rajhi-logo.png",
  widthClass = "w-full", // default to full width for better responsiveness
  items = [
    { id: "account", label: "رقم الحساب:", value: "SA1234567890123456789012" },
    { id: "iban", label: "رقم الايبان:", value: "SA123456789012345678901234" },
  ],
}) => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, fieldId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <main
      className={`flex flex-col ${widthClass} items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 relative bg-white rounded-[15px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[30px] border-2 sm:border-[3px] border-solid border-[#888c93]`}
    >
      {/* Header (Logo then Title) */}
      <header className="flex items-center justify-between self-stretch w-full">
        <h1 className="relative flex items-center justify-center w-fit font-bold text-text text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
          {bankName}
        </h1>
        <img
          loading="lazy"
          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] aspect-[1] object-cover flex-shrink-0"
          alt={`${bankName} Logo`}
          src={logoSrc}
        />
      </header>

      {/* Fields */}
      <section className="flex flex-col items-start gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 self-stretch w-full">
        {items.map((info) => (
          <div
            key={info.id}
            className="flex items-start sm:items-center justify-between self-stretch w-full gap-2 sm:gap-3"
          >
            {/* Text (RTL, label above value) */}
            <div className="inline-flex flex-col items-start gap-1 sm:gap-1.5 md:gap-2 flex-1 min-w-0">
              <label className="font-semibold text-text text-xs sm:text-sm md:text-base leading-tight">
                {info.label}
              </label>
              <div className="font-normal text-[#505256] text-sm sm:text-base md:text-lg text-right leading-normal break-all sm:break-normal">
                {info.value}
              </div>
            </div>

            {/* Copy button */}
            <button
              className="relative w-5 h-5 sm:w-6 sm:h-6 aspect-[1] cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded flex-shrink-0 mt-0.5 sm:mt-0"
              onClick={() => handleCopy(info.value, info.id)}
              aria-label={`Copy ${info.label} ${info.value}`}
              title={copiedField === info.id ? "Copied!" : "Click to copy"}
            >
              <CopyIcon className="absolute inset-0 m-auto w-[85%] h-[85%] text-gray-600" />
            </button>
          </div>
        ))}
      </section>

      {/* Copied feedback for mobile */}
      {copiedField && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium z-50 sm:hidden">
          تم النسخ!
        </div>
      )}
    </main>
  );
};

export default BankCard;
