"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { X, Play, VideoIcon } from "lucide-react";

import Container from "../../components/ui/Container";
import PagesBanner from "../../components/ui/PagesBanner";
import LoadingPage from "../../components/shared/Loading";
import FreeVideosFilters from "../../components/ui/FreeVideosFilters";
import VideoPlayer from "../../components/ui/Video";

import { useGetFreeVideos } from "../../components/shared/Hooks/useGetFreeRounds";

// ---------- helpers ----------
function toInt(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function formatDuration(sec) {
  if (sec === null || sec === undefined) return "";
  const s = toInt(sec, 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r}s`;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function isNumericId(v) {
  return /^[0-9]{6,}$/.test(String(v || "").trim());
}

function isDirectVideoUrl(url) {
  const s = String(url || "")
    .toLowerCase()
    .trim();
  return s.endsWith(".mp4") || s.endsWith(".m3u8") || s.includes(".mp4?");
}

function isYoutubeUrl(url) {
  const s = String(url || "").toLowerCase();
  return s.includes("youtube.com") || s.includes("youtu.be");
}

function isVimeoUrl(url) {
  const s = String(url || "").toLowerCase();
  return s.includes("vimeo.com") || s.includes("player.vimeo.com");
}

// ✅ دالة محسنة لاستخراج YouTube ID من جميع أنواع الروابط
function extractYoutubeId(url) {
  if (!url) return "";
  const str = String(url).trim();

  // إذا كان الـ ID مباشرة (11 حرف)
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // youtu.be/VIDEO_ID أو youtu.be/VIDEO_ID?si=xxx
  const shortMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/embed/VIDEO_ID
  const embedMatch = str.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // youtube.com/v/VIDEO_ID
  const vMatch = str.match(/\/v\/([a-zA-Z0-9_-]{11})/);
  if (vMatch) return vMatch[1];

  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = str.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return "";
}

// ✅ دالة محسنة لاستخراج Vimeo ID
function extractVimeoId(url) {
  if (!url) return "";
  const str = String(url).trim();

  // إذا كان رقم مباشرة
  if (/^[0-9]+$/.test(str)) {
    return str;
  }

  // vimeo.com/VIDEO_ID أو player.vimeo.com/video/VIDEO_ID
  const match = str.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match) return match[1];

  return "";
}

function buildYoutubeUrl(youtube_link) {
  if (!youtube_link) return "";
  const s = String(youtube_link).trim();
  if (s.startsWith("http")) return s;
  return `https://www.youtube.com/watch?v=${s}`;
}

function buildVimeoPlayerUrl(vimeo_link) {
  if (!vimeo_link) return "";
  const s = String(vimeo_link).trim();

  if (isNumericId(s)) return `https://player.vimeo.com/video/${s}`;

  if (s.startsWith("http")) {
    const id = extractVimeoId(s);
    if (id && isNumericId(id)) return `https://player.vimeo.com/video/${id}`;
    return s;
  }

  return "";
}

function classifyPlatform(item) {
  const youtubeSource = item?.youtube_link;
  const vimeoSource = item?.vimeo_link;

  // YouTube
  if (youtubeSource) {
    const youtubeId = extractYoutubeId(String(youtubeSource));
    if (youtubeId || isYoutubeUrl(youtubeSource)) {
      return {
        platform: "youtube",
        youtubeId: youtubeId || "",
        vimeoId: "",
        directUrl: "",
      };
    }
  }

  // Vimeo
  if (vimeoSource) {
    const vimeoId = extractVimeoId(String(vimeoSource));
    if (
      (vimeoId && isNumericId(vimeoId)) ||
      isNumericId(vimeoSource) ||
      isVimeoUrl(vimeoSource)
    ) {
      return {
        platform: "vimeo",
        youtubeId: "",
        vimeoId: isNumericId(vimeoSource)
          ? String(vimeoSource).trim()
          : vimeoId && isNumericId(vimeoId)
            ? vimeoId
            : "",
        directUrl: "",
      };
    }

    if (isDirectVideoUrl(vimeoSource)) {
      return {
        platform: "direct",
        youtubeId: "",
        vimeoId: "",
        directUrl: String(vimeoSource).trim(),
      };
    }
  }

  return { platform: "unknown", youtubeId: "", vimeoId: "", directUrl: "" };
}

function youtubeThumb(youtubeId) {
  if (!youtubeId) return "";
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function normalizeVideo(item, categoryMeta) {
  const id = item?.id;
  const title = item?.title || "فيديو مجاني";
  const description = item?.description || "";

  const durationSecRaw = item?.time;
  const durationSec =
    durationSecRaw === null ||
    durationSecRaw === undefined ||
    durationSecRaw === ""
      ? null
      : toInt(durationSecRaw, 0);

  const { platform, youtubeId, vimeoId, directUrl } = classifyPlatform(item);

  const youtubeUrl = buildYoutubeUrl(item?.youtube_link);
  const vimeoUrl = buildVimeoPlayerUrl(item?.vimeo_link || vimeoId);

  // ✅ إذا لم تكن هناك صورة، استخدم thumbnail من YouTube
  const thumb =
    item?.image_url ||
    (item?.image && item?.image !== "0" ? item.image : "") ||
    (youtubeId ? youtubeThumb(youtubeId) : "") ||
    "";

  const categoryName =
    categoryMeta?.name ||
    item?.category_part_free?.name ||
    item?.course_category?.name ||
    "";

  return {
    id,
    title,
    description,
    durationSec,
    platform,
    youtubeId,
    vimeoId,
    youtube: youtubeUrl,
    vimeo: vimeoUrl,
    directUrl,
    thumb,
    categoryName,
    raw: item,
  };
}

// ---------- Card UI ----------
function FreeVideoCard({ video }) {
  const [showVideo, setShowVideo] = useState(false);

  // ✅ Helper function لعمل encode (نفس الطريقة المستخدمة في المشروع)
  const encodeId = (value) => {
    if (!value) return "";
    try {
      return encodeURIComponent(btoa(String(value)));
    } catch (e) {
      return value;
    }
  };

  const canPlay =
    (video.platform === "youtube" && video.youtubeId) ||
    (video.platform === "vimeo" && video.vimeoId) ||
    (video.platform === "direct" && video.directUrl);

  // ✅ Get ENCODED video IDs for player
  const getVideoIds = () => {
    if (video.platform === "youtube" && video.youtubeId) {
      return {
        youtube_id: encodeId(video.youtubeId), // ✅ Encoded
        vimeo_id: "",
      };
    }
    if (video.platform === "vimeo" && video.vimeoId) {
      return {
        youtube_id: "",
        vimeo_id: encodeId(video.vimeoId), // ✅ Encoded
      };
    }
    if (video.platform === "direct" && video.directUrl) {
      return {
        youtube_id: "",
        vimeo_id: encodeId(video.directUrl), // ✅ Encoded
      };
    }
    return { youtube_id: "", vimeo_id: "" };
  };

  const { youtube_id, vimeo_id } = getVideoIds();

  const handleToggleVideo = (e) => {
    e.stopPropagation();
    if (!canPlay) return;
    setShowVideo(!showVideo);
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      {/* Image/Video Container */}
      <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
        {showVideo ? (
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 z-30 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="إغلاق الفيديو"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Player - with encoded IDs */}
            <VideoPlayer
              vimeo_id={vimeo_id}
              youtube_id={youtube_id}
              defaultPlay={true}
              rootClassName="rounded-none overflow-hidden h-full w-full"
            />
          </div>
        ) : (
          <>
            {/* Thumbnail Image */}
            {video.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/images/logo.svg";
                  e.currentTarget.onerror = null;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src="/images/logo.svg"
                  alt={video.title}
                  className="w-20 h-20 object-contain opacity-50"
                />
              </div>
            )}

            {/* Platform Badge */}
            <div
              className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-md text-white ${
                video.platform === "youtube"
                  ? "bg-red-600/90"
                  : video.platform === "vimeo"
                    ? "bg-sky-600/90"
                    : "bg-emerald-600/90"
              }`}
            >
              {video.platform === "youtube"
                ? "YouTube"
                : video.platform === "vimeo"
                  ? "Vimeo"
                  : "Video"}
            </div>

            {/* Duration Badge */}
            {!!formatDuration(video.durationSec) && (
              <div className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md bg-black/70 text-white">
                {formatDuration(video.durationSec)}
              </div>
            )}

            {/* Play Overlay on Hover */}
            {canPlay && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center bg-black/20 cursor-pointer"
                onClick={handleToggleVideo}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-text text-base leading-snug line-clamp-2">
          {video.title}
        </h3>

        {video.description && (
          <p className="text-sm text-text-alt leading-relaxed line-clamp-2">
            {video.description}
          </p>
        )}

        {video.categoryName && (
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="px-2 py-1 rounded-lg bg-neutral-100">
              {video.categoryName}
            </span>
          </div>
        )}

        <div className="flex-1" />

        <button
          className={`flex items-center text-white justify-center gap-2.5 px-4 py-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ${
            canPlay
              ? showVideo
                ? "bg-red-500 hover:bg-red-600"
                : "bg-primary hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          type="button"
          disabled={!canPlay}
          onClick={handleToggleVideo}
        >
          {showVideo ? (
            <>
              <X className="w-5 h-5" />
              <span className="text-sm font-semibold">إغلاق الفيديو</span>
            </>
          ) : (
            <>
              <VideoIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {canPlay ? "مشاهدة الفيديو" : "لا يوجد رابط فيديو"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function FreeVideosPage() {
  const searchParams = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category_part_free_id") ||
    searchParams.get("course_category_id") ||
    searchParams.get("category_id") ||
    searchParams.get("category") ||
    "";

  const [filters, setFilters] = useState({
    search: "",
    platform: "all",
    minSec: "",
    maxSec: "",
  });

  const [courseCategoryId, setCourseCategoryId] = useState(categoryFromUrl);

  useEffect(() => {
    setCourseCategoryId(categoryFromUrl || "");
  }, [categoryFromUrl]);

  const { data, loading, error, refetch, refetching } = useGetFreeVideos({
    category_part_free_id: courseCategoryId,
    apiParams: "",
  });

  const api = useMemo(() => {
    if (data?.pages?.length) return data.pages?.[0]?.data || null;
    return data || null;
  }, [data]);

  const categoryMeta = api?.message?.category_part_free || null;

  const allItems = useMemo(() => {
    const list = Array.isArray(api?.message?.free_data)
      ? api.message.free_data
      : Array.isArray(api?.message)
        ? api.message
        : [];
    return list.map((item) => normalizeVideo(item, categoryMeta));
  }, [api, categoryMeta]);

  const categoryTitle = useMemo(() => {
    return (
      categoryMeta?.name ||
      allItems?.[0]?.categoryName ||
      courseCategoryId ||
      ""
    );
  }, [categoryMeta, allItems, courseCategoryId]);

  const filtered = useMemo(() => {
    const q = (filters.search || "").trim().toLowerCase();
    const min = filters.minSec === "" ? null : toInt(filters.minSec, 0);
    const max = filters.maxSec === "" ? null : toInt(filters.maxSec, 0);

    let res = allItems;

    if (q) {
      res = res.filter((v) => {
        const t = (v.title || "").toLowerCase();
        const d = (v.description || "").toLowerCase();
        return t.includes(q) || d.includes(q);
      });
    }

    if (filters.platform !== "all") {
      res = res.filter((v) => v.platform === filters.platform);
    }

    if (min !== null) res = res.filter((v) => (v.durationSec ?? 0) >= min);
    if (max !== null) res = res.filter((v) => (v.durationSec ?? 0) <= max);

    return res;
  }, [allItems, filters]);

  if (!courseCategoryId) {
    return (
      <div>
        <PagesBanner
          variant="normal"
          title="الشروحات المجانية"
          breadcrumb={[
            { title: "الرئيسية", link: "/" },
            { title: "الشروحات المجانية", link: "#" },
            { title: categoryTitle, link: "#" },
          ]}
          image="/images/Frame 1000005155.png"
        />
        <Container className="my-[32px]">
          <div className="py-16 text-center text-neutral-600">
            اختر قسم من قائمة{" "}
            <span className="font-bold">الشروحات المجانية</span> بالأعلى لعرض
            الفيديوهات.
          </div>
        </Container>
      </div>
    );
  }

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <div>
        <PagesBanner
          variant="normal"
          title="الشروحات المجانية"
          breadcrumb={[
            { title: "الرئيسية", link: "/" },
            { title: "الشروحات المجانية", link: "#" },
            { title: categoryTitle, link: "#" },
          ]}
          image="/images/Frame 1000005155.png"
        />
        <Container className="my-[32px]">
          <div className="py-10 text-center text-neutral-600">
            حدث خطأ أثناء تحميل الفيديوهات.
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm bg-primary text-white disabled:opacity-60"
                onClick={refetch}
                disabled={refetching}
              >
                {refetching ? "جارِ إعادة التحميل..." : "إعادة المحاولة"}
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PagesBanner
        variant="normal"
        title="الشروحات المجانية"
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "الشروحات المجانية", link: "#" },
          { title: categoryTitle, link: "#" },
        ]}
        image="/images/Frame 1000005155.png"
      />

      <Container className="my-[32px]">
        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-text">
            نتائج القسم:{" "}
            <span className="text-primary">
              {categoryTitle || courseCategoryId}
            </span>
          </h2>
          <p className="text-sm text-neutral-500">
            إجمالي النتائج:{" "}
            <span className="font-semibold">{filtered.length}</span>
          </p>
        </div>

        <div className="mb-[32px] md:mb-[48px]">
          <FreeVideosFilters value={filters} onChange={setFilters} />
        </div>

        {filtered.length === 0 ? (
          <div className="py-10 text-center text-neutral-600">
            لا توجد نتائج مطابقة
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filtered.map((video) => (
              <FreeVideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="py-6 text-center text-sm text-gray-400">
            تم عرض جميع النتائج
          </div>
        )}
      </Container>
    </div>
  );
}
