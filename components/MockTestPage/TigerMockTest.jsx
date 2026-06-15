"use client";

import React, { useState } from "react";
import { MoveRight, MoveLeft, User, Heart, Plus, Minus } from "lucide-react";
import TigerMockQuestion from "./TigerMockQuestion";
import VerbalSection from "./VerbalSection";

const TigerMockTest = ({
   user,
   examInfo,
   currentSection,
   currentBlock,
   isStarted,
   timeRemaining,
   answeredMap,
   flaggedMap,
   onAnswerSelect,
   onNext,
   onPrevious,
   onStart,
   onMarkForReview,
   isMarkedForReview,
   onSubmitSection,
   currentSectionIndex,
   currentBlockIndex,
   totalQuestions,
   onNavigateToQuestion,
   enteredSections,
}) => {
   // Font size state
   const [fontSizeIndex, setFontSizeIndex] = useState(1);
   const fontSizes = ["small", "normal", "large"];
   const fontSizeLabel = fontSizes[fontSizeIndex];

   // Image fallback state
   const [imgError, setImgError] = useState(false);

   // Mobile sidebar toggle
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

   const increaseFont = () => {
      if (fontSizeIndex < fontSizes.length - 1)
         setFontSizeIndex(fontSizeIndex + 1);
   };
   const decreaseFont = () => {
      if (fontSizeIndex > 0) setFontSizeIndex(fontSizeIndex - 1);
   };

   // كل بلوكات القسم الحالي
   const currentSectionBlocks = currentSection?.blocks || [];

   // 🟢 احسب الـ stats للقسم الحالي فقط
   const currentSectionQuestionIds = currentSectionBlocks.flatMap(
      (block) => block.questions?.map((q) => q.id) || []
   );

   const currentSectionTotal = currentSectionQuestionIds.length;

   const answeredCount = currentSectionQuestionIds.filter(
      (id) => answeredMap[id]
   ).length;

   const remainingCount = currentSectionTotal - answeredCount;

   const flaggedCount = currentSectionQuestionIds.filter(
      (id) => flaggedMap[id]
   ).length;

   // تقسيم الوقت
   const [minutes, seconds] = (timeRemaining || "00:00").split(":");

   // Image
   const imgUrl = user?.image_url || user?.image;
   const hasImg =
      imgUrl && imgUrl !== "null" && String(imgUrl).trim() !== "" && !imgError;

   return (
      <div
         className="flex flex-col h-screen bg-[#f0f2f5] overflow-hidden font-cairo"
         dir="rtl"
      >
         {/* ===== Top Header ===== */}
         <header className="h-10 sm:h-12 bg-[#0a8a8a] flex items-center justify-between px-3 sm:px-6 text-white shrink-0">
            <div className="flex items-center gap-2 sm:gap-4">
               {/* Mobile menu toggle */}
               <button
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                  className="lg:hidden p-1 hover:bg-white/10 rounded transition-all"
                  aria-label="Toggle sidebar"
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
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                     />
                  </svg>
               </button>

               <span className="text-xs sm:text-base font-bold truncate max-w-[150px] sm:max-w-none">
                  {examInfo?.title || "اختبار"}
               </span>
            </div>

            <div className="text-[10px] sm:text-sm">
               <span className="opacity-90 hidden sm:inline">
                  مجموع الأسئلة في الاختبار{" "}
               </span>
               <span className="opacity-90 sm:hidden">المجموع: </span>
               <span className="font-bold">{totalQuestions}</span>
            </div>
         </header>

         <div className="flex flex-1 overflow-hidden relative">
            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
               <div
                  className="lg:hidden fixed inset-0 bg-black/40 z-30"
                  onClick={() => setIsMobileSidebarOpen(false)}
               />
            )}

            {/* ===== Right Sidebar ===== */}
            <aside
               className={`
            ${isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"}
            lg:translate-x-0
            fixed lg:static top-0 right-0 h-full z-40 lg:z-auto
            w-64 sm:w-72 bg-[#e8f5f3] border-l border-[#cce5e0]
            flex flex-col shrink-0 overflow-y-auto
            transition-transform duration-300
            landscape:w-56 landscape:lg:w-64
          `}
            >
               {/* User Info */}
               <div className="p-3 sm:p-4 landscape:p-2 border-b border-[#cce5e0] flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 landscape:w-10 landscape:h-10 bg-white rounded-full flex items-center justify-center mb-2 border border-gray-200 shadow-sm overflow-hidden shrink-0">
                     {hasImg ? (
                        <img
                           src={imgUrl}
                           alt={user?.name || "صورة المستخدم"}
                           className="w-full h-full object-cover"
                           onError={() => setImgError(true)}
                        />
                     ) : (
                        <User
                           className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8 landscape:w-5 landscape:h-5"
                        />
                     )}
                  </div>
                  <div className="text-[10px] sm:text-xs landscape:text-[9px] text-gray-500 mb-0.5">
                     المستخدم
                  </div>
                  <div className="flex items-center gap-1 font-bold text-gray-800 text-xs sm:text-sm landscape:text-[11px] mb-1">
                     <Heart
                        size={12}
                        className="text-red-500 fill-red-500"
                     />
                     <span>{user?.name || "طالب"}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs landscape:text-[9px] text-gray-600 leading-relaxed line-clamp-2">
                     {examInfo?.title || ""}
                  </p>
               </div>

               {/* Timer */}
               <div
                  dir="ltr"
                  className="px-4 py-2 sm:py-3 landscape:py-1.5 border-b border-[#cce5e0] flex justify-center"
               >
                  <div className="flex items-center gap-1 text-lg sm:text-2xl landscape:text-base font-bold text-gray-700 font-mono">
                     <div className="bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded shadow-sm">
                        {minutes}
                     </div>
                     <span>:</span>
                     <div className="bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded shadow-sm">
                        {seconds}
                     </div>
                  </div>
               </div>

               {/* Stats (للقسم الحالي فقط) */}
               <div className="px-3 sm:px-4 py-2 sm:py-3 landscape:py-1.5 border-b border-[#cce5e0] space-y-1.5 sm:space-y-2 text-xs sm:text-sm landscape:text-[11px]">
                  <div className="flex items-center justify-between">
                     <span className="text-gray-700">الأسئلة المجابة</span>
                     <span className="bg-[#0a8a8a] text-white px-2 py-0.5 rounded font-bold min-w-[28px] text-center text-[10px] sm:text-xs">
                        {answeredCount}
                     </span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-gray-700">الأسئلة المتبقية</span>
                     <span className="bg-[#ff6b00] text-white px-2 py-0.5 rounded font-bold min-w-[28px] text-center text-[10px] sm:text-xs">
                        {remainingCount}
                     </span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-gray-700">أسئلة تمت مراجعتها</span>
                     <span className="bg-purple-500 text-white px-2 py-0.5 rounded font-bold min-w-[28px] text-center text-[10px] sm:text-xs">
                        {flaggedCount}
                     </span>
                  </div>
               </div>

               {/* Question Grid */}
               <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 landscape:py-1.5 overflow-y-auto">
                  <div className="grid grid-cols-4 sm:grid-cols-4 landscape:grid-cols-5 gap-1.5 sm:gap-2">
                     {currentSectionBlocks.map((block, idx) => {
                        const qIds = block.questions?.map((q) => q.id) || [];
                        const isAnswered =
                           qIds.length > 0 && qIds.every((id) => answeredMap[id]);
                        const isCurrent = currentBlockIndex === idx;
                        const isFlagged = qIds.some((id) => flaggedMap[id]);

                        // 🎨 Color logic:
                        // - Current: Orange
                        // - Flagged: Purple (مؤجلة)
                        // - Answered: Dark green (مجابة)
                        // - Default: Light green (غير مجابة)
                        let btnClass =
                           "bg-[#d4ebe7] border-[#a3d4cc] text-[#0a8a8a] hover:bg-[#bee0d9]";

                        if (isCurrent) {
                           btnClass =
                              "bg-[#ff6b00] border-[#ff6b00] text-white shadow-md";
                        } else if (isFlagged) {
                           btnClass = "bg-purple-500 border-purple-600 text-white";
                        } else if (isAnswered) {
                           btnClass = "bg-[#0a8a8a] border-[#0a8a8a] text-white";
                        }

                        return (
                           <button
                              key={idx}
                              onClick={() => {
                                 onNavigateToQuestion(currentSectionIndex, idx);
                                 setIsMobileSidebarOpen(false);
                              }}
                              className={`h-8 sm:h-9 landscape:h-7 rounded text-xs sm:text-sm landscape:text-[11px] font-bold border transition-all ${btnClass}`}
                           >
                              {idx + 1}
                           </button>
                        );
                     })}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 pt-3 border-t border-[#cce5e0] space-y-1.5 text-[10px] sm:text-xs landscape:text-[9px]">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#0a8a8a]" />
                        <span className="text-gray-600">مجابة</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#d4ebe7] border border-[#a3d4cc]" />
                        <span className="text-gray-600">غير مجابة</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-purple-500" />
                        <span className="text-gray-600">مؤجلة للمراجعة</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#ff6b00]" />
                        <span className="text-gray-600">السؤال الحالي</span>
                     </div>
                  </div>
               </div>

               {/* Submit Section Button */}
               <div className="p-2 sm:p-3 landscape:p-2 border-t border-[#cce5e0]">
                  <button
                     onClick={onSubmitSection}
                     className="w-full py-2 sm:py-2.5 landscape:py-1.5 bg-[#ff6b00] text-white rounded font-bold text-xs sm:text-sm landscape:text-[11px] hover:bg-[#e66000] transition-all"
                  >
                     إنهاء القسم
                  </button>
               </div>
            </aside>

            {/* ===== Main Content Area ===== */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
               {/* ===== Top Bar (مجموع الأسئلة في القسم) ===== */}
               <div className="h-8 sm:h-10 landscape:h-7 bg-[#f5fafa] border-b border-gray-200 flex items-center justify-start px-3 sm:px-6 shrink-0">
                  <div className="flex items-center gap-3 text-[11px] sm:text-sm landscape:text-[10px]">
                     <span className="text-gray-700">
                        مجموع الأسئلة في القسم{" "}
                        <span className="font-bold text-[#0a8a8a]">
                           {currentSectionTotal}
                        </span>
                     </span>
                  </div>
               </div>

               {/* ===== Second Bar (Font Size Controls + Question Number) ===== */}
               <div className="h-10 sm:h-12 landscape:h-9 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-6 shrink-0 gap-2">
                  <span className="text-[11px] sm:text-sm landscape:text-[10px] text-gray-700 whitespace-nowrap">
                     السؤال رقم{" "}
                     <span className="font-bold text-[#0a8a8a]">
                        {currentBlockIndex + 1}
                     </span>
                  </span>

                  <div className="flex items-center gap-1 sm:gap-2">
                     <button
                        onClick={decreaseFont}
                        disabled={fontSizeIndex === 0}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-[#0a8a8a]/30 bg-[#e8f5f3] text-[#0a8a8a] rounded hover:bg-[#d4ebe7] transition-all disabled:opacity-40"
                        title="تصغير الخط"
                     >
                        <Minus size={12} />
                     </button>

                     <div className="flex items-center gap-1">
                        {[0, 1, 2].map((idx) => (
                           <button
                              key={idx}
                              onClick={() => setFontSizeIndex(idx)}
                              className={`w-7 h-6 sm:w-8 sm:h-7 flex items-center justify-center border rounded font-bold transition-all ${idx === 0
                                    ? "text-[10px] sm:text-xs"
                                    : idx === 1
                                       ? "text-xs sm:text-sm"
                                       : "text-sm sm:text-base"
                                 } ${fontSizeIndex === idx
                                    ? "bg-[#0a8a8a] text-white border-[#0a8a8a]"
                                    : "bg-[#e8f5f3] text-[#0a8a8a] border-[#0a8a8a]/30 hover:bg-[#d4ebe7]"
                                 }`}
                           >
                              A
                           </button>
                        ))}
                     </div>

                     <button
                        onClick={increaseFont}
                        disabled={fontSizeIndex === fontSizes.length - 1}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-[#0a8a8a]/30 bg-[#e8f5f3] text-[#0a8a8a] rounded hover:bg-[#d4ebe7] transition-all disabled:opacity-40"
                        title="تكبير الخط"
                     >
                        <Plus size={12} />
                     </button>
                  </div>
               </div>

               {/* Scrollable Content */}
               <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-10 landscape:p-2 landscape:md:p-4 bg-white">
                  <div className="w-full mx-auto">
                     {!isStarted ||
                        !currentBlock ||
                        !enteredSections.has(currentSectionIndex) ? (
                        <div className="bg-white rounded-2xl p-4 sm:p-8 border border-gray-200">
                           <VerbalSection
                              sectionTitle={currentSection?.title}
                              sectionDescription={currentSection?.description}
                           />
                           <div className="mt-6 sm:mt-8 flex justify-center">
                              <button
                                 onClick={onStart}
                                 className="px-6 sm:px-10 py-2.5 sm:py-3 bg-[#0a8a8a] text-white rounded-lg font-bold text-sm sm:text-base hover:bg-[#087070] transition-all"
                              >
                                 بدء القسم الآن
                              </button>
                           </div>
                        </div>
                     ) : (
                        <TigerMockQuestion
                           currentSection={currentSection}
                           block={currentBlock}
                           questionNumberStart={currentBlockIndex + 1}
                           answers={answeredMap}
                           onAnswerSelect={onAnswerSelect}
                           fontSize={fontSizeLabel}
                        />
                     )}
                  </div>
               </div>

               {/* Bottom Footer */}
               <footer className="bg-white border-t border-gray-200 shrink-0">
                  <div className="flex flex-col landscape:flex-row sm:flex-row items-stretch sm:items-center justify-between px-3 sm:px-6 py-2 sm:py-3 landscape:py-1.5 gap-2 sm:gap-3">
                     {/* Previous */}
                     <button
                        onClick={onPrevious}
                        disabled={currentBlockIndex === 0}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 landscape:py-1.5 bg-gray-100 text-gray-600 rounded font-bold text-xs sm:text-sm landscape:text-[11px] disabled:opacity-40 hover:bg-gray-200 transition-all order-2 sm:order-1"
                     >
                        <MoveRight size={14} />
                        <span>السؤال السابق</span>
                     </button>

                     {/* Mark for review */}
                     <div className="flex items-center justify-center order-1 sm:order-2">
                        <button
                           onClick={onMarkForReview}
                           className={`flex items-center gap-2 px-3 sm:px-4 py-2 landscape:py-1.5 rounded border-2 transition-all text-xs sm:text-sm landscape:text-[11px] font-medium ${isMarkedForReview
                                 ? "bg-purple-50 border-purple-500 text-purple-700"
                                 : "bg-white border-gray-300 text-gray-600 hover:border-purple-400"
                              }`}
                        >
                           <div
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border-2 flex items-center justify-center transition-all ${isMarkedForReview
                                    ? "bg-purple-500 border-purple-500"
                                    : "border-gray-400 bg-white"
                                 }`}
                           >
                              {isMarkedForReview && (
                                 <svg
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M5 13l4 4L19 7"
                                    />
                                 </svg>
                              )}
                           </div>
                           <span className="whitespace-nowrap">
                              ضع مؤشر كعلامة مرجعية
                           </span>
                        </button>
                     </div>

                     {/* Next */}
                     <button
                        onClick={onNext}
                        className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-2 landscape:py-1.5 bg-[#0a8a8a] text-white rounded font-bold text-xs sm:text-sm landscape:text-[11px] hover:bg-[#087070] transition-all order-3"
                     >
                        <span>حفظ والتالي</span>
                        <MoveLeft size={14} />
                     </button>
                  </div>
               </footer>
            </main>
         </div>

         {/* ===== Bottom Brand Bar ===== */}
         <div className="h-6 sm:h-8 landscape:h-5 bg-[#0a8a8a] flex items-center justify-start px-3 sm:px-6 text-white text-[10px] sm:text-xs landscape:text-[9px] shrink-0 border-t border-[#087070]">
            <span className="opacity-90">منصة نرتقي</span>
         </div>
      </div>
   );
};

export default TigerMockTest;