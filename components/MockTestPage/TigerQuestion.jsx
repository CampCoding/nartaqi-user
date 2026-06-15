"use client";

import React, { useRef, useState } from "react";
import { Volume2, Play, Pause, FileText, ChevronRight } from "lucide-react";

/**
 * TigerQuestion - A premium question component for Tiger Mode
 */
const TigerQuestion = ({
  block,
  questionNumberStart = 1,
  answers,
  onAnswerSelect,
  fontSize = "normal",
  currentSection,
}) => {
  if (!block) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400 animate-pulse">
        جاري تحميل السؤال...
      </div>
    );
  }

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: "text-sm",
      normal: "text-base",
      large: "text-lg",
      xlarge: "text-xl",
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);
  const currentQuestion = block.questions?.[0] || null;

  const isParagraphType = block.type === "paragraph";
  const hasPassage = block.passage && block.passage.trim() !== "";
  const hasVoice = block.voice && block.voice.trim() !== "";

  return (
    <div className="w-full space-y-6">
      {/* Passage / Content Area */}
      {isParagraphType && (hasPassage || hasVoice) && (
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
          {/* Passage Header */}
          <div className="bg-slate-100/80 px-4 py-2 flex items-center justify-between border-b border-slate-200/60">
            <div className="flex items-center gap-2 text-[#0a8a8a] font-bold text-xs">
              <FileText size={14} />
              <span>الفقرة المقروءة</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Voice Player */}
            {hasVoice && (
              <TigerAudioPlayer src={block.voice} />
            )}

            {/* Passage Text */}
            {hasPassage && (
              <div
                className={`
                    w-full font-medium text-slate-700 ${textSizeClass} richtext leading-loose
                    max-h-[300px] overflow-y-auto pr-3 custom-scroll
                  `}
                dangerouslySetInnerHTML={{
                  __html: block.passage.replaceAll(/&nbsp;/gi, " "),
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Main Question Area */}
      {currentQuestion ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Question Text */}
          <div className="relative">
            <div
              className={`
                   font-bold text-slate-800 ${textSizeClass} richtext leading-relaxed
                   bg-white p-4 rounded-xl border-r-4 border-[#0a8a8a] shadow-sm
                `}
              dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              const letter = ["أ", "ب", "ج", "د"][index] || (index + 1);

              return (
                <button
                  key={option.id}
                  onClick={() => onAnswerSelect(currentQuestion.id, option.id)}
                  className={`
                          group relative flex items-center gap-4 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-right
                          ${isSelected
                      ? "bg-[#e8f5f3] border-[#0a8a8a] shadow-md shadow-[#0a8a8a]/5 translate-y-[-2px]"
                      : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50"}
                       `}
                >
                  {/* Letter Index */}
                  <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs border-2 transition-all
                          ${isSelected
                      ? "bg-[#0a8a8a] border-[#0a8a8a] text-white"
                      : "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"}
                       `}>
                    {letter}
                  </div>

                  {/* Option Text */}
                  <div className={`
                          flex-1 text-sm sm:text-base font-medium richtext leading-normal
                          ${isSelected ? "text-[#065b5b]" : "text-slate-700"}
                       `}
                    dangerouslySetInnerHTML={{ __html: option.text }}
                  />

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-400 border border-dashed border-slate-200">
          لا يوجد سؤال متاح في هذا القسم
        </div>
      )}
    </div>
  );
};

export default TigerQuestion;

/**
 * Improved Audio Player for Tiger Mode
 */
const TigerAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center gap-4 shadow-sm" dir="ltr">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[#0a8a8a] text-white flex items-center justify-center hover:scale-105 transition-all shadow-md active:scale-95"
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
      </button>

      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/30">
        <div
          className="h-full bg-gradient-to-r from-[#0a8a8a] to-[#14c2c2] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Volume2 size={16} className="text-slate-400" />
    </div>
  );
};
