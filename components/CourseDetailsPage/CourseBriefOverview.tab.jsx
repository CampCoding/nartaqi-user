import React from "react";
import {
  CourseDetailsFacebookIcon,
  CourseDetailsInstagramIcon,
  CourseDetailsLinkedinIcon,
  FileIcon,
  RatingStarIcon,
  VideoCameraIcon,
} from "../../public/svgs";
import Link from "next/link";
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

  // ✅ Handle teacher image error
  const handleTeacherImgError = (e) => {
    // prevent infinite loop if fallback also fails
    if (e?.currentTarget?.src !== FALLBACK_TEACHER_IMG) {
      e.currentTarget.src = FALLBACK_TEACHER_IMG;
    }
  };

  return (
    <div className="grid-cols-1 space-y-10 md:space-y-12">
      {/* عرض محتوى الدورة من goal (HTML) */}
      {round.goal ? (
        <div
          className="course-goal-content"
          dangerouslySetInnerHTML={{
            __html: round?.goal?.replaceAll(/&nbsp;/gi, " "),
          }}
        />
      ) : (
        <>
          <div className="self-stretch inline-flex flex-col justify-start items-end gap-2">
            <div className="self-stretch text-right justify-center text-text text-xl md:text-2xl font-bold">
              مقدمة عن الدورة:
            </div>
            <div className="text-right justify-center text-text-alt text-base md:text-lg leading-relaxed md:leading-loose font-medium">
              {round.description || "غير محدد"}
            </div>
          </div>

          <div className="self-stretch inline-flex flex-col justify-start items-end gap-2">
            <div className="self-stretch text-right justify-center text-text text-xl md:text-2xl font-bold">
              لمن هذه الدورة؟
            </div>
            <div className="text-right justify-center text-text-alt text-base md:text-lg leading-relaxed md:leading-loose font-medium">
              {round.for || "غير محدد"}
            </div>
          </div>
        </>
      )}

      {/* بيانات المدرسين */}
      {round.teachers && round.teachers.length > 0 && (
        <div className="flex flex-col gap-7 md:gap-8">
          {round.teachers.map((teacher) => (
            <React.Fragment key={teacher.id}>
              <Link
                href={`/teacher-overview/${teacher.id}`}
                className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center hover:bg-primary-light rounded-[24px] p-4 md:p-5 transition"
              >
                <div className="flex justify-start items-center gap-4 md:gap-5">
                  <img
                    loading="lazy"
                    className="w-12 h-12 md:w-14 md:h-14 relative rounded-full object-cover"
                    src={teacher?.image_url || FALLBACK_TEACHER_IMG}
                    onError={handleTeacherImgError}
                    alt={teacher?.name || "teacher"}
                  />

                  <div className="inline-flex flex-col justify-start items-start gap-0.5">
                    <div className="justify-center text-text text-lg md:text-xl font-semibold leading-snug">
                      {teacher.name || "غير محدد"}
                    </div>
                    <div className="justify-center text-text-alt text-sm md:text-base leading-relaxed font-medium">
                      محاضر في {round.name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end">
                  <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="justify-center text-text text-base md:text-lg font-medium">
                      ({teacherRating.count}) {teacherRating.average}
                    </div>
                    <div className="relative overflow-hidden">
                      <RatingStarIcon width={22} height={22} />
                    </div>
                  </div>

                  <div className="inline-flex justify-start items-end gap-2">
                    {teacher.instagram && (
                      <a
                        href={teacher.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsInstagramIcon />
                        </div>
                      </a>
                    )}
                    {teacher.linkedin && (
                      <a
                        href={teacher.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsLinkedinIcon />
                        </div>
                      </a>
                    )}
                    {teacher.facebook && (
                      <a
                        href={teacher.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsFacebookIcon />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </Link>

              {/* <div className="self-stretch text-right justify-center text-black text-base md:text-lg leading-relaxed font-medium">
                {teacher.description || "غير محدد"}
              </div> */}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="self-stretch w-full flex flex-col gap-5 mt-10 lg:flex-row lg:justify-end lg:!mt-14 lg:items-start lg:gap-12">
        {
          <a
            href={round.round_book_url}
            target="_blank"
            className="flex-1 cursor-pointer hover:shadow-2xl active:scale-95 transition-all select-none px-7 py-5 lg:px-12 lg:py-6 bg-primary rounded-[24px] flex justify-center items-center gap-3"
          >
            <div className="w-7 h-7 relative overflow-hidden">
              <FileIcon />
            </div>
            <div className="text-right justify-center text-white text-base md:text-lg font-medium">
              {/* {courseData.free == 0 ? "كتاب الدورة" : "المحتوى المجاني"} */}
              {"المحتوى المجاني"}
            </div>
          </a>
        }

        {/* <Link
          href={
               `/free-courses?category=${round?.category_part_free_id}`
          }
          className="flex-1 cursor-pointer px-7 py-5 hover:shadow-2xl active:scale-95 transition-all select-none lg:px-12 lg:py-6 bg-secondary rounded-[24px] flex justify-center items-center gap-3"
        >
           <VideoCameraIcon />
          <div className="text-right justify-center text-white text-base md:text-lg font-medium">
              الشروحات المجانية
          </div>
        </Link> */}
        <Link
          href={
            pathname.startsWith("/course-preview")
              ? `/course/${round.id}`
              : `/course-preview/${round.id}`
          }
          className="flex-1 cursor-pointer px-7 py-5 hover:shadow-2xl active:scale-95 transition-all select-none lg:px-12 lg:py-6 bg-secondary rounded-[24px] flex justify-center items-center gap-3"
        >
          {!pathname.startsWith("/course-preview") && <VideoCameraIcon />}
          <div className="text-right justify-center text-white text-base md:text-lg font-medium">
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
