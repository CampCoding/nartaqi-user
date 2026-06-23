"use client";

import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >= 700);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLgUp = useIsLgUp();

  const watch = searchParams.get("watch");
  const currentVideoId = searchParams.get("video");
  const encodedVimeoId = searchParams.get("vimeo_id");
  const encodedYoutubeId = searchParams.get("youtube_id");

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

  const isDone = "false";

  const handleToggleFavorite = React.useCallback(async () => {
    setIsFavorited((v) => !v);
  }, []);

  const handleShareToggle = React.useCallback(() => {
    setOpenShareDrawer((v) => !v);
  }, []);

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

  const handleCloseVideoModal = React.useCallback(() => {
    dispatch(closeVideoModal());

    const next = new URLSearchParams(searchParams.toString());
    next.delete("watch");
    next.delete("video");
    next.delete("vimeo_id");
    next.delete("youtube_id");

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [dispatch, router, pathname, searchParams]);

  React.useEffect(() => {
    if (watch !== "true") {
      dispatch(closeVideoModal());
      return;
    }

    const videoObj = findVideoById(currentVideoId);

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
      {/* ===================== MOBILE & TABLET (< lg) ===================== */}
      {!isLgUp && (
        <div className="lg:hidden space-y-4 sm:space-y-5 md:space-y-6">
          {!watch ? (
            <MobileCourseDetails
              courseData={courseData}
              isRegestered
              isInFavorites={isFavorited}
              onToggleFavorite={handleToggleFavorite}
              isShareOpen={openShareDrawer}
              onShare={handleShareToggle}
            />
          ) : (
            <VideoPlayer
              vimeo_id={vimeoId}
              youtube_id={youtubeId}
              defaultPlay={autoplay}
              rootClassName="w-full"
            />
          )}

          <Container>
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
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

      {/* ===================== DESKTOP (lg+) ===================== */}
      {isLgUp && (
        <div className="hidden lg:block">
          {!watch ? (
            <div className="w-full h-[420px] xl:h-[560px] 2xl:h-[611px] relative">
              <div className="absolute inset-0 z-30 bg-gradient-to-b from-transparent to-black/90" />
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

          <Container className="mt-8 lg:mt-10 xl:mt-12 xl:!px-10 relative z-30">
            <div className="flex gap-6 lg:gap-8 xl:gap-10 justify-between items-start">
              {/* Left content */}
              <div className="max-w-[762px] w-full flex-1 min-w-0">
                <RegCourseDetailsContent
                  open={open}
                  courseData={courseData}
                  onTabsChange={(e) => setSelectedTab(e)}
                />
              </div>

              {/* Right sidebar */}
              <div
                className={cx(
                  "space-y-10 lg:space-y-12 xl:space-y-14 transition-all mb-10 shrink-0",
                  !activeLiveSession && "lg:sticky lg:top-[160px]",
                  watch || scrolled
                    ? ""
                    : "translate-y-[-380px] xl:translate-y-[-441px]"
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
              <div className="mt-8 lg:mt-10 xl:mt-12">
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