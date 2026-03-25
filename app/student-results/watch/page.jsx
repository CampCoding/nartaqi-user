"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import PagesBanner from "../../../components/ui/PagesBanner";
import Container from "../../../components/ui/Container";
import VideoPlayer from "../../../components/ui/Video";
import LoadingPage from "../../../components/shared/Loading";

function WatchContent() {
  const searchParams = useSearchParams();

  const vimeoId = searchParams.get("vimeo_id") || "";
  const youtubeId = searchParams.get("youtube_id") || "";
  const title = searchParams.get("title") || "توثيق درجة الطالب";

  const hasVideo = vimeoId || youtubeId;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* ✅ Banner */}
      <PagesBanner
        variant="normal"
        title={title}
        objectPosition="object-[50%_50%]"
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "درجات الطلاب", link: -1 },
          { title: title },
        ]}
        image="/images/students-results.png"
      />

      <Container className="py-8 md:py-12">
        {/* ✅ زر الرجوع */}
        <button
          onClick={() => window.history.go(-1)}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6 group"
        >
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">العودة لدرجات الطلاب</span>
        </button>

        {hasVideo ? (
          <div className="flex flex-col gap-8">
            {/* ===================== */}
            {/* ✅ Video Card         */}
            {/* ===================== */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
              {/* Title Section */}
              <div className="p-5 md:p-8 border-b border-neutral-100">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text text-center leading-relaxed">
                  {title}
                </h1>
                <div className="flex justify-center mt-3">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    توثيق الدرجة بالفيديو
                  </span>
                </div>
              </div>

              {/* ✅ Video Player */}
              <div className="p-4 md:p-6 lg:p-8">
                <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                  <VideoPlayer
                    vimeo_id={vimeoId}
                    youtube_id={youtubeId}
                    defaultPlay={false}
                    rootClassName="rounded-xl md:rounded-2xl overflow-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No Video State */
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-16 text-center">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg text-neutral-500 font-medium">
              لم يتم تحديد فيديو للمشاهدة
            </p>
            <button
              onClick={() => window.history.go(-1)}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              <span>العودة لدرجات الطلاب</span>
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

// ✅ Wrap with Suspense for useSearchParams
export default function StudentResultWatchPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <WatchContent />
    </Suspense>
  );
}
