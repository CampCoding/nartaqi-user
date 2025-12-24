"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import NotReg_courseDetails from "./contents/NotReg_courseDetails";
import Reg_courseDetails from "./contents/Reg_courseDetails";
import LoadingPage from "@/components/shared/Loading";

const CourseDetailsPage = () => {
  const params = useParams();

  // ✅ handle string | string[]
  const roundId = useMemo(() => {
    const id = params?.id;
    return Array.isArray(id) ? id[0] : id;
  }, [params]);

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth?.token);
  const studentId = useSelector((state) => state.auth?.user?.id);

  // ✅ prevent state update after unmount + cancel old requests
  const abortRef = useRef(null);
  const mountedRef = useRef(false);

  const payload = useMemo(() => {
    const p = { round_id: roundId };
    if (studentId) p.student_id = studentId;
    return p;
  }, [roundId, studentId]);

  const fetchCourseData = useCallback(async () => {
    if (!roundId) return;
  
    // cancel previous request
    if (abortRef.current) abortRef.current.abort();
  
    const controller = new AbortController();
    abortRef.current = controller;
  
    try {
      setError(null);
      setLoading(true);
  
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/roundBundle`,
        payload,
        { headers, signal: controller.signal }
      );
  
      // ✅ لو الطلب ده مش آخر طلب (اتعمل request بعده) تجاهله
      if (abortRef.current !== controller) return;
  
      if (res?.data?.status === "success") {
        setCourseData(res.data.message);
      } else {
        setCourseData(null);
        setError(res?.data?.message || "حدث خطأ أثناء تحميل البيانات");
      }
    } catch (err) {
      // ✅ لو اتلغى: تجاهل (ومتقفلش loading هنا)
      if (err?.code === "ERR_CANCELED" || controller.signal.aborted) return;
  
      // ✅ لو الطلب ده مش آخر طلب: تجاهل
      if (abortRef.current !== controller) return;
  
      console.error("Error fetching course:", err);
      setCourseData(null);
      setError(err?.response?.data?.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      // ✅ اقفل loading فقط لو ده آخر طلب ولسه مش متلغى
      if (abortRef.current !== controller) return;
      if (controller.signal.aborted) return;
      setLoading(false);
    }
  }, [roundId, token, payload]);
  

  useEffect(() => {
    if (roundId) fetchCourseData();
  
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [roundId, fetchCourseData]);

  if (loading) return <LoadingPage />;
  console.log( "courseData", courseData);
  console.log( "courseData_loading" , loading);


  if (error || !courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl text-center bg-red-50 border border-red-200 rounded-2xl p-8">
          <p className="text-red-600 text-lg font-bold">
            {error || "لم يتم العثور على البيانات"}
          </p>

          <button
            type="button"
            onClick={fetchCourseData}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const isRegistered = !!courseData?.own;
  const isFree = courseData?.round?.free == 1 ;
  console.log(  "isFree" , isFree);
  return (
    <div>
      <CourseTitle
        title={courseData?.round?.name}
        breadcrumbs={[
          { title: "الرئيسية", link: "#" },
          { title: courseData?.round?.course_categories?.name, link: "#" },
          { title: courseData?.round?.name, link: "#" },
        ]}
      />

      {isRegistered || isFree ? (
        <Reg_courseDetails courseData={courseData} />
      ) : (
        <NotReg_courseDetails courseData={courseData} onSubscribe={fetchCourseData} />
      )}
    </div>
  );
};

export default CourseDetailsPage;
