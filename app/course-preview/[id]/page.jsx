"use client";

import React, { useEffect, useState, useMemo } from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../components/ui/Container";
import MobileCoursePreview from "../../../components/CourseDetailsPage/MobileCoursePreview";
import VideoPlayer from "./../../../components/ui/Video";
import useIsLgUp from "../../../hooks/useLgUp";
import axios from "axios";
import LoadingPage from "@/components/shared/Loading";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

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

const CoursePreviewPage = ({ params }) => {
  const [courseData, setCourseData] = useState(null);
  const [freeVideos, setFreeVideos] = useState([]);
  const [isLessonStart, setIsLessonStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLgUp = useIsLgUp();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if watching video from URL
  const isWatching = searchParams.get("watch") === "true";
  const currentVideoId = searchParams.get("video");

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);

        const bundleResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/roundBundle`,
          {
            round_id: params?.id || 1,
            student_id: "18",
          }
        );

        const freeVideosResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getFreeVideos`,
          {
            round_id: params?.id || 1,
          }
        );

        setCourseData(bundleResponse.data.message);
        setFreeVideos(freeVideosResponse.data.message || []);

        // Auto-start watching if URL has video params
        if (isWatching) {
          setIsLessonStart(true);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params?.id, isWatching]);

  // Collect all videos with free videos first
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

    // Check if video is free
    const isFreeVideo = (videoId, video) => {
      return (
        freeVideos?.some((v) => v.id === videoId) ||
        video?.free === "1" ||
        false
      );
    };

    // Sort: free videos first, then others
    const sorted = [...videos].sort((a, b) => {
      const aFree = isFreeVideo(a.id, a);
      const bFree = isFreeVideo(b.id, b);

      if (aFree && !bFree) return -1;
      if (!aFree && bFree) return 1;
      return 0;
    });

    return { allVideos: videos, sortedVideos: sorted };
  }, [courseData, freeVideos]);

  // Get current video
  const currentVideo = useMemo(() => {
    if (!currentVideoId) return sortedVideos[0] || null;
    return (
      allVideos.find((v) => String(v.id) === String(currentVideoId)) ||
      sortedVideos[0] ||
      null
    );
  }, [currentVideoId, allVideos, sortedVideos]);

  // Check if user is registered
  const isRegistered = courseData?.is_registered || false;

  // Build video query with encoded IDs
  const buildVideoQuery = (video) => {
    const query = {
      watch: "true",
      video: video.id,
    };

    // Handle Vimeo
    if (video.vimeo_link) {
      const vimeoId = extractVimeoId(video.vimeo_link);
      if (vimeoId) {
        query.vimeo_id = encodeId(vimeoId);
      } else {
        query.vimeo_id = encodeId(video.vimeo_link);
      }
    }

    // Handle YouTube
    if (video.youtube_link) {
      const youtubeId = extractYoutubeId(video.youtube_link);
      if (youtubeId) {
        query.youtube_id = encodeId(youtubeId);
      } else {
        query.youtube_id = encodeId(video.youtube_link);
      }
    }

    return query;
  };

  // Handle video selection
  const handleVideoSelect = (video) => {
    const isFree =
      freeVideos?.some((v) => v.id === video.id) || video.free === "1";

    // Check if user can watch this video
    if (!isFree && !isRegistered) {
      alert("هذا الدرس مقفل 🔒 يجب التسجيل في الدورة للمشاهدة");
      return;
    }

    // Build query and navigate
    const query = buildVideoQuery(video);
    const queryString = new URLSearchParams(query).toString();
    router.push(`${pathname}?${queryString}#player`);

    // Auto-start on mobile/tablet
    if (!isLgUp && !isLessonStart) {
      setIsLessonStart(true);
    }
  };

  // Start watching first free video
  const handleStartWatching = () => {
    const firstVideo = sortedVideos[0]; // Already sorted with free videos first

    if (firstVideo) {
      handleVideoSelect(firstVideo);
    }

    setIsLessonStart(true);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">لم يتم العثور على الدورة</div>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE / TABLET: < lg */}
      {!isLgUp && (
        <div className="space-y-4">
          {!isLessonStart && (
            <MobileCoursePreview
              courseData={courseData}
              onClick={handleStartWatching}
            />
          )}
          {isLessonStart && (
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

      {/* DESKTOP: >= lg */}
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
              {
                title: courseData?.round?.name || "غير محدد",
                link: "#",
              },
            ]}
          />
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="w-full">
              {!isLessonStart && (
                <div
                  onClick={handleStartWatching}
                  className="cursor-pointer group flex-1 h-[300px] sm:h-[380px] lg:h-[455px] relative bg-black/20 rounded-[30px] overflow-hidden"
                >
                  <img
                    src={
                      courseData?.round?.image_url ||
                      "/images/Frame 1000004932.png"
                    }
                    className="w-full h-full object-cover object-top"
                    alt={courseData?.round?.name || "صورة الدورة"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none z-10" />
                  <div
                    className="absolute z-20 cursor-pointer group-hover:scale-110 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:rounded-full"
                    role="button"
                    tabIndex={0}
                    aria-label="تشغيل الفيديو"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-5 bg-secondary rounded-[100px] outline outline-8 outline-offset-[-8px] outline-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
                      <div className="w-12 h-12 relative">
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
                </div>
              )}
              {isLessonStart && (
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
    if (isNaN(seconds)) return "غير محدد";

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const canPlay = isFree || isRegistered;

  return (
    <div
      onClick={() => canPlay && onClick()}
      className={`self-stretch inline-flex justify-between items-center gap-[9px] p-2 rounded-lg transition-all duration-200 ${
        canPlay ? "cursor-pointer" : "cursor-not-allowed"
      } ${
        isActive
          ? "bg-gray-100 scale-[1.02]"
          : "hover:bg-gray-50 border-2 border-transparent"
      } ${!canPlay ? "opacity-60" : ""}`}
    >
      <div
        className={`text-right text-xl md:text-2xl font-medium transition-colors ${
          isActive ? "text-secondary" : "text-secondary"
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
          {/* Duration Badge */}
          <div className="px-2.5 absolute left-2 bottom-2 bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center">
            <div className="text-right text-white text-xs md:text-sm font-medium">
              {formatDuration(duration)}
            </div>
          </div>

          {/* Free Badge */}
          {/* {isFree && (
            <div className="px-2 py-1 absolute top-2 right-2 bg-green-500 rounded-md">
              <div className="text-white text-xs font-bold">مجاني</div>
            </div>
          )} */}

          {/* Lock Overlay */}
          {!canPlay && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
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
  const isFreeVideo = (videoId, video) => {
    return (
      freeVideos?.some((v) => v.id === videoId) || video?.free === "1" || false
    );
  };

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
      {/* Header */}
      <div className="inline-flex flex-col justify-start items-start gap-2">
        <div className="text-text text-2xl md:text-3xl font-bold">
          {courseData?.round?.name || "غير محدد"}
        </div>
        <div className="inline-flex justify-start items-center gap-2">
          <div className="text-primary text-sm md:text-base font-bold">
            {currentIndex >= 0 ? currentIndex + 1 : 1} من{" "}
            {allVideos.length || 0}
          </div>
          <div className="text-primary text-sm md:text-base font-bold">
            {teacherName}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="inline-flex flex-col justify-start items-start gap-3 md:gap-4 max-h-[600px] overflow-y-auto">
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
