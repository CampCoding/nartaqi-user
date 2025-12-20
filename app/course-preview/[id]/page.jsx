"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";

import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../components/ui/Container";
import MobileCoursePreview from "../../../components/CourseDetailsPage/MobileCoursePreview";
import VideoPlayer from "../../../components/ui/Video";
import useIsLgUp from "../../../hooks/useLgUp";
import LoadingPage from "@/components/shared/Loading";

import "./style.css";

// ==================== ENCODING HELPERS ====================
const encodeId = (value) => {
  if (!value) return null;
  try {
    return encodeURIComponent(btoa(String(value)));
  } catch (e) {
    console.error("Encoding error:", e);
    return null;
  }
};

const extractVimeoId = (url) => {
  if (!url) return null;
  if (/^\d+$/.test(url)) return url;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const extractYoutubeId = (url) => {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const CoursePreviewPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const isLgUp = useIsLgUp();

  const token = useSelector((s) => s.auth?.token);
  const studentId = useSelector((s) => s.auth?.user?.id);

  const roundId = useMemo(() => {
    const id = params?.id;
    return Array.isArray(id) ? id[0] : id;
  }, [params]);

  const [courseData, setCourseData] = useState(null);
  const [freeVideos, setFreeVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ URL is the source of truth
  const isWatching = searchParams.get("watch") === "true";
  const currentVideoId = searchParams.get("video");

  // ✅ cancel old requests
  const abortRef = useRef(null);
  const mountedRef = useRef(false);

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, [token]);

  const fetchCourseData = useCallback(async () => {
    if (!roundId) return;

    // cancel previous
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const payloadBundle = {
        round_id: roundId,
        ...(studentId ? { student_id: studentId } : {}),
      };

      const payloadFree = { round_id: roundId };

      const [bundleRes, freeRes] = await Promise.all([
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/roundBundle`,
          payloadBundle,
          { headers, signal: controller.signal }
        ),
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getFreeVideos`,
          payloadFree,
          { headers, signal: controller.signal }
        ),
      ]);

      if (!mountedRef.current) return;

      const bundleData = bundleRes?.data?.message;
      const freeList = freeRes?.data?.message;

      setCourseData(bundleData || null);
      setFreeVideos(Array.isArray(freeList) ? freeList : []);
    } catch (err) {
      if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") return;
      console.error("Error fetching course data:", err);

      if (!mountedRef.current) return;

      setCourseData(null);
      setFreeVideos([]);
      setError(err?.response?.data?.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  }, [roundId, studentId, headers]);

  useEffect(() => {
    mountedRef.current = true;
    fetchCourseData();

    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchCourseData]);

  // ✅ Collect & sort videos (free first)
  const { allVideos, sortedVideos } = useMemo(() => {
    if (!courseData?.contents) return { allVideos: [], sortedVideos: [] };

    const videos = [];
    courseData.contents.forEach((content) => {
      content.lessons?.forEach((lesson) => {
        lesson.videos?.forEach((video) => {
          videos.push({
            ...video,
            lessonTitle: lesson.lesson_title,
            contentTitle: content.content_title,
          });
        });
      });
    });

    const isFreeVideo = (videoId, video) =>
      freeVideos?.some((v) => String(v.id) === String(videoId)) ||
      video?.free === "1";

    const sorted = [...videos].sort((a, b) => {
      const aFree = isFreeVideo(a.id, a);
      const bFree = isFreeVideo(b.id, b);
      if (aFree && !bFree) return -1;
      if (!aFree && bFree) return 1;
      return 0;
    });

    return { allVideos: videos, sortedVideos: sorted };
  }, [courseData, freeVideos]);

  const currentVideo = useMemo(() => {
    if (!sortedVideos.length) return null;
    if (!currentVideoId) return sortedVideos[0];

    return (
      allVideos.find((v) => String(v.id) === String(currentVideoId)) ||
      sortedVideos[0]
    );
  }, [currentVideoId, allVideos, sortedVideos]);

  // ✅ Registration detection
  const isRegistered = useMemo(() => {
    return !!(courseData?.own || courseData?.is_registered);
  }, [courseData]);

  const buildVideoQuery = useCallback((video) => {
    const query = {
      watch: "true",
      video: String(video.id),
    };

    // Vimeo
    if (video.vimeo_link) {
      const vimeoId = extractVimeoId(video.vimeo_link);
      query.vimeo_id = encodeId(vimeoId || video.vimeo_link);
    }

    // YouTube
    if (video.youtube_link) {
      const youtubeId = extractYoutubeId(video.youtube_link);
      query.youtube_id = encodeId(youtubeId || video.youtube_link);
    }

    return query;
  }, []);

  const handleVideoSelect = useCallback(
    (video) => {
      const isFree =
        freeVideos?.some((v) => String(v.id) === String(video.id)) ||
        video.free === "1";

      if (!isFree && !isRegistered) {
        alert("هذا الدرس مقفل 🔒 يجب التسجيل في الدورة للمشاهدة");
        return;
      }

      const query = buildVideoQuery(video);
      const qs = new URLSearchParams(query).toString();

      // ✅ replace (better UX) + scroll to player
      router.replace(`${pathname}?${qs}#player`);
    },
    [freeVideos, isRegistered, buildVideoQuery, router, pathname]
  );

  const handleStartWatching = useCallback(() => {
    const firstVideo = sortedVideos[0];
    if (firstVideo) handleVideoSelect(firstVideo);
  }, [sortedVideos, handleVideoSelect]);

  if (loading) return <LoadingPage />;

  if (error || !courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl text-center bg-red-50 border border-red-200 rounded-2xl p-8">
          <p className="text-red-600 text-lg font-bold">
            {error || "لم يتم العثور على الدورة"}
          </p>

          <button
            type="button"
            onClick={fetchCourseData}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE / TABLET */}
      {!isLgUp && (
        <div className="space-y-4">
          {!isWatching && (
            <MobileCoursePreview courseData={courseData} onClick={handleStartWatching} />
          )}

          {isWatching && (
            <div id="player">
              <VideoPlayer defaultPlay={true} />
            </div>
          )}

          <VideosList
            courseData={courseData}
            freeVideos={freeVideos}
            allVideos={sortedVideos}
            currentVideo={currentVideo}
            onVideoSelect={handleVideoSelect}
            isRegistered={isRegistered}
          />

          <Container>
            <CourseDetailsContent courseData={courseData} />
          </Container>
        </div>
      )}

      {/* DESKTOP */}
      {isLgUp && (
        <Container>
          <CourseTitle
            title={courseData?.round?.name || "غير محدد"}
            breadcrumbs={[
              { title: "الرئيسية", link: "/" },
              { title: "الدورات", link: "/courses" },
              {
                title: courseData?.round?.course_categories?.name || "غير محدد",
                link: `/courses/category/${courseData?.round?.course_category_id}`,
              },
              { title: courseData?.round?.name || "غير محدد", link: "#" },
            ]}
          />

          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="w-full">
              {!isWatching && (
                <div
                  onClick={handleStartWatching}
                  className="cursor-pointer group flex-1 h-[300px] sm:h-[380px] lg:h-[455px] relative bg-black/20 rounded-[30px] overflow-hidden"
                  role="button"
                  tabIndex={0}
                  aria-label="تشغيل أول فيديو مجاني"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleStartWatching();
                  }}
                >
                  <img
                    loading="lazy"
                    src={courseData?.round?.image_url || "/images/Frame 1000004932.png"}
                    className="w-full h-full object-cover object-top"
                    alt={courseData?.round?.name || "صورة الدورة"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none z-10" />

                  <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all duration-300">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-5 bg-secondary rounded-full outline outline-8 outline-offset-[-8px] outline-white flex items-center justify-center">
                      <svg
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                          stroke="white"
                          strokeWidth={3}
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {isWatching && (
                <div id="player">
                  <VideoPlayer defaultPlay={true} />
                </div>
              )}

              <div className="grid grid-cols-1 my-8 mb-[139px]">
                <CourseDetailsContent courseData={courseData} />
              </div>
            </div>

            <VideosList
              courseData={courseData}
              freeVideos={freeVideos}
              allVideos={sortedVideos}
              currentVideo={currentVideo}
              onVideoSelect={handleVideoSelect}
              isRegistered={isRegistered}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default CoursePreviewPage;

// ==================== VIDEO ITEM ====================
const VideoItem = ({
  idx,
  title,
  thumb,
  duration,
  isActive,
  onClick,
  isFree,
  isRegistered,
}) => {
  const formatDuration = (time) => {
    if (!time) return "غير محدد";

    if (typeof time === "string" && time.includes(":")) {
      const parts = time.split(":");
      if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      return time.substring(0, 5);
    }

    const seconds = parseInt(time);
    if (Number.isNaN(seconds)) return "غير محدد";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const canPlay = isFree || isRegistered;

  return (
    <div
      onClick={() => canPlay && onClick()}
      onKeyDown={(e) => {
        if (!canPlay) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      role="button"
      tabIndex={0}
      className={`self-stretch inline-flex justify-between items-center gap-[9px] p-2 rounded-lg transition-all duration-200 outline-none
        ${canPlay ? "cursor-pointer" : "cursor-not-allowed"}
        ${isActive ? "bg-gray-100 scale-[1.02]" : "hover:bg-gray-50"}
        ${!canPlay ? "opacity-60" : ""}
      `}
    >
      <div className={`text-right text-xl md:text-2xl font-medium ${isActive ? "text-secondary" : "text-zinc-400"}`}>
        {idx}
      </div>

      <div className="flex justify-start items-start gap-2 w-full">
        <div
          className={`w-28 h-16 md:w-[100px] md:h-20 relative rounded-[10px] overflow-hidden shrink-0 bg-gray-200 ${
            isActive ? "ring-2 ring-secondary ring-offset-2" : ""
          }`}
          style={{
            backgroundImage: thumb
              ? `url('${thumb}')`
              : "url('/images/Frame 1000004932.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-label={`مصغّر الفيديو ${idx}`}
          role="img"
        >
          <div className="px-2.5 absolute left-2 bottom-2 bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center">
            <div className="text-right text-white text-xs md:text-sm font-medium">
              {formatDuration(duration)}
            </div>
          </div>

          {!canPlay && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        <div
          className={`flex-1 text-right text-xs md:text-sm font-medium leading-relaxed transition-colors ${
            isActive ? "text-secondary font-bold" : "text-text"
          }`}
        >
          {title || "غير محدد"}
        </div>
      </div>
    </div>
  );
};

// ==================== VIDEOS LIST ====================
const VideosList = ({
  courseData,
  freeVideos,
  allVideos,
  currentVideo,
  onVideoSelect,
  isRegistered,
}) => {
  const isFreeVideo = (videoId, video) =>
    freeVideos?.some((v) => String(v.id) === String(videoId)) ||
    video?.free === "1";

  const currentIndex = allVideos.findIndex((v) => v.id === currentVideo?.id);
  const teacherName =
    courseData?.round?.teachers?.[0]?.name ||
    courseData?.round?.teacher?.name ||
    "غير محدد";

  return (
    <div
      className="w-full lg:max-w-[437px] lg:min-w-[437px] flex flex-col gap-6 md:gap-[32px] pt-6 md:pt-10 pb-4 md:pb-5 px-3 md:px-4 relative bg-white md:rounded-[30px] lg:outline outline-[3px] outline-offset-[-3px] outline-gray-300 overflow-hidden"
      dir="rtl"
      aria-label="قائمة الفيديوهات"
    >
      <div className="inline-flex flex-col justify-start items-start gap-2">
        <div className="text-text text-2xl md:text-3xl font-bold">
          {courseData?.round?.name || "غير محدد"}
        </div>

        <div className="inline-flex justify-start items-center gap-2">
          <div className="text-primary text-sm md:text-base font-bold">
            {currentIndex >= 0 ? currentIndex + 1 : 1} من {allVideos.length || 0}
          </div>
          <div className="text-primary text-sm md:text-base font-bold">
            {teacherName}
          </div>
        </div>
      </div>

      <div className="videos-list overflow-x-hidden inline-flex flex-col justify-start items-start gap-3 md:gap-4 max-h-[600px] overflow-y-auto">
        {allVideos.length > 0 ? (
          allVideos.map((video, i) => {
            const isFree = isFreeVideo(video.id, video);
            return (
              <VideoItem
                key={video.id || i}
                idx={i + 1}
                title={video.title}
                thumb={video.thumbnail}
                duration={video.time}
                isActive={video.id === currentVideo?.id}
                isFree={isFree}
                isRegistered={isRegistered}
                onClick={() => onVideoSelect(video)}
              />
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-8 w-full">
            لا توجد فيديوهات متاحة
          </div>
        )}
      </div>
    </div>
  );
};
