
"use client"
const buildShareUrl = (roundId) => {
  if (typeof window === "undefined") return "";
  const origin = window.location.origin;
  return roundId ? `${origin}/course/${roundId}` : window.location.href;
};

export default buildShareUrl;
