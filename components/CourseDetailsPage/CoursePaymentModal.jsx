"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  checkCoupon,
  clearCoupon,
  createCourseInvoice,
} from "@/components/utils/Store/Slices/cartSlice";

const CoursePaymentModal = ({ isOpen, onClose, round, user, hasCoupon }) => {
  const dispatch = useDispatch();
  const { coupon, isCheckingCoupon, couponError, isPaying } = useSelector(
    (state) => state.cart
  );

  const [couponCode, setCouponCode] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearCoupon());
      setCouponCode("");
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (coupon?.coupon_code) {
      setCouponCode(coupon.coupon_code);
    }
  }, [coupon]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("ادخل كود الكوبون");
      return;
    }

    try {
      await dispatch(
        checkCoupon({
          code: couponCode.trim(),
          target: "rounds",
          round_id: round.id,
        })
      ).unwrap();

      toast.success("تم تطبيق الكوبون بنجاح ✨");
    } catch (error) {
      toast.error(error || "كود الكوبون غير صحيح");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
    setCouponCode("");
    toast.success("تم إلغاء الكوبون");
  };

  const handlePayment = async () => {
    if (!user?.id) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    try {
      const result = await dispatch(
        createCourseInvoice({
          round,
          user,
          couponCode: coupon?.coupon_code || null,
          couponDiscount: coupon ? Number(coupon.discount_amount) : 0,
          finalPrice: coupon ? Number(coupon.final_price) : Number(round.price),
        })
      ).unwrap();

      if (result?.url) {
        toast.success("جارٍ التحويل لصفحة الدفع...");
        dispatch(clearCoupon());
        window.location.href = result.url;
      } else {
        toast.error("لم نستطع الحصول على رابط الدفع");
      }
    } catch (error) {
      toast.error(error || "حدث خطأ أثناء الدفع");
    }
  };

  const originalPrice = Number(round?.price || 0);
  const discountAmount = coupon ? Number(coupon.discount_amount) : 0;
  const finalPrice = coupon ? Number(coupon.final_price) : originalPrice;

  const formatDiscount = () => {
    if (!coupon) return "";
    if (coupon.discount_type === "percentage") {
      return `${parseFloat(coupon.discount_value)}%`;
    }
    return `${parseFloat(coupon.discount_value).toFixed(2)} ر.س`;
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        style={{ zIndex: 999 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none"
        style={{ zIndex: 100000 }}
      >
        <div
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md max-h-[90vh] sm:max-h-[92vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
          dir="rtl"
        >
          {/* Header */}
          <div
            className="sticky top-0 bg-white border-b border-gray-100 p-3.5 sm:p-4 md:p-5 flex items-center justify-between rounded-t-2xl sm:rounded-t-3xl"
            style={{ zIndex: 100001 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-text">
              إتمام الاشتراك
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 sm:p-4 md:p-5 space-y-4 sm:space-y-5">
            {/* Course Info */}
            <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl flex-shrink-0 bg-gray-200"
                style={{
                  backgroundImage: `url("${round?.image_url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <h3 className="font-bold text-text text-xs sm:text-sm line-clamp-2">
                  {round?.name}
                </h3>
                <div className="text-[11px] sm:text-xs text-gray-500">
                  {round?.category_parts_name || "دورة تدريبية"}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 bg-blue-50/50 rounded-xl sm:rounded-2xl border border-blue-100">
              <div className="text-[11px] sm:text-xs text-gray-500 font-semibold mb-1.5 sm:mb-2">
                بيانات الاشتراك
              </div>
              <div className="flex justify-between text-xs sm:text-sm gap-2">
                <span className="text-gray-600 flex-shrink-0">الاسم:</span>
                <span className="font-semibold text-text truncate text-left">
                  {user?.name}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm gap-2">
                <span className="text-gray-600 flex-shrink-0">رقم الجوال:</span>
                <span className="font-semibold text-text" dir="ltr">
                  {user?.phone}
                </span>
              </div>
            </div>

            {/* Coupon Section */}
            {hasCoupon && (
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-text block">
                  كود الكوبون (اختياري)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ادخل كود الكوبون"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={!!coupon || isCheckingCoupon}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !coupon) {
                        handleApplyCoupon();
                      }
                    }}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-secondary outline-none text-xs sm:text-sm font-semibold text-text disabled:bg-green-50 disabled:text-green-700 disabled:border-green-300 transition-colors"
                  />
                  {coupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="px-3 sm:px-5 py-2.5 sm:py-3 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl hover:bg-red-600 transition-all active:scale-95 flex-shrink-0"
                    >
                      إلغاء
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isCheckingCoupon || !couponCode.trim()}
                      className="px-3 sm:px-5 py-2.5 sm:py-3 bg-secondary text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {isCheckingCoupon ? "..." : "تطبيق"}
                    </button>
                  )}
                </div>

                {coupon && (
                  <div className="text-green-600 text-[11px] sm:text-xs font-medium flex items-center gap-1">
                    ✓ تم تطبيق الكوبون: {coupon.coupon_code}
                  </div>
                )}
                {couponError && !coupon && (
                  <div className="text-red-500 text-[11px] sm:text-xs font-medium">
                    {couponError}
                  </div>
                )}
              </div>
            )}

            {/* Price Summary */}
            <div className="space-y-2.5 sm:space-y-3 p-3 sm:p-4 bg-orange-50/50 border border-orange-100 rounded-xl sm:rounded-2xl">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 font-semibold">سعر الدورة</span>
                <span className="font-bold text-text">
                  {originalPrice.toFixed(2)} ر.س
                </span>
              </div>

              {coupon && (
                <div className="flex justify-between text-xs sm:text-sm gap-2">
                  <span className="text-gray-600 font-semibold flex items-center gap-1 flex-wrap">
                    <span>الخصم</span>
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      ({formatDiscount()})
                    </span>
                  </span>
                  <span className="font-bold text-red-500 whitespace-nowrap">
                    - {discountAmount.toFixed(2)} ر.س
                  </span>
                </div>
              )}

              <div className="border-t border-orange-200 pt-2.5 sm:pt-3 flex justify-between items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-text">
                  المجموع النهائي
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-secondary whitespace-nowrap">
                  {finalPrice.toFixed(2)} ر.س
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full py-3 sm:py-3.5 md:py-4 bg-secondary text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs sm:text-sm md:text-base">
                    جارٍ التحويل لصفحة الدفع...
                  </span>
                </>
              ) : (
                <span>ادفع الآن ({finalPrice.toFixed(2)} ر.س)</span>
              )}
            </button>

            {/* Note */}
            <p className="text-[11px] sm:text-xs text-gray-500 text-center px-2">
              سيتم تحويلك لصفحة الدفع الآمنة لإتمام عملية الشراء
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default CoursePaymentModal;