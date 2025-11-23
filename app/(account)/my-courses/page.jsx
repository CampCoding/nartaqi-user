"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MyActiveCourseCard } from "@/components/ui/Cards/MyActiveCourseCard";
import { MyCompletedCourseCard } from "@/components/ui/Cards/MyCompletedCourseCard";

const MyCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);

  // جلب الـ token من Redux
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!token) {
        setError("يجب تسجيل الدخول أولاً");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/userCourses`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          const allCourses = response.data.message || [];

          // فلترة الـ active courses فقط
          const activeCoursesList = allCourses
            .filter((course) => course.status === "active")
            .map((course) => ({
              id: course.round.id,
              name: course.round.name,
              image_url: course.round.image_url,
              description: course.round.description,
              // ⚠️ Progress مش موجود - هنحط dummy مؤقت
              // لو عايز تحسبه، ممكن تعمل API call تاني أو تطلب من الباك إند يضيفه
              progress: Math.floor(Math.random() * 100), // dummy data
              start_date: course.round.start_date,
              end_date: course.round.end_date,
              enrollment_id: course.id,
            }));

          setActiveCourses(activeCoursesList);

          // حساب Overall Progress (على أساس الـ dummy progress)
          if (activeCoursesList.length > 0) {
            const totalProgress = activeCoursesList.reduce(
              (sum, course) => sum + (course.progress || 0),
              0
            );
            setOverallProgress(
              Math.round(totalProgress / activeCoursesList.length)
            );
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.response?.data?.message || "حدث خطأ أثناء تحميل الدورات");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [token]);

  // Dummy data للـ completed courses
  const completedCourses = [
    { id: 1, name: "دورة مكتملة 1" },
    { id: 2, name: "دورة مكتملة 2" },
    { id: 3, name: "دورة مكتملة 3" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto"></div>
          <p className="mt-4 text-text text-lg">جاري تحميل الدورات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-600 text-lg font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
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

      {/* Completed Courses (Dummy) */}
      <div className="space-y-3 sm:space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-primary text-xl sm:text-2xl md:text-3xl font-bold">
          الدورات المكتملة ({completedCourses.length})
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-[19px]"
          style={{ justifyItems: "center" }}
        >
          {completedCourses.map((course) => (
            <MyCompletedCourseCard key={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

export const AchievementRate = ({ percentage = 77 }) => {
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
            style={{
              width: `${progressData.percentage}%`,
            }}
          />
        </div>

        <div
          className="text-primary relative flex items-center justify-center w-fit font-bold text-base md:text-2xl tracking-[0] leading-[normal] flex-shrink-0"
          role="status"
          aria-label={`Progress: ${progressData.percentage} percent`}
        >
          %{progressData.percentage}
        </div>
      </div>
    </div>
  );
};
