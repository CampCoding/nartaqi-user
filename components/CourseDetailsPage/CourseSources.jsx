import React from "react";
import { DownloadIcon, PeopleGroup, TelegramIcon } from "../../public/svgs";
import { FileText } from "lucide-react";

const CourseSources = () => {
  const sources = [
    { title: "دليل المتدربين", button: "تحميل" },
    { title: "حاسب معدل الإنجاز", button: "تحميل" },
    { title: "دليل الأقسام الأساسية", button: "تحميل" },
    { title: "أوراق العمل", button: "تحميل" },
    { title: "المجموعات", button: "تحميل" },
    { title: "ملف الملاحظات", button: "تحميل" },
    { title: "مراجع إضافية", button: "تحميل" },
  ];

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
          href="https://t.me/"
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
          href="https://t.me/"
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
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3.5 sm:px-4 py-3.5 sm:py-5 bg-white rounded-[14px] sm:rounded-[18px] border border-zinc-200"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <FileText className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="font-medium text-sm sm:text-base text-zinc-800 leading-normal">
                {source.title}
              </h2>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-secondary rounded-[10px] sm:rounded-[12px] hover:opacity-90 transition-opacity"
              aria-label={`تحميل ${source.title}`}
            >
              <DownloadIcon />
              <span className="text-white font-medium text-sm sm:text-base leading-normal">
                {source.button}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSources;
