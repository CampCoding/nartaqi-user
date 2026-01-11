"use client";

import React, { useMemo, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import { BadgesNavs } from "../(account)/my-badges/page";
import useGetfaqs from "../../components/shared/Hooks/useGetfaqs";

const categoryMap = {
  all: "الكل",
  general_aptitude: "القدرات العامة",
  technical_support: "الدعم الفني",
  payment: "التسجيل والدفع",
  courses: "دورات",
  general: "عام",
};

const FAQs = () => {
  const { data, error, isLoading } = useGetfaqs();
  const faqData = data?.message ?? [];

  // Categories extracted from API
  const categoriesFromAPI = [...new Set(faqData.map((item) => item.category))];

  // Build Navigation Items the same shape as your design
  const navigationItems = categoriesFromAPI.map((cat, index) => ({
    id: index + 1,
    key: cat,
    text: categoryMap[cat] || cat,
    active: cat === "all",
  }));

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "all") return faqData;
    return faqData.filter((item) => item.category === activeCategory);
  }, [activeCategory, faqData]);

  return (
    <div>
      <PagesBanner
        title={"الأسئلة الشائعة"}
        variant="normal"
        objectPosition="object-[50%_50%]"
        image={"/images/faq-banner.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "الأسئلة الشائعة", link: "/faqs" },
        ]}
      />

      <Container className="mt-[48px]">
        <div className="text-right justify-center text-primary  text-3xl md:text-5xl font-bold  mb-8">
          الأسئلة الشائعة
        </div>

        <NavigationItems
          items={navigationItems}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="mt-8 flex flex-col gap-4 md:gap-6">
          {filteredFaqs?.map((item) => (
            <QuestionAccordion key={item.id} item={item} />
          ))}
        </div>
      </Container>

      <AnswerNotFound />
    </div>
  );
};

export default FAQs;

export const NavigationItems = ({
  items,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <nav
      className="flex h-[116px] items-center justify-center px-4 py-6 relative bg-primary-light rounded-[20px]"
      role="navigation"
      aria-label="Navigation menu"
    >
      {items
        .slice()

        .map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.key)}
            className={`rounded-[20px] py-[24px] px-[64px] flex-[0_0_auto] ${
              activeCategory === item.key ? "bg-primary" : ""
            }`}
          >
            <span
              className={`text-xl ${
                activeCategory === item.key
                  ? "text-white font-bold"
                  : "text-text"
              }`}
            >
              {item.text}
            </span>
          </button>
        ))}
    </nav>
  );
};

export const QuestionAccordion = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl md:rounded-[30px] overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        // CHANGED: Reduced padding on mobile (`p-4`) and restored it for medium screens (`md:p-6`).
        className={`self-stretch p-4 gap-3 md:p-6 transition  flex justify-between items-center cursor-pointer ${
          open ? "bg-primary" : "bg-primary-light hover:!bg-primary-bg"
        }`}
      >
        <div
          className="text-right text-sm leading-loose md:text-lg"
          style={{
            color: open ? "#fff" : "#2d2d2d",
          }}
        >
          {item.question}
        </div>
        <div
          className={`size-10 md:size-12 flex items-center justify-center transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.2502 31.1158C36.0372 31.3292 35.7842 31.4985 35.5057 31.6141C35.2272 31.7296 34.9286 31.7891 34.6271 31.7891C34.3256 31.7891 34.027 31.7296 33.7485 31.6141C33.47 31.4985 33.217 31.3292 33.004 31.1158L24.0713 22.1831L15.1386 31.1158C14.7082 31.5463 14.1243 31.7881 13.5156 31.7881C12.9068 31.7881 12.323 31.5463 11.8925 31.1158C11.462 30.6853 11.2202 30.1015 11.2202 29.4927C11.2202 28.8839 11.462 28.3001 11.8925 27.8696L22.4598 17.3023C22.6728 17.0889 22.9258 16.9196 23.2043 16.8041C23.4828 16.6885 23.7813 16.6291 24.0829 16.6291C24.3844 16.6291 24.6829 16.6885 24.9614 16.8041C25.24 16.9196 25.4929 17.0889 25.7059 17.3023L36.2732 27.8696C37.1481 28.7445 37.1481 30.2179 36.2502 31.1158Z"
              fill={open ? "white" : "black"}
            />
          </svg>
        </div>
      </div>

      {/* Answer */}
      {open && (
        <div
          // CHANGED: Reduced padding and line-height for mobile for better readability.
          className="p-4 md:p-6 text-right text-text text-base font-medium leading-relaxed md:leading-[36px] border-2 border-t-0 border-zinc-500 overflow-hidden rounded-b-[30px]"
          style={{
            outlineTop: open ? "solid" : "none",
          }}
        >
          {item.answer}
        </div>
      )}
    </div>
  );
};

const AnswerNotFound = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        px-4
        h-auto py-10 md:py-0 md:h-[276px]
        mt-10 md:mt-[64px]
        mb-16 md:mb-[105px]
      "
      style={{
        backgroundImage: `url('/images/FRAME (3).png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[202px]">
        <div
          className="
          font-bold text-[#2d2d2d] leading-normal text-2xl md:text-[32px] text-center
          overflow-hidden text-ellipsis whitespace-nowrap
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        "
        >
          لم تجد إجابتك؟
        </div>
      </div>

      <div className="w-full max-w-[307px] mt-3 md:mt-[24px] mb-6 md:mb-[32px]">
        <p
          className="
          text-text-alt text-xl md:text-2xl text-center leading-normal
          overflow-hidden text-ellipsis
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        "
        >
          فريق الدعم لدينا هنا للمساعدة
        </p>
      </div>

      <button
        type="button"
        aria-label="الاتصال الدعم"
        className="
          inline-flex items-center justify-center gap-2
         w-auto
          px-6 md:px-8 py-3 md:py-4
          bg-primary rounded-[20px] cursor-pointer
          transition-colors hover:bg-secondary-dark
          focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
        "
      >
        <span
          className="
          text-neutral-50 text-sm md:text-base font-bold leading-5 text-center
          overflow-hidden text-ellipsis whitespace-nowrap
          [display:-webkit-box] sm:[-webkit-line-clamp:2] md:[-webkit-line-clamp:1] [-webkit-box-orient:vertical]
        "
        >
          الاتصال بالدعم
        </span>
      </button>
    </div>
  );
};
