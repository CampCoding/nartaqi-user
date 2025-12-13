import React from "react";
import {
  CourseFeatureSkills,
  CourseFeatureNewTeaching,
  CourseFeatureTimeIcon,
  CourseFeatureExpertTeacherIcon,
  CourseFeaturesGreadManagmentIcon,
  CourseFeaturesCertificateIcon,
} from "../../public/svgs";

const CourseFeatures = ({ courseData }) => {
  const { features } = courseData;
  console.log(courseData);

  // Default icons للاستخدام
  const defaultIcons = [
    <CourseFeatureSkills />,
    <CourseFeatureNewTeaching />,
    <CourseFeatureTimeIcon />,
    <CourseFeatureExpertTeacherIcon />,
    <CourseFeaturesGreadManagmentIcon />,
    <CourseFeaturesCertificateIcon />,
  ];

  // دالة لاختيار icon بناءً على الـ index
  const getIcon = (index) => {
    return defaultIcons[index % defaultIcons?.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-6 lg:gap-8">
      {features && features.length > 0 ? (
        features.map((feature, index) => (
          <div
            key={feature.id}
            className="self-stretch flex flex-col justify-start items-start gap-1"
          >
            <div className="inline-flex justify-start items-center gap-3 lg:gap-4">
              {/* استخدام icon افتراضي */}
              {/*  {getIcon(index)}
               */}
              {/* عرض الصورة من الـ API - معطلة */}
              <img
                src={feature.image_url}
                alt={feature.title}
                className="w-12 h-12 rounded-full object-contain"
              />

              <div className="text-right justify-center text-text text-lg md:text-xl font-bold">
                {feature.title || "غير محدد"}
              </div>
            </div>
            <div className="text-right justify-center leading-loose text-stone-600 text-sm md:text-base font-medium">
              {feature.description || "لا يوجد وصف"}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-text-alt">
          لا توجد مميزات متاحة
        </div>
      )}
    </div>
  );
};

export default CourseFeatures;
