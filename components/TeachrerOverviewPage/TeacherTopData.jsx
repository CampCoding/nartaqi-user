"use client";

import React from "react";
import Link from "next/link";

import {
  CourseDetailsFacebookIcon,
  CourseDetailsInstagramIcon,
  CourseDetailsLinkedinIcon,
  RatingStarIcon,
} from "../../public/svgs";

/**
 * Props:
 * - teacher: object from API (message.teacher)
 * - rating: optional number (if you have rating later)
 * - reviewsCount: optional number
 * - hrefBase: optional string (default: "/teacher-overview")
 *
 * teacher example:
 * {
 *   id, name, image_url, description,
 *   facebook, instagram, linkedin, ...
 * }
 */
const TeacherTopData = ({
  teacher,
  rating = 4.5,
  reviewsCount = 1450,
  hrefBase = "/teacher-overview",
}) => {
  if (!teacher) return null;

  const teacherHref = `${hrefBase}/${teacher.id}`;

  return (
    <div className="flex flex-col gap-[48px]">
      <Link
        href={teacherHref}
        className="flex justify-between items-center hover:bg-primary-light rounded-[20px] p-3"
      >
        {/* Left: image + name + short title */}
        <div className="flex justify-end items-center gap-[5px]">
          <img
            loading="lazy"
            className="w-11 h-11 relative rounded-[50px] object-cover"
            src={teacher.image_url || "/images/Image-48.png"}
            alt={teacher.name || "Teacher"}
          />
          <div className="inline-flex flex-col justify-start items-start">
            <div className="justify-center text-text text-2xl font-semibold leading-loose">
              {teacher.name || "—"}
            </div>
            <div className="justify-center text-stone-600 text-base font-medium">
              {teacher.description || "—"}
            </div>
          </div>
        </div>

        {/* Right: rating + social */}
        <div className="inline-flex flex-col justify-end items-end gap-2">
          <div className="inline-flex justify-start items-center gap-2">
            <div className="justify-center text-text text-xl font-medium">
              ({reviewsCount}) {rating}
            </div>
            <div className="relative overflow-hidden">
              <RatingStarIcon width={20} height={20} />
            </div>
          </div>

          {/* Social buttons (only show if link exists) */}
          <div className="inline-flex justify-start items-end gap-1.5">
            {teacher.instagram && (
              <a
                href={teacher.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center overflow-hidden"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 flex items-center justify-center absolute bg-blue-100 rounded-full left-[4px] top-[4px]">
                  <CourseDetailsInstagramIcon />
                </div>
              </a>
            )}

            {teacher.linkedin && (
              <a
                href={teacher.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="w-10 h-10 flex items-center justify-center absolute bg-blue-100 rounded-full left-[4px] top-[4px]">
                  <CourseDetailsLinkedinIcon />
                </div>
              </a>
            )}

            {teacher.facebook && (
              <a
                href={teacher.facebook}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 p-2 relative bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-primary inline-flex flex-col justify-center items-center overflow-hidden"
                aria-label="Facebook"
              >
                <div className="w-10 h-10 flex items-center justify-center absolute bg-blue-100 rounded-full left-[4px] top-[4px]">
                  <CourseDetailsFacebookIcon />
                </div>
              </a>
            )}
          </div>
        </div>
      </Link>

      {/* Long description */}
      <div className="text-right justify-center leading-loose">
        <span className="text-text text-xl font-medium">
          {teacher.description || "لا يوجد وصف متاح لهذا المدرب حاليًا."}
        </span>
      </div>
    </div>
  );
};

export default TeacherTopData;
