"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import ShareBottomDrawer from "../../../../components/shared/ShareBottomDrawer";

const NotReg_courseDetails = ({ courseData }) => {
  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [isFavorited, setIsFavorited] = useState(courseData.fav);

  const handleToggleFavorite = async () => {
    // TODO: API call to toggle favorite
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <div className="lg:hidden space-y-4">
        <MobileCourseDetails
          courseData={courseData}
          onToggleFavorite={handleToggleFavorite}
          onShare={() => setOpenShareDrawer(true)}
        />
        <Container>
          <CourseDetailsContent courseData={courseData} />
        </Container>
      </div>

      <div className="hidden lg:block">
        <div className="w-full h-[611px] relative">
          <img
            src={courseData.round.image_url}
            className="w-full h-full object-cover object-top"
            alt={courseData.round.name}
          />
        </div>

        <Container className="mt-[48px] ">
          <div className="flex justify-between gap-10 items-start">
            <div className="w-full max-w-[762px]">
              <CourseDetailsContent courseData={courseData} />
            </div>
            <div className="translate-y-[-441px]">
              <CourseDetailsCard
                courseData={courseData}
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
