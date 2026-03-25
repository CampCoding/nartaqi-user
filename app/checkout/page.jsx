"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { EgyptianIcon, SaudiIcon } from "../../public/svgs";

export default function CheckoutPage() {
  const router = useRouter();

  // جلب التوكن من الـ Redux
  const { token: reduxToken } = useSelector((state) => state.auth);

  const [isLoaded, setIsLoaded] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [userToken, setUserToken] = useState(null);

  // States for the form
  const [activeTab, setActiveTab] = useState("bank"); // 'electronic' | 'bank' | 'installment'
  const [accountName, setAccountName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // ✅ حالة لمعاينة الصورة
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for API Data
  const [banks, setBanks] = useState([]);
  const [isBanksLoading, setIsBanksLoading] = useState(true);

  // 1. جلب بيانات الكورس من الـ LocalStorage وإعداد التوكن
  useEffect(() => {
    const data = localStorage.getItem("checkout_data");
    if (data) {
      const parsedData = JSON.parse(data);
      setCourseData(parsedData);
      setUserToken(reduxToken || parsedData.token);
      setIsLoaded(true);
    } else {
      toast.error("لم يتم العثور على بيانات الدورة، جاري العودة...");
      router.push("/");
    }
  }, [router, reduxToken]);

  // 2. جلب الحسابات البنكية من الـ API
  useEffect(() => {
    if (!userToken) return;

    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/payment-confirmations/getAllBankAccounts`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data?.status === "success") {
          setBanks(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
        toast.error("حدث خطأ أثناء جلب الحسابات البنكية");
      } finally {
        setIsBanksLoading(false);
      }
    };

    fetchBanks();
  }, [userToken]);

  // ==========================================
  // استخراج كود الدولة ورقم الجوال للتصميم
  // ==========================================
  const phoneDetails = useMemo(() => {
    if (!courseData?.phone)
      return { code: "+966", number: "", icon: SaudiIcon };

    let phoneStr = courseData.phone.replace(/\D/g, "");

    if (phoneStr.startsWith("20")) {
      return { code: "+20", number: phoneStr.substring(2), icon: EgyptianIcon };
    } else if (phoneStr.startsWith("966")) {
      return { code: "+966", number: phoneStr.substring(3), icon: SaudiIcon };
    } else if (phoneStr.startsWith("0")) {
      return { code: "+966", number: phoneStr.substring(1), icon: SaudiIcon };
    }

    return { code: "+966", number: phoneStr, icon: SaudiIcon };
  }, [courseData?.phone]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setReceiptImage(file);
      // إنشاء رابط لمعاينة الصورة
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // 3. إرسال بيانات الدفع للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "bank") {
      if (!accountName || !selectedBank || !receiptImage) {
        toast.error("يرجى تعبئة جميع الحقول الإلزامية وإرفاق الإيصال");
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("image", receiptImage);
      formData.append("receiver_bank", selectedBank);
      formData.append("sender_name", accountName);
      formData.append("amount", courseData.price);
      formData.append("phone", courseData.phone);
      formData.append("round_id", courseData.roundId);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/payment-confirmations/storePaymentConfirmation`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 || response.data?.status === "success") {
          toast.success("تم إرسال الإيصال بنجاح، سيتم مراجعته قريباً");
          localStorage.removeItem("checkout_data");
          router.push("/");
        } else {
          toast.error(response.data?.message || "حدث خطأ أثناء إرسال الطلب");
        }
      } catch (error) {
        console.error("Submission Error:", error);
        toast.error(
          error.response?.data?.message || "حدث خطأ في الاتصال بالخادم"
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.info("جاري التحويل لبوابة الدفع...");
    }
  };

  if (!isLoaded || !courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 font-['Cairo']">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-10 border border-gray-100">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-text mb-8">
          تأكيد الدفع
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Read-only Field: Course Name */}
          <div className="flex flex-col items-start gap-2 relative w-full">
            <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                الدورة
              </div>
            </div>
            <input
              type="text"
              disabled
              value={courseData.courseName}
              className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-gray-50 rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base opacity-60 cursor-not-allowed focus:outline-none transition-colors"
            />
          </div>

          {/* حقل رقم الجوال المطابق لـ TelephoneInput */}
          <div className="flex flex-col items-start gap-2 relative w-full">
            <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                رقم الجوال
              </div>
              <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                (إلزامي)
              </div>
            </div>
            <div className="h-12 sm:h-14 md:h-[62px] justify-between overflow-hidden py-0 bg-gray-50 rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full transition-colors opacity-60">
              <input
                className="justify-center w-full px-3 sm:px-4 h-full font-normal text-text bg-transparent text-sm sm:text-base text-right tracking-[0] leading-[normal] flex items-center relative focus:outline-none cursor-not-allowed"
                type="text"
                disabled
                value={phoneDetails.number}
                dir="ltr"
              />
              <div className="inline-flex items-center gap-1 sm:gap-2.5 px-2 sm:px-4 relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke h-full cursor-not-allowed">
                <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-sm sm:text-base text-right tracking-[0] leading-[normal]">
                  {phoneDetails.code}
                </div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                  {phoneDetails.icon && <phoneDetails.icon />}
                </div>
              </div>
            </div>
          </div>

          {/* Read-only Field: Price */}
          <div className="flex flex-col items-start gap-2 relative w-full">
            <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                المبلغ المحول
              </div>
              <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                (إلزامي)
              </div>
            </div>
            <input
              type="text"
              disabled
              value={`${courseData.price} ريال`}
              className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-gray-50 rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base opacity-60 cursor-not-allowed focus:outline-none transition-colors"
            />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mt-8">
            <div className="flex justify-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => setActiveTab("bank")}
                className={`pb-4 px-2 font-bold transition-colors border-b-2 text-sm sm:text-base ${
                  activeTab === "bank"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                التحويل البنكي
              </button>
            </div>
          </div>

          {/* Bank Transfer Section */}
          {activeTab === "bank" && (
            <div className="space-y-8 mt-8 animate-fadeIn">
              <h3 className="text-center text-xl font-bold text-text mb-6">
                حساباتنا البنكية
              </h3>

              {isBanksLoading ? (
                <div className="flex justify-center items-center py-6">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : banks.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  لا توجد حسابات بنكية متاحة حالياً
                </div>
              ) : (
                /* Dynamic Bank Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {banks.map((bank) => (
                    <div
                      key={bank.id}
                      className={`border-2 ${selectedBank === bank.bank_name ? "border-primary" : ""} border-gray-200 rounded-[20px] p-4 bg-white hover:border-primary/50 transition cursor-pointer`}
                      onClick={() => setSelectedBank(bank.bank_name)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-sm space-y-2 text-gray-600">
                          <p>
                            <span className="font-bold text-text">
                              اسم البنك:
                            </span>{" "}
                            {bank.bank_name}
                          </p>
                          <p>
                            <span className="font-bold text-text">
                              اسم الحساب:
                            </span>{" "}
                            {bank.account_holder_name}
                          </p>
                          <p>
                            <span className="font-bold text-text">
                              رقم الحساب:
                            </span>{" "}
                            {bank.account_number}
                          </p>
                          <p>
                            <span className="font-bold text-text">
                              رقم الايبان:
                            </span>{" "}
                            {bank.iban}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold text-[10px] text-center overflow-hidden">
                          {bank.image_url ? (
                            <img
                              src={bank.image_url}
                              alt={bank.bank_name}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            bank.bank_name.substring(0, 4)
                          )}
                        </div>
                      </div>

                      {selectedBank === bank.bank_name && (
                        <div className="mt-2 text-xs text-primary font-bold flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          تم اختياره كبنك محول إليه
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* User Inputs */}
              <div className="flex flex-col items-start gap-2 relative w-full">
                <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
                  <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                    اسم صاحب الحساب المحول منه
                  </div>
                  <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                    (إلزامي)
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="برجاء إدخال اسم صاحب الحساب"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col items-start gap-2 relative w-full">
                <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
                  <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                    البنك المحول إليه
                  </div>
                  <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-sm sm:text-base tracking-[0] leading-[normal]">
                    (إلزامي)
                  </div>
                </div>
                <div className="relative w-full">
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="justify-start h-12 sm:h-14 md:h-[62px] gap-2.5 px-3 sm:px-4 bg-white rounded-2xl md:rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto] text-sm sm:text-base appearance-none focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="" disabled>
                      اختر البنك
                    </option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.bank_name}>
                        {bank.bank_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* File Uploader - تم حل مشكلة الحجم هنا ✅ */}
              <div className="mt-8 w-full">
                <label className="cursor-pointer block w-full">
                  <div className="w-full min-h-[200px] border-2 border-dashed border-[#c8c9d5] hover:border-primary bg-gray-50/50 hover:bg-primary/5 transition-colors rounded-[20px] p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                    {/* ✅ Image Preview */}
                    {imagePreview ? (
                      <div className="absolute inset-0 w-full h-full p-2 flex items-center justify-center bg-white">
                        <img
                          src={imagePreview}
                          alt="Receipt Preview"
                          className="max-h-[180px] w-auto max-w-full object-contain rounded-xl shadow-sm"
                        />
                        {/* Overlay on hover to change image */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl m-2 cursor-pointer">
                          <span className="text-white font-bold bg-black/60 px-4 py-2 rounded-lg pointer-events-none">
                            تغيير الصورة
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary">
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-center px-4">
                          <p className="text-sm font-bold text-text mb-2">
                            أرفق صورة الإيصال أو رسالة الخصم من البنك
                          </p>
                          <p className="text-xs text-danger font-medium">
                            الصيغ المسموحة للصورة: JPG, JPEG, PNG, GIF
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-14 sm:h-[62px] rounded-2xl md:rounded-[20px] text-white font-bold text-base sm:text-lg transition-all
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed opacity-70" : "bg-primary hover:opacity-90 active:scale-[0.99]"}`}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال الإيصال"}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
