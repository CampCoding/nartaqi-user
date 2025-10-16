import React from "react";
import { BadgeCard } from "../../../components/ui/Cards/BadgeCard";

const MyBadgesPage = () => {
  return (
    <main className="w-full">
      <header className="flex flex-col items-start gap-2 relative mb-6 sm:mb-[24px]">
        <h1 className="font-bold text-text text-xl sm:text-2xl relative flex items-center self-stretch tracking-[0] leading-[normal]">
          شاراتي
        </h1>

        <p className="font-medium text-text-alt text-sm sm:text-base relative flex items-center self-stretch tracking-[0] leading-[normal]">
          استكشف مجموعتك من الشارات التي حصلت عليها لإنجازاتك التعليمية
          المتميزة.
        </p>
      </header>

      <BadgesNavs />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-[14px] gap-y-6 sm:gap-y-[32px] mt-6 sm:mt-[32px] place-items-center">
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
        <BadgeCard />
      </div>
    </main>
  );
};

export default MyBadgesPage;

export const BadgesNavs = () => {
  const navigationItems = [
    {
      text: "الكل",
      active: true,
    },
    {
      text: "القدرات العامة",
      active: false,
    },
    {
      text: "تحصيلي",
      active: false,
    },

    {
      text: "الرخصة المهنية",
      active: false,
    },
    {
      text: "قدرات الجامعيين",
      active: false,
    },
  ];

  return (
    <nav
      className="w-full bg-primary-light rounded-[20px] sm:rounded-[25px] p-3 sm:p-4"
      role="navigation"
      aria-label="Navigation menu"
    >
      <div className="xl:hidden">
        <div className="flex items-center gap-2 overflow-x-auto hidden-scroll  scrollbar-hide pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className={`
                  px-4 py-3 rounded-[12px] sm:rounded-[15px] 
                  inline-flex items-center justify-center 
                  transition-all duration-200 whitespace-nowrap
                  min-w-[80px] flex-shrink-0
                  ${item.active ? "bg-primary" : "hover:bg-primary/10"}
                `}
                type="button"
                aria-current={item.active ? "page" : undefined}
              >
                <span
                  className={`
                    text-sm sm:text-base font-medium text-center
                    ${item.active ? "text-white font-bold" : "text-text"}
                    [direction:rtl]
                  `}
                >
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop - Full Width Grid */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-5 gap-2">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={`
                px-4 py-4 rounded-[15px] 
                inline-flex items-center justify-center 
                transition-all duration-200 
                ${item.active ? "bg-primary" : "hover:bg-primary/10"}
              `}
              type="button"
              aria-current={item.active ? "page" : undefined}
            >
              <span
                className={`
                  text-base font-medium text-center leading-tight
                  ${item.active ? "text-white font-bold" : "text-text"}
                  ${item.text === "قدرات الجامعيين" ? "leading-5" : ""}
                  [direction:rtl]
                `}
              >
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
