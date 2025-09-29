"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import {
  ContactCallIcon,
  ContactEmailIcon,
  ContactUsLocatoinIcon,
} from "../../public/svgs";

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
      <div className="container mx-auto px-[64px] flex justify-between gap-[48px] mt-[48px] mb-[100px]">
        <ContactMessageForm />
        <SiteData />
      </div>
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

export const ContactMessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    messageType: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messageTypes = ["استفسار عام", "شكوى", "اقتراح", "طلب خدمة", "أخرى"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1  items-start gap-6 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-zinc-200"
    >
      <header className="flex-col items-start gap-2 flex relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="self-stretch mt-[-1.00px]  font-bold text-secondary text-2xl tracking-[-0.60px] leading-6 relative ">
          أرسل لنا رسالة
        </h1>
        <p className="self-stretch text-text-alt text-sm leading-5 relative ">
          املأ النموذج أدناه وسنعود إليك قريبا.
        </p>
      </header>

      <div className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="fullName"
            className="relative text-text font-[600] self-stretch h-[18px] mt-[-1.00px] text-[#2d2d2d] text-base leading-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] "
          >
            الاسم الكامل
          </label>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full mt-[-1.00px] text-[#2d2d2d] text-sm text-right leading-5 relative  placeholder:text-text-alt"
              required
              aria-required="true"
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="phone"
            className="relative self-stretch text-text font-[600] h-[18px] mt-[-1.00px] text-[#2d2d2d] text-base leading-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] "
          >
            رقم التليفون
          </label>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="أدخل رقم هاتفك"
              className="w-full mt-[-1.00px] text-[#2d2d2d] text-sm text-right leading-5 relative  placeholder:text-text-alt"
              required
              aria-required="true"
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="messageType"
            className="relative self-stretch text-text font-[600] h-[18px] mt-[-1.00px] text-[#2d2d2d] text-base leading-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] "
          >
            نوع الرسالة
          </label>
          <div className="relative self-stretch w-full">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="items-center justify-between flex-[0_0_auto] rounded-[10px] flex p-4 relative self-stretch w-full bg-white border border-solid border-zinc-200"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="w-fit mt-[-1.00px] text-text-alt text-sm text-right leading-5 whitespace-nowrap relative ">
                {formData.messageType || "حدد نوع الرسالة"}
              </div>
              <ChevronBottom />
            </button>
            {isDropdownOpen && (
              <ul
                role="listbox"
                className="absolute top-full left-0 right-0 z-10 bg-white border border-solid border-zinc-200 rounded-[10px] mt-1 max-h-48 overflow-y-auto"
              >
                {messageTypes.map((type, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange("messageType", type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full p-4 text-right text-[#2d2d2d] text-sm leading-5 hover:bg-zinc-50 "
                      role="option"
                      aria-selected={formData.messageType === type}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="message"
            className="relative self-stretch h-[18px] mt-[-1.00px] text-[#2d2d2d] text-base leading-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] "
          >
            رسالة
          </label>
          <div className="h-[120px] text-text font-[600] items-start justify-start gap-2.5 rounded-[20px] flex p-4 relative self-stretch w-full bg-white border border-solid border-zinc-200">
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="اكتب رسالتك هنا"
              className="w-full h-full resize-none mt-[-1.00px] text-[#2d2d2d] text-sm text-right leading-5 relative  placeholder:text-text-alt"
              required
              aria-required="true"
            />
          </div>
        </div>
      </div>

      <footer className="flex-col items-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-16 py-6 relative self-stretch w-full flex-[0_0_auto] bg-secondary rounded-[20px] hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
        >
          <span className="w-fit  font-bold text-neutral-50 text-xl text-center leading-8 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative ">
            إرسال الرسالة
          </span>
        </button>
        <p className="self-stretch text-text-alt text-sm text-center leading-5 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative ">
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
      content: "123 شارع التعليم 123، منطقة المعرفة\nالمدينة التعليمية، 12345",
      icon: "location",
      multiline: true,
    },
    {
      id: 2,
      title: "رقم الهاتف",
      content: "+123-456-789",
      icon: "phone",
      multiline: false,
    },
    {
      id: 3,
      title: "عنوان البريد الإلكتروني",
      content: "support@example.com",
      icon: "email",
      multiline: false,
    },
  ];

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "location":
        return <ContactUsLocatoinIcon />;
      case "phone":
        return <ContactCallIcon />;
      case "email":
        return <ContactEmailIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center gap-8 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-zinc-200">
      <div className="flex-col items-start gap-6 px-4 py-6 self-stretch w-full flex-[0_0_auto] rounded-[30px] border border-solid border-zinc-200 flex relative">
        {contactInfo.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.multiline ? "h-20" : "h-14"
            } items-start gap-4 relative self-stretch w-full`}
          >
            {renderIcon(item.icon)}
            <div className="flex-col items-end gap-2 flex-1 grow flex relative">
              <div className="relative self-stretch text-text text-bold  text-text text-2xl leading-6 ">
                {item.title}
              </div>
              {item.multiline ? (
                <p className="overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]  relative self-stretch  text-text-alt text-base leading-6">
                  {item.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < item.content.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ) : (
                <div className="text-right relative self-stretch  text-text-alt text-base leading-6">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="relative self-stretch w-full h-[363px] rounded-[30px] bg-[url(/FRAMEFRAME.png)] bg-cover bg-[50%_50%]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2469.651276731672!2d103.92282860081133!3d1.3168175955062613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1skampung%20siglap!5e0!3m2!1sar!2sus!4v1758099840334!5m2!1sar!2sus"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
