"use client";
import NextLink from "next/link";

export default function NavLink({ href, onClick, children, ...props }) {
  return (
    <NextLink
      href={href || "#"}
      onClick={(e) => {
        if (onClick) onClick(e);
        return typeof window != undefined ? window.location.href = href : "#";
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}
