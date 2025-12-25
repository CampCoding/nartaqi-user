"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

import Container from "../../components/ui/Container";
import PagesBanner from "../../components/ui/PagesBanner";
import LoadingPage from "../../components/shared/Loading";
import LoadingContent from "../../components/shared/LoadingContent";
import FreeVideosFilters from "../../components/ui/FreeVideosFilters";
import { useGetFreeVideos } from "../../components/shared/Hooks/useGetFreeRounds";
import { openVideoModal } from "../../components/utils/Store/Slices/videoModalSlice";

import {
  encodeId,
  extractVimeoId,
  extractYoutubeId,
} from "../../components/ui/CourseContentDrawer";

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

function buildYoutubeUrl(youtube_link) {
  if (!youtube_link) return "";
  if (String(youtube_link).startsWith("http")) return youtube_link;
  return `https://www.youtube.com/watch?v=${youtube_link}`;
}

function buildVimeoPlayerUrl(vimeo_link) {
  if (!vimeo_link) return "";
  const s = String(vimeo_link).trim();

  // numeric id
  if (isNumericId(s)) return `https://player.vimeo.com/video/${s}`;

  // already url
  if (s.startsWith("http")) {
    // if it's vimeo page url -> convert to player if we can
    const id = extractVimeoId(s);
    if (id && isNumericId(id)) return `https://player.vimeo.com/video/${id}`;
    return s; // fallback (maybe already player)
  }

  return "";
}

function classifyPlatform(item) {
  const youtubeSource = item?.youtube_link;
  const vimeoSource = item?.vimeo_link;

  const youtubeId = extractYoutubeId(youtubeSource || "");
  if (youtubeId)
    return { platform: "youtube", youtubeId, vimeoId: "", directUrl: "" };

  const vimeoId = extractVimeoId(vimeoSource || "");
  if (vimeoId && isNumericId(vimeoId))
    return { platform: "vimeo", youtubeId: "", vimeoId, directUrl: "" };

  // numeric id as string
  if (isNumericId(vimeoSource))
    return {
      platform: "vimeo",
      youtubeId: "",
      vimeoId: String(vimeoSource).trim(),
      directUrl: "",
    };

  // direct mp4
  if (isDirectVideoUrl(vimeoSource))
    return {
      platform: "direct",
      youtubeId: "",
      vimeoId: "",
      directUrl: String(vimeoSource).trim(),
    };

  return { platform: "unknown", youtubeId: "", vimeoId: "", directUrl: "" };
}

