// app/(whatever)/courses/preview/[id]/page.jsx  (CoursePreviewPage)
// ✅ Updated to be fully compatible with getFreeVideos response
// ✅ Robust URL sanitizing + YouTube (including /live/) + Vimeo extraction
// ✅ Preview mode: non-registered users ONLY see/play freeVideos list
// ✅ Registered users see/play all course videos (sorted with free first)

// ✅ FIX: Your "loading is always false" was because you logged AFTER:
//    if (loading) return <LoadingPage />
//    so when loading === true, the component returns early and never logs.
// ✅ Added an effect logger + moved render logger BEFORE the early return.

"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";

import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../components/ui/Container";
import MobileCoursePreview from "../../../components/CourseDetailsPage/MobileCoursePreview";
import VideoPlayer from "../../../components/ui/Video";
import useIsLgUp from "../../../hooks/useLgUp";
import LoadingPage from "@/components/shared/Loading";

import "./style.css";

// ==================== URL SANITIZERS ====================
const cleanEmbedUrl = (raw) => {
  if (!raw) return null;

  // Convert HTML entities like &amp; -> &
  let s = String(raw).replaceAll("&amp;", "&");

  // If backend accidentally returns iframe attributes, cut at first quote
  // e.g. ...app_id=58479" frameborder="0" ...  => keep only before "
  const quoteIndex = s.indexOf('"');
  if (quoteIndex !== -1) s = s.slice(0, quoteIndex);

  return s.trim();
};

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
  const cleaned = cleanEmbedUrl(url);
  if (!cleaned) return null;
  if (/^\d+$/.test(cleaned)) return cleaned;

  // Works with:
  // https://vimeo.com/123
  // https://player.vimeo.com/video/123?...
  const match = cleaned.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const extractYoutubeId = (url) => {
  const cleaned = cleanEmbedUrl(url);
  if (!cleaned) return null;

  // already an id
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleaned)) return cleaned;

  // Supports:
  // - youtube.com/watch?v=ID
  // - youtube.com/embed/ID
  // - youtu.be/ID
  // - youtube.com/shorts/ID
  // - youtube.com/live/ID
  const match = cleaned.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  return match ? match[1] : null;
};

