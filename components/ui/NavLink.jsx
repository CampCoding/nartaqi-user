"use client";

import NextLink from "next/link";

// ✅ Helper يضمن إن الـ href دايمًا string
const normalizeHref = (href) => {
  if (!href) return "#";
  if (typeof href === "string") return href;
  if (typeof href === "object") {
    console.warn("⚠️ NavLink received object href:", href);
    if (href.pathname) return String(href.pathname);
    if (href.url) return String(href.url);
    if (href.href) return String(href.href);
    return "#";
  }
  return String(href);
};

export default function NavLink({ href, onClick, children, ...props }) {
  const safeHref = normalizeHref(href);

  return (
    <NextLink
      href={safeHref}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}