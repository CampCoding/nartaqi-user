// hooks/usePayment.js
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import myFatoorahService from "../app/services/payment/myFatoorahService";
// import myFatoorahService from "@/services/payment/myFatoorahService";

export const PAYMENT_TYPES = {
  COURSE: "course",
  CART: "cart",
  SUBSCRIPTION: "subscription",
};

const usePayment = () => {
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * بدء عملية الدفع
   */
  const initiatePayment = useCallback(
    async ({
      amount,
      description,
      orderId,
      orderType = PAYMENT_TYPES.COURSE,
      metadata = {},
      redirectToPayment = true,
    }) => {
      if (!token) {
        toast.error("يجب تسجيل الدخول أولاً");
        router.push("/login");
        return { success: false, error: "Not authenticated" };
      }

      if (!amount || amount <= 0) {
        toast.error("المبلغ غير صحيح");
        return { success: false, error: "Invalid amount" };
      }

      setIsLoading(true);
      setError(null);

      try {
        const paymentData = {
          amount,
          customerName: user?.name || user?.full_name || "Customer",
          customerEmail: user?.email || "customer@example.com",
          customerPhone: user?.phone || user?.whatsapp_number || "50000000",
          description,
          orderId: orderId || `ORD-${Date.now()}`,
          orderType,
          metadata: {
            userId: user?.id,
            ...metadata,
          },
        };

        const result = await myFatoorahService.initiatePayment(paymentData);

        if (!result.success) {
          throw new Error(result.error);
        }

        // حفظ بيانات الدفع المعلقة
        localStorage.setItem(
          "pending_payment",
          JSON.stringify({
            invoiceId: result.invoiceId,
            orderId: paymentData.orderId,
            orderType,
            amount,
            metadata: paymentData.metadata,
            timestamp: Date.now(),
          })
        );

        if (redirectToPayment && result.invoiceURL) {
          window.location.href = result.invoiceURL;
        }

        return result;
      } catch (err) {
        const errorMessage = err.message || "حدث خطأ أثناء بدء عملية الدفع";
        setError(errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [token, user, router]
  );

  /**
   * التحقق من حالة الدفع
   */
  const verifyPayment = useCallback(
    async (paymentId, keyType = "PaymentId") => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await myFatoorahService.getPaymentStatus(
          paymentId,
          keyType
        );

        if (!result.success) {
          throw new Error(result.error);
        }

        return result;
      } catch (err) {
        const errorMessage = err.message || "حدث خطأ أثناء التحقق من الدفع";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * مسح بيانات الدفع المعلقة
   */
  const clearPendingPayment = useCallback(() => {
    localStorage.removeItem("pending_payment");
  }, []);

  /**
   * جلب بيانات الدفع المعلقة
   */
  const getPendingPayment = useCallback(() => {
    try {
      const data = localStorage.getItem("pending_payment");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  return {
    isLoading,
    error,
    initiatePayment,
    verifyPayment,
    clearPendingPayment,
    getPendingPayment,
  };
};

export default usePayment;
