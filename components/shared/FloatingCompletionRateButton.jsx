"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";

export default function FloatingCompletionRateButton({
  href = "/completion-rate",
  label = "معدل الإنجاز",
  className = "",
}) {


  const user = useSelector(state => state.auth)
 if (!user) return null


  return (
    <Link
      href={href}
      aria-label={label}
      className={["fixed bottom-5 right-5 z-[9999] group", className].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden",
          "flex items-center gap-0 group-hover:gap-2",
          "rounded-full px-3 py-3", // smaller by default (icon only)
          "bg-primary text-white",
          "shadow-lg shadow-blue-600/25",
          "border border-white/10",
          "transition-all duration-200",
          "hover:-translate-y-1 hover:shadow-xl",
          "active:translate-y-0",
        ].join(" ")}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <BarChart3 className="h-5 w-5" />
        </span>

        {/* ✅ Hidden until hover */}
        <span
          className={[
            "whitespace-nowrap font-extrabold text-sm",
            "max-w-0 opacity-0 translate-x-1",
            "overflow-hidden",
            "transition-all duration-200",
            "group-hover:max-w-[180px] group-hover:opacity-100 group-hover:translate-x-0",
          ].join(" ")}
        >
          {label}
        </span>

        {/* subtle shine */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 blur-md transition group-hover:opacity-100" />
      </div>
    </Link>
  );
}
