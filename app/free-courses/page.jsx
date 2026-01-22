"use client";

import React, { useMemo, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

import Container from "../../components/ui/Container";
import PagesBanner from "../../components/ui/PagesBanner";
import LoadingPage from "../../components/shared/Loading";
import FreeVideosFilters from "../../components/ui/FreeVideosFilters";

import { openVideoModal } from "../../components/utils/Store/Slices/videoModalSlice";

import {
  encodeId,
  extractVimeoId,
  extractYoutubeId,
} from "../../components/ui/CourseContentDrawer";

// ✅ keep your hook import (but make sure it is the SIMPLE one)
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
  const s = String(url || "").toLowerCase().trim();
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

    // direct mp4 / m3u8 in vimeo_link field
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

function normalizeVideo(item, categoryMeta) {
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

    if (video.platform === "vimeo" && (video.vimeoId || video.vimeo)) {
      query.vimeo_id = encodeId(video.vimeoId || video.vimeo);
      return query;
    }
    if (video.platform === "youtube" && (video.youtubeId || video.youtube)) {
      query.youtube_id = encodeId(video.youtubeId || video.youtube);
      return query;
    }
    if (video.platform === "direct" && video.directUrl) {
      query.vimeo_id = encodeId(video.directUrl);
      return query;
    }

    const raw = video.vimeo || video.youtube || video.directUrl || "";
    if (raw) query.vimeo_id = encodeId(raw);
    return query;
  };

  const playable =
    (video.platform === "youtube" && (video.youtubeId || video.youtube)) ||
    (video.platform === "vimeo" && (video.vimeoId || video.vimeo)) ||
    (video.platform === "direct" && video.directUrl);

  const openModal = () => {
    dispatch(
      openVideoModal({
        title: (video.title || "").trim(),
        vimeoId: video.vimeo || video.vimeoId || video.directUrl || "",
        youtubeId: video.youtube || video.youtubeId || "",
        autoplay: true,
      })
    );
  };

  return (
    <div className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full aspect-video bg-neutral-100 overflow-hidden">
        {video.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumb}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/images/logo.svg";   // your local fallback
              e.currentTarget.onerror = null;             // prevent infinite loop if fallback also fails
            }}
          />
        ) : (
          <img
            src="/images/logo.svg"
            alt={video.title}
            className="w-full h-full object-contain  group-hover:scale-[1.02] transition-transform duration-300"
          />
          // <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
          //   {video.platform === "direct" ? "Video File" : "No Thumbnail"}
          // </div>
        )}

        <PlatformBadge platform={video.platform} />

        {!!formatDuration(video.durationSec) && (
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md bg-black/70 text-white">
            {formatDuration(video.durationSec)}
          </div>
        )}

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

        {video.categoryName ? (
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="px-2 py-1 rounded-lg bg-neutral-100">
              {video.categoryName}
            </span>
          </div>
        ) : null}

        {playable ? (
          <Link
            href={{ pathname, query: buildVideoQuery(), hash: "player" }}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm bg-primary text-white"
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            مشاهدة الفيديو
          </Link>
        ) : (
          <div className="mt-2 text-sm text-neutral-500">لا يوجد رابط فيديو</div>
        )}
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

  // ✅ removed sort (to avoid any sorting)
  const [filters, setFilters] = useState({
    search: "",
    platform: "all", // all | youtube | vimeo | direct
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
    // supports old react-query shape just in case
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
      categoryMeta?.name || allItems?.[0]?.categoryName || courseCategoryId || ""
    );
  }, [categoryMeta, allItems, courseCategoryId]);

  // ✅ NO SORT HERE (keeps API order)
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

    return res; // ✅ keep original order
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

        {filtered.length > 0 ? (
          <div className="py-6 text-center text-sm text-gray-400">
            تم عرض جميع النتائج
          </div>
        ) : null}
      </Container>
    </div>
  );
}
