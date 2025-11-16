"use client";

import Image from "next/image";
import React from "react";

export default function NoContent({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Image */}
      <div className="relative w-60 h-60 sm:w-72 sm:h-72">
        <Image
          src="/images/NoContent.svg"
          alt="No content"
          fill
          className="object-contain opacity-50"
          priority
        />
      </div>

      {/* Title */}
      <p className="mt-4 text-xl sm:text-2xl font-semibold text-primary text-center">
        {title}
      </p>
    </div>
  );
}