// ==================== PAGE ====================
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
  const [freeVideos, setFreeVideos] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isWatching = searchParams.get("watch") === "true";
  const currentVideoId = searchParams.get("video");

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

    // cancel previous request
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true); // ✅ clear
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

      // ✅ free videos is data.message (array)
      const freeList = Array.isArray(freeRes?.data?.message) ? freeRes.data.message : [];

      setCourseData(bundleData || null);
      setFreeVideos(freeList);
    } catch (err) {
      // ignore abort/cancel
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


  const isRegistered = useMemo(() => {
    return !!(courseData?.own || courseData?.is_registered);
  }, [courseData]);

  // ✅ Collect all course videos (from bundle)
  const { allCourseVideos, sortedCourseVideos } = useMemo(() => {
    if (!courseData?.contents) return { allCourseVideos: [], sortedCourseVideos: [] };

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

    const isFreeByApiOrFlag = (video) => {
      const inFreeList =
        Array.isArray(freeVideos) &&
        freeVideos.some((v) => String(v.id) === String(video?.id));
      const markedFree = String(video?.free) === "1";
      return inFreeList || markedFree;
    };

    // free first
    const sorted = [...videos].sort((a, b) => {
      const aFree = isFreeByApiOrFlag(a);
      const bFree = isFreeByApiOrFlag(b);
      if (aFree && !bFree) return -1;
      if (!aFree && bFree) return 1;
      return 0;
    });

    return { allCourseVideos: videos, sortedCourseVideos: sorted };
  }, [courseData, freeVideos]);

  // ✅ Source of truth for what the user can see in the list
  const playableVideos = useMemo(() => {
    if (isRegistered) return sortedCourseVideos;

    // Preview mode: ONLY freeVideos response
    return Array.isArray(freeVideos) ? freeVideos : [];
  }, [isRegistered, sortedCourseVideos, freeVideos]);

  // ✅ current video based on playable list
  const currentVideo = useMemo(() => {
    if (!playableVideos.length) return null;
    if (!currentVideoId) return playableVideos[0];

    return (
      playableVideos.find((v) => String(v.id) === String(currentVideoId)) ||
      playableVideos[0]
    );
  }, [currentVideoId, playableVideos]);

  // ✅ Build player query (sanitized)
  const buildVideoQuery = useCallback((video) => {
    const query = {
      watch: "true",
      video: String(video.id),
    };

    const vimeoUrl = cleanEmbedUrl(video.vimeo_link);
    if (vimeoUrl) {
      const vimeoId = extractVimeoId(vimeoUrl);
      query.vimeo_id = encodeId(vimeoId || vimeoUrl);
    }

    const ytUrl = cleanEmbedUrl(video.youtube_link);
    if (ytUrl) {
      const youtubeId = extractYoutubeId(ytUrl);
      query.youtube_id = encodeId(youtubeId || ytUrl);
    }

    return query;
  }, []);

  const handleVideoSelect = useCallback(
    (video) => {
      // ✅ In preview mode, list is already filtered, but we keep a safe guard:
      if (!isRegistered) {
        const isFree =
          (Array.isArray(freeVideos) &&
            freeVideos.some((v) => String(v.id) === String(video.id))) ||
          String(video?.free) === "1";

        if (!isFree) {
          alert("هذا الدرس مقفل 🔒 يجب التسجيل في الدورة للمشاهدة");
          return;
        }
      }

      const query = buildVideoQuery(video);
      const qs = new URLSearchParams(query).toString();
      router.replace(`${pathname}?${qs}#player`);
    },
    [isRegistered, freeVideos, buildVideoQuery, router, pathname]
  );

  const handleStartWatching = useCallback(() => {
    const targetVideo = playableVideos?.[0] || null;
    if (targetVideo) handleVideoSelect(targetVideo);
  }, [playableVideos, handleVideoSelect]);


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
            videos={playableVideos}
            currentVideo={currentVideo}
            onVideoSelect={handleVideoSelect}
            isRegistered={isRegistered}
          />

          <Container>
            <CourseDetailsContent courseData={courseData} inFreeVideos />
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
                  aria-label="تشغيل أول فيديو"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleStartWatching();
                  }}
                >
                  <img
                    loading="lazy"
                    src={courseData?.round?.image_url || "/images/Frame 1000004932.png"}
                    className="w-full h-full object-cover object-center"
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
                <CourseDetailsContent courseData={courseData} inFreeVideos />
              </div>
            </div>

            <VideosList
              courseData={courseData}
              videos={playableVideos}
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
const VideoItem = ({ idx, title, thumb, duration, isActive, onClick, canPlay }) => {
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
      <div
        className={`text-right text-xl md:text-2xl font-medium ${
          isActive ? "text-secondary" : "text-zinc-400"
        }`}
      >
        {idx}
      </div>

      <div className="flex justify-start items-start gap-2 w-full">
        <div
          className={`w-28 h-16 md:w-[100px] md:h-20 relative rounded-[10px] overflow-hidden shrink-0 bg-gray-200 ${
            isActive ? "ring-2 ring-secondary ring-offset-2" : ""
          }`}
          style={{
            backgroundImage: thumb ? `url('${thumb}')` : "url('/images/Frame 1000004932.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-label={`مصغّر الفيديو ${idx}`}
          role="img"
        >
          {/* <div className="px-2.5 absolute left-2 bottom-2 bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center">
            <div className="text-right text-white text-xs md:text-sm font-medium">
              {formatDuration(duration)}
            </div>
          </div> */}

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
const VideosList = ({ courseData, videos, currentVideo, onVideoSelect, isRegistered }) => {
  const list = Array.isArray(videos) ? videos : [];

  const teacherName =
    courseData?.round?.teachers?.[0]?.name ||
    courseData?.round?.teacher?.name ||
    "غير محدد";

  const currentIndex = useMemo(() => {
    if (!currentVideo?.id) return 1;
    const idx = list.findIndex((v) => String(v.id) === String(currentVideo.id));
    return idx >= 0 ? idx + 1 : 1;
  }, [list, currentVideo]);

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
            {currentIndex} من {list.length || 0}
          </div>
          {/* <div className="text-primary text-sm md:text-base font-bold">
            {teacherName}
          </div> */}
        </div>
      </div>

      <div className="videos-list overflow-x-hidden inline-flex flex-col justify-start items-start gap-3 md:gap-4 max-h-[600px] overflow-y-auto">
        {list.length > 0 ? (
          list.map((video, i) => {
            // In preview mode list is free only => canPlay true
            // In registered mode list is all => canPlay true
            const canPlay = true;

            return (
              <VideoItem
                key={video.id || i}
                idx={i + 1}
                title={video.title}
                thumb={video.thumbnail}
                duration={video.time}
                isActive={String(video.id) === String(currentVideo?.id)}
                canPlay={canPlay}
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

      {/* {!isRegistered && (
        <div className="text-xs text-gray-500 mt-2">
          * أنت الآن في وضع المعاينة: المعروض فقط الشروحات المجانية.
        </div>
      )} */}
    </div>
  );
};
