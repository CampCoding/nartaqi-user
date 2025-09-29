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
    console.log("Applying coupon:", couponCode);
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <section className="flex flex-col  items-start gap-4 pt-8 pb-12 px-8 bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      {/* Title */}
      <header className="relative font-bold text-text text-[32px] leading-[normal] ">
        {orderSummaryData.title}
      </header>

      {/* Subtotal */}
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-text-alt text-base ">
          {orderSummaryData.subtotal.label}
        </span>
        <span className="font-bold text-text-alt text-base ">
          {orderSummaryData.subtotal.amount}
        </span>
      </div>

      {/* Discount */}
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-text-alt text-base ">
          {orderSummaryData.discount.label}
        </span>
        <span className="font-bold text-secondary text-base ">
          {orderSummaryData.discount.amount}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between w-full border-t-[3px] border-variable-collection-stroke pt-4">
        <span className="font-bold text-secondary text-2xl ">
          {orderSummaryData.total.label}
        </span>
        <span className="font-bold text-secondary text-2xl ">
          {orderSummaryData.total.amount}
        </span>
      </div>

      {/* Coupon */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-text text-base ">
          {orderSummaryData.coupon.title}
        </h3>

        <form
          onSubmit={handleCouponSubmit}
          className="flex items-center gap-6 w-full"
        >
          {/* Input */}
          <div className="flex  justify-end gap-4 px-4 py-6 bg-white rounded-[20px] border border-solid border-zinc-500 w-full focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
            <input
              type="text"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder={orderSummaryData.coupon.placeholder}
              className="w-full font-bold text-zinc-500 text-base  placeholder:text-zinc-500 outline-none focus:outline-none"
            />
          </div>

          {/* Button */}
          <button 
            type="submit"
            className="flex w-[191px] items-center justify-center gap-2.5 px-6 py-4 relative bg-secondary hover:bg-secondary-dark cursor-pointer rounded-[20px] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:bg-secondary-dark transition-colors duration-200"
          >
            <div className="relative flex items-center justify-center w-fit  font-bold text-white text-base tracking-[0] leading-[normal] ">
              {orderSummaryData.coupon.buttonText}
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckoutSummery;
