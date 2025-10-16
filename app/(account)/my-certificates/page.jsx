import React from "react";
import { MyCertificateCard } from "../../../components/ui/Cards/MyCertificateCard";

const MyCertificates = () => {
  return (
    <div className="w-full">
      <div className="leading-normal self-stretch h-12 sm:h-14 text-right justify-center text-text text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
        شهاداتي
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-4 sm:gap-6 lg:gap-y-[24px] lg:gap-x-6 place-items-center">
        <MyCertificateCard />
        <MyCertificateCard />
        <MyCertificateCard />
        <MyCertificateCard />
        <MyCertificateCard />
        <MyCertificateCard />
      </div>
    </div>
  );
};

export default MyCertificates;