function youtubeThumb(youtubeId) {
  if (!youtubeId) return "";
  // works even if you don't have image_url
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

function normalizeVideo(item) {
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

  const youtube =
    platform === "youtube" ? buildYoutubeUrl(item?.youtube_link) : "";
  const vimeo =
    platform === "vimeo"
      ? buildVimeoPlayerUrl(item?.vimeo_link || vimeoId)
      : "";

  const thumb =
    item?.image_url ||
    (item?.image && item?.image !== "0" ? item.image : "") ||
    (platform === "youtube" ? youtubeThumb(youtubeId) : "") ||
    "";

  return {
    id,
    title,
    description,
    durationSec,
    platform, // youtube | vimeo | direct | unknown
    youtubeId,
    vimeoId,
    youtube, // full url
    vimeo, // player url or fallback
    directUrl, // mp4/m3u8
    thumb,
    raw: item,
  };
}

// ---------- Card UI ----------
function PlatformBadge({ platform }) {
  const map = {
    youtube: { label: "YouTube", cls: "bg-red-600/90" },
    vimeo: { label: "Vimeo", cls: "bg-sky-600/90" },
    direct: { label: "Video", cls: "bg-emerald-600/90" },
    unknown: { label: "Unknown", cls: "bg-neutral-700/80" },
  };
  const meta = map[platform] || map.unknown;
  return (
    <div
      className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-md text-white ${meta.cls}`}
    >
      {meta.label}
    </div>
  );
}

function FreeVideoCard({ video }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: "true",
  };

  const buildVideoQuery = () => {
    const query = { ...mergedParams, video: String(video.id) };

    // priority: vimeo -> youtube -> direct
    if (video.platform === "vimeo" && video.vimeoId) {
      query.vimeo_id = encodeId(video.vimeoId);
      return query;
    }
    if (video.platform === "youtube" && video.youtubeId) {
      query.youtube_id = encodeId(video.youtubeId);
      return query;
    }
    if (video.platform === "direct" && video.directUrl) {
      // لو الـ player عندك مش داعم directUrl، خليه vimeo_id كـ fallback url
      query.vimeo_id = encodeId(video.directUrl);
      return query;
    }

    // fallback
    const raw = video.vimeo || video.youtube || video.directUrl || "";
    if (raw) query.vimeo_id = encodeId(raw);
    return query;
  };

  const playable =
    (video.platform === "youtube" && (video.youtubeId || video.youtube)) ||
    (video.platform === "vimeo" && (video.vimeoId || video.vimeo)) ||
    (video.platform === "direct" && video.directUrl);

  return (
    <div
      onClick={() => {
        console.log("video", video);
      }}
      className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
        {video.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumb}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
            {video.platform === "direct" ? "Video File" : "No Thumbnail"}
          </div>
        )}

        <PlatformBadge platform={video.platform} />
        {video.raw !== null && video.raw.time !== undefined ? (
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md bg-black/70 text-white">
            {video.raw.time}
          </div>
        ) : null}

        {/* play overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-black/60 text-white text-sm">
            ▶ تشغيل
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-text text-base leading-snug line-clamp-2">
          {video.title}
        </h3>

        {video.description ? (
          <p className="text-sm text-text-alt leading-relaxed line-clamp-2">
            {video.description}
          </p>
        ) : null}

        <div className="flex items-center gap-2 text-xs text-neutral-500">
         
          <span className="px-2 py-1 rounded-lg bg-neutral-100">
            {String(video.raw?.course_category.name ?? "")}
          </span>
        </div>

        {playable ? (
          <Link
            href={{ pathname, query: buildVideoQuery(), hash: "player" }}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm bg-primary text-white"
            onClick={() => {
              // افتح المودال ببيانات قوية
              dispatch(
                openVideoModal({
                  title: (video.title || "").trim(),
                  vimeoId:
                    video.vimeoId || video.vimeo || video.directUrl || "",
                  youtubeId: video.youtubeId || video.youtube || "",
                  autoplay: true,
                })
              );
            }}
          >
            مشاهدة الفيديو
          </Link>
        ) : (
          <div className="mt-2 text-sm text-neutral-500">
            لا يوجد رابط فيديو
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function FreeVideosPage() {
  const searchParams = useSearchParams();

  const categoryFromUrl =
    searchParams.get("course_category_id") ||
    searchParams.get("category_id") ||
    searchParams.get("category") ||
    "";

  const [filters, setFilters] = useState({
    search: "",
    platform: "all", // all | youtube | vimeo | direct
    sort: "id_desc",
    minSec: "",
    maxSec: "",
  });

  const [courseCategoryId, setCourseCategoryId] = useState(categoryFromUrl);

  useEffect(() => {
    setCourseCategoryId(categoryFromUrl || "");
  }, [categoryFromUrl]);

  const { data, loading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFreeVideos({
      course_category_id: courseCategoryId,
      apiParams: "",
    });

  const allItems = useMemo(() => {
    const pages = data?.pages ?? [];
    const list = pages.flatMap((p) => p?.data?.message ?? []);
    return list.map(normalizeVideo);
  }, [data?.pages]);

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

    const sorted = [...res];
    switch (filters.sort) {
      case "id_asc":
        sorted.sort((a, b) => toInt(a.id) - toInt(b.id));
        break;
      case "id_desc":
        sorted.sort((a, b) => toInt(b.id) - toInt(a.id));
        break;
      case "time_asc":
        sorted.sort((a, b) => toInt(a.durationSec) - toInt(b.durationSec));
        break;
      case "time_desc":
        sorted.sort((a, b) => toInt(b.durationSec) - toInt(a.durationSec));
        break;
      case "title_asc":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "title_desc":
        sorted.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
        break;
      default:
        break;
    }
    return sorted;
  }, [allItems, filters]);

  const loadMoreRef = useRef(null);
  useEffect(() => {
    if (!hasNextPage) return;
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!courseCategoryId) {
    return (
      <div>
        <PagesBanner
          variant="normal"
          title="الفيديوهات المجانية"
          breadcrumb={[
            { title: "الرئيسية", link: "/" },
            { title: "الفيديوهات المجانية", link: "#" },
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

  return (
    <div>
      <PagesBanner
        variant="normal"
        title="الفيديوهات المجانية"
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "الفيديوهات المجانية", link: "#" },
        ]}
        image="/images/Frame 1000005155.png"
      />

      <Container className="my-[32px]">
        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-text">
            نتائج القسم:{" "}
            <span className="text-primary">{courseCategoryId}</span>
          </h2>
          <p className="text-sm text-neutral-500">
            إجمالي النتائج:{" "}
            <span className="font-semibold">{allItems.length}</span>
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

        <div className="flex justify-center items-center">
          <div ref={loadMoreRef} className="py-6 text-center text-sm">
            {isFetchingNextPage && (
              <div className="w-full flex justify-center items-center h-[200px]">
                <LoadingContent />
              </div>
            )}

            {!hasNextPage && !isFetchingNextPage && filtered.length > 0 && (
              <p className="text-gray-400 mt-2">لا يوجد المزيد من النتائج</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
