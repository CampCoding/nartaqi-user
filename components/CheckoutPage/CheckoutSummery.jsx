import React, { useState } from "react";

const CheckoutSummery = () => {
  const [couponCode, setCouponCode] = useState("");

  const orderSummaryData = {
    title: "ملخص الطلب",
    subtotal: { label: "المجموع الفرعي", amount: "475 ر.س" },
    discount: { label: "الخصم", amount: "- 50 ر.س" },
    total: { label: "المجموع", amount: "425 ر.س" },
    coupon: {
      title: "إضافة كوبون",
      placeholder: "كود كوبون",
      buttonText: "إستخدام",
    },
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <section
      dir="rtl"
      className="flex flex-col items-start gap-2 sm:gap-3 pt-4 sm:pt-5 md:pt-6 pb-6 sm:pb-8 md:pb-10 px-3 sm:px-4 md:px-6 bg-white rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border-2 sm:border-[3px] border-solid border-variable-collection-stroke w-full"
      aria-label="ملخص الطلب"
    >
      {/* Title */}
      <header className="font-bold text-text text-lg sm:text-xl md:text-2xl leading-normal">
        {orderSummaryData.title}
      </header>

      {/* Subtotal */}
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-text-alt text-xs sm:text-sm md:text-base">
          {orderSummaryData.subtotal.label}
        </span>
        <span className="font-bold text-text-alt text-xs sm:text-sm md:text-base">
          {orderSummaryData.subtotal.amount}
        </span>
      </div>

      {/* Discount */}
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-text-alt text-xs sm:text-sm md:text-base">
          {orderSummaryData.discount.label}
        </span>
        <span className="font-bold text-secondary text-xs sm:text-sm md:text-base">
          {orderSummaryData.discount.amount}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between w-full border-t-2 sm:border-t-[3px] border-variable-collection-stroke pt-2 sm:pt-3 md:pt-4">
        <span className="font-bold text-secondary text-base sm:text-lg md:text-xl">
          {orderSummaryData.total.label}
        </span>
        <span className="font-bold text-secondary text-base sm:text-lg md:text-xl">
          {orderSummaryData.total.amount}
        </span>
      </div>

      {/* Coupon */}
      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 w-full mt-1">
        <h3 className="font-bold text-text text-xs sm:text-sm md:text-base">
          {orderSummaryData.coupon.title}
        </h3>

        <form
          onSubmit={handleCouponSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4 w-full"
        >
          {/* Input */}
          <label htmlFor="coupon" className="sr-only">
            {orderSummaryData.coupon.placeholder}
          </label>
          <div className="flex justify-end gap-2 px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border border-solid border-zinc-500 w-full focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
            <input
              id="coupon"
              type="text"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder={orderSummaryData.coupon.placeholder}
              className="w-full font-bold text-zinc-500 text-xs sm:text-sm md:text-base placeholder:text-zinc-500 outline-none"
              autoComplete="off"
              inputMode="text"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="flex w-full sm:w-[140px] md:w-[160px] lg:w-[180px] items-center justify-center gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 bg-secondary hover:bg-secondary-dark cursor-pointer rounded-[15px] sm:rounded-[18px] md:rounded-[20px] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-200"
            aria-label="تطبيق الكوبون"
          >
            <span className="font-bold text-white text-xs sm:text-sm md:text-base leading-normal whitespace-nowrap">
              {orderSummaryData.coupon.buttonText}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckoutSummery;
