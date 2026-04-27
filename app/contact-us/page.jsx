"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import {
  ContactCallIcon,
  ContactEmailIcon,
  ContactUsLocatoinIcon,
} from "../../public/svgs";
import Container from "../../components/ui/Container";
import { FormField } from "../../components/ui/Form/FormField";
import { CustomSelect } from "../../components/ui/Form/CustomSelect";

const ContactUs = () => {
  return (
    <div>
      <PagesBanner
        title={"تواصل معنا"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "تواصل معنا",
            link: "/",
          },
        ]}
        image={"/images/Frame 1000005150.png"}
        variant="normal"
        objectPosition={"100%_100%"}
      />
      <Container className="flex flex-col lg:flex-row justify-between   gap-6 g:gap-[48px] mt-8 lg:mt-[48px] mb-16 lg:mb-[100px]">
        {/* Left column */}
        <ContactMessageForm />

        {/* Right column */}
        <SiteData />
      </Container>
    </div>
  );
};

export default ContactUs;

const ChevronBottom = (props) => (
  <svg
    width={10}
    height={6}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Make sure to import the components and hook from their files
// import { useClickOutside } from './hooks/useClickOutside';
// import { FormField, CustomSelect } from './components/UI';

export const ContactMessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    messageType: "",
    message: "",
  });

  const messageTypes = ["استفسار عام", "شكوى", "اقتراح", "طلب خدمة", "أخرى"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col items-start gap-6 rounded-[30px] border-[3px] border-solid border-zinc-200 bg-white p-6 md:p-12"
      noValidate
    >
      <header className="flex w-full flex-col items-start gap-2 self-stretch">
        <h1 className="self-stretch text-2xl font-bold leading-tight text-secondary">
          أرسل لنا رسالة
        </h1>
        <p className="self-stretch text-sm leading-5 text-text-alt">
          املأ النموذج أدناه وسنعود إليك قريبا.
        </p>
      </header>

      <div className="flex w-full flex-col items-start justify-center gap-6 self-stretch">
        <FormField
          id="fullName"
          label="الاسم الكامل"
          type="text"
          placeholder="أدخل اسمك الكامل"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />
        <FormField
          id="phone"
          label="رقم التليفون"
          type="tel"
          placeholder="أدخل رقم هاتفك"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
        <CustomSelect
          label="نوع الرسالة"
          options={messageTypes}
          value={formData.messageType}
          onChange={(value) => handleInputChange("messageType", value)}
          placeholder="حدد نوع الرسالة"
        />
        <FormField
          id="message"
          label="رسالة"
          as="textarea"
          placeholder="اكتب رسالتك هنا"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
        />
      </div>

      <footer className="flex w-full flex-col items-center gap-4 self-stretch">
        <button
          type="submit"
          className="w-full rounded-xl bg-secondary px-8 py-5 text-xl font-bold text-neutral-50 transition-colors hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 md:px-16"
        >
          إرسال الرسالة
        </button>
        <p className="self-stretch text-center text-sm leading-5 text-text-alt">
          جميع الحقول مطلوبة. سيتم استلام الرسائل في لوحة معلومات المشرف.
        </p>
      </footer>
    </form>
  );
};

export const SiteData = () => {
  const contactInfo = [
    {
      id: 1,
      title: "موقعنا",
      content: "دمياط الجديدة \n الحي السادس مجاورة ٣٠  قطعة ٣٣٠ /١٤",
      iconName: "location",
    },
    {
      id: 2,
      title: "رقم الهاتف",
      content: "+20 10 98286080",
      iconName: "phone",
    },
    {
      id: 3,
      title: "عنوان البريد الإلكتروني",
      content: "support@nartaqi.com",
      iconName: "email",
    },
  ];

  // Map icon names to their respective components (JSX only)
  const icons = {
    location: <ContactUsLocatoinIcon />,
    phone: <ContactCallIcon />,
    email: <ContactEmailIcon />,
  };

  return (
    <section
      dir="rtl"
      className="min-w-0 flex flex-1 flex-col gap-6 rounded-[30px] border-[3px] border-solid border-zinc-200 bg-white p-4 sm:p-6 md:p-12"
    >
      {/* Contact Details List */}
      <div className="rounded-[30px] border border-solid border-zinc-200 p-4 sm:p-6">
        <ul role="list" className="flex flex-col gap-4 sm:gap-6">
          {contactInfo.map((item) => (
            <li
              key={item.id}
              role="listitem"
              className="flex items-start gap-3 sm:gap-4"
            >
              <div
                className="flex-shrink-0 text-secondary leading-none"
                aria-hidden="true"
              >
                <div className="scale-90 sm:scale-100 md:scale-100 origin-top">
                  {icons[item.iconName] || null}
                </div>
              </div>

              <div className="min-w-0 flex flex-col text-right">
                <h3 className="truncate text-base sm:text-lg md:text-2xl font-bold text-text">
                  {item.title}
                </h3>
                {/* `whitespace-pre-line` handles newlines (\n) automatically */}
                <p
                  dir="ltr"
                  className="whitespace-pre-line break-words text-sm sm:text-base text-text-alt"
                >
                  {item.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Map Section */}
      <div className="w-full self-stretch overflow-hidden rounded-[30px] bg-zinc-100">
        <div className="h-48 xs:h-56 sm:h-64 md:h-[363px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.0532623212785!2d31.68308399999999!3d31.4402006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9ef8892d5fb83%3A0x95f0a32dce7d3e40!2z2KzZh9in2LIg2KrYudmF2YrYsSDZhdiv2YrZhtipINiv2YXZitin2Lcg2KfZhNis2K_Zitiv2Kk!5e0!3m2!1sar!2seg!4v1777288615319!5m2!1sar!2seg"
            className="h-full w-full rounded-[30px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </section>
  );
};
