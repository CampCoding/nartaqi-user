"use client";

import React, { useMemo, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { CheckIcon } from "../../public/svgs";
import Container from "../../components/ui/Container";
import { useSupportGate } from "../../components/shared/Hooks/useSupportGate";
import { detectVideoType } from "../../lib/parseVideoLink";
import { useDispatch } from "react-redux";
import { openVideoModal } from "../../components/utils/Store/Slices/videoModalSlice";



const fallbackImages = [
  "/images/support_1.png",
  "/images/support-2.png",
  "/images/support-3.png",
];

function toYoutubeEmbed(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      // youtube.com/embed/VIDEO_ID
      if (u.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${u.pathname}`;
      }
    }

    // لو اللينك أصلاً embed أو أي لينك تاني—نحاول نرجعه زي ما هو
    return url;
  } catch {
    return url;
  }
}

const VideoModal = ({ open, onClose, title, youtubeUrl }) => {
  if (!open) return null;

  const embedUrl = toYoutubeEmbed(youtubeUrl);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "تشغيل الفيديو"}
    >
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="إغلاق"
        type="button"
      />

      {/* modal */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b p-4">
          <h3 className="text-base md:text-lg font-bold text-secondary">
            {title || "فيديو الدعم"}
          </h3>

          <button
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            onClick={onClose}
            type="button"
          >
            إغلاق
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title={title || "Support Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              لا يوجد رابط فيديو صالح
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SupportGate = () => {
  const { items, loading, error, page, setPage, next, prev, pagination } =
    useSupportGate({ initialPage: 1 });

  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); // { title, youtube_link }

  const supportData = useMemo(() => {
    // API returns: items => [{id,title,youtube_link,description}]
    return (items || []).map((x, idx) => ({
      id: x.id,
      title: x.title,
      description: x.description || "—",
      youtube_link: x.youtube_link,
      image: fallbackImages[idx % fallbackImages.length], // ✅ صور محلية بديلة
      buttonAria: `تشغيل الفيديو التعليمي: ${x.title || "فيديو الدعم"}`,
    }));
  }, [items]);

  const dispatch = useDispatch()

  const onPlay = (item) => {

    console.log(item.youtube_link)

    dispatch(
      openVideoModal({
        title: (item.title || "").trim(),
        vimeoId:  "",
        youtubeId: item.youtube_link ?? "",
        autoplay: true,
      })
    );
  };

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
        {/* حالة التحميل/الخطأ */}
        {loading ? (
          <div className="rounded-2xl border bg-white p-6 text-center">
            جاري تحميل بوابة الدعم...
          </div>
        ) : error ? (
          <div className="rounded-2xl border bg-white p-6 text-center">
            <p className="text-red-600">حدث خطأ: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:gap-[32px]">
              {supportData.map((item) => (
                <SupportSection
                  key={item.id}
                  data={{
                    ...item,
                    onPlay: () => onPlay(item),
                  }}
                />
              ))}
            </div>

            {/* Pagination (لو فيه صفحات) */}
            {pagination?.lastPage > 1 ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={prev}
                  disabled={page === 1}
                  className="rounded-xl border px-4 py-2 disabled:opacity-50"
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
                  className="rounded-xl border px-4 py-2 disabled:opacity-50"
                  type="button"
                >
                  التالي
                </button>
              </div>
            ) : null}

            <GuideLines />
          </>
        )}
      </Container>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={activeVideo?.title}
        youtubeUrl={activeVideo?.youtube_link}
      />
    </div>
  );
};

export default SupportGate;

export const SupportSection = ({ data }) => {
  return (
    <article className="flex flex-col items-start gap-4 rounded-[30px] border-[3px] border-solid bg-white p-4 md:gap-6 md:p-6 md:pb-8">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-2 self-stretch md:gap-3">
        <h1 className="self-stretch font-bold leading-tight tracking-[0] text-secondary text-xl md:text-[32px] md:leading-[normal]">
          {data.title}
        </h1>
        <p className="self-stretch text-sm md:text-base leading-[normal] text-text">
          {data.description}
        </p>
      </header>

      {/* Main (image + button) */}
      <main className="w-full self-stretch">
        <div
          className="flex h-[240px] w-full items-center justify-center self-stretch rounded-3xl bg-cover bg-center md:h-[582px] md:rounded-[50px]"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <button
            className="flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-solid border-white bg-secondary transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-orange-300 md:h-[124px] md:w-[124px] md:border-8"
            aria-label={data.buttonAria || "تشغيل الفيديو"}
            type="button"
            onClick={data.onPlay}
            disabled={!data.youtube_link} // ✅ لو مفيش فيديو
          >
            <div className="relative h-7 w-7 md:h-12 md:w-12">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </main>
    </article>
  );
};

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
            <div className="relative w-6 h-6 flex-shrink-0" role="img" aria-label="تم">
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
