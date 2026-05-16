"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  checkCoupon,
  clearCoupon,
  payCart,
} from "@/components/utils/Store/Slices/cartSlice";

const CardSummery = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    totalPrice,
    totalItems,
    isLoading,
    coupon,
    isCheckingCoupon,
    couponError,
    isPaying,
  } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState("");

  // ✅ Sync local input with Redux coupon state
  useEffect(() => {
    if (coupon?.coupon_code) {
      setCouponCode(coupon.coupon_code);
    } else {
      setCouponCode("");
    }
  }, [coupon]);

  // ✅ Apply coupon - always with target: "store" in cart
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("ادخل كود الكوبون");
      return;
    }

    if (totalItems === 0) {
      toast.error("السلة فارغة");
      return;
    }

    try {
      await dispatch(
        checkCoupon({
          code: couponCode.trim(),
          target: "store",
        })
      ).unwrap();

      toast.success("تم تطبيق الكوبون بنجاح ✨");
    } catch (error) {
      toast.error(error || "كود الكوبون غير صحيح");
    }
  };

  // ✅ Remove applied coupon
  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
    setCouponCode("");
    toast.success("تم إلغاء الكوبون");
  };

  // ✅ Handle payment
  const handlePay = async () => {
    if (totalItems === 0) return;

    try {
      const result = await dispatch(
        payCart({
          couponCode: coupon?.coupon_code || null,
        })
      ).unwrap();

      if (result?.url) {
        toast.success("جارٍ التحويل لصفحة الدفع...");
        window.location.href = result.url;
      } else {
        toast.error("لم نستطع الحصول على رابط الدفع");
      }
    } catch (error) {
      toast.error(error || "حدث خطأ أثناء الدفع");
    }
  };

  // ✅ Calculate prices
  const originalPrice = coupon ? Number(coupon.original_price) : totalPrice;
  const discountAmount = coupon ? Number(coupon.discount_amount) : 0;
  const finalTotal = coupon ? Number(coupon.final_price) : totalPrice;

  // ✅ Format discount display
  const formatDiscount = () => {
    if (!coupon) return "";
    if (coupon.discount_type === "percentage") {
      return `${parseFloat(coupon.discount_value)}%`;
    }
    return `${parseFloat(coupon.discount_value).toFixed(2)} ج.م`;
  };

  return (
    <div className="w-full lg:w-[360px] p-6 pb-10 bg-white rounded-[26px] shadow-[-5px_10px_50px_0px_rgba(249,115,22,0.50)] inline-flex flex-col justify-start items-start gap-3">
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="text-right h-[52px] flex items-center justify-center text-2xl font-bold">
          ملخص الطلب
        </div>

        {/* Items count */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-right text-sup-title text-sm font-semibold">
              عدد العناصر
            </div>
            <div className="text-right text-sup-title text-sm font-bold">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                totalItems
              )}
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-right text-sup-title text-sm font-semibold">
              المجموع الفرعي
            </div>
            <div className="text-right text-sup-title text-sm font-bold">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                `${originalPrice.toFixed(2)} ج.م`
              )}
            </div>
          </div>
        </div>

        {/* ✅ Discount line - only if coupon applied */}
        {coupon && (
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="text-right text-sup-title text-sm font-semibold flex items-center gap-1">
                <span>الخصم</span>
                <span className="text-xs text-gray-500">
                  ({formatDiscount()})
                </span>
              </div>
              <div className="text-right text-secondary text-sm font-bold">
                - {discountAmount.toFixed(2)} ج.م
              </div>
            </div>
            <div className="text-[10px] text-green-600 font-medium">
              كوبون: {coupon.coupon_code}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="self-stretch py-3 pb-6 border-t-[3px] border-stroke- inline-flex justify-between items-start">
          <div className="text-right text-secondary text-xl font-bold">
            المجموع
          </div>
          <div className="text-right text-secondary text-xl font-bold">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              `${finalTotal.toFixed(2)} ج.م`
            )}
          </div>
        </div>

        {/* ✅ Coupon input */}
        <div className="self-stretch flex flex-col justify-center items-start gap-1.5">
          <div className="self-stretch text-right text-text text-xs font-bold">
            إضافة كوبون
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-3">
            <div className="flex-1 px-2 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-500 flex justify-end items-center gap-3">
              <input
                placeholder="كود كوبون"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={!!coupon || isCheckingCoupon}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !coupon) {
                    handleApplyCoupon();
                  }
                }}
                className="placeholder:text-sup-title w-full text-right text-text-alt text-[10px] font-bold disabled:bg-gray-100 disabled:text-green-700 outline-none"
              />
            </div>
            {coupon ? (
              <button
                onClick={handleRemoveCoupon}
                className="self-stretch cursor-pointer hover:scale-105 transition-all px-5 py-2 bg-red-500 rounded-[10px] flex justify-end items-center gap-2.5"
              >
                <div className="text-right text-white text-[11px] font-bold whitespace-nowrap">
                  إلغاء
                </div>
              </button>
            ) : (
              <button
                onClick={handleApplyCoupon}
                disabled={
                  isCheckingCoupon || !couponCode.trim() || totalItems === 0
                }
                className="self-stretch cursor-pointer hover:scale-105 transition-all px-5 py-2 bg-secondary rounded-[10px] flex justify-end items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-right text-white text-[11px] font-bold whitespace-nowrap">
                  {isCheckingCoupon ? "..." : "إستخدام"}
                </div>
              </button>
            )}
          </div>

          {/* Coupon messages */}
          {coupon && (
            <div className="text-green-600 text-xs font-medium">
              ✓ تم تطبيق الكوبون بنجاح
            </div>
          )}
          {couponError && !coupon && (
            <div className="text-red-500 text-xs font-medium">
              {couponError}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Pay button */}
      <button
        onClick={handlePay}
        disabled={totalItems === 0 || isPaying}
        className={`self-stretch hover:scale-105 transition-all cursor-pointer px-2 py-2.5 bg-secondary rounded-[10px] inline-flex justify-center items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          totalItems === 0 ? "pointer-events-none" : ""
        }`}
      >
        {isPaying ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-white text-sm font-bold">
              جارٍ التحويل...
            </span>
          </div>
        ) : (
          <div className="text-right text-white text-sm font-bold">
            دفع {finalTotal > 0 && `(${finalTotal.toFixed(2)} ج.م)`}
          </div>
        )}
      </button>
    </div>
  );
};

export default CardSummery;
