"use client";

import React, { useState, useRef, useEffect } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import {
  CourseChevronTopIcon,
  SaudiIcon,
  UploadPill,
} from "../../../public/svgs";
import { Check } from "lucide-react";
import { VerificationCodeModal } from "../../../components/ui/Modals/VerCodeModal";
import Link from "next/link";
import Container from "../../../components/ui/Container";

const JoinToMarketers = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    saveCard: false,
  });

  const [openVerCode, setOpenVerCode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 👉 Create ref for success section
  const successRef = useRef(null);

  // 👉 Scroll when verified
  useEffect(() => {
    if (isVerified && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isVerified]);

  return (
    <div className="pb-[46px]">
      {/* ✅ Banner Section */}
      <PagesBanner
        image={"/images/marketing-team.png"}
        title={"انضم إلى فريق المسوقين"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "انضم إلى فريق المسوقين", link: "/marketing-team" },
          { title: "التسجيل", link: "/#" },
        ]}
      />

      <Container
        style={{
          display: isVerified ? "flex" : "none",
        }}
        ref={successRef} // 👈 Attach ref here
        className=" flex !max-w-[1312px] items-center justify-center flex-col  mt-[32px]"
      >
        <img
          src="/images/success-marketer-join-banner.png"
          className="w-full max-w-[750px]"
          alt=""
        />
        <div className="inline-flex flex-col justify-start items-center gap-6">
          <div className="text-center text-text text-2xl font-bold">
            تم استلام طلبك بنجاح سيتم مراجعة بياناتك وإرسال كود الخصم الخاص بك
            قريباً.
          </div>
          <Link
            href="/"
            className="px-20 py-6 hover:bg-primary-dark transition cursor-pointer bg-primary    rounded-xl md:rounded-[20px] inline-flex justify-center items-center gap-2.5"
          >
            <div className="text-right text-white text-base font-bold">
              العودة إلى الرئيسية
            </div>
          </Link>
        </div>
      </Container>
      <Container
        style={{
          display: isVerified ? "none" : "block",
        }}
        className=" mt-[32px] !max-w-[1312px]"
      >
        {" "}
        <header className="mx-auto w-full  px-4 sm:px-6 md:px-8 flex flex-col items-center gap-4 sm:gap-6 relative">
          <h1 className="font-bold text-text text-2xl sm:text-3xl md:text-[40px] text-center tracking-[0] leading-tight sm:leading-snug">
            تسجيل مسوق شريك
          </h1>
          <p className="font-medium text-text-alt text-center text-base sm:text-lg md:text-2xl  tracking-[0] leading-relaxed break-words">
            يرجى ملء النموذج أدناه للتسجيل في برنامج التسويق بالعمولة.
          </p>
        </header>
        <section className="mt-[88px] grid grid-cols-2 gap-[32px]">
          {" "}
          <div className="col-span-2">
            {" "}
            <Input
              label="الأسم بالكامل"
              subLabel=""
              placeholder="أدخل اسمك بالكامل"
            />{" "}
          </div>{" "}
          <div className="col-span-2 md:col-span-1">
            <Input
              subLabel=""
              label="رقم الهوية"
              placeholder="أدخل رقم هويتك الوطنية"
            />{" "}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Select
              subLabel=""
              label="المدينة"
              options={[
                { value: "", label: "اختر مدينتك " },
                { value: "option1", label: "الخيار الأول" },
                { value: "option2", label: "الخيار الثاني" },
                { value: "option3", label: "الخيار الثالث" },
              ]}
            />{" "}
          </div>
          <div className="col-span-2">
            {" "}
            <Input
              label="البريد الإلكتروني"
              subLabel=""
              placeholder="أدخل بريدك الإلكتروني"
            />{" "}
          </div>{" "}
          <div className="col-span-2">
            {" "}
            <TextArea
              label="نبذه عن المسوق"
              subLabel=""
              placeholder="اكتب نبذه عنك هنا..."
            />{" "}
          </div>{" "}
          <div className="col-span-2">
            {" "}
            <Upload
              label="ملف السيرة الذاتية"
              subLabel=""
              placeholder="اكتب نبذه عنك هنا..."
            />{" "}
          </div>{" "}
          <div className=" col-span-2 self-stretch text-right justify-center text-secondary text-2xl font-bold ">
            {" "}
            تفاصيل الحساب البنكي{" "}
          </div>{" "}
          <div className="col-span-2">
            {" "}
            <Input
              label="اسم صاحب الحساب"
              placeholder="اسم صاحب الحساب كما يظهر في البنك"
              subLabel=""
            />{" "}
          </div>{" "}
          <Input
            label="الآيبان (IBAN)"
            placeholder="أدخل رقم الآيبان الخاص بك"
            subLabel=""
          />{" "}
          <Input
            label="رقم الحساب"
            placeholder="أدخل رقم حسابك البنكي"
            subLabel=""
          />{" "}
          <div className="col-span-2">
            {" "}
            <Input
              label="الآيبان (IBAN)"
              placeholder="أدخل رقم الآيبان الخاص بك"
              subLabel=""
            />{" "}
          </div>{" "}
        </section>{" "}
        <div className=" mt-[16px] flex items-start justify-start gap-4 w-full relative self-stretch flex-[0_0_auto]">
          {" "}
          <label className="flex items-center space-x-3 cursor-pointer">
            {" "}
            <div className="relative">
              {" "}
              <input type="checkbox" className="sr-only peer" />{" "}
              <div className="w-6 h-6 bg-white border-2 border-gray-500 rounded-md peer-checked:bg-secondary peer-checked:border-secondary transition-all duration-300"></div>{" "}
              <svg
                className="absolute w-4 h-4 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                ></path>{" "}
              </svg>{" "}
            </div>{" "}
            <div className=" justify-center !mx-4">
              {" "}
              <span className="text-text text-base font-normal ">
                {" "}
                أوافق على{" "}
              </span>{" "}
              <span
                onClick={(e) => e.preventDefault()}
                className="text-secondary text-base font-bold underline"
              >
                {" "}
                الشروط والأحكام{" "}
              </span>{" "}
            </div>{" "}
          </label>{" "}
        </div>{" "}
        <button
          onClick={() => setOpenVerCode(true)}
          className="w-full mt-[48px] px-12 py-6 bg-secondary hover:bg-secondary-dark transition cursor-pointer    rounded-xl md:rounded-[20px] inline-flex justify-center items-center gap-2.5"
        >
          {" "}
          <div className="text-right justify-center text-white text-lg font-bold ">
            {" "}
            تقديم الطلب{" "}
          </div>{" "}
        </button>{" "}
      </Container>

      <VerificationCodeModal
        setIsVerified={setIsVerified}
        show={openVerCode}
        setShow={setOpenVerCode}
      />
    </div>
  );
};

