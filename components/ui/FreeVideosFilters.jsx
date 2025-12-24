"use client";

import React, { useEffect, useMemo, useState } from "react";

const SORT_OPTIONS = [
  { value: "id_desc", label: "الأحدث" },
  { value: "id_asc", label: "الأقدم" },
  { value: "time_desc", label: "الأطول مدة" },
  { value: "time_asc", label: "الأقصر مدة" },
  { value: "title_asc", label: "العنوان A → Z" },
  { value: "title_desc", label: "العنوان Z → A" },
];

const PLATFORM_OPTIONS = [
  { value: "all", label: "كل المنصات" },
  { value: "youtube", label: "YouTube" },
  { value: "vimeo", label: "Vimeo" },
];

export default function FreeVideosFilters({
  value,
  onChange,
  debounceMs = 350,
}) {
  const [localSearch, setLocalSearch] = useState(value.search || "");

  useEffect(() => setLocalSearch(value.search || ""), [value.search]);

  // debounce search typing
  useEffect(() => {
    const t = setTimeout(() => {
      if (localSearch !== value.search) {
        onChange({ ...value, search: localSearch });
      }
    }, debounceMs);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  const canReset = useMemo(() => {
    return (
      (value.search || "") !== "" ||
      value.platform !== "all" ||
      value.sort !== "id_desc" ||
      value.minSec !== "" ||
      value.maxSec !== ""
    );
  }, [value]);

  const reset = () => {
    onChange({
      search: "",
      platform: "all",
      sort: "id_desc",
      minSec: "",
      maxSec: "",
    });
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
      <div className="flex flex-col gap-4">
        {/* Row 1: Search + Reset */}
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <label className="block text-sm text-neutral-700 mb-1">بحث</label>
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="ابحث في العنوان أو الوصف..."
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
            />
          </div>

          <button
            onClick={reset}
            disabled={!canReset}
            className={`px-4 py-3 rounded-xl border text-sm ${
              canReset
                ? "border-neutral-200 hover:border-neutral-400"
                : "border-neutral-100 text-neutral-300 cursor-not-allowed"
            }`}
          >
            مسح الفلاتر
          </button>
        </div>

        {/* Row 2: Platform + Sort + Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm text-neutral-700 mb-1">المنصة</label>
            <select
              value={value.platform}
              onChange={(e) => onChange({ ...value, platform: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400 bg-white"
            >
              {PLATFORM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">الترتيب</label>
            <select
              value={value.sort}
              onChange={(e) => onChange({ ...value, sort: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400 bg-white"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">
              المدة (ثانية) من
            </label>
            <input
              type="number"
              min={0}
              value={value.minSec}
              onChange={(e) => onChange({ ...value, minSec: e.target.value })}
              placeholder="مثال: 60"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-700 mb-1">
              المدة (ثانية) إلى
            </label>
            <input
              type="number"
              min={0}
              value={value.maxSec}
              onChange={(e) => onChange({ ...value, maxSec: e.target.value })}
              placeholder="مثال: 600"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:border-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
