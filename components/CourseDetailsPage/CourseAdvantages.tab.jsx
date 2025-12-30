import React from "react";
import {
  CourseFeatureSkills,
  CourseFeatureNewTeaching,
  CourseFeatureTimeIcon,
  CourseFeatureExpertTeacherIcon,
  CourseFeaturesGreadManagmentIcon,
  CourseFeaturesCertificateIcon,
} from "../../public/svgs";

const FALLBACK_IMG = "/images/logo.svg"; // ضع الصورة هنا داخل public

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
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 lg:gap-10">
      {features && features.length > 0 ? (
        features.map((feature, index) => (
          <div
            key={feature?.id ?? index}
            className="self-stretch flex flex-col justify-start items-start gap-2 md:gap-2.5"
          >
            <div className="inline-flex justify-start items-center gap-4 lg:gap-5">
              {/* استخدام icon افتراضي */}
              {/* {getIcon(index)} */}

              <img
                loading="lazy"
                src={feature?.image_url || FALLBACK_IMG}
                alt={feature?.title || "ميزة"}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-contain"
                onError={(e) => {
                  // امنع loop لو الـfallback نفسه فشل
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />

              <div className="text-right justify-center text-text text-xl md:text-2xl font-bold leading-snug">
                {feature?.title || "غير محدد"}
              </div>
            </div>

            <div className="text-right justify-center text-stone-600 text-base md:text-lg font-medium leading-relaxed md:leading-loose">
              {feature?.description || "لا يوجد وصف"}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 md:py-12 text-text-alt text-base md:text-lg">
          لا توجد مميزات متاحة
        </div>
      )}
    </div>
  );
};

export default CourseFeatures;
