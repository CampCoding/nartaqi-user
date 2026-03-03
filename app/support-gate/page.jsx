"use client";

import React, { useMemo, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { CheckIcon } from "../../public/svgs";
import Container from "../../components/ui/Container";
import { useSupportGate } from "../../components/shared/Hooks/useSupportGate";

// استخراج YouTube Video ID من أي رابط
function extractYoutubeId(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "").split("?")[0];
    }

    // youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;

      // youtube.com/embed/VIDEO_ID
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.replace("/embed/", "").split("?")[0];
      }

      // youtube.com/v/VIDEO_ID
      if (u.pathname.startsWith("/v/")) {
        return u.pathname.replace("/v/", "").split("?")[0];
      }
    }

    return null;
  } catch {
    return null;
  }
}

// الحصول على رابط الـ Thumbnail من YouTube
function getYoutubeThumbnail(url, quality = "maxresdefault") {
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  // quality options: maxresdefault, hqdefault, mqdefault, sddefault, default
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// الحصول على رابط Embed
function getYoutubeEmbedUrl(url, autoplay = true) {
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const SupportGate = () => {
  const { items, loading, error, page, setPage, next, prev, pagination } =
    useSupportGate({ initialPage: 1 });

  const supportData = useMemo(() => {
    return (items || []).map((x) => ({
      id: x.id,
      title: x.title,
      description: x.description || "—",
      youtube_link: x.youtube_link,
      thumbnail: getYoutubeThumbnail(x.youtube_link, "maxresdefault"),
      thumbnailFallback: getYoutubeThumbnail(x.youtube_link, "hqdefault"),
      embedUrl: getYoutubeEmbedUrl(x.youtube_link, true),
      hasVideo: !!extractYoutubeId(x.youtube_link),
    }));
  }, [items]);

  return (
    <div>
      <PagesBanner
        title="بوابة الدعم"
        variant="normal"
        image={"/images/Frame 1000005153.png"}
        objectPosition={"100%_100%"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "بوابة الدعم", link: "/" },
        ]}
      />

      <Container className="space-y-[64px] mt-[48px] mb-[74px]">
        {loading ? (
          <div className="rounded-2xl border bg-white p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-mainColor border-t-transparent rounded-full animate-spin" />
              <span>جاري تحميل بوابة الدعم...</span>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border bg-white p-6 text-center">
            <p className="text-red-600">حدث خطأ: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:gap-[32px]">
              {supportData.map((item) => (
                <SupportSection key={item.id} data={item} />
              ))}
            </div>

            {/* Pagination */}
            {pagination?.lastPage > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={prev}
                  disabled={page === 1}
                  className="rounded-xl border px-4 py-2 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  السابق
                </button>

                <div className="text-sm text-text">
                  صفحة {pagination.currentPage} من {pagination.lastPage}
                </div>

                <button
                  onClick={next}
                  disabled={page === pagination.lastPage}
                  className="rounded-xl border px-4 py-2 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  التالي
                </button>
              </div>
            )}

            <GuideLines />
          </>
        )}
      </Container>
    </div>
  );
};

export default SupportGate;

