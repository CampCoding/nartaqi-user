import Link from "@/components/ui/NavLink";
import React from "react";
import Container from "./../ui/Container";

export const TopServices = () => {
  const servicesData = [
    {
      id: 3,
      text: "أنشئ جدول للمذاكرة",
      borderColor: "border-primary",
      textColor: "text-primary",
      hoverbg: "hover:bg-primary",
      href: "/study-planner",
    },
    {
      id: 2,
      text: "احسب نسبتك الموزونة",
      borderColor: "border-secondary",
      textColor: "text-secondary",
      hoverbg: "hover:bg-secondary",
      href: "/weighted-percentage-calculator",
    },
    {
      id: 1,
      text: "بوابة الدعم",
      borderColor: "border-primary-dark",
      textColor: "text-primary-dark",
      hoverbg: "hover:bg-primary-dark",
      href: "/support-gate",
    },
  ];

  return (
    <div className="hidden md:flex h-[100px] lg:h-[120px] items-center justify-center bg-primary-light">
      <Container className="flex h-[56px] lg:h-[68px] w-full relative items-center justify-between gap-3 lg:gap-4">
        {servicesData.map((service) => (
          <Link
            href={service.href}
            key={service.id}
            className={`${service.borderColor} ${service?.hoverbg} cursor-pointer transition-all group hover:text-white flex flex-1 max-w-[250px] h-[56px] lg:h-[68px] items-center justify-center gap-2.5 py-3 lg:py-5 px-3 relative bg-bg rounded-[16px] lg:rounded-[20px] border-2 border-solid`}
          >
            <div
              className={`${service.textColor} transition-all group-hover:!text-white relative flex items-center justify-center w-fit mt-[-3px] font-semibold text-sm lg:text-base leading-normal text-center`}
            >
              {service.text}
            </div>
          </Link>
        ))}
      </Container>
    </div>
  );
};