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

    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);





  const handleToggleFavorite = useCallback(async () => {
    // TODO: API call to toggle favorite
    setIsFavorited((v) => !v);
  }, []);

  const handleShareOpen = useCallback(() => {
    setOpenShareDrawer(true);
  }, []);

  return (
    <>
      {/* ===================== MOBILE ===================== */}
      <div className="lg:hidden space-y-5 sm:space-y-6">
        <MobileCourseDetails
          courseData={courseData}
          isInFavorites={isFavorited}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShareOpen}
          onSubscribe={onSubscribe}
          isShareOpen={openShareDrawer}
        />

        <Container className="">
          <div className="space-y-6 sm:space-y-8">
            <CourseDetailsContent courseData={courseData} />
          </div>
        </Container>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden lg:block">
        <div className="w-full h-[560px] xl:h-[611px] relative">
          <div className="absolute inset-0 z-30  bg-gradient-to-b   from-transparent to-black/90" />{" "}
          <img
            loading="lazy"
            src={courseData.round.image_url}
            className="w-full h-full object-cover object-center"
            alt={courseData.round.name}
          />
        </div>

        <Container className="mt-10 xl:mt-12 xl:!px-10 relative z-40">
          <div className="flex justify-between gap-8 xl:gap-10 items-start">
            {/* Content */}
            <div className="w-full max-w-[762px]">
              <CourseDetailsContent courseData={courseData} />
            </div>

            {/* Card */}
            {/* <div 
            className="translate-y-[-441px] space-y-8"
            > */}
            <div
              className={cx(
                "space-y-12 xl:space-y-14 transition-all lg:sticky lg:top-[160px]",
                scrolled ? "" : " translate-y-[-441px]"
              )}>
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
