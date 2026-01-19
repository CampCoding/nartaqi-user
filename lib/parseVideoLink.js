export function detectVideoType(link = "") {
  const original = String(link || "").trim();
  if (!original) return { link: "", type: "none" };

  // If it looks like a URL but missing protocol, URL() needs a base
  let url;
  try {
    url = original.startsWith("http")
      ? new URL(original)
      : new URL(`https://${original}`);
  } catch {
    // Not a valid URL (still keep it)
    return { link: original, type: "unknown" };
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  const isYouTube =
    host === "youtu.be" ||
    host.includes("youtube.com") ||
    host.includes("youtube-nocookie.com");

  const isVimeo = host.includes("vimeo.com");

  return {
    link: original, // ✅ full link 그대로
    type: isYouTube ? "youtube" : isVimeo ? "vimeo" : "unknown",
  };
}
