import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/getStudentAnswersByExamId`; // عدّل لو عندك baseURL

const useGetStudentExamAnswers = ({ studentId, examId }) => {
  const [data, setData] = useState(null); // message
  const [sections, setSections] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

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

      const message = res?.data?.message;

      setData(message);
      setSections(message?.sections || []);
      setIsSolved(message?.is_solved ?? false);
    } catch (err) {
      console.error("getStudentAnswers error:", err);
      setError(
        err?.response?.data?.message || "حدث خطأ أثناء جلب إجابات الامتحان"
      );
    } finally {
      setLoading(false);
    }
  }, [studentId, examId]);

  // auto fetch
  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return {
    data, // full message
    sections, // sections مباشرة
    isSolved, // هل الامتحان محلول
    loading,
    error,
    refetch: fetchAnswers,
  };
};

export default useGetStudentExamAnswers;
