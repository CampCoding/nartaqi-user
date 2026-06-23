import React from "react";
import {
  CourseFeatureSkills,
  CourseFeatureNewTeaching,
  CourseFeatureTimeIcon,
  CourseFeatureExpertTeacherIcon,
  CourseFeaturesGreadManagmentIcon,
  CourseFeaturesCertificateIcon,
} from "../../public/svgs";
import { Dot } from "lucide-react";

const FALLBACK_IMG = "/images/logo.svg";

const CourseFeatures = ({ courseData }) => {
  const { features } = courseData || {};

  const defaultIcons = [
    <CourseFeatureSkills />,
    <CourseFeatureNewTeaching />,
    <CourseFeatureTimeIcon />,
    <CourseFeatureExpertTeacherIcon />,
    <CourseFeaturesGreadManagmentIcon />,
    <CourseFeaturesCertificateIcon />,
  ];

  const getIcon = (index) => defaultIcons[index % defaultIcons?.length];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8 lg:gap-10">
      {features && features.length > 0 ? (
        features.map((feature, index) => (
          <div
            key={feature?.id ?? index}
            className="self-stretch flex flex-col justify-start items-start gap-2 md:gap-2.5"
          >
            <div className="inline-flex justify-start items-center gap-3 sm:gap-4 lg:gap-5">
              <img
                loading="lazy"
                src={feature?.image_url || FALLBACK_IMG}
                alt={feature?.title || "ميزة"}
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-contain flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />

              <div className="text-right text-text text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                {feature?.title || "غير محدد"}
              </div>
            </div>

            {feature?.description ? (
              <div
                className="richtext text-right text-stone-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed md:leading-loose"
                dangerouslySetInnerHTML={{
                  __html: feature.description.replaceAll(/&nbsp;/gi, " "),
                }}
              />
            ) : (
              <div className="flex items-start text-right text-stone-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed md:leading-loose">
                <Dot className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
                لا يوجد وصف
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 sm:py-10 md:py-12 text-text-alt text-sm sm:text-base md:text-lg">
          لا توجد مميزات متاحة
        </div>
      )}
    </div>
  );
};

export default CourseFeatures;