import React from "react";
import { DownloadIcon, PeopleGroup, TelegramIcon } from "../../public/svgs";
import { FileText } from "lucide-react";

const CourseSources = ({ courseData }) => {
  const { roundResources, round } = courseData;

  // استخراج أول telegram و whatsapp link من الـ resources
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
    <section dir="rtl" aria-label="مصادر الدورة" className="w-full !mb-5">
      {/* Header */}
      <header className="h-[48px] sm:h-[56px] flex items-center">
        <h1 className="font-bold text-primary text-lg sm:text-xl leading-normal">
          المساعدة
        </h1>
      </header>

      {/* Quick links */}
      <div className="flex flex-col gap-3.5 sm:gap-5">
        <a
          href={getTelegramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 sm:gap-6 px-4 py-3.5 sm:px-5 sm:py-5 bg-secondary rounded-[14px] sm:rounded-[18px] hover:opacity-90 transition-opacity no-underline"
          aria-label="قناة التيليجرام"
        >
          <TelegramIcon />
          <span className="font-bold text-white text-base sm:text-lg leading-normal">
            قناة التيليجرام
          </span>
        </a>

        <a
          href={getWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 sm:gap-6 px-4 py-3.5 sm:px-5 sm:py-5 bg-primary rounded-[14px] sm:rounded-[18px] hover:opacity-90 transition-opacity no-underline"
          aria-label="جروب الاستفسارات"
        >
          <PeopleGroup />
          <span className="font-bold text-white text-base sm:text-lg leading-normal">
            جروب الاستفسارات
          </span>
        </a>
      </div>

      {/* Sources list */}
      <div className="mt-4 sm:mt-5 flex flex-col gap-3.5 sm:gap-5">
        {roundResources && roundResources.length > 0 ? (
          roundResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between px-3.5 sm:px-4 py-3.5 sm:py-5 bg-white rounded-[14px] sm:rounded-[18px] border border-zinc-200"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <FileText className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                <div className="flex flex-col">
                  <h2 className="font-medium text-sm sm:text-base text-zinc-800 leading-normal">
                    {resource.title || "غير محدد"}
                  </h2>
                  {resource.description && (
                    <p className="text-xs text-text-alt">
                      {resource.description}
                    </p>
                  )}
                  {/* عرض حجم الملف - غير محدد */}
                  {/* <span className="text-xs text-text-alt">
                    {resource.file_size || "غير محدد"}
                  </span> */}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(resource)}
                disabled={!resource.url}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-secondary rounded-[10px] sm:rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`تحميل ${resource.title}`}
              >
                <DownloadIcon />
                <span className="text-white font-medium text-sm sm:text-base leading-normal">
                  تحميل
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-text-alt">
            لا توجد مصادر متاحة
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSources;
