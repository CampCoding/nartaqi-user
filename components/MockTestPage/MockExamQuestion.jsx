"use client";

import React, { useRef, useState } from "react";

const MockExamQuestion = ({
  block,
  questionNumberStart = 1,
  answers,
  onAnswerSelect,
  fontSize = "normal",
  currentSection,
}) => {
  if (!block) {
    return (
      <div className="text-[10px] sm:text-xs md:text-sm lg:text-base">
        جاري تحميل السؤال...
      </div>
    );
  }

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: `
        text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
        landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm
      `,
      normal: `
        text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg
        landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base
      `,
      large: `
        text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl
        landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg
      `,
      xlarge: `
        text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
        landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl
      `,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  const currentQuestion =
    block.questions && block.questions.length > 0 ? block.questions[0] : null;

  // Check if this is a paragraph type question
  const isParagraphType = block.type === "paragraph";
  const hasPassage = block.passage && block.passage.trim() !== "";
  const hasVoice = block.voice && block.voice.trim() !== "";

  return (
    <div className="w-full">
      {/* Paragraph Content and/or Voice - Only for paragraph type */}
      {isParagraphType && (hasPassage || hasVoice) && (
        <div
          className={`
            mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6
            landscape:mb-1 landscape:sm:mb-1.5 landscape:md:mb-2 landscape:lg:mb-3
            sticky top-0 bg-white z-10 
            pb-1 sm:pb-1.5 md:pb-2 lg:pb-3 xl:pb-4
            pt-1 sm:pt-1.5 md:pt-2 
            border-b border-gray-200 sm:border-gray-300 shadow-sm
          `}
        >
          {/* Label */}
          <div
            className="
              mb-1 sm:mb-1.5 md:mb-2 lg:mb-3
              text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
              landscape:text-[8px] landscape:sm:text-[9px] landscape:md:text-[10px] landscape:lg:text-xs
              font-bold text-primary
            "
          >
            {hasVoice && !hasPassage ? "استمع للفقرة:" : "الفقرة:"}
          </div>

          {/* Voice Player */}
          {hasVoice && <AudioPlayer src={block.voice} fontSize={fontSize} />}

          {/* Paragraph Content */}
          {hasPassage && (
            <div
              className={`
                w-full font-medium text-zinc-600 ${textSizeClass} 
                tracking-[0] [direction:rtl] block
                leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
                landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
                max-h-[80px] sm:max-h-[100px] md:max-h-[140px] lg:max-h-[200px] xl:max-h-[280px]
                landscape:max-h-[60px] landscape:sm:max-h-[70px] landscape:md:max-h-[100px] landscape:lg:max-h-[150px]
                overflow-y-auto pr-1 sm:pr-2 custom-scroll
                ${hasVoice ? "mt-2 sm:mt-3" : ""}
              `}
              dangerouslySetInnerHTML={{
                __html: block.passage.replaceAll(/&nbsp;/gi, " "),
              }}
            />
          )}
        </div>
      )}

      {/* Question */}
      {currentQuestion ? (
        <div
          className="
            mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6
            landscape:mt-0.5 landscape:sm:mt-1 landscape:md:mt-2 landscape:lg:mt-3
            w-full
          "
        >
          <SingleQuestion
            key={currentQuestion.id}
            questionData={currentQuestion}
            questionNumber={questionNumberStart}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerSelect={(optionId) =>
              onAnswerSelect(currentQuestion.id, optionId)
            }
            fontSize={fontSize}
          />
        </div>
      ) : (
        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base">
          لا يوجد سؤال متاح
        </div>
      )}
    </div>
  );
};

export default MockExamQuestion;

