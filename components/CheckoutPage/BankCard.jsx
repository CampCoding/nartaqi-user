import React, { useState } from "react";
import { Copy as CopyIcon } from "lucide-react";

/**
 * BankCard
 * - Matches the Anima layout/behavior
 * - Copy buttons with 2s "Copied!" feedback
 * - RTL labels/values
 * - Easily pass your own logo and fields
 */
const BankCard = ({
  bankName = "مصرف الراجحي",
  logoSrc = "/images/rajhi-logo.png",
  widthClass = "w-[640px]", // change to "w-full" if you want full width
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
      className={`flex flex-col ${widthClass} items-start gap-8 px-6 py-8 relative bg-white rounded-[30px] border-[3px] border-solid border-[#888c93]`}
    >
      {/* Header (Logo then Title) — same order as Anima */}
      <header className="flex items-center justify-between self-stretch w-full">
        <h1 className="relative flex items-center justify-center w-fit font-bold text-text text-2xl ">
          {bankName}
        </h1>
        <img
          className="relative w-[88px] h-[88px] aspect-[1] object-cover"
          alt={`${bankName} Logo`}
          src={logoSrc}
        />
      </header>

      {/* Fields */}
      <section className="flex flex-col items-start gap-4 self-stretch w-full">
        {items.map((info) => (
          <div
            key={info.id}
            className="flex items-center justify-between self-stretch w-full"
          >
            {/* Text (RTL, label above value) */}
            <div className="inline-flex flex-col items-start gap-2">
              <label className="font-semibold text-text text-base ">
                {info.label}
              </label>
              <div className="font-normal text-[#505256] text-lg text-right leading-normal">
                {info.value}
              </div>
            </div>

            {/* Copy button (left in LTR, visually on the left of the row like Anima) */}
            <button
              className="relative w-6 h-6 aspect-[1] cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => handleCopy(info.value, info.id)}
              aria-label={`Copy ${info.label} ${info.value}`}
              title={copiedField === info.id ? "Copied!" : "Click to copy"}
            >
              <CopyIcon className="absolute inset-0 m-auto w-[87%] h-[87%]" />
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BankCard;
