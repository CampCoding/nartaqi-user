// lib/parseVideoLink.js

/**
 * استخراج نوع الفيديو والـ ID من الرابط
 * يدعم: YouTube (watch, shorts, embed, youtu.be) و Vimeo
 */
export function detectVideoType(link = "") {
  const original = String(link || "").trim();
  if (!original) return { link: "", type: "none", videoId: "" };

  let url;
  try {
    url = original.startsWith("http")
      ? new URL(original)
      : new URL(`https://${original}`);
  } catch {
    return { link: original, type: "unknown", videoId: "" };
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  const pathname = url.pathname;

  // ✅ YouTube
  const isYouTube =
    host === "youtu.be" ||
    host.includes("youtube.com") ||
    host.includes("youtube-nocookie.com");

  if (isYouTube) {
    let videoId = "";

    // youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      videoId = pathname.slice(1);
    }
    // youtube.com/watch?v=VIDEO_ID
    else if (url.searchParams.get("v")) {
      videoId = url.searchParams.get("v");
    }
    // youtube.com/shorts/VIDEO_ID
    else if (pathname.includes("/shorts/")) {
      videoId = pathname.split("/shorts/")[1];
    }
    // youtube.com/embed/VIDEO_ID
    else if (pathname.includes("/embed/")) {
      videoId = pathname.split("/embed/")[1];
    }
    // youtube.com/watch/VIDEO_ID (صيغة غير شائعة)
    else if (pathname.includes("/watch/")) {
      videoId = pathname.split("/watch/")[1];
    }
    // youtube.com/v/VIDEO_ID
    else if (pathname.includes("/v/")) {
      videoId = pathname.split("/v/")[1];
    }
    // youtube.com/live/VIDEO_ID
    else if (pathname.includes("/live/")) {
      videoId = pathname.split("/live/")[1];
    }

    // ✅ تنظيف الـ ID من أي parameters أو slashes إضافية
    if (videoId) {
      videoId = videoId.split(/[?&#/]/)[0];
    }

    return {
      link: original,
      type: "youtube",
      videoId: videoId || "",
    };
  }

  // ✅ Vimeo
  const isVimeo = host.includes("vimeo.com");

  if (isVimeo) {
    let videoId = "";

    // player.vimeo.com/video/VIDEO_ID
    if (pathname.includes("/video/")) {
      videoId = pathname.split("/video/")[1];
    }
    // vimeo.com/VIDEO_ID
    else {
      // استخراج أول مجموعة أرقام من الـ path
      const match = pathname.match(/\/(\d+)/);
      if (match) videoId = match[1];
    }

    // تنظيف
    if (videoId) {
      videoId = videoId.split(/[?&#/]/)[0];
    }

    return {
      link: original,
      type: "vimeo",
      videoId: videoId || "",
    };
  }

  return { link: original, type: "unknown", videoId: "" };
}

/**
 * استخراج YouTube Video ID فقط
 */
export function extractYouTubeId(url) {
  const result = detectVideoType(url);
  return result.type === "youtube" ? result.videoId : null;
}

/**
 * استخراج Vimeo Video ID فقط
 */
export function extractVimeoId(url) {
  const result = detectVideoType(url);
  return result.type === "vimeo" ? result.videoId : null;
}