export default JoinToMarketers;

export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  ...props
}) => {
  const id = props.id || "input-" + Math.random().toString(36).slice(2);
  return (
    <div className="flex flex-col items-start gap-2">
      {/* labels stack on mobile, align sides on sm+ */}
      <div className="flex w-full items-start sm:items-center justify-between gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className="mt-[-1.00px] font-bold text-text text-sm sm:text-base whitespace-normal"
        >
          {label}
        </label>
        <div className="mt-[-1.00px] font-medium text-danger text-xs sm:text-base whitespace-normal">
          {subLabel}
        </div>
      </div>

      <input
        id={id}
        placeholder={placeholder}
        dir="rtl"
        className="h-12 sm:h-14 md:h-[78px] px-4 bg-white    rounded-xl md:rounded-[20px] border-2 border-[#c8c9d5] w-full
                   placeholder-[#c8c9d5] text-text text-base text-right
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
        {...props}
      />
    </div>
  );
};

export const Upload = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  buttonText = "ارفع ملفك الخاص",
  accept, // e.g. ".pdf,.jpg,.png"
  onChange,
  ...props
}) => {
  const id = props.id || "upload-" + Math.random().toString(36).slice(2);
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full items-start sm:items-center justify-between gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className="mt-[-1.00px] font-bold text-text text-sm sm:text-base whitespace-normal"
        >
          {label}
        </label>
        <div className="mt-[-1.00px] font-medium text-danger text-xs sm:text-base whitespace-normal">
          {subLabel}
        </div>
      </div>

      {/* Clickable area with hidden input for accessibility */}
      <label
        htmlFor={id}
        className="w-full px-4 sm:px-6 py-6 sm:py-8 md:py-12 bg-white    rounded-xl md:rounded-[20px] outline outline-2 outline-offset-[-2px] outline-gray-300
                   inline-flex justify-between sm:justify-center items-center gap-3 cursor-pointer
                   hover:outline-gray-400 focus-within:outline-indigo-400"
      >
        <span className="text-text text-sm sm:text-base font-semibold select-none">
          {buttonText}
        </span>
        <span className="relative overflow-hidden">
          <UploadPill width={28} height={28} className="sm:w-8 sm:h-8" />
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={onChange}
        className="sr-only"
      />
    </div>
  );
};

