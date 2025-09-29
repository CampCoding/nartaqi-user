
"use client"


import React from "react";
import {
  FooterCallIcon,
  FooterEmailIcon,
  FooterInstagramIcon,
  FooterLocationIcon,
  FooterSnapchatIcon,
  FooterTelegramIcon,
  FooterTiktokIcon,
  FooterTwitterIcon,
  FooterWhatsappIcon,
  FooterYoutubeIcon,
} from "../../public/svgs";
import { usePathname } from "next/navigation";


const Footer = () => {


  const pathname = usePathname()

  if(pathname.includes("mock-test")){
    return null
  }




  return (
    <footer
      className="pt-[126px] pb-[80px] "
      style={{
        backgroundImage: `url('/images/footer 3.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-[64px]">
        <Frame />
      </div>
    </footer>
  );
};

export default Footer;

export const Frame = () => {
  const quickLinks = [
    { text: "حولنا", width: "w-7" },
    { text: "الأسئلة الشائعة" },
    { text: "فريق", width: "w-7" },
    { text: "سياسة الخصوصية" },
    { text: "مدونة", width: "w-8" },
  ];

  const resources = [
    { text: "دعم", width: "w-[22px]" },
    { text: "جدول الدراسة" },
    { text: "النقاط المرجحة" },
    { text: "اختبار المستوى" },
  ];

  const contactInfo = [
    {
      text: "+1 234 567 890",
      width: "w-[101.58px]",
      icon: <FooterCallIcon />,
      iconClass: "absolute w-[15px] h-[15px] top-px left-px",
    },
    {
      text: "contact@maannartaqi.com",
      width: "w-[172.95px]",
      icon: <FooterEmailIcon />,
      iconClass: "absolute w-[15px] h-[5px] top-px -left-px",
    },
    {
      text: "123 Education St, Learning City",
      width: "w-[199.61px]",
      icon: <FooterLocationIcon />,
      hasLocationIcon: true,
    },
  ];

  return (
    <div className="">
      <div className="flex items-start justify-between">
        <div className="">
          <div className=" flex flex-col " />
          <img src="/images/logo.svg" className="w-16 h-16 " alt="Frame" />
          <p className=" w-[281px] mt-[36px]  text-neutral-50 text-sm leading-5 ">
            تمكين الطلاب والمعلمين من خلال تحضير شامل للاختبارات وموارد التطوير
            المهني.
          </p>{" "}
        </div>
        <nav
          className="flex flex-col w-[304px] h-44  gap-4 pt-0 pb-1 px-0 relative"
          role="navigation"
          aria-label="روابط سريعة"
        >
          <header className="flex w-[304px] h-6 items-center  relative">
            <h2 className="w-[88px]  text-base leading-6 relative self-stretch text-neutral-50 ">
              روابط سريعة
            </h2>
          </header>
          <ul className="flex flex-col w-[304px] h-[132px]  gap-2 relative">
            {quickLinks.map((link, index) => (
              <li key={index} className="flex  h-5 items-center  relative">
                <a
                  href="#"
                  className={`${link.width}  font-inter text-sm leading-5 relative self-stretch text-neutral-50  hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200`}
                  tabIndex={0}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          className="flex flex-col w-[304px] h-44  gap-4 pt-0 pb-1 px-0 relative"
          role="navigation"
          aria-label=" الموارد"
        >
          <header className="flex w-[304px] h-6 items-center  relative">
            <h2 className="w-[88px]  text-base leading-6 relative self-stretch text-neutral-50 ">
              الموارد
            </h2>
          </header>
          <ul className="flex flex-col w-[304px] h-[132px]  gap-2 relative">
            {resources.map((link, index) => (
              <li key={index} className="flex  h-5 items-center  relative">
                <a
                  href="#"
                  className={`${link.width}  font-inter text-sm leading-5 relative self-stretch text-neutral-50  hover:text-neutral-200 focus:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200`}
                  tabIndex={0}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <section
          className="relative w-[304px] "
          role="region"
          aria-label="Contact Information"
        >
          <div>
            <header className="flex w-[304px] h-6 items-center   top-0 left-0">
              <h2 className="w-[39px]  text-base leading-6  relative self-stretch text-neutral-50">
                اتصل
              </h2>
            </header>

            <div className="flex flex-col mt-4 text-end w-[304px] h-[92px] items-start gap-4 ">
              {contactInfo?.map((contact) => (
                <div
                  key={contact.id}
                  className="flex w-[304px] h-5 items-center  relative"
                >
                  <div
                    className="items-start inline-flex h-4 relative flex-[0_0_auto]"
                    aria-hidden="true"
                  >
                    <div className="relative w-4 h-4 ml-4">
                      {contact?.icon ? (
                        <div
                          className="absolute w-[15px] h-[15px] top-px left-px"
                          alt={contact.iconAlt}
                          src={contact.icon}
                        >
                          {contact.icon}
                        </div>
                      ) : contact?.isEmail ? (
                        <div className="relative w-[15px] h-3 top-0.5 left-px rounded-[1.33px] border-[1.33px] border-solid border-neutral-50">
                          <img
                            className="absolute w-[15px] h-[5px] top-px -left-px"
                            alt={contact.iconAlt}
                            src={h333}
                          />
                        </div>
                      ) : contact?.isLocation ? (
                        <div className="relative w-3 h-[15px] top-px left-0.5 bg-[url(/h-336.svg)] bg-[100%_100%]">
                          <div className="relative w-[5px] h-[5px] top-[3px] left-[3px] rounded-[2.67px] border-[1.33px] border-solid border-neutral-50" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {contact?.isEmail ? (
                    <a
                      href={`mailto:${contact.text}`}
                      className="w-[172.95px]  text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative self-stretch text-neutral-50 hover:underline focus:underline focus:outline-2 focus:outline-neutral-50"
                      aria-label={`Send email to ${contact.text}`}
                    >
                      {contact.text}
                    </a>
                  ) : contact?.id === 1 ? (
                    <a
                      dir="ltr"
                      href={`tel:${contact.text}`}
                      className="w-[101.58px]   text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative self-stretch text-neutral-50 hover:underline focus:underline focus:outline-2 focus:outline-neutral-50"
                      aria-label={`Call ${contact.text}`}
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <address
                      dir="ltr"
                      className="w-[199.61px]  text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative self-stretch text-neutral-50 not-italic"
                    >
                      {contact.text}
                    </address>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center  mt-6 gap-4">
            <FooterTelegramIcon />
            <FooterSnapchatIcon />
            <FooterTiktokIcon />
            <FooterWhatsappIcon />
            <FooterYoutubeIcon />
            <FooterTwitterIcon />
            <FooterInstagramIcon />
          </div>
        </section>
      </div>
      <div className=" my-8 h-px relative bg-neutral-50/20" />

      <p dir="ltr" className=" text-neutral-50 text-sm text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] font-inter [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
        © 2025 Ma'an Nartaqi. All rights reserved.
      </p>
    </div>
  );
};