// =====================================================
// SupportSection Component - الفيديو يفتح في مكانه
// =====================================================
export const SupportSection = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const handlePlay = () => {
    if (data.hasVideo) {
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  // الصورة المعروضة (thumbnail من YouTube أو fallback)
  const displayImage = thumbnailError
    ? data.thumbnailFallback || "/images/support_1.png"
    : data.thumbnail || "/images/support_1.png";

  return (
    <article className="flex flex-col items-start gap-4 rounded-[30px] border-[3px] border-solid bg-white p-4 md:gap-6 md:p-6 md:pb-8 overflow-hidden">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-2 self-stretch md:gap-3">
        <h1 className="self-stretch font-bold leading-tight tracking-[0] text-secondary text-xl md:text-[32px] md:leading-[normal]">
          {data.title}
        </h1>
        <p className="self-stretch text-sm md:text-base leading-[normal] text-text">
          {data.description}
        </p>
      </header>

      {/* Main - Video/Thumbnail Container */}
      <main className="w-full self-stretch">
        <div className="relative w-full overflow-hidden bg-black">
          {/* Aspect Ratio Container */}
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            {isPlaying && data.embedUrl ? (
              /* ===== حالة التشغيل - iframe ===== */
              <>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={data.embedUrl}
                  title={data.title || "Support Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                />

                {/* زر الإغلاق */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  type="button"
                  aria-label="إغلاق الفيديو"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            ) : (
              /* ===== حالة الصورة - Thumbnail ===== */
              <>
                {/* Thumbnail Image */}
                <img
                  src={displayImage}
                  alt={data.title || "Video thumbnail"}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setThumbnailError(true)}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Play Button */}
                {data.hasVideo ? (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center group"
                    type="button"
                    aria-label={`تشغيل الفيديو: ${data.title}`}
                  >
                    {/* Play Button Circle */}
                    <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-[100px] md:w-[100px] lg:h-[124px] lg:w-[124px] items-center justify-center rounded-full border-4 md:border-[6px] lg:border-8 border-white bg-secondary shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/90 group-active:scale-95">
                      {/* Play Icon */}
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10 lg:h-12 lg:w-12 ml-1"
                      >
                        <path
                          d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                          fill="white"
                        />
                      </svg>

                      {/* Pulse Animation */}
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                    </div>

                    {/* Hover Text */}
                    <span className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs md:text-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap backdrop-blur-sm">
                      اضغط للتشغيل
                    </span>
                  </button>
                ) : (
                  /* No Video Available */
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-center p-4">
                      <svg
                        className="w-12 h-12 mx-auto mb-2 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm opacity-75">لا يوجد فيديو متاح</p>
                    </div>
                  </div>
                )}

                {/* Duration Badge (optional - يمكن إضافته لاحقاً) */}
                {data.hasVideo && (
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>فيديو</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </article>
  );
};

// =====================================================
// GuideLines Component
// =====================================================
export const GuideLines = () => {
  const guidelines = [
    { text: "تأكد من وجود اتصال إنترنت مستقر قبل الانضمام إلى أي جلسة" },
    { text: "استخدم بيئة هادئة ومضاءة جيدا لتحسين تجربة التعلم." },
    { text: "توجه إلى الجلسات المباشرة قبل 5 دقائق للتحقق من إعدادك" },
    { text: "احتفظ بميكروفونك مكتوما عند عدم التحدث" },
    { text: "استخدم سماعات الرأس لمنع ردود الفعل الصوتية" },
    { text: "شارك بنشاط في المناقشات عندما يطلب منك" },
    { text: "أكمل جميع المواد التمهيدية المعينة" },
    { text: "قم بتدوين الملاحظات خلال الجلسات لتحسين الاحتفاظ بالمعلومات." },
  ];

  return (
    <article className="flex flex-col items-start gap-6 pt-6 pb-12 px-0 relative bg-white rounded-[30px] border-2 border-solid">
      <header className="flex-col items-start gap-3 p-6 self-stretch w-full flex relative">
        <div className="flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto] flex relative">
          <h1 className="self-stretch mt-[-1.00px] font-bold text-[#2d2d2d] text-2xl tracking-[-0.60px] leading-6 relative">
            إرشادات لاستخدام الصف الافتراضي
          </h1>
          <p className="self-stretch text-text-alt text-base leading-5 relative">
            القواعد الهامة وأفضل الممارسات
          </p>
        </div>
      </header>

      <main className="flex-col items-start gap-4 px-6 py-0 self-stretch w-full flex-[0_0_auto] flex relative">
        {guidelines.map((guideline, index) => (
          <div
            key={index}
            className="w-full md:w-[550px] items-start justify-start gap-3 flex-[0_0_auto] flex relative"
          >
            <div
              className="relative w-6 h-6 flex-shrink-0"
              role="img"
              aria-label="تم"
            >
              <div className="relative w-[21px] h-[21px] top-px left-px">
                <div className="relative h-[21px]">
                  <CheckIcon />
                </div>
              </div>
            </div>

            <div className="flex-1 items-center justify-start relative">
              <p className="w-full text-[#2d2d2d] text-sm text-right leading-5 break-words md:whitespace-nowrap relative">
                {guideline.text}
              </p>
            </div>
          </div>
        ))}
      </main>
    </article>
  );
};