export const TextArea = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  rows = 5,
  ...props
}) => {
  const id = props.id || "textarea-" + Math.random().toString(36).slice(2);
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full items-start sm:items-center justify-between gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className="mt-[-1.00px] font-bold text-text text-sm sm:text-base whitespace-normal"
        >
          {label}
        </label>
        <div className="mt-[-1.00px] font-medium text-danger text-xs sm:text-base whitespace-normal">
          {subLabel}
        </div>
      </div>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        dir="rtl"
        className="min-h-[140px] sm:min-h-[160px] md:min-h-[180px] px-4 pt-4 sm:pt-6 bg-white    rounded-xl md:rounded-[20px] border-2 border-[#c8c9d5] w-full
                   text-right text-base placeholder-[#c8c9d5]
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
        {...props}
      />
    </div>
  );
};

export const Select = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  options = [
    { value: "", label: "اختر من القائمة" },
    { value: "option1", label: "الخيار الأول" },
    { value: "option2", label: "الخيار الثاني" },
    { value: "option3", label: "الخيار الثالث" },
  ],
  ...props
}) => {
  const id = props.id || "select-" + Math.random().toString(36).slice(2);
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full items-start sm:items-center justify-between gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className="mt-[-1.00px] font-bold text-text text-sm sm:text-base whitespace-normal"
        >
          {label}
        </label>
        <div className="mt-[-1.00px] font-medium text-danger text-xs sm:text-base whitespace-normal">
          {subLabel}
        </div>
      </div>

      <div className="relative w-full">
        {/* chevron keeps your original left placement for RTL */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 rotate-180 pointer-events-none">
          <CourseChevronTopIcon className="fill-text" />
        </div>

        <select
          id={id}
          defaultValue=""
          dir="rtl"
          className="appearance-none h-12 sm:h-14 md:h-[78px] w-full pr-4 pl-10 bg-white    rounded-xl md:rounded-[20px] border-2 border-[#c8c9d5]
                     text-right text-base
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.value === ""}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TelephoneButon = ({
  label = "رقم الجوال",
  subLabel = "(مثال: ٥٠٠٠٠٠٠٠٠)",
  placeholder = "123456789",
  countryCode = "+966",
  ...props
}) => {
  const id = props.id || "tel-" + Math.random().toString(36).slice(2);
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex w-full items-start sm:items-center justify-between gap-1 sm:gap-2">
        <label
          htmlFor={id}
          className="mt-[-1.00px] font-bold text-text text-sm sm:text-base whitespace-normal"
        >
          {label}
        </label>
        <div className="mt-[-1.00px] font-medium text-danger text-xs sm:text-base whitespace-normal">
          {subLabel}
        </div>
      </div>

      <div className="flex items-stretch h-12 sm:h-14 md:h-[78px] w-full bg-white    rounded-xl md:rounded-[20px] border-2 border-[#c8c9d5] overflow-hidden">
        {/* input (RTL) */}
        <input
          id={id}
          inputMode="numeric"
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 px-4 text-base text-right text-text placeholder-[#c8c9d5]
                     focus:outline-none focus:ring-2 focus:ring-indigo-300"
          {...props}
        />
        {/* country segment (kept visually on the left for RTL) */}
        <div className="flex items-center gap-2.5 px-3 sm:px-4 border-r-2 border-variable-collection-stroke">
          <span className="font-semibold text-text text-sm sm:text-base whitespace-nowrap">
            {countryCode}
          </span>
          <SaudiIcon />
        </div>
      </div>
    </div>
  );
};
