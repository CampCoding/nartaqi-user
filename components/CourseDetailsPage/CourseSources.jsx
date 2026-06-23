import React from "react";
import { DownloadIcon, PeopleGroup, TelegramIcon } from "../../public/svgs";
import { FileText } from "lucide-react";

const CourseSources = ({ courseData }) => {
  const { roundResources, round } = courseData;
  const {
    group_links: { telegram_link, whatsapp_link },
    resource,
  } = roundResources;

  const handleDownload = (resource) => {
    if (resource.url) {
      window.open(resource.url, "_blank");
    }
  };

  return (
    <section dir="rtl" aria-label="مصادر الدورة" className="w-full !mb-6">
      {/* Header */}
      <header className="h-[48px] sm:h-[56px] md:h-[64px] flex items-center">
        <h1 className="font-bold text-primary text-lg sm:text-xl md:text-2xl leading-normal">
          المساعدة
        </h1>
      </header>

      {/* Quick links */}
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
        {telegram_link && (
          <a
            href={telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-6 bg-secondary rounded-[12px] sm:rounded-[16px] md:rounded-[22px] hover:opacity-90 transition-opacity no-underline"
            aria-label="قناة التيليجرام"
          >
            <TelegramIcon />
            <span className="font-bold text-white text-base sm:text-lg md:text-xl leading-normal">
              قناة التيليجرام
            </span>
          </a>
        )}

        {whatsapp_link && (
          <a
            href={whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-6 bg-primary rounded-[12px] sm:rounded-[16px] md:rounded-[22px] hover:opacity-90 transition-opacity no-underline"
            aria-label="جروب الاستفسارات"
          >
            <PeopleGroup />
            <span className="font-bold text-white text-base sm:text-lg md:text-xl leading-normal">
              جروب الاستفسارات
            </span>
          </a>
        )}
      </div>

      {/* Sources list */}
      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col gap-3 sm:gap-4 md:gap-6">
        {resource && resource.length > 0 ? (
          resource.map((resource) => (
            <div
              key={resource.id}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-6 bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[22px] border border-zinc-200"
            >
              <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 min-w-0 flex-1">
                <FileText className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" />

                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <h2 className="font-medium text-sm sm:text-base md:text-lg text-zinc-800 leading-snug truncate">
                    {resource.title || "غير محدد"}
                  </h2>

                  {resource.description && (
                    <p className="text-xs sm:text-sm md:text-base text-text-alt leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(resource)}
                disabled={!resource.url}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-secondary rounded-[10px] sm:rounded-[12px] md:rounded-[14px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 self-end sm:self-auto"
                aria-label={`تحميل ${resource.title}`}
              >
                <DownloadIcon />
                <span className="text-white font-medium text-sm sm:text-base md:text-lg leading-normal">
                  تحميل
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 sm:py-10 md:py-12 text-text-alt text-sm sm:text-base md:text-lg">
            لا توجد مصادر متاحة
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSources;