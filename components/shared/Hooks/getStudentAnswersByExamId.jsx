"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/getStudentAnswersByExamId`;

const useGetStudentExamAnswers = ({ studentId, examId }) => {
  const [data, setData] = useState(null); // full payload (message or fallback)
  const [sections, setSections] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [lastStudentScore, setLastStudentScore] = useState(null);
  const [examInfo, setExamInfo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnswers = useCallback(async () => {
    if (!studentId || !examId) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("لا يوجد توكن تسجيل دخول");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        API_URL,
        {
          student_id: studentId,
          exam_id: examId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // ✅ مرونة في قراءة الرد
      // بعض الـ APIs بتحط الداتا في message، وبعضها في data مباشرة
      const payload = res?.data?.message ?? res?.data ?? null;

      setData(payload);

      // ✅ sections
      const payloadSections = payload?.sections ?? [];
      setSections(Array.isArray(payloadSections) ? payloadSections : []);

      // ✅ is_solved ممكن تكون في payload أو في res.data مباشرة
      const solved =
        payload?.is_solved ??
        res?.data?.is_solved ??
        false;

      setIsSolved(!!solved);

      // ✅ lastStudentScore
      setLastStudentScore(
        payload?.lastStudentScore ??
          res?.data?.lastStudentScore ??
          null
      );

      // ✅ exam_info لو موجود
      setExamInfo(payload?.exam_info ?? payload?.examInfo ?? null);
    } catch (err) {
      console.error("getStudentAnswers error:", err);
      setError(
        err?.response?.data?.message || "حدث خطأ أثناء جلب إجابات الامتحان"
      );
    } finally {
      setLoading(false);
    }
  }, [studentId, examId]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return {
    data, // full payload
    sections,
    isSolved,
    lastStudentScore, // ✅ جديد
    examInfo, // ✅ جديد
    loading,
    error,
    refetch: fetchAnswers,
  };
};

export default useGetStudentExamAnswers;
