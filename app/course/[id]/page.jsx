"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import NotReg_courseDetails from "./contents/NotReg_courseDetails";
import Reg_courseDetails from "./contents/Reg_courseDetails";
import LoadingPage from "@/components/shared/Loading";

const CourseDetailsPage = () => {
  const params = useParams();
  const roundId = params.id;
  const searchParams = useSearchParams();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth?.token);
  const studentId = useSelector((state) => state.auth?.user?.id);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/roundBundle`,
          {
            round_id: roundId,
            student_id: studentId ? studentId.toString() : 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          setCourseData(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err.response?.data?.message || "حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    if (roundId) {
      fetchCourseData();
    }
  }, [roundId, token, studentId]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-600 text-lg font-bold">
            {error || "لم يتم العثور على البيانات"}
          </p>
        </div>
      </div>
    );
  }

  const isRegistered = courseData.own;

  return (
    <Suspense fallback="Loading...">
      <div>
        <CourseTitle courseData={courseData} />
        {isRegistered ? (
          <Reg_courseDetails courseData={courseData} />
        ) : (
          <NotReg_courseDetails courseData={courseData} />
        )}
      </div>
    </Suspense>
  );
};

export default CourseDetailsPage;