// Audio Player Component
const AudioPlayer = ({ src, fontSize = "normal" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
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
      className="
        w-full flex items-end gap-2 sm:gap-3 md:gap-4
        p-1.5 sm:p-2 md:p-3 lg:p-4
        landscape:p-1 landscape:sm:p-1.5 landscape:md:p-2 landscape:lg:p-3
        bg-primary-light rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6
      "
      dir="ltr"
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
          landscape:w-6 landscape:h-6 landscape:sm:w-8 landscape:sm:h-8 landscape:md:w-10 landscape:md:h-10 landscape:lg:w-12 landscape:lg:h-12
          flex items-center justify-center
          bg-primary text-white rounded-full
          hover:opacity-90 transition-opacity
          shrink-0
        "
        aria-label={isPlaying ? "إيقاف" : "تشغيل"}
      >
        {isPlaying ? (
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6
                       landscape:w-2.5 landscape:h-2.5 landscape:sm:w-3 landscape:sm:h-3 landscape:md:w-4 landscape:md:h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6
                       landscape:w-2.5 landscape:h-2.5 landscape:sm:w-3 landscape:sm:h-3 landscape:md:w-4 landscape:md:h-4
                       ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Progress Bar */}
      <div className="flex-1 flex flex-col gap-0.5 sm:gap-1">
        <div
          className="
            w-full h-1.5 sm:h-2 md:h-2.5 lg:h-3
            landscape:h-1 landscape:sm:h-1.5 landscape:md:h-2
            bg-gray-300 rounded-full cursor-pointer overflow-hidden
          "
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time Display */}
        <div
          className="
            flex justify-between
            text-[8px] sm:text-[10px] md:text-xs lg:text-sm
            landscape:text-[7px] landscape:sm:text-[8px] landscape:md:text-[10px] landscape:lg:text-xs
            text-gray-600
          "
        >
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export const SingleQuestion = ({
  questionData,
  questionNumber = 1,
  selectedAnswer,
  onAnswerSelect,
  fontSize = "normal",
}) => {
  const handleOptionChange = (optionId) => {
    onAnswerSelect(optionId);
  };

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: `
        text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
        landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm
      `,
      normal: `
        text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg
        landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base
      `,
      large: `
        text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl
        landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg
      `,
      xlarge: `
        text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
        landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl
      `,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  return (
    <div className="relative w-full">
      {/* Question Text */}
      <div
        className={`
          mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5
          landscape:mb-1 landscape:sm:mb-1.5 landscape:md:mb-2 landscape:lg:mb-3
          prose prose-neutral max-w-none ${textSizeClass} 
          [&_p]:text-inherit [&_span]:text-inherit
          leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
          landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
        `}
        dangerouslySetInnerHTML={{ __html: questionData.text }}
      />

      {/* Options */}
      <fieldset
        className="
          flex flex-col items-start w-full
          gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4
          landscape:gap-1 landscape:sm:gap-1.5 landscape:md:gap-2 landscape:lg:gap-2.5
        "
      >
        <legend className="sr-only">اختر الإجابة الصحيحة</legend>
        {questionData.options.map((option) => (
          <label
            key={option.id}
            className="
              flex items-start sm:items-center justify-start w-full
              px-1 sm:px-1.5 md:px-2 lg:px-3 xl:px-4
              py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3
              landscape:py-0.5 landscape:sm:py-1 landscape:md:py-1.5 landscape:lg:py-2
              gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4
              landscape:gap-1 landscape:sm:gap-1.5 landscape:md:gap-2 landscape:lg:gap-2.5
              cursor-pointer hover:bg-gray-50 transition-colors duration-200 
              rounded sm:rounded-md lg:rounded-lg
            "
          >
            <input
              type="radio"
              name={`question-${questionData.id}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="
                w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6
                landscape:w-2.5 landscape:h-2.5 landscape:sm:w-3 landscape:sm:h-3 landscape:md:w-3.5 landscape:md:h-3.5 landscape:lg:w-4 landscape:lg:h-4
                mt-0.5 sm:mt-0 shrink-0
                border-[1.5px] sm:border-2 border-text-alt 
                checked:bg-primary rounded-full checked:border-primary cursor-pointer
              "
            />
            <span
              className={`
                relative flex items-center justify-start w-fit font-medium text-black 
                ${textSizeClass} tracking-[0] [direction:rtl] 
                [&_p]:text-inherit [&_span]:text-inherit
                leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
                landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
              `}
            >
              <div dangerouslySetInnerHTML={{ __html: option.text }} />
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};
