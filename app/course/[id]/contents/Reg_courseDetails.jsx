"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import RegCourseDetailsCard from "../../../../components/CourseDetailsPage/Reg_courseDetialsCard";
import RegCourseDetailsContent from "../../../../components/CourseDetailsPage/Reg_courseDetailsContent";
import LiveCard from "../../../../components/ui/Cards/LiveCard";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import CourseFaqs from "../../../../components/CourseDetailsPage/CourseFaqs";
import ShareBottomDrawer from "../../../../components/shared/ShareBottomDrawer";
import VideoPlayerModal from "../../../../components/shared/VideoPlayerModal";

import cx from "../../../../lib/cx";
import useIsLgUp from "../../../../hooks/useLgUp";

// ✅ redux actions
import {
  openVideoModal,
  closeVideoModal,
  openVideo,
} from "../../../../components/utils/Store/Slices/videoModalSlice";
import VideoPlayer from "../../../../components/ui/Video";

const Reg_courseDetails = ({ courseData, open }) => {
  const [selectedTab, setSelectedTab] = React.useState("sourses");
  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(courseData.fav);
  const { data } = useSelector((s) => s.videoModal);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLgUp = useIsLgUp();

  const watch = searchParams.get("watch"); // "true" / null
  const currentVideoId = searchParams.get("video"); // id
  const encodedVimeoId = searchParams.get("vimeo_id"); // encoded
  const encodedYoutubeId = searchParams.get("youtube_id"); // encoded

  // ✅ Memoize active live session
  const activeLiveSession = React.useMemo(() => {
    if (!courseData?.contents) return null;

    for (const content of courseData.contents) {
      for (const lesson of content.lessons || []) {
        const activeLive = lesson.live?.find((l) => l.active === "1");
        if (activeLive) {
          return {
            ...activeLive,
            lessonTitle: lesson.lesson_title,
          };
        }
      }
    }
    return null;
  }, [courseData?.contents]);

  const isDone = "false"; // TODO: حساب من progress API

  const handleToggleFavorite = React.useCallback(async () => {
    // TODO: API call to toggle favorite
    setIsFavorited((v) => !v);
  }, []);

  const handleShareToggle = React.useCallback(() => {
    setOpenShareDrawer((v) => !v);
  }, []);

  // ✅ helper: find video by id from courseData
  const findVideoById = React.useCallback(
    (videoId) => {
      if (!videoId || !courseData?.contents) return null;

      for (const content of courseData.contents) {
        for (const lesson of content.lessons || []) {
          for (const video of lesson.videos || []) {
            if (String(video.id) === String(videoId)) {
              return {
                ...video,
                lessonTitle: lesson.lesson_title,
                contentTitle: content.content_title,
              };
            }
          }
        }
      }
      return null;
    },
    [courseData?.contents]
  );

  // ✅ Close handler: close redux modal + clean URL
  const handleCloseVideoModal = React.useCallback(() => {
    dispatch(closeVideoModal());

    // شيل watch/video/vimeo_id/youtube_id من الرابط
    const next = new URLSearchParams(searchParams.toString());
    next.delete("watch");
    next.delete("video");
    next.delete("vimeo_id");
    next.delete("youtube_id");

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [dispatch, router, pathname, searchParams]);

  // ✅ When watch=true → open modal & feed redux with data
  React.useEffect(() => {
    if (watch !== "true") {
      // لو المستخدم خرج من watch mode: اقفل المودال (لو مفتوح)
      dispatch(closeVideoModal());
      return;
    }

    // 1) حاول تجيب الفيديو من video=id
    const videoObj = findVideoById(currentVideoId);

    // 2) لو عندك encoded ids بالـ URL مررهم (المشغل عندك بيفكهم)
    //    أو لو الفيديو جايب روابط خام (vimeo_link/youtube_link) مررهم برضه
    const vimeoValue =
      (videoObj?.vimeo_link || "").trim() || (encodedVimeoId || "").trim();
    const youtubeValue =
      (videoObj?.youtube_link || "").trim() || (encodedYoutubeId || "").trim();

    const title =
      videoObj?.title ||
      videoObj?.lessonTitle ||
      courseData?.round?.name ||
      "مشاهدة الفيديو";

    dispatch(
      openVideo({
        title,
        // NOTE:
        // لو بتمرر encoded من URL خليه كما هو
        // ولو بتمرر raw link/id برضه تمام (المشغل عندك عنده extract helpers)
        vimeoId: vimeoValue,
        youtubeId: youtubeValue,
        autoplay: true,
      })
    );
  }, [
    watch,
    currentVideoId,
    encodedVimeoId,
    encodedYoutubeId,
    dispatch,
    findVideoById,
    courseData?.round?.name,
  ]);

  const title = data?.title || "مشاهدة الفيديو";
  const vimeoId = data?.vimeoId || "";
  const youtubeId = data?.youtubeId || "";
  const autoplay = data?.autoplay ?? true;

  return (
    <>
      {/* ✅ Mount modal here (ممكن كمان تحطه مرة واحدة في layout) */}
      {/* <VideoPlayerModal onClose={handleCloseVideoModal} /> */}

      {/* ===================== MOBILE ===================== */}
      {!isLgUp && (
        <div className="lg:hidden space-y-5 sm:space-y-6">
          <MobileCourseDetails
            courseData={courseData}
            isRegestered
            isInFavorites={isFavorited}
            onToggleFavorite={handleToggleFavorite}
            isShareOpen={openShareDrawer}
            onShare={handleShareToggle}
          />

          <Container className="px-3 sm:px-4">
            <div className="space-y-6 sm:space-y-8">
              <RegCourseDetailsContent
                courseData={courseData}
                onTabsChange={(e) => setSelectedTab(e)}
              />

              {selectedTab === "sourses" && (
                <div className="pt-1 sm:pt-2">
                  <CourseFaqs courseData={courseData} />
                </div>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* ===================== DESKTOP ===================== */}
      {isLgUp && (
        <div className="hidden lg:block">
          {!watch ? (
            <div className="w-full h-[560px] xl:h-[611px] relative ">
              <div className="absolute inset-0 z-30  bg-gradient-to-b   from-transparent to-black/90" />{" "}
              <img
                loading="lazy"
                src={courseData.round.image_url}
                className="w-full h-full object-cover object-center"
                alt={courseData.round.name}
              />
            </div>
          ) : (
            <VideoPlayer
              vimeo_id={vimeoId}
              youtube_id={youtubeId}
              defaultPlay={autoplay}
              rootClassName="w-full"
            />
          )}

          <Container className="mt-10 xl:mt-12 relative z-30">
            <div className="flex gap-8 xl:gap-6 justify-between items-start">
              {/* Left content */}
              <div className="max-w-[762px] w-full">
                <RegCourseDetailsContent
                  open={open}
                  courseData={courseData}
                  onTabsChange={(e) => setSelectedTab(e)}
                />
              </div>

              {/* Right sidebar */}
              <div
                className={cx(
                  "space-y-12 xl:space-y-14",
                  watch ? "" : " translate-y-[-441px]"
                )}
              >
                <RegCourseDetailsCard
                  courseData={courseData}
                  onShare={handleShareToggle}
                  onToggleFavorite={handleToggleFavorite}
                  isInFavorites={isFavorited}
                  isDone={isDone}
                />

                {activeLiveSession && (
                  <LiveCard
                    liveData={activeLiveSession}
                    courseData={courseData}
                  />
                )}
              </div>
            </div>

            {selectedTab === "sourses" && (
              <div className="mt-10 xl:mt-12">
                <CourseFaqs courseData={courseData} />
              </div>
            )}
          </Container>
        </div>
      )}

      {/* Share Drawer */}
      <ShareBottomDrawer
        open={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title={courseData.round.name}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
};

export default Reg_courseDetails;
