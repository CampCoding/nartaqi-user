"use client";

import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";

import PagesBanner from "../../../components/ui/PagesBanner";
import { StudentResultCard } from "../../../components/ui/Cards/StudentResultCard";
import Container from "../../../components/ui/Container";

import useGetStudentAchievementResults from "../../../components/shared/Hooks/useGetStudentAchievementResults";

const StudentsResults = () => {
  const {id : categoryPartId} = useParams()
  // ✅ expected url: /students-results?category_part_id=48


  const { results, categoryPart, loading, error, refetch } =
    useGetStudentAchievementResults(categoryPartId, {
      enabled: !!categoryPartId,
    });

  const bannerTitle = useMemo(() => {
    return categoryPart?.name || "درجات الطلاب بالقدرات";
  }, [categoryPart?.name]);

  if (!categoryPartId) {
    return (
      <div>
        <PagesBanner
          variant="normal"
          title={"درجات الطلاب بالقدرات"}
          breadcrumb={[
            { title: "الرئيسية", link: "/" },
            { title: "درجات الطلاب", link: "#" },
          ]}
          image={"/images/students-results.png"}
        />

        <Container className="my-[32px]">
          <div className="py-16 text-center text-neutral-600">
            من فضلك افتح الصفحة مع باراميتر{" "}
            <span className="font-bold">category_part_id</span> لعرض النتائج.
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PagesBanner
        variant="normal"
        title={bannerTitle}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "درجات الطلاب", link: "#" },
        ]}
        image={"/images/students-results.png"}
      />

      <Container className="mt-[32px] mb-[100px]">
        {/* header info */}
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm text-neutral-500">
              القسم:{" "}
              <span className="font-semibold text-text">
                {categoryPart?.name || categoryPartId}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              إجمالي النتائج:{" "}
              <span className="font-semibold text-text">{results.length}</span>
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl border border-neutral-200 hover:border-neutral-300 text-sm"
          >
            تحديث النتائج
          </button>
        </div>

        {/* states */}
        {loading ? (
          <div className="py-14 text-center text-neutral-600">
            جاري تحميل النتائج...
          </div>
        ) : error ? (
          <div className="py-14 text-center">
            <div className="text-red-600 font-semibold mb-2">
              حدث خطأ أثناء تحميل النتائج
            </div>
            <div className="text-sm text-neutral-600">
              {String(error?.message || error)}
            </div>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-sm"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="py-14 text-center text-neutral-600">
            لا توجد نتائج لعرضها لهذا القسم.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
            {results.map((item) => (
              <StudentResultCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default StudentsResults;
