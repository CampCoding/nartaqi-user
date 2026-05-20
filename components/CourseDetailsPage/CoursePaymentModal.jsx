"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // ✅ ضيف ده
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
  const [mounted, setMounted] = useState(false); // ✅ ضيف ده

  // ✅ Mount check for SSR (Next.js)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ✅ Reset coupon when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(clearCoupon());
      setCouponCode("");
    }
  }, [isOpen, dispatch]);

  // ✅ Sync local input with redux state
  useEffect(() => {
    if (coupon?.coupon_code) {
      setCouponCode(coupon.coupon_code);
    }
  }, [coupon]);

  // ✅ Lock body scroll when modal open
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

  // ✅ Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // ✅ Apply coupon - target: "rounds"
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

  // ✅ Remove applied coupon
  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
    setCouponCode("");
    toast.success("تم إلغاء الكوبون");
  };

  // ✅ Handle payment
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

  // ✅ Calculate prices
  const originalPrice = Number(round?.price || 0);
  const discountAmount = coupon ? Number(coupon.discount_amount) : 0;
  const finalPrice = coupon ? Number(coupon.final_price) : originalPrice;

  // ✅ Format discount display
  const formatDiscount = () => {
    if (!coupon) return "";
    if (coupon.discount_type === "percentage") {
      return `${parseFloat(coupon.discount_value)}%`;
    }
    return `${parseFloat(coupon.discount_value).toFixed(2)} ج.م`;
  };

  // ✅ Don't render anything if not mounted or not open
  if (!mounted || !isOpen) return null;

  // ✅ Modal content
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
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
        style={{ zIndex: 100000 }}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
          dir="rtl"
        >
          {/* Header */}
          <div
            className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between rounded-t-3xl"
            style={{ zIndex: 100001 }}
          >
            <h2 className="text-xl font-bold text-text">إتمام الاشتراك</h2>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Course Info */}
            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 bg-gray-200"
                style={{
                  backgroundImage: `url("${round?.image_url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-text text-sm line-clamp-2">
                  {round?.name}
                </h3>
                <div className="text-xs text-gray-500">
                  {round?.category_parts_name || "دورة تدريبية"}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="text-xs text-gray-500 font-semibold mb-2">
                بيانات الاشتراك
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الاسم:</span>
                <span className="font-semibold text-text">{user?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">رقم الجوال:</span>
                <span className="font-semibold text-text" dir="ltr">
                  {user?.phone}
                </span>
              </div>
            </div>

 {/* Coupon Section */}
{hasCoupon && (
  <div className="space-y-2">
    <label className="text-sm font-bold text-text">
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
        className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary outline-none text-sm font-semibold text-text disabled:bg-green-50 disabled:text-green-700 disabled:border-green-300 transition-colors"
      />
      {coupon ? (
        <button
          type="button"
          onClick={handleRemoveCoupon}
          className="px-5 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all active:scale-95"
        >
          إلغاء
        </button>
      ) : (
        <button
          type="button"
          onClick={handleApplyCoupon}
          disabled={isCheckingCoupon || !couponCode.trim()}
          className="px-5 py-3 bg-secondary text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCheckingCoupon ? "..." : "تطبيق"}
        </button>
      )}
    </div>

    {coupon && (
      <div className="text-green-600 text-xs font-medium flex items-center gap-1">
        ✓ تم تطبيق الكوبون: {coupon.coupon_code}
      </div>
    )}
    {couponError && !coupon && (
      <div className="text-red-500 text-xs font-medium">
        {couponError}
      </div>
    )}
  </div>
)}

            {/* Price Summary */}
            <div className="space-y-3 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-semibold">سعر الدورة</span>
                <span className="font-bold text-text">
                  {originalPrice.toFixed(2)} ج.م
                </span>
              </div>

              {coupon && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-semibold flex items-center gap-1">
                    <span>الخصم</span>
                    <span className="text-xs text-gray-400">
                      ({formatDiscount()})
                    </span>
                  </span>
                  <span className="font-bold text-red-500">
                    - {discountAmount.toFixed(2)} ج.م
                  </span>
                </div>
              )}

              <div className="border-t border-orange-200 pt-3 flex justify-between items-center">
                <span className="text-base font-bold text-text">
                  المجموع النهائي
                </span>
                <span className="text-2xl font-bold text-secondary">
                  {finalPrice.toFixed(2)} ج.م
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full py-4 bg-secondary text-white font-bold rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>جارٍ التحويل لصفحة الدفع...</span>
                </>
              ) : (
                <span>ادفع الآن ({finalPrice.toFixed(2)} ج.م)</span>
              )}
            </button>

            {/* Note */}
            <p className="text-xs text-gray-500 text-center">
              سيتم تحويلك لصفحة الدفع الآمنة لإتمام عملية الشراء
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // ✅ Render via Portal to escape parent stacking contexts
  return createPortal(modalContent, document.body);
};

export default CoursePaymentModal;
