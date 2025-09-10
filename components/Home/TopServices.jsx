


import React from "react";

export const TopServices = () => {
  const servicesData = [
    {
      id: 3,
      text: "أنشئ جدول للمذاكرة",
      borderColor: "border-foundation-bluenormal",
      textColor: "text-foundation-bluenormal",
    },
    {
      id: 2,
      text: "احسب نسبتك الموزونة",
      borderColor: "border-foundation-orangenormal",
      textColor: "text-foundation-orangenormal",
    },
    {
      id: 1,
      text: "بوابة الدعم",
      borderColor: "border-foundationbluenormal",
      textColor: "text-foundationbluenormal",
    },
  ];

  return (
    <div className=" flex items-center justify-center h-[127px] bg-[#ebf3fe]">
      <div className="flex container px-[64px] items-center justify-between relative ">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className={`flex ${service.id === 1 ? "w-[286px]" : "inline-flex flex-[0_0_auto]"} ${service.borderColor} h-[78px] items-center justify-center gap-2.5 px-16 py-6 relative bg-variable-collection-white-moca rounded-[20px] border-[3px] border-solid`}
          >
            <div
              className={`${service.textColor} relative w-fit mt-[-5.00px]  font-semibold text-lg text-left tracking-[0] leading-[normal]`}
            >
              {service.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};