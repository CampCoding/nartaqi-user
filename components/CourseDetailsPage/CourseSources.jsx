import React from "react";
import { DownloadIcon, PeopleGroup, TelegramIcon } from "../../public/svgs";
import { FileText } from "lucide-react";

const CourseSources = ({ courseData }) => {
  console.log("courseData__", courseData);
  const { roundResources, round } = courseData;
  const {
    group_links: { telegram_link, whatsapp_link },
    resource,
  } = roundResources;

  const getTelegramLink = () => {
    const resource = roundResources?.find((r) => r.telegram_link);
    return resource?.telegram_link || "https://t.me/";
  };

  const getWhatsappLink = () => {
    const resource = roundResources?.find((r) => r.whatsapp_link);
    return resource?.whatsapp_link || "https://wa.me/";
  };

  const handleDownload = (resource) => {
    if (resource.url) {
      window.open(resource.url, "_blank");
    }
  };

  return (
    <section dir="rtl" aria-label="مصادر الدورة" className="w-full !mb-6">
      {/* Header */}
      <header className="h-[56px] sm:h-[64px] flex items-center">
        <h1 className="font-bold text-primary text-xl sm:text-2xl leading-normal">
          المساعدة
        </h1>
      </header>

      {/* Quick links */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {telegram_link && (
          <a
            href={telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-5 sm:gap-7 px-5 py-4 sm:px-6 sm:py-6 bg-secondary rounded-[16px] sm:rounded-[22px] hover:opacity-90 transition-opacity no-underline"
            aria-label="قناة التيليجرام"
          >
            <TelegramIcon />
            <span className="font-bold text-white text-lg sm:text-xl leading-normal">
              قناة التيليجرام
            </span>
          </a>
        )}

        {whatsapp_link && (
          <a
            href={whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-5 sm:gap-7 px-5 py-4 sm:px-6 sm:py-6 bg-primary rounded-[16px] sm:rounded-[22px] hover:opacity-90 transition-opacity no-underline"
            aria-label="جروب الاستفسارات"
          >
            <PeopleGroup />
            <span className="font-bold text-white text-lg sm:text-xl leading-normal">
              جروب الاستفسارات
            </span>
          </a>
        )}
      </div>

      {/* Sources list */}
      <div className="mt-5 sm:mt-6 flex flex-col gap-4 sm:gap-6">
        {resource && resource.length > 0 ? (
          resource.map((resource) => (
            <div
              key={resource.id}
              className="flex items-end justify-between px-4 sm:px-5 py-4 sm:py-6 bg-white rounded-[16px] sm:rounded-[22px] border border-zinc-200"
            >
              <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                <FileText className="text-primary w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />

                <div className="flex flex-col gap-0.5 min-w-0">
                  <h2 className="font-medium text-base sm:text-lg text-zinc-800 leading-snug truncate">
                    {resource.title || "غير محدد"}
                  </h2>

                  {resource.description && (
                    <p className="text-sm sm:text-base text-text-alt leading-relaxed ">
                      {resource.description}
                    </p>
                  )}

                  {/* حجم الملف - اختياري */}
                  {/* <span className="text-xs text-text-alt">
                    {resource.file_size || "غير محدد"}
                  </span> */}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(resource)}
                disabled={!resource.url}
                className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-secondary rounded-[12px] sm:rounded-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label={`تحميل ${resource.title}`}
              >
                <DownloadIcon />
                <span className="text-white font-medium text-base sm:text-lg leading-normal">
                  تحميل
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 sm:py-12 text-text-alt text-base sm:text-lg">
            لا توجد مصادر متاحة
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSources;
