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

      <div
        style={{
          display: isVerified ? "flex" : "none",
        }}
        ref={successRef} // 👈 Attach ref here
        className="container flex items-center justify-center flex-col max-w-[1312px] px-[64px] mx-auto mt-[32px]"
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
          <Link href="/" className="px-20 py-6 hover:bg-primary-dark transition cursor-pointer bg-primary rounded-[20px] inline-flex justify-center items-center gap-2.5">
            <div className="text-right text-white text-base font-bold">
              العودة إلى الرئيسية
            </div>
          </Link>
        </div>
      </div>
      <main
        style={{
          display: isVerified ? "none" : "block",
        }}
        className="container max-w-[1312px] px-[64px] mx-auto mt-[32px]"
      >
        {" "}
        <header className="flex mx-auto flex-col w-[607px] items-center gap-6 relative">
          {" "}
          <h1 className="mt-[-1.00px] font-bold text-text text-[40px] text-center relative flex items-center justify-center self-stretch tracking-[0] leading-[normal] ">
            {" "}
            تسجيل مسوق شريك{" "}
          </h1>{" "}
          <p className=" font-medium text-text-alt text-2xl text-left relative flex items-center justify-center self-stretch tracking-[0] leading-[normal] ">
            {" "}
            يرجى ملء النموذج أدناه للتسجيل في برنامج التسويق بالعمولة.{" "}
          </p>{" "}
        </header>{" "}
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
          <Input
            subLabel=""
            label="رقم الهوية"
            placeholder="أدخل رقم هويتك الوطنية"
          />{" "}
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
          className="w-full mt-[48px] px-12 py-6 bg-secondary hover:bg-secondary-dark transition cursor-pointer rounded-[20px] inline-flex justify-center items-center gap-2.5"
        >
          {" "}
          <div className="text-right justify-center text-white text-lg font-bold ">
            {" "}
            تقديم الطلب{" "}
          </div>{" "}
        </button>{" "}
      </main>

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
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-[78px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
      />
    </div>
  );
};

export const Upload = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex flex-col items-start gap-[10px] relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <div className="self-stretch px-6 py-12 bg-white rounded-[20px] outline outline-2 outline-offset-[-2px] outline-gray-300 inline-flex justify-center items-center gap-2">
        <div className="text-right justify-center text-text text-base font-semibold ">
          ارفع ملفك الخاص
        </div>
        <div className="relative overflow-hidden">
          <UploadPill width={32} height={32} />
        </div>
      </div>
    </div>
  );
};

export const TextArea = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
  rows = 5,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="justify-start  gap-2.5 px-4 pt-8  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
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
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>

      <div className="justify-start  relative h-[78px] gap-2.5 px-4 bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center self-stretch w-full flex-[0_0_auto]">
        <div className="absolute top-1/2 left-4 -translate-y-1/2 rotate-180">
          {<CourseChevronTopIcon className={"fill-text"} />}
        </div>

        <select className="h-full w-full" defaultValue="">
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
  ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative w-full">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <div className=" h-[78px] justify-between px-4 py-0 bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
        <input
          className="justify-center w-full font-normal text-text placeholder-[#c8c9d5] text-base text-right tracking-[0] leading-[normal] flex items-center relative"
          placeholder={placeholder}
          {...props}
        />
        <div className="inline-flex items-center gap-2.5 px-4 py-6 relative flex-[0_0_auto] border-r-2 [border-right-style:solid] border-variable-collection-stroke">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-text text-base text-right tracking-[0] leading-[normal]">
            +966
          </div>
          <SaudiIcon />
        </div>
      </div>
    </div>
  );
};
