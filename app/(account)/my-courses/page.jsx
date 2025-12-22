// pages/MyCourses.jsx
"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import LoadingPage from "@/components/shared/Loading";
import { MyActiveCourseCard } from "@/components/ui/Cards/MyActiveCourseCard";
import { MyCompletedCourseCard } from "@/components/ui/Cards/MyCompletedCourseCard";
import useUserCourses from "../../../components/shared/Hooks/useGetMyCourses";

const MyCourses = () => {
  const token = useSelector((state) => state.auth?.token);

  const { rounds, totalAchievementRate, loading, error, refetch } =
    useUserCourses(token);


  // ✅ Normalize API response to match cards props as much as possible
  const normalizedCourses = useMemo(() => {
    return (rounds || []).map((r) => {
      const total = Number(r.total_videos || 0);
      const watched = Number(r.watched_videos || 0);

      // Prefer accurate progress from watched/total
      const progress =
        total > 0 ? Math.round((watched / total) * 100) : Number(r.achievement_rate || 0);

      return {
        id: r.id,
        name: r.name,
        image_url: r.image, // ✅ API gives "image"
        description: r.description || "",

        // Progress + stats
        progress: Number.isFinite(progress) ? progress : 0,
        total_videos: total,
        watched_videos: watched,

        // Optional fields (API doesn't provide these, kept for card compatibility)
        start_date: r.start_date || null,
        end_date: r.end_date || null,
        enrollment_id: r.enrollment_id || null,
        status: r.status || null,
      };
    });
  }, [rounds]);

  // ✅ Split active/completed based on watched/total (or progress)
  const { activeCourses, completedCourses } = useMemo(() => {
    const active = [];
    const completed = [];

    for (const c of normalizedCourses) {
      const isCompleted =
        (c.total_videos > 0 && c.watched_videos >= c.total_videos) || c.progress >= 100;

      if (isCompleted) completed.push({ ...c, progress: 100 });
      else active.push(c);
    }

    return { activeCourses: active, completedCourses: completed };
  }, [normalizedCourses]);

  // ✅ Overall progress: use API total_achievement_rate (already number in hook)
  const overallProgress = totalAchievementRate

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-600 text-lg font-bold">{error}</p>

          <button
            onClick={refetch}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-[32px] w-full">
      <AchievementRate percentage={overallProgress} />

      {/* Active Courses */}
      <div className="space-y-3 sm:space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-secondary text-xl sm:text-2xl md:text-3xl font-bold">
          الدورات النشطة ({activeCourses.length})
        </div>

        {activeCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-text-alt text-lg">لا توجد دورات نشطة حالياً</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-[19px]"
            style={{ justifyItems: "center" }}
          >
            {activeCourses.map((course) => (
              <MyActiveCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Courses */}
      <div className="space-y-3 sm:space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-primary text-xl sm:text-2xl md:text-3xl font-bold">
          الدورات المكتملة ({completedCourses.length})
        </div>

        {completedCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-text-alt text-lg">لا توجد دورات مكتملة</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-[19px]"
            style={{ justifyItems: "center" }}
          >
            {completedCourses.map((course) => (
              <MyCompletedCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

export const AchievementRate = ({ percentage = 0 }) => {
  const progressData = {
    percentage,
    label: "معدل الإنجاز الكلي",
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-20 px-4 md:px-6 py-4 relative bg-primary-light rounded-[15px] w-full">
      <div
        className="text-text text-right relative flex items-center justify-center w-fit font-bold text-base tracking-[0] leading-[normal] flex-shrink-0"
        lang="ar"
      >
        {progressData.label}
      </div>

      <div className="inline-flex flex-1 w-full items-center gap-4 md:gap-6 relative md:w-auto">
        <div
          className="relative w-full h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
          role="progressbar"
          aria-valuenow={progressData.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Overall completion rate"
        >
          <div
            className="h-full bg-primary mr-auto rounded-[50px] transition-all duration-300"
            style={{ width: `${progressData.percentage}` }}
          />
        </div>

        <div
          className="text-primary relative flex items-center justify-center w-fit font-bold text-base md:text-2xl tracking-[0] leading-[normal] flex-shrink-0"
          role="status"
          aria-label={`Progress: ${progressData.percentage} percent`}
        >
          {progressData.percentage}
        </div>
      </div>
    </div>
  );
};
