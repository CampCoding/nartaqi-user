import React from "react";
import { BadgeCard } from "../../../components/ui/Cards/BadgeCard";

const MyBadgesPage = () => {
  return (
    <main>
      <header className="flex flex-col items-start gap-2 relative mb-[24px]">
        <h1 className="mt-[-1.00px]  font-bold text-text text-2xl relative flex items-center  self-stretch tracking-[0] leading-[normal] ">
          شاراتي
        </h1>

        <p className="font-medium text-text-alt text-base relative flex items-center  self-stretch tracking-[0] leading-[normal] ">
          استكشف مجموعتك من الشارات التي حصلت عليها لإنجازاتك التعليمية
          المتميزة.
        </p>
      </header>

      <BadgesNavs />

      <div className="grid grid-cols-4 gap-x-[14px] gap-y-[32px] mt-[32px]">
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
    { text: "قدرات الجامعيين", padding: "px-8 py-4", active: false },
    { text: "الرخصة المهنية", padding: "px-8 py-4", active: false },
    { text: "تحصيلي", padding: "px-16 py-4", active: false },
    { text: "القدرات العامة", padding: "px-16 py-4", active: false },
    { text: "الكل", padding: "px-16 py-3", active: true },
  ];

  return (
    <nav
      className="flex h-[101px] items-center justify-between p-4 relative bg-primary-light rounded-[25px]"
      role="navigation"
      aria-label="Navigation menu"
    >
      {navigationItems.reverse().map((item, index) => (
        <button
          key={index}
          className={`${
            item.padding
          } rounded-[15px] inline-flex items-center justify-center relative flex-[0_0_auto] ${
            item.active ? "bg-primary" : ""
          }`}
          type="button"
          aria-current={item.active ? "page" : undefined}
        >
          <span
            className={`${
              item.active ? " text-white text-bold" : " text-text"
            } [-webkit-line-clamp:${
              item.text === "قدرات الجامعيين" ? "2" : "1"
            }] relative [display:-webkit-box] items-center justify-center w-fit text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [direction:rtl]`}
          >
            {item.text}
          </span>
        </button>
      ))}
    </nav>
  );
};
