"use client";

import React, { useState } from "react";

export const BookCard = ({ book }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleToggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const handleOpenBook = (e) => {
    e.stopPropagation();
    if (book.book_url && book.book_url.startsWith("http")) {
      window.open(book.book_url, "_blank", "noopener,noreferrer");
    } else {
      alert("رابط الكتاب غير متاح حالياً");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <>
      <article
        className="flex flex-col w-full min-h-[420px] md:h-[426px] items-center gap-4 md:gap-6 pt-0 pb-4 md:pb-6 px-0 relative bg-white rounded-[30px] border-[3px] border-solid border-[#d7e6ff] hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden"
        role="article"
        aria-label={`${book.book_name} - كتاب`}
      >
        {/* ✅ Owned Badge */}
        <div className="absolute top-3 right-3 z-20 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          ملكك
        </div>

        {/* ✅ Image Section */}
        <div className="relative self-stretch w-full h-[200px] md:h-[222px] rounded-[27px_27px_0px_0px] overflow-hidden bg-gray-100 flex-shrink-0">
          {/* Category Badge */}
          <span
            className="absolute top-3 left-3 z-10 bg-primary-light text-primary font-bold text-xs md:text-sm px-3 py-1 rounded-full shadow whitespace-nowrap"
            style={{ direction: "rtl" }}
          >
            كتاب
          </span>

          {imageError || !book.image ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-blue-100">
              <svg
                className="w-20 h-20 text-primary opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          ) : (
            <img
              src={book.image}
              alt={book.book_name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-start justify-between gap-3 px-4 py-0 relative flex-1 self-stretch w-full grow min-h-0">
          <header className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative w-full text-text text-lg md:text-2xl text-right leading-6 line-clamp-2 font-bold">
              {book.book_name}
            </h1>

            {book.created_at && (
              <div className="flex items-center gap-1 text-xs text-text-alt">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(book.created_at)}</span>
              </div>
            )}
          </header>

          <footer className="flex flex-col gap-3 relative self-stretch w-full mt-auto">
            {/* Buttons Row */}
            <div className="flex items-center gap-2 w-full">
              {/* Open Book Button */}
              <button
                onClick={handleOpenBook}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 relative flex-1 min-w-0 rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-neutral-50"
                aria-label={`فتح ${book.book_name}`}
                type="button"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-sm text-center leading-5 whitespace-nowrap">
                  فتح الكتاب
                </span>
              </button>

              {/* Details Button */}
              <button
                onClick={handleToggleDetails}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-[10px] transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-gray-200 text-text border border-gray-200 hover:border-gray-300 flex-shrink-0"
                aria-label="عرض التفاصيل"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-center leading-5 whitespace-nowrap hidden sm:inline">
                  تفاصيل
                </span>
              </button>
            </div>
          </footer>
        </div>
      </article>

      {/* ✅ Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleToggleDetails}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-lg max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-xl font-bold text-text line-clamp-1">
                {book.book_name}
              </h2>
              <button
                onClick={handleToggleDetails}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="إغلاق"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
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
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Book Image */}
              <div className="relative w-full h-48 rounded-[15px] overflow-hidden mb-4 bg-gray-100">
                {imageError || !book.image ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-blue-100">
                    <svg
                      className="w-24 h-24 text-primary opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={book.image}
                    alt={book.book_name}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 z-10 bg-primary-light text-primary font-bold text-xs px-3 py-1 rounded-full">
                  كتاب
                </span>
              </div>

              {/* Book Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-primary-light rounded-[10px]">
                  <span className="text-text-alt font-medium">اسم الكتاب:</span>
                  <span className="text-primary font-bold text-base text-right line-clamp-1">
                    {book.book_name}
                  </span>
                </div>

                {book.created_at && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-[10px]">
                    <span className="text-text-alt font-medium">
                      تاريخ الإضافة:
                    </span>
                    <span className="text-text font-bold text-sm">
                      {formatDate(book.created_at)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-[10px]">
                  <span className="text-text-alt font-medium">الحالة:</span>
                  <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    متاح للقراءة
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-white"
                onClick={handleOpenBook}
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>فتح الكتاب</span>
              </button>

              <button
                onClick={handleToggleDetails}
                className="px-6 py-3 rounded-[10px] bg-gray-200 hover:bg-gray-300 text-text transition-colors flex-shrink-0"
                type="button"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
