"use client";
import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { CourseChevronTopIcon, SaudiIcon } from "../../public/svgs";
import { CertificationRegisterationModal } from "../../components/ui/Modals/CertificationRegisterationModal";
import Container from "../../components/ui/Container";

const RegisterCertificate = () => {
  const [isPhoneMatchedOnManar, setIsPhoneMatchedOnManar] = useState(null);
  const [isEmailMatchedOnManar, setIsEmailMatchedOnManar] = useState(null);
  const [isIdMatchedOnManar, setIsIdMatchedOnManar] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div>
      <PagesBanner
        image={"/images/Frame 1000005840.png"}
        title={"تسجيل بيانات الشهادة"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "تسجيل بيانات الشهادة", link: "#" },
        ]}
      />

      <Container className="  mt-6 sm:mt-8 lg:mt-12">
        <div className="px-4 sm:px-6 py-6">
          <div className="mx-auto flex flex-col w-full max-w-[607px] items-center gap-4 sm:gap-6">
            <h1 className="self-stretch text-text font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center tracking-tight leading-tight">
              تسجيل بيانات الشهادة
            </h1>
            <p className="w-full max-w-2xl font-medium text-text-alt text-base sm:text-lg md:text-xl text-center sm:text-right tracking-tight leading-relaxed">
              لدورة &#34;الرخصة المهنية في مادة التربية الأسرية 1447 هـ&#34;
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8">
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
              subLabel="(مطابق للإيميل المسجل بمنصة منار)"
              placeholder="أدخل بريدك الإلكتروني"
            />
            <Input
              label="تأكيد الإيميل"
              subLabel=""
              placeholder="أدخل تأكيد بريدك الإلكتروني"
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
            <p className="text-text font-bold text-sm sm:text-base tracking-tight leading-8 sm:leading-10">
              هل تم التأكد أن رقم الجوال مطابق لرقم جوالك الذي في منصة منار؟
            </p>
            <RadioGroup
              name="phone-match-confirmation"
              value={isPhoneMatchedOnManar}
              onChange={setIsPhoneMatchedOnManar}
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
            <p className="text-text font-bold text-sm sm:text-base tracking-tight leading-8 sm:leading-10">
              هل تم التأكد أن ايميلك مطابق لايميلك الذي في منصة منار؟
            </p>
            <RadioGroup
              name="email-match-confirmation"
              value={isEmailMatchedOnManar}
              onChange={setIsEmailMatchedOnManar}
            />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
            <p className="text-text font-bold text-sm sm:text-base tracking-tight leading-8 sm:leading-10">
              هل تم التأكد من كتابة رقم هويتك بشكل صحيح؟
            </p>
            <RadioGroup
              name="id-match-confirmation"
              value={isIdMatchedOnManar}
              onChange={setIsIdMatchedOnManar}
            />
          </div>

          <button
            onClick={() => setOpenInfoModal(true)}
            className="w-full max-w-full mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-secondary hover:bg-secondary-dark transition-all cursor-pointer mt-8 sm:mt-12 rounded-lg sm:rounded-xl inline-flex justify-center items-center gap-2"
          >
            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold text-right">
              تسجيل
            </span>
          </button>
        </div>
      </Container>

      <CertificationRegisterationModal
        open={openInfoModal}
        setOpen={setOpenInfoModal}
      />
    </div>
  );
};

export const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <label className="font-bold text-text text-sm sm:text-base tracking-tight leading-normal">
          {label}
        </label>
        {subLabel && (
          <span className="font-medium text-danger text-sm sm:text-base tracking-tight leading-normal">
            {subLabel}
          </span>
        )}
      </div>
      <input
        placeholder={placeholder}
        className="h-12 sm:h-14 md:h-16 w-full px-3 sm:px-4 bg-white rounded-lg sm:rounded-xl border-2 border-[#c8c9d5] text-right text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary"
      />
    </div>
  );
};

export const Select = ({
  label = "الجنسية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "اختر من القائمة",
  options = [
    { value: "", label: "اختر من القائمة" },
    { value: "option1", label: "الخيار الأول" },
    { value: "option2", label: "الخيار الثاني" },
    { value: "option3", label: "الخيار الثالث" },
  ],
}) => {
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <label className="font-bold text-text text-sm sm:text-base tracking-tight leading-normal">
          {label}
        </label>
        {subLabel && (
          <span className="font-medium text-danger text-sm sm:text-base tracking-tight leading-normal">
            {subLabel}
          </span>
        )}
      </div>
      <div className="relative w-full h-12 sm:h-14 md:h-16">
        <div className="absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 rotate-180">
          <CourseChevronTopIcon className="fill-text w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <select className="h-full w-full px-3 sm:px-4 pr-10 sm:pr-12 bg-white rounded-lg sm:rounded-xl border-2 border-[#c8c9d5] text-right text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-secondary appearance-none">
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
    <div className="flex flex-col items-start gap-2 sm:gap-3 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <label className="font-bold text-text text-sm sm:text-base tracking-tight leading-normal">
          {label}
        </label>
        <span className="font-medium text-danger text-sm sm:text-base tracking-tight leading-normal">
          {subLabel}
        </span>
      </div>
      <div className="relative h-12 sm:h-14 md:h-16 w-full flex items-center bg-white rounded-lg sm:rounded-xl border-2 border-[#c8c9d5]">
        <input
          className="w-full h-full px-3 sm:px-4 font-normal text-text placeholder-[#c8c9d5] text-sm sm:text-base text-right tracking-tight focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder={placeholder}
          {...props}
        />
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-r-2 border-[#c8c9d5]">
          <span className="font-semibold text-text text-sm sm:text-base text-right tracking-tight">
            +966
          </span>
          <SaudiIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

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
      className="flex items-center gap-6 sm:gap-8"
    >
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
            relative flex items-center justify-center
            w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 border-secondary
            focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondary
            after:content-[''] after:w-2 sm:after:w-3 after:h-2 sm:after:h-3 after:rounded-full
            after:bg-secondary after:scale-0 peer-checked:after:scale-100
            transition-transform
          "
        />
        <span className="text-secondary text-base sm:text-lg font-semibold leading-8 sm:leading-10 text-right">
          نعم
        </span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === false}
          onChange={() => handle(false)}
          className="peer sr-only"
          aria-label="لا"
        />
        <span
          className="
            relative flex items-center justify-center
            w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 border-text
            focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-text
            after:content-[''] after:w-2 sm:after:w-3 after:h-2 sm:after:h-3 after:rounded-full
            after:bg-text after:scale-0 peer-checked:after:scale-100
            transition-transform
          "
        />
        <span className="text-text text-base sm:text-lg leading-8 sm:leading-10 text-right">
          لا
        </span>
      </label>
    </div>
  );
};

export default RegisterCertificate;
