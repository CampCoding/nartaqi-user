"use client";

import React, { useState, useCallback, useEffect } from "react";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import cx from "../../../../lib/cx";

const NotReg_courseDetails = ({ courseData, onSubscribe }) => {
  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [isFavorited, setIsFavorited] = useState(courseData.fav);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >= 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    setIsFavorited((v) => !v);
  }, []);

  const handleShareOpen = useCallback(() => {
    setOpenShareDrawer(true);
  }, []);

  return (
    <>
      {/* ===================== MOBILE & TABLET (< lg) ===================== */}
      <div className="lg:hidden space-y-4 sm:space-y-5 md:space-y-6">
        <MobileCourseDetails
          courseData={courseData}
          isInFavorites={isFavorited}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShareOpen}
          onSubscribe={onSubscribe}
          isShareOpen={openShareDrawer}
        />

        <Container>
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <CourseDetailsContent courseData={courseData} />
          </div>
        </Container>
      </div>

      {/* ===================== DESKTOP (lg+) ===================== */}
      <div className="hidden lg:block">
        {/* Hero Image */}
        <div className="w-full h-[420px] xl:h-[560px] 2xl:h-[611px] relative">
          <div className="absolute inset-0 z-30 bg-gradient-to-b from-transparent to-black/90" />
          <img
            loading="lazy"
            src={courseData.round.image_url}
            className="w-full h-full object-cover object-center"
            alt={courseData.round.name}
          />
        </div>

        <Container className="mt-8 lg:mt-10 xl:mt-12 xl:!px-10 relative z-40">
          <div className="flex justify-between gap-6 lg:gap-8 xl:gap-10 items-start">
            {/* Content */}
            <div className="w-full max-w-[762px] flex-1 min-w-0">
              <CourseDetailsContent courseData={courseData} />
            </div>

            {/* Card */}
            <div
              className={cx(
                "space-y-10 lg:space-y-12 xl:space-y-14 transition-all lg:sticky lg:top-[160px] shrink-0",
                scrolled ? "" : "translate-y-[-380px] xl:translate-y-[-441px]"
              )}
            >
              <CourseDetailsCard
                scrolled={scrolled}
                onSubscribe={onSubscribe}
                courseData={courseData}
                isInFavorites={isFavorited}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotReg_courseDetails;