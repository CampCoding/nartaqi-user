"use client";

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
import Link from "next/link";
import Container from "../ui/Container";
import useSupportInfo from "./Hooks/getSupportInfo";
import useSocialAccounts from "./Hooks/useSocialAccounts";
import {
  EmailIcon,
  PhoneIcon,
  WhatsappIcon,
} from "../../app/technical-support/page";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("mock-test")) {
    return null;
  }

  const {
    whatsappHref,
    emailText,
    phoneText,
    whatsappNumber,
    telHref,
  } = useSupportInfo();

  const { accounts: socialAccounts } = useSocialAccounts();

  return (
    <footer
      className="pt-16 md:pt-[126px] pb-[80px]"
      style={{
        backgroundImage: `url('/images/footer 3.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Frame
          whatsappNumber={whatsappNumber}
          whatsappHref={whatsappHref}
          emailText={emailText}
          phoneText={phoneText}
          telHref={telHref}
          socialAccounts={socialAccounts}
        />
      </Container>
    </footer>
  );
};

export default Footer;

export const Frame = ({
  whatsappNumber = "",
  whatsappHref = "",
  emailText = "",
  phoneText = "",
  telHref = "",
  socialAccounts = [],
}) => {
  const aboutPlatform = [
    { text: "من نحن", href: "/about-us" },
    { text: "فريق العمل", href: "/team-work" },
    { text: "الأسئلة الشائعة", href: "/faqs" },
    { text: "شروط الاستخدام والخصوصية", href: "/conditions-and-privacy" },
    { text: "المدونة", href: "/blogs" },
    { text: "تواصل معنا", href: "/contact-us" },
  ];

  const quickLinks = [
    { text: "المدربون", href: "/instructors" },
    { text: "بوابة الدعم", href: "/support-gate" },
    { text: "شروط الالتحاق بالدورات", href: "/conditions-for-joining-courses" },
    { text: "الدعم الفني", href: "/technical-support" },
    { text: "الشكاوى والمقترحات", href: "/complaints-and-suggestions" },
  ];

  const contactInfo = [
    {
      id: 0,
      text: whatsappNumber || "—",
      icon: <WhatsappIcon />,
      href: whatsappHref || "#",
    },
    {
      id: 1,
      text: phoneText || "—",
      icon: <PhoneIcon />,
      href: telHref || "#",
    },
    {
      id: 2,
      text: emailText || "—",
      icon: <EmailIcon />,
      href: emailText ? `mailto:${emailText}` : "#",
    },
  ];

  return (
    <div>
      <div className="flex items-start flex-col md:flex-row md:flex-wrap space-y-10 justify-between">
        <div>
          <img
            loading="lazy"
            src="/images/logo.svg"
            className="w-16 h-16"
            alt="Logo"
          />
          <p className="w-[281px] mt-[36px] text-neutral-50 text-sm leading-5">
            تمكين الطلاب والمعلمين من خلال تحضير شامل للاختبارات وموارد التطوير
            المهني.
          </p>
        </div>

        {/* About */}
        <nav
          className="flex flex-col gap-4 pt-0 pb-1 px-0"
          role="navigation"
          aria-label="عن المنصة"
        >
          <header className="flex items-center">
            <h2 className="font-bold text-base leading-6 text-neutral-50">
              عن المنصة
            </h2>
          </header>
          <ul className="flex flex-col gap-2">
            {aboutPlatform.map((link, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={link.href}
                  className="font-inter text-sm leading-5 text-neutral-50 hover:text-neutral-200 focus:text-neutral-200 transition-colors duration-200"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Links */}
        <nav
          className="flex flex-col gap-4 pt-0 pb-1 px-0"
          role="navigation"
          aria-label="روابط سريعة"
        >
          <header className="flex items-center">
            <h2 className="font-bold text-base leading-6 text-neutral-50">
              روابط سريعة
            </h2>
          </header>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                <Link
                  href={link.href}
                  className="font-inter text-sm leading-5 text-neutral-50 hover:text-neutral-200 focus:text-neutral-200 transition-colors duration-200"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <section role="region" aria-label="Contact Information">
          <header className="flex items-center">
            <h2 className="font-bold text-base leading-6 text-neutral-50">
              اتصل
            </h2>
          </header>

          <div className="flex flex-col mt-4 items-start gap-4">
            {contactInfo.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel={c.href?.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 text-neutral-50 hover:text-neutral-200 transition"
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  {c.icon}
                </span>
                <span
                  dir="ltr"
                  className="text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]"
                >
                  {c.text}
                </span>
              </a>
            ))}
          </div>

          {/* Social icons (dynamic from API) */}
          <div className="flex items-center mt-6 gap-4">
            {socialAccounts?.length ? (
              socialAccounts.map((acc) => (
                <a
                  key={acc.id}
                  href={acc.platform_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
                  aria-label={acc.platform_name}
                  title={acc.platform_name}
                >
                  <img
                    src={acc.image_url}
                    alt={acc.platform_name}
                    className="w-6 h-6 object-contain"
                    loading="lazy"
                  />
                </a>
              ))
            ) : (
              <>
                <FooterTelegramIcon />
                <FooterSnapchatIcon />
                <FooterTiktokIcon />
                <FooterWhatsappIcon />
                <FooterYoutubeIcon />
                <FooterTwitterIcon />
                <FooterInstagramIcon />
              </>
            )}
          </div>
        </section>
      </div>

      <div className="my-8 h-px bg-neutral-50/20" />

      <p
        dir="ltr"
        className="text-neutral-50 text-sm text-center leading-5 font-inter"
      >
        © 2025 Ma'an Nartaqi. All rights reserved.
      </p>
    </div>
  );
};
