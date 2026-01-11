import { Icon } from "@iconify/react";
import React from "react";
export const options = [
  {
    id: "marketer",
    label: "مسوق",
    icon: "fluent-mdl2:telemarketer",
  },
  {
    id: "student",
    label: "متدرب",
    icon: "ph:student",
  },
];

export default function SelectType({ type, setType, setShowLogin }) {
  return (
    <div className="flex justify-center h-[81vh] items-center mx-auto flex-col py-10 md:py-16 lg:py-20 px-4 max-w-[640px] w-full">
      {/* Logo & Title */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          loading="lazy"
          className="w-16 sm:w-20 md:w-[90px]"
          alt="Logo"
          src={"/images/logo.svg"}
        />

        <p className="font-bold text-text text-xl md:text-2xl text-center">
          مرحباً بعودتك مرة أخرى
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-6 w-full mt-4">
        {options.map((opt) => {
          const isActive = type === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => {
                setType(opt);
                setShowLogin(true);
              }}
              className={`
                group cursor-pointer flex flex-col items-center justify-center 
                p-6 rounded-2xl border-2 transition-all duration-300 
                ${
                  isActive
                    ? "border-secondary bg-secondary/10 shadow-lg scale-[1.03]"
                    : "border-gray-300 bg-white hover:shadow-md hover:scale-[1.02]"
                }
              `}
            >
              <div
                className={`
                  flex items-center justify-center mb-4 transition-all duration-300
                  w-16 h-16 md:w-20 md:h-20 rounded-full border 
                  ${
                    isActive
                      ? "bg-secondary text-white border-secondary"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }
                `}
              >
                <Icon icon={opt.icon} className="text-3xl md:text-4xl" />
              </div>

              <p
                className={`
                  font-bold text-lg md:text-xl transition-all duration-300 
                  ${isActive ? "text-secondary" : "text-text"}
                `}
              >
                {opt.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
