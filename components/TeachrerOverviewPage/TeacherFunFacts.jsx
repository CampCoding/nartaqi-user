"use client";

import React, { useMemo } from "react";

/**
 * Props:
 * - rounds: array from API (message.rounds)
 * - positiveRate: number (default 95) // until API provides rating stats
 *
 * round item has: students_count, lessons_count, ...
 */
const TeacherFunFacts = ({ rounds = [], positiveRate = 95 }) => {
  const stats = useMemo(() => {
    const students = (rounds || []).reduce(
      (sum, r) => sum + (Number(r?.students_count) || 0),
      0
    );

    const courses = (rounds || []).length;

    return { students, courses };
  }, [rounds]);

  const formatNumber = (n) => {
    try {
      return new Intl.NumberFormat("ar-EG").format(n);
    } catch {
      return String(n);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary via-zinc-500 to-secondary rounded-[30px] inline-flex justify-between items-center">
      <div className="flex-1 self-stretch py-8 border-white inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white text-2xl font-medium">
          طالب
        </div>
        <div className="self-stretch text-center text-white text-5xl font-bold h-[90px] flex items-center justify-center">
          {formatNumber(stats.students)}
        </div>
      </div>

      <div className="flex-1 self-stretch py-8 border-x border-white inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white text-2xl font-medium">
          دورة تدريبية
        </div>
        <div className="text-center text-white text-5xl font-bold h-[90px] flex items-center justify-center">
          {formatNumber(stats.courses)}
        </div>
      </div>

      <div className="flex-1 self-stretch py-8 inline-flex flex-col justify-start items-center gap-2">
        <div className="text-center justify-center text-white text-2xl font-medium">
          تقييمات إيجابية
        </div>
        <div className="text-center text-white text-5xl font-bold h-[90px] flex items-center justify-center">
          %{formatNumber(positiveRate)}
        </div>
      </div>
    </div>
  );
};

export default TeacherFunFacts;
