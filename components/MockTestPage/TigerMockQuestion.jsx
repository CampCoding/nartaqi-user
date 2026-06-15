"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FileText, Play, Pause, Volume2, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const TigerMockQuestion = ({
  block,
  questionNumberStart = 1,
  answers,
  onAnswerSelect,
  fontSize = "normal",
  currentSection,
}) => {
  // ✨ Image Modal State
  const [modalImage, setModalImage] = useState(null);

  // ✨ Hook to attach click on all images inside richtext
  const richTextRef = useRef(null);

  if (!block) {
    return (
      <div className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-slate-400">
        جاري تحميل السؤال...
      </div>
    );
  }

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: `text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm`,
      normal: `text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base`,
      large: `text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg`,
      xlarge: `text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl`,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  const currentQuestion =
    block.questions && block.questions.length > 0 ? block.questions[0] : null;

  const isParagraphType = block.type === "paragraph";
  const hasPassage = block.passage && block.passage.trim() !== "";
  const hasVoice = block.voice && block.voice.trim() !== "";

  return (
    <>
      <div className="w-full tiger-richtext-wrapper">
        {/* Paragraph Content and/or Voice */}
        {isParagraphType && (hasPassage || hasVoice) && (
          <div
            className={`
              mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6
              landscape:mb-1.5 landscape:sm:mb-2 landscape:md:mb-2.5 landscape:lg:mb-3
              sticky top-0 bg-[#f5fafa] z-10 
              pb-2 sm:pb-3 md:pb-4 lg:pb-5 xl:pb-6
              pt-2 sm:pt-3 md:pt-4 
              border-b border-[#cce5e0] shadow-sm rounded-2xl px-4 sm:px-5 mb-5
            `}
          >
            <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base landscape:text-[8px] landscape:sm:text-[9px] landscape:md:text-[10px] landscape:lg:text-xs font-bold text-[#0a8a8a] flex items-center gap-2">
              <FileText size={16} className="text-[#0a8a8a]" />
              <span>{hasVoice && !hasPassage ? "استمع للفقرة:" : "الفقرة:"}</span>
            </div>

            {hasVoice && <AudioPlayer src={block.voice} fontSize={fontSize} />}

            {hasPassage && (
              <RichTextWithImages
                html={block.passage.replaceAll(/&nbsp;/gi, " ")}
                onImageClick={(src) => setModalImage(src)}
                className={`
                  w-full font-medium text-slate-700 ${textSizeClass} richtext
                  tracking-[0] [direction:rtl] block
                  leading-relaxed sm:leading-loose md:leading-loose lg:leading-loose
                  landscape:leading-normal landscape:sm:leading-relaxed landscape:md:leading-relaxed
                  max-h-[120px] sm:max-h-[150px] md:max-h-[200px] lg:max-h-[280px] xl:max-h-[350px]
                  landscape:max-h-[80px] landscape:sm:max-h-[100px] landscape:md:max-h-[130px] landscape:lg:max-h-[180px]
                  overflow-y-auto pr-2 sm:pr-3 custom-scroll
                  ${hasVoice ? "mt-3 sm:mt-4" : ""}
                `}
              />
            )}
          </div>
        )}

        {/* Question */}
        {currentQuestion ? (
          <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 landscape:mt-1.5 landscape:sm:mt-2 landscape:md:mt-2.5 landscape:lg:mt-3 w-full">
            <SingleQuestion
              key={currentQuestion.id}
              questionData={currentQuestion}
              questionNumber={questionNumberStart}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerSelect={(optionId) =>
                onAnswerSelect(currentQuestion.id, optionId)
              }
              fontSize={fontSize}
              onImageClick={(src) => setModalImage(src)}
            />
          </div>
        ) : (
          <div className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-slate-400">
            لا يوجد سؤال متاح
          </div>
        )}
      </div>

      {/* ✨ Image Modal */}
      {modalImage && (
        <ImageModal src={modalImage} onClose={() => setModalImage(null)} />
      )}

      {/* ✨ Global styles for images inside richtext */}
      <style jsx global>{`
        .tiger-richtext-wrapper .richtext img,
        .tiger-richtext-image img {
          max-width: 100% !important;
          width: auto !important;
          height: auto !important;
          min-width: 200px;
          cursor: zoom-in !important;
          border-radius: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin: 8px auto !important;
          display: block !important;
        }

        @media (min-width: 640px) {
          .tiger-richtext-wrapper .richtext img,
          .tiger-richtext-image img {
            min-width: 280px;
          }
        }

        @media (min-width: 1024px) {
          .tiger-richtext-wrapper .richtext img,
          .tiger-richtext-image img {
            min-width: 350px;
          }
        }

        .tiger-richtext-wrapper .richtext img:hover,
        .tiger-richtext-image img:hover {
          // transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(10, 138, 138, 0.25);
        }
      `}</style>
    </>
  );
};

export default TigerMockQuestion;

/* ===========================================================
   ✨ RichText with clickable images
   =========================================================== */
const RichTextWithImages = ({ html, onImageClick, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const images = container.querySelectorAll("img");

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onImageClick(e.currentTarget.src);
    };

    images.forEach((img) => {
      img.addEventListener("click", handleClick);
      img.setAttribute("loading", "lazy");
      img.style.cursor = "zoom-in";
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("click", handleClick);
      });
    };
  }, [html, onImageClick]);

  return (
    <div
      ref={containerRef}
      className={`tiger-richtext-image ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/* ===========================================================
   ✨ Image Modal Component (with zoom)
   =========================================================== */
const ImageModal = ({ src, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(z - 0.25, 0.5);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) handleZoomIn();
    else handleZoomOut();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 sm:px-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white/80 text-xs sm:text-sm">
          استخدم العجلة للتكبير • اضغط ESC للإغلاق
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          aria-label="إغلاق"
        >
          <X size={20} />
        </button>
      </div>

      {/* Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <img
          src={src}
          alt="عرض مكبر"
          draggable={false}
          className="max-w-[90vw] max-h-[80vh] object-contain select-none transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        />
      </div>

      {/* Bottom Controls */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1.5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all disabled:opacity-40"
          title="تصغير"
        >
          <ZoomOut size={18} />
        </button>

        <button
          onClick={handleReset}
          className="px-3 sm:px-4 h-9 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center gap-2 transition-all text-xs sm:text-sm font-bold"
          title="إعادة تعيين"
        >
          <span>{Math.round(zoom * 100)}%</span>
        </button>

        <button
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all disabled:opacity-40"
          title="تكبير"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
};

/* ===========================================================
   Audio Player
   =========================================================== */
const AudioPlayer = ({ src, fontSize = "normal" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percentage * duration;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="w-full flex items-center gap-3 sm:gap-4 md:gap-5 p-2 sm:p-3 md:p-4 landscape:p-1.5 landscape:sm:p-2 landscape:md:p-2.5 landscape:lg:p-3 bg-[#e8f5f3] rounded-xl mb-4 border border-[#cce5e0]/60 shadow-sm"
      dir="ltr"
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <button
        onClick={togglePlay}
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 landscape:w-8 landscape:h-8 landscape:sm:w-10 landscape:sm:h-10 landscape:md:w-12 landscape:md:h-12 flex items-center justify-center bg-[#0a8a8a] text-white rounded-full hover:bg-[#ff6b00] active:scale-95 transition-all duration-200 shrink-0 shadow-md shadow-[#0a8a8a]/20"
      >
        {isPlaying ? (
          <Pause size={18} className="w-4 h-4 sm:w-5 sm:h-5 landscape:w-3.5 landscape:h-3.5" fill="currentColor" />
        ) : (
          <Play size={18} className="w-4 h-4 sm:w-5 sm:h-5 landscape:w-3.5 landscape:h-3.5 ml-0.5" fill="currentColor" />
        )}
      </button>

      <div className="flex-1 flex flex-col gap-1 sm:gap-1.5">
        <div
          className="w-full h-2 sm:h-2.5 md:h-3 landscape:h-1.5 landscape:sm:h-2 bg-slate-200 rounded-full cursor-pointer overflow-hidden relative border border-slate-300/30"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-[#0a8a8a] to-[#14c2c2] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[9px] sm:text-[10px] md:text-xs lg:text-sm landscape:text-[8px] landscape:sm:text-[9px] landscape:md:text-[10px] text-slate-600 font-medium font-mono">
          <div className="flex gap-2">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Volume2 size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   Single Question (with image support)
   =========================================================== */
export const SingleQuestion = ({
  questionData,
  questionNumber = 1,
  selectedAnswer,
  onAnswerSelect,
  fontSize = "normal",
  onImageClick,
}) => {
  const handleOptionChange = (optionId) => {
    onAnswerSelect(optionId);
  };

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: `text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm`,
      normal: `text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base`,
      large: `text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg`,
      xlarge: `text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl`,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  return (
    <div className="relative w-full space-y-4 sm:space-y-6">
      {/* Question Card with images */}
      <div className="relative">
        <RichTextWithImages
          html={questionData.text}
          onImageClick={onImageClick}
          className={`
            font-bold text-slate-800 ${textSizeClass} richtext leading-relaxed
            bg-[#f4faf9] p-4 sm:p-5 rounded-2xl shadow-sm
            [&_p]:text-inherit [&_span]:text-inherit
            leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
            landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
            break-words
          `}
        />
      </div>

      {/* Options Grid */}
      <fieldset className="flex flex-col items-start w-full gap-2.5 sm:gap-3 md:gap-4 landscape:gap-2 landscape:sm:gap-2.5 landscape:md:gap-3">
        <legend className="sr-only">اختر الإجابة الصحيحة</legend>
        {questionData.options.map((option, index) => {
          const isSelected = selectedAnswer === option.id;
          const letter = ["أ", "ب", "ج", "د"][index] || (index + 1);

          return (
            <label
              key={option.id}
              className={`
                flex items-center justify-start w-full max-w-full
                px-3 sm:px-4 md:px-5
                py-2.5 sm:py-3.5 md:py-4
                landscape:py-1.5 landscape:sm:py-2.5 landscape:md:py-3
                gap-3 sm:gap-4 md:gap-5
                cursor-pointer transition-all duration-200 
                rounded-2xl border-2 overflow-hidden
                ${isSelected
                  ? "bg-[#e8f5f3] border-[#0a8a8a] shadow-md shadow-[#0a8a8a]/5 translate-y-[-1px]"
                  : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50"}
              `}
            >
              <input
                type="radio"
                name={`question-${questionData.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleOptionChange(option.id)}
                className="sr-only"
              />

              <div
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm border-2 transition-all
                  ${isSelected
                    ? "bg-[#0a8a8a] border-[#0a8a8a] text-white shadow-sm shadow-[#0a8a8a]/30"
                    : "bg-slate-50 border-slate-200 text-slate-400"}
                `}
              >
                {letter}
              </div>

              <span
                className={`
                  relative flex-1 flex items-center justify-start font-medium richtext min-w-0
                  ${textSizeClass} tracking-[0] [direction:rtl] 
                  [&_p]:text-inherit [&_span]:text-inherit
                  leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
                  landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
                  ${isSelected ? "text-[#065b5b] font-semibold" : "text-slate-700"}
                  break-words
                `}
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              >
                <RichTextWithImages
                  html={option.text}
                  onImageClick={onImageClick}
                  className="block max-w-full w-full"
                />
              </span>

              <div
                className={`
                  w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                  ${isSelected
                    ? "border-[#ff6b00] bg-white"
                    : "border-slate-200 bg-white"}
                `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse" />
                )}
              </div>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};