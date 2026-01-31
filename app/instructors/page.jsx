
"use client"

import React, { useMemo } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import Container from "../../components/ui/Container";
import { LecturerCard } from "../../components/ui/Cards/LicturerCard";
import useGetAllTeacherRounds from "../../components/shared/Hooks/useGetAllTeacher";

const Instructors = () => {

  const headers = useMemo(() => ({ Accept: "application/json" }), []);


  const { teachers, loading, error, refetch } = useGetAllTeacherRounds({
    enabled: true,
     headers,
  });

  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"المدربون"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "المدربون", link: "#" },
        ]}
        image={"/images/trainers.png"}
      />

      <Container className="gap-y-[32px] mt-[48px] mb-[100px]">
        <h2 className="mb-8 text-center font-bold text-secondary text-3xl leading-tight md:mb-12 md:text-[40px] md:leading-normal [direction:rtl]">
          المدربون
        </h2>

        {/* حالات التحميل/الخطأ */}
        {loading ? (
          <div className="py-10 text-center text-gray-600">جارِ تحميل المدربين...</div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-[27px]">
            {teachers?.map((lecturer) => (
              <LecturerCard key={lecturer.id} lecturer={lecturer} />
            ))}
          </div>
        )}

        {/* لو مفيش بيانات */}
        {!loading && !error && teachers?.length === 0 ? (
          <div className="py-10 text-center text-gray-600">
            لا يوجد مدربون حالياً.
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default Instructors;
