"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import PagesBanner from "../../components/ui/PagesBanner";
import LoadingPage from "../../components/shared/Loading";
import LoadingContent from "../../components/shared/LoadingContent";
import FreeVideosFilters from "../../components/ui/FreeVideosFilters";
import { useGetFreeVideos } from "../../components/shared/Hooks/useGetFreeRounds";

function toInt(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildYoutubeUrl(youtube_link) {
  if (!youtube_link) return "";
  // sometimes API gives only ID like "ddaSl1Vg-FA"
  if (youtube_link.startsWith("http")) return youtube_link;
  return `https://www.youtube.com/watch?v=${youtube_link}`;
}

function buildVimeoUrl(vimeo_link) {
  if (!vimeo_link) return "";
  if (vimeo_link.startsWith("http")) return vimeo_link;
  return `https://player.vimeo.com/video/${vimeo_link}`;
}

function normalizeVideo(item) {
  const id = item?.id;
  const title = item?.title || "فيديو مجاني";
  const description = item?.description || "";
  const durationSec = toInt(item?.time, 0);

  const youtube = buildYoutubeUrl(item?.youtube_link);
  const vimeo = buildVimeoUrl(item?.vimeo_link);

  const platform = youtube ? "youtube" : vimeo ? "vimeo" : "unknown";

  // image: sometimes "0" or null
  const thumb =
    item?.image_url ||
    (item?.image && item?.image !== "0" ? item.image : "") ||
    "";

  return {
    id,
    title,
    description,
    durationSec,
    youtube,
    vimeo,
    platform,
    thumb,
    raw: item,
  };
}

function formatDuration(sec) {
  const s = toInt(sec, 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r}s`;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function FreeVideoCard({ video }) {
  const openUrl = video.youtube || video.vimeo;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full aspect-video bg-neutral-100">
        {video.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
            {video.platform === "youtube"
              ? "YouTube"
              : video.platform === "vimeo"
              ? "Vimeo"
              : "Video"}
          </div>
        )}

        <div className="absolute top-2 left-2 px-2 py-1 text-xs rounded-md bg-black/70 text-white">
          {video.platform === "youtube" ? "YouTube" : "Vimeo"}
        </div>

        {video.durationSec ? (
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md bg-black/70 text-white">
            {formatDuration(video.durationSec)}
          </div>
        ) : null}
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

        {openUrl ? (
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm bg-neutral-900 text-white"
          >
            مشاهدة الفيديو
          </a>
        ) : (
          <div className="mt-2 text-sm text-neutral-500">لا يوجد رابط فيديو</div>
        )}
      </div>
    </div>
  );
}

export default function FreeVideosPage() {
  const [filters, setFilters] = useState({
    search: "",
    platform: "all", // all | youtube | vimeo
    sort: "id_desc",
    minSec: "",
    maxSec: "",
  });

  const {
    data,
    loading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFreeVideos({ apiParams: "" }); // apiParams not needed now

  // API returns: { message: [ ... ] } per page
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

    // search in title + description
    if (q) {
      res = res.filter((v) => {
        const t = (v.title || "").toLowerCase();
        const d = (v.description || "").toLowerCase();
        return t.includes(q) || d.includes(q);
      });
    }

    // platform
    if (filters.platform !== "all") {
      res = res.filter((v) => v.platform === filters.platform);
    }

    // duration
    if (min !== null) {
      res = res.filter((v) => v.durationSec >= min);
    }
    if (max !== null) {
      res = res.filter((v) => v.durationSec <= max);
    }

    // sort
    const sorted = [...res];
    switch (filters.sort) {
      case "id_asc":
        sorted.sort((a, b) => toInt(a.id) - toInt(b.id));
        break;
      case "id_desc":
        sorted.sort((a, b) => toInt(b.id) - toInt(a.id));
        break;
      case "time_asc":
        sorted.sort((a, b) => a.durationSec - b.durationSec);
        break;
      case "time_desc":
        sorted.sort((a, b) => b.durationSec - a.durationSec);
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

  // Infinite scroll
  const loadMoreRef = useRef(null);
  useEffect(() => {
    if (!hasNextPage) return;
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

        {/* Infinite Scroll Loader */}
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
