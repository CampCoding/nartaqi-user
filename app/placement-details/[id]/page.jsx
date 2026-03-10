// app/exam-details/[id]/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Container from "@/components/ui/Container";
import { Clock, FileText, HelpCircle, Play } from "lucide-react";

const PlacementDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [testInfo, setTestInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/parts/getPlacementTestByCategoryPart`,
          { category_part_id: id }
        );

        if (response.data.status === "success") {
          setTestInfo(response.data.message);
        } else {
          setError("لم يتم العثور على الاختبار");
        }
      } catch (err) {
        console.error("Error fetching test info:", err);
        setError("حدث خطأ أثناء تحميل بيانات الاختبار");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTestInfo();
    }
  }, [id]);

  const handleStartTest = () => {
    if (testInfo?.id) {
      router.push(`/placement-test/${testInfo.id}`);
    }
  };

  // Calculate total questions and time
  const totalQuestions =
    testInfo?.sections?.reduce(
      (acc, section) => acc + (section.questions_count || 0),
      0
    ) || 0;

  const totalTime =
    testInfo?.sections?.reduce(
      (acc, section) => acc + parseInt(section.time_if_free || 0),
      0
    ) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري تحميل بيانات الاختبار...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Top Banner */}
            <div className="bg-primary px-8 py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                اختبار تحديد المستوى
              </h1>
              <p className="text-white/80 text-lg">
                {testInfo?.title || "اختبار تحديد المستوى"}
              </p>
            </div>

            {/* Test Info */}
            <div className="p-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Sections Count */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {testInfo?.sections_count || 0}
                  </p>
                  <p className="text-gray-500">أقسام</p>
                </div>

                {/* Questions Count */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {totalQuestions}
                  </p>
                  <p className="text-gray-500">أسئلة</p>
                </div>
              </div>

              {/* Sections List */}
              {testInfo?.sections && testInfo.sections.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    أقسام الاختبار
                  </h3>
                  <div className="space-y-3">
                    {testInfo.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between bg-gray-50 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-700">
                            {section.title || `القسم ${index + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{section.questions_count} أسئلة</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-amber-800 mb-3">
                  تعليمات هامة
                </h3>
                <ul className="space-y-2 text-amber-700">
                  <li className="flex items-center gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span>تأكد من اتصالك بالإنترنت قبل بدء الاختبار</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                    <span>سيتم حساب النتيجة تلقائياً بعد انتهاء الوقت</span>
                  </li>
                </ul>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartTest}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              >
                <Play className="w-6 h-6" />
                ابدأ الاختبار
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlacementDetails;
