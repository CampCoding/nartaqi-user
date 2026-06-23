import React from "react";
import {
  CourseDetailsFacebookIcon,
  CourseDetailsInstagramIcon,
  CourseDetailsLinkedinIcon,
  FileIcon,
  RatingStarIcon,
  VideoCameraIcon,
} from "../../public/svgs";
import Link from "@/components/ui/NavLink";
import { usePathname } from "next/navigation";

const FALLBACK_TEACHER_IMG = "/images/teacher-placeholder.png";

const CourseBriefOverview = ({ isRegistered, courseData }) => {
  const pathname = usePathname();
  const { round, roundRate } = courseData;

  const calculateTeacherRating = () => {
    const rates = roundRate || [];
    if (rates.length === 0) return { average: 0, count: 0 };
    const sum = rates.reduce((acc, curr) => acc + curr.rate, 0);
    return {
      average: (sum / rates.length).toFixed(1),
      count: rates.length,
    };
  };

  const teacherRating = calculateTeacherRating();

  const handleTeacherImgError = (e) => {
    if (e?.currentTarget?.src !== FALLBACK_TEACHER_IMG) {
      e.currentTarget.src = FALLBACK_TEACHER_IMG;
    }
  };

  return (
    <div className="grid-cols-1 space-y-8 sm:space-y-10 md:space-y-12">
      {/* عرض محتوى الدورة من goal (HTML) */}
      {round.goal ? (
        <div
          className="richtext text-sm sm:text-base md:text-lg"
          dangerouslySetInnerHTML={{
            __html: round?.goal?.replaceAll(/&nbsp;/gi, " "),
          }}
        />
      ) : (
        <>
          <div className="self-stretch inline-flex flex-col justify-start items-end gap-2 w-full">
            <div className="self-stretch text-right text-text text-lg sm:text-xl md:text-2xl font-bold">
              مقدمة عن الدورة:
            </div>
            {round.description ? (
              <div
                className="richtext text-right text-text-alt text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose font-medium"
                dangerouslySetInnerHTML={{
                  __html: round.description.replaceAll(/&nbsp;/gi, " "),
                }}
              />
            ) : (
              <div className="text-right text-text-alt text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose font-medium">
                غير محدد
              </div>
            )}
          </div>

          <div className="self-stretch inline-flex flex-col justify-start items-end gap-2 w-full">
            <div className="self-stretch text-right text-text text-lg sm:text-xl md:text-2xl font-bold">
              لمن هذه الدورة؟
            </div>
            {round.for ? (
              <div
                className="richtext text-right text-text-alt text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose font-medium"
                dangerouslySetInnerHTML={{
                  __html: round.for.replaceAll(/&nbsp;/gi, " "),
                }}
              />
            ) : (
              <div className="text-right text-text-alt text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose font-medium">
                غير محدد
              </div>
            )}
          </div>
        </>
      )}

      {/* بيانات المدرسين */}
      {round.teachers && round.teachers.length > 0 && (
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          {round.teachers.map((teacher) => (
            <React.Fragment key={teacher.id}>
              <Link
                href={`/teacher-overview/${teacher.id}`}
                className="flex flex-col gap-4 sm:gap-5 md:flex-row md:justify-between md:items-center hover:bg-primary-light rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-5 transition"
              >
                <div className="flex justify-start items-center gap-3 sm:gap-4 md:gap-5 min-w-0">
                  <img
                    loading="lazy"
                    className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-full object-cover flex-shrink-0"
                    src={teacher?.image_url || FALLBACK_TEACHER_IMG}
                    onError={handleTeacherImgError}
                    alt={teacher?.name || "teacher"}
                  />

                  <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                    <div className="text-text text-base sm:text-lg md:text-xl font-semibold leading-snug truncate">
                      {teacher.name || "غير محدد"}
                    </div>
                    <div className="text-text-alt text-xs sm:text-sm md:text-base leading-relaxed font-medium line-clamp-1">
                      محاضر في {round.name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:gap-4 md:items-end">
                  <div className="inline-flex justify-start items-center gap-2 sm:gap-2.5">
                    <div className="text-text text-sm sm:text-base md:text-lg font-medium">
                      ({teacherRating.count}) {teacherRating.average}
                    </div>
                    <div className="relative overflow-hidden">
                      <RatingStarIcon width={20} height={20} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                  </div>

                  <div className="inline-flex justify-start items-end gap-1.5 sm:gap-2">
                    {teacher.instagram && (
                      <a
                        href={teacher.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsInstagramIcon />
                        </div>
                      </a>
                    )}
                    {teacher.linkedin && (
                      <a
                        href={teacher.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsLinkedinIcon />
                        </div>
                      </a>
                    )}
                    {teacher.facebook && (
                      <a
                        href={teacher.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsFacebookIcon />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="self-stretch w-full flex flex-col gap-4 sm:gap-5 mt-8 sm:mt-10 lg:flex-row lg:justify-end lg:!mt-14 lg:items-start lg:gap-8 xl:gap-12">
        <a
          href={round.round_book_url}
          target="_blank"
          className="flex-1 cursor-pointer hover:shadow-2xl active:scale-95 transition-all select-none px-5 sm:px-6 md:px-7 py-4 sm:py-5 lg:px-10 xl:px-12 lg:py-5 xl:py-6 bg-primary rounded-[16px] sm:rounded-[20px] md:rounded-[24px] flex justify-center items-center gap-2.5 sm:gap-3"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative overflow-hidden">
            <FileIcon />
          </div>
          <div className="text-right text-white text-sm sm:text-base md:text-lg font-medium">
            {"المحتوى المجاني"}
          </div>
        </a>

        <Link
          href={
            pathname.startsWith("/course-preview")
              ? `/course/${round.id}`
              : `/course-preview/${round.id}`
          }
          className="flex-1 cursor-pointer px-5 sm:px-6 md:px-7 py-4 sm:py-5 hover:shadow-2xl active:scale-95 transition-all select-none lg:px-10 xl:px-12 lg:py-5 xl:py-6 bg-secondary rounded-[16px] sm:rounded-[20px] md:rounded-[24px] flex justify-center items-center gap-2.5 sm:gap-3"
        >
          {!pathname.startsWith("/course-preview") && <VideoCameraIcon />}
          <div className="text-right text-white text-sm sm:text-base md:text-lg font-medium">
            {pathname.startsWith("/course-preview")
              ? " الرجوع للدورة"
              : "الشروحات المجانية"}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseBriefOverview;