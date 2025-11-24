"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import RegCourseDetailsCard from "../../../../components/CourseDetailsPage/Reg_courseDetialsCard";
import RegCourseDetailsContent from "../../../../components/CourseDetailsPage/Reg_courseDetailsContent";
import LiveCard from "../../../../components/ui/Cards/LiveCard";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import CourseFaqs from "../../../../components/CourseDetailsPage/CourseFaqs";
import ShareBottomDrawer from "../../../../components/shared/ShareBottomDrawer";
import VideoPlayer from "../../../../components/ui/Video";
import cx from "../../../../lib/cx";
import useIsLgUp from "../../../../hooks/useLgUp";

const Reg_courseDetails = ({ courseData }) => {
  const [selectedTab, setSelectedTab] = React.useState("sourses");
  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(courseData.fav);

  const searchParams = useSearchParams();
  const watch = searchParams.get("watch");
  const isLgUp = useIsLgUp();

  // البحث عن أول live session active
  const getActiveLiveSession = () => {
    if (!courseData.contents) return null;

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
  };

  const activeLiveSession = getActiveLiveSession();
  const isDone = "false"; // TODO: حساب من progress API

  const handleToggleFavorite = async () => {
    // TODO: API call to toggle favorite
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      {!isLgUp && (
        <div className="lg:hidden space-y-4">
          {!watch ? (
            <MobileCourseDetails
              courseData={courseData}
              isRegestered
              isInFavorites={isFavorited}
              onToggleFavorite={handleToggleFavorite}
              isShareOpen={openShareDrawer}
              onShare={() => setOpenShareDrawer(!openShareDrawer)}
            />
          ) : (
            <VideoPlayer defaultPlay={true} />
          )}
          <Container>
            <RegCourseDetailsContent
              courseData={courseData}
              onTabsChange={(e) => setSelectedTab(e)}
            />
            {selectedTab === "sourses" && (
              <CourseFaqs courseData={courseData} />
            )}
          </Container>
        </div>
      )}

      {isLgUp && (
        <div className="hidden lg:block">
          {!watch ? (
            <div className="w-full h-[611px] relative">
              <img
                src={courseData.round.image_url}
                className="w-full h-full object-cover object-top"
                alt={courseData.round.name}
              />
            </div>
          ) : (
            <VideoPlayer defaultPlay={true} />
          )}

          <Container className="mt-[48px] mb-[139px]">
            <div className="flex gap-5 justify-between items-start">
              <div className="max-w-[762px] w-full">
                <RegCourseDetailsContent
                  courseData={courseData}
                  onTabsChange={(e) => setSelectedTab(e)}
                />
              </div>
              <div
                className={cx("space-y-6", watch ? "" : "translate-y-[-441px]")}
              >
                <RegCourseDetailsCard
                  courseData={courseData}
                  onShare={() => setOpenShareDrawer(!openShareDrawer)}
                  onToggleFavorite={handleToggleFavorite}
                  isInFavorites={isFavorited}
                  isDone={isDone}
                />

                {/* عرض LiveCard فقط لو في session active */}
                {activeLiveSession && (
                  <LiveCard
                    liveData={activeLiveSession}
                    courseData={courseData}
                  />
                )}
              </div>
            </div>

            {selectedTab === "sourses" && (
              <CourseFaqs courseData={courseData} />
            )}
          </Container>
        </div>
      )}

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
