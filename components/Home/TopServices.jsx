import Link from "next/link";
import React from "react";

export const TopServices = () => {
  const servicesData = [
    {
      id: 3,
      text: "أنشئ جدول للمذاكرة",
      borderColor: "border-primary",
      textColor: "text-primary",
      hoverbg: "hover:bg-primary",
      href:"/study-planner"
    },
    {
      id: 2,
      text: "احسب نسبتك الموزونة",
      borderColor: "border-secondary",
      textColor: "text-secondary",
      hoverbg: "hover:bg-secondary",
      href:"/weighted-percentage-calculator"
    },
    {
      id: 1,
      text: "بوابة الدعم",
      borderColor: "border-primary-dark",
      textColor: "text-primary-dark",
      hoverbg: "hover:bg-primary-dark",
      href:"/support-gate"
    },
  ];

  return (
    <div className="h-[120px] flex items-center justify-center bg-primary-light">
      <div className="flex container px-[64px] h-[68px] w-full  relative items-center justify-between">
        {servicesData.map((service) => (
          <Link href={service.href}
            key={service.id}
            className={`${service.borderColor} ${service?.hoverbg} cursor-pointer transition-all group hover:text-white flex w-[250px] h-[68px] items-center justify-center gap-2.5 py-5 relative bg-bg rounded-[20px] border-2 border-solid`}
          >
            <div
              className={`${service.textColor} transition-all group-hover:!text-white relative flex items-center justify-center w-fit mt-[-3px] font-semibold text-base leading-normal `}
            >
              {service.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
