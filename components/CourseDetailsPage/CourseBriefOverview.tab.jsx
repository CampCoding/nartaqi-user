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

const CourseBriefOverview = ({ isRegistered, courseData }) => {
  const pathname = usePathname();
  const { round, roundRate } = courseData;

  // حساب تقييم المدرس
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

  return (
    <div className="grid-cols-1 space-y-[32px]">
      {/* عرض محتوى الدورة من goal (HTML) */}
      {round.goal ? (
        <div
          className="course-goal-content"
          dangerouslySetInnerHTML={{ __html: round.goal }}
        />
      ) : (
        // Fallback لو مفيش goal
        <>
          <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
            <div className="self-stretch text-right justify-center text-text text-lg font-bold">
              مقدمة عن الدورة:
            </div>
            <div className="text-right justify-center text-text-alt text-base leading-loose font-medium">
              {round.description || "غير محدد"}
            </div>
          </div>

          <div className="self-stretch inline-flex flex-col justify-start items-end gap-1">
            <div className="self-stretch text-right justify-center text-text text-lg font-bold">
              لمن هذه الدورة؟
            </div>
            <div className="text-right justify-center text-text-alt text-base leading-loose font-medium">
              {round.for || "غير محدد"}
            </div>
          </div>
        </>
      )}

      {/* بيانات المدرسين */}
      {round.teachers && round.teachers.length > 0 && (
        <div className="flex flex-col gap-[24px]">
          {round.teachers.map((teacher) => (
            <React.Fragment key={teacher.id}>
              <Link
                href={`/teacher-overview/${teacher.id}`}
                className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center hover:bg-primary-light rounded-[20px] p-3"
              >
                <div className="flex justify-start items-center gap-3 md:gap-[5px]">
                  <img
                    className="w-11 h-11 relative rounded-full object-cover"
                    src={teacher.image_url || "https://placehold.co/45x45"}
                    alt={teacher.name}
                  />
                  <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-text text-base md:text-lg font-semibold leading-loose">
                      {teacher.name || "غير محدد"}
                    </div>
                    <div className="justify-center text-text-alt text-sm md:text-base leading-loose font-medium">
                      محاضر في {round.name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="justify-center text-text text-base md:text-lg font-medium">
                      ({teacherRating.count}) {teacherRating.average}
                    </div>
                    <div className="relative overflow-hidden">
                      <RatingStarIcon width={20} height={20} />
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-end gap-1.5">
                    {teacher.instagram && (
                      <a
                        href={teacher.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsInstagramIcon />
                        </div>
                      </a>
                    )}
                    {teacher.linkedin && (
                      <a
                        href={teacher.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsLinkedinIcon />
                        </div>
                      </a>
                    )}
                    {teacher.facebook && (
                      <a
                        href={teacher.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-1 outline-primary flex justify-center items-center hover:bg-primary-light transition"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex justify-center items-center">
                          <CourseDetailsFacebookIcon />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </Link>

              <div className="self-stretch text-right justify-center text-black text-sm md:text-base font-medium">
                {teacher.description || "غير محدد"}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* الأزرار */}
      {!isRegistered && (
        <>
          <div className="self-stretch w-full flex flex-col gap-4 mt-8 lg:flex-row lg:justify-end lg:!mt-[48px] lg:items-start lg:gap-12">
            {round.free === "1" && (
              <div className="flex-1 cursor-pointer hover:shadow-2xl active:scale-95 transition-all select-none px-6 py-4 lg:px-12 lg:py-6 bg-primary rounded-[20px] flex justify-center items-center gap-2">
                <div className="w-6 h-6 relative overflow-hidden">
                  <FileIcon />
                </div>
                <div className="text-right justify-center text-white text-base font-medium">
                  المحتوي المجاني
                </div>
              </div>
            )}

            <Link
              href={
                pathname.startsWith("/course-preview")
                  ? "/"
                  : `/course-preview/${round.id}`
              }
              className="flex-1 cursor-pointer px-6 py-4 hover:shadow-2xl active:scale-95 transition-all select-none lg:px-12 lg:py-6 bg-secondary rounded-[20px] flex justify-center items-center gap-2"
            >
              {!pathname.startsWith("/course-preview") && <VideoCameraIcon />}
              <div className="text-right justify-center text-white text-base font-medium">
                {pathname.startsWith("/course-preview")
                  ? "اشترك الأن"
                  : "الشروحات المجانية"}
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseBriefOverview;
