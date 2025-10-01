"use client";
import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { CourseChevronTopIcon, SaudiIcon } from "../../public/svgs";
import { CertificationRegisterationModal } from "../../components/ui/Modals/CertificationRegisterationModal";

const RegisterCertificate = () => {
  const [isPhoneMatchedOnManar, setIsPhoneMatchedOnManar] = useState(null);
  const [isEmailMatchedOnManar, setIsEmailMatchedOnManar] = useState(null);
  const [isIdMatchedOnManar, setIsIdMatchedOnManar] = useState(null);

  const [openInfoModal , setOpenInfoModal]  = useState(false)

  return (
    <div>
      <PagesBanner
        image={"/images/Frame 1000005840.png"}
        title={" تسجيل بيانات الشهادة"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "تسجيل بيانات الشهادة",
            link: "#",
          },
        ]}
      />

      <div className="container max-w-[1312px] mx-auto px-[64px] mt-[48px] ">
        <div className="px-4 my-6">
          <div className="  mx-auto flex flex-col w-[607px] items-center gap-6 relative">
            <div className="self-stretch mt-[-1.00px] text-text font-bold  text-[32px] text-center relative flex items-center justify-center tracking-[0] leading-[normal] ">
              تسجيل بيانات الشهادة
            </div>

            <p className="w-fit  font-medium text-text-alt text-2xl text-left relative flex items-center justify-center tracking-[0] leading-[normal] ">
              لدورة &#34;الرخصة المهنية في مادة التربية الأسرية 1447 هـ&#34;
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-8">
            <Input />
            <Input
              label="رقم الهوية"
              placeholder="أدخل رقم هويتك الوطنية"
              subLabel={null}
            />
            <Select label="الجنسية" />
            <TelephoneButon subLabel="رقم جوال المتدرب/المتدربة - يجب ألا يكون الرقم مسجل باسم متدرب آخر فى منصة منار - يكتب الرقم بدون الصفر" />
            <Input
              label="الإيميل"
              subLabel="(مطابق للإيميل المسجل بمنصة منار) "
              placeholder="أدخل بريدك الإلكتروني"
            />
            <Input
              label="تأكيد الإيميل"
              subLabel=""
              placeholder="أدخل  تأكيد بريدك الإلكتروني"
            />
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <p className=" h-[50px] text-text  font-bold  text-base tracking-[0] leading-[50px] whitespace-nowrap ">
              هل تم التأكد أن رقم الجوال مطابق لرقم جوالك الذي في منصة منار؟
            </p>

            <RadioGroup
              name="phone-match-confirmation"
              value={isPhoneMatchedOnManar}
              onChange={setIsPhoneMatchedOnManar}
            />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <p className=" h-[50px] text-text  font-bold  text-base tracking-[0] leading-[50px] whitespace-nowrap ">
              هل تم التأكد أن ايميلك مطابق لايميلك الذي في منصة منار؟{" "}
            </p>

            <RadioGroup
              name="email-match-confirmation"
              value={isEmailMatchedOnManar}
              onChange={setIsEmailMatchedOnManar}
            />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <p className=" h-[50px] text-text  font-bold  text-base tracking-[0] leading-[50px] whitespace-nowrap ">
              هل تم التأكد من كتابة رقم هويتك بشكل صحيح؟{" "}
            </p>

            <RadioGroup
              name="id-match-confirmation"
              value={isIdMatchedOnManar}
              onChange={setIsIdMatchedOnManar}
            />
          </div>

          <button onClick={()=>setOpenInfoModal(true)} className="self-stretch w-full px-12 py-6 bg-secondary hover:bg-secondary-dark transition-all cursor-pointer mt-16 rounded-[20px] inline-flex justify-center items-center gap-2.5">
            <div className="text-right justify-center text-white text-2xl font-bold">
              تسجيل
            </div>
          </button>
        </div>
      </div>


      <CertificationRegisterationModal open={openInfoModal} setOpen={setOpenInfoModal} />
    </div>
  );
};

export default RegisterCertificate;

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
        className="justify-start h-[80px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
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

      <div className="justify-start  relative h-[80px] gap-2.5 px-4 bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center self-stretch w-full flex-[0_0_auto]">
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
      <div className=" h-[80px] justify-between px-4 py-0 bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative w-full">
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
// components/RadioGroup.jsx
export const RadioGroup = ({
  name = "radio-group",
  value = null,
  onChange,
}) => {
  const handle = (v) => typeof onChange === "function" && onChange(v);

  return (
    <div
      role="radiogroup"
      aria-labelledby={`${name}-label`}
      className="inline-flex items-center gap-12"
    >
      {/* نعم */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="radio"
          name={name}
          value="yes"
          checked={value === true}
          onChange={() => handle(true)}
          className="peer sr-only"
          aria-label="نعم"
        />

        <span
          className="
            relative inline-flex items-center justify-center
            w-6 h-6 rounded-full border-2 border-secondary
            focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondary
            after:content-['']
            after:w-3 after:h-3 after:rounded-full
            after:bg-secondary
            after:scale-0 peer-checked:after:scale-100
            transition-transform
          "
        />
        <span className="text-right text-secondary text-xl font-semibold leading-[50px]">
          نعم
        </span>
      </label>

      {/* لا */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        {/* peer = the actual radio; keep it focusable */}
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === false}
          onChange={() => handle(false)}
          className="peer sr-only"
          aria-label="لا"
        />

        {/* visual radio */}
        <span
          className="
            relative inline-flex items-center justify-center
            w-6 h-6 rounded-full border-2 border-text
            focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-text
            after:content-['']
            after:w-3 after:h-3 after:rounded-full
            after:scale-0 peer-checked:after:scale-100
            after:bg-text transition-transform
          "
        />

        <span className="text-right text-text text-xl leading-[50px]">لا</span>
      </label>
    </div>
  );
};
