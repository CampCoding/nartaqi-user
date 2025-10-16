"use client";

import React, { useState } from "react";

const BlogComments = () => {
  const comments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <section className=" flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-12 lg:mt-14 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-secondary text-2xl leading-8 sm:text-[28px] sm:leading-9 md:text-[30px] md:leading-10 lg:text-[32px] lg:leading-[44px]">
          تعليقات (١٢)
        </h2>
      </header>

      {/* Comments List */}
      <main className="flex flex-col gap-4 sm:gap-5 md:gap-6">
        {comments.map((comment) => (
          <BlogCommentCard key={comment.id} />
        ))}
      </main>

      {/* Add Comment Form */}
      <AddBlogComment />
    </section>
  );
};

export default BlogComments;

// Comment Card Component
const BlogCommentCard = () => {
  const reviewData = {
    date: "6 مارس 2024",
    author: "سارة جونسون",
    rating: 4,
    comment:
      "يقدم هذا المقال رؤى قيمة حول مستقبل التعليم. الأمثلة عملية وذات صلة.",
    avatar: "/FRAME.png",
  };

  const renderStars = (rating) => {
    return (
      <div dir="ltr" className="flex items-center gap-0.5 sm:gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            {index < rating ? (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00065 1.33398L10.0607 5.50732L14.6673 6.18065L11.334 9.42732L12.1207 14.014L8.00065 11.8473L3.88065 14.014L4.66732 9.42732L1.33398 6.18065L5.94065 5.50732L8.00065 1.33398Z"
                  fill="#FACC15"
                  stroke="#FACC15"
                  strokeWidth={1.33333}
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00065 1.33398L10.0607 5.50732L14.6673 6.18065L11.334 9.42732L12.1207 14.014L8.00065 11.8473L3.88065 14.014L4.66732 9.42732L1.33398 6.18065L5.94065 5.50732L8.00065 1.33398Z"
                  stroke="#FACC15"
                  strokeWidth={1.33333}
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <article
      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 px-4 py-5 sm:px-5 sm:py-6 md:px-6 md:py-7 lg:px-6 lg:py-8 relative bg-white rounded-2xl sm:rounded-[25px] md:rounded-[30px] border border-solid border-zinc-200 hover:border-zinc-300 transition-all duration-300 hover:shadow-md"
      role="article"
      aria-label="مراجعة المستخدم"
    >
      {/* Main Content */}
      <div className="flex flex-col gap-3 sm:gap-4 flex-1">
        {/* Header with Avatar and User Info */}
        <header className="flex items-start gap-3 sm:gap-4">
          <div
            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-[url('/images/Image-124.png')] bg-cover bg-center ring-2 ring-neutral-100"
            role="img"
            aria-label={`صورة المستخدم ${reviewData.author}`}
          />
          <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
            <h3 className="font-bold text-text text-sm sm:text-base md:text-lg leading-5 sm:leading-6">
              {reviewData.author}
            </h3>
            {renderStars(reviewData.rating)}
          </div>
        </header>

        {/* Comment Text */}
        <p className="text-text text-sm sm:text-[15px] md:text-base leading-6 sm:leading-7 md:leading-7 break-words">
          {reviewData.comment}
        </p>
      </div>

      {/* Date */}
      <time
        className="flex items-center justify-start sm:justify-end sm:flex-shrink-0 sm:self-start"
        dateTime="2024-03-06"
      >
        <span className="text-text-alt text-xs sm:text-sm md:text-sm leading-5 whitespace-nowrap">
          {reviewData.date}
        </span>
      </time>
    </article>
  );
};

// Add Comment Component
export const AddBlogComment = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const starIcons = [
    { id: 1, label: "نجمة واحدة" },
    { id: 2, label: "نجمتان" },
    { id: 3, label: "ثلاث نجوم" },
    { id: 4, label: "أربع نجوم" },
    { id: 5, label: "خمس نجوم" },
  ];

  const handleStarClick = (starId) => {
    setRating(starId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment:", comment, "Rating:", rating);
    // Reset form
    setComment("");
    setRating(0);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 p-4 sm:p-5 md:p-6 lg:p-8 bg-white rounded-2xl sm:rounded-[25px] md:rounded-[30px] border border-zinc-200 shadow-sm">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="font-bold text-text text-xl sm:text-2xl md:text-[28px] lg:text-[30px] xl:text-[32px] leading-7 sm:leading-8 md:leading-9 lg:leading-10">
            أضف تعليقك
          </h2>
          <p className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 sm:leading-6">
            شاركنا أفكارك حول هذه المقالة
          </p>
        </div>

        {/* Star Rating */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
          role="group"
          aria-label="تقييم بالنجوم"
        >
          {starIcons.map((star) => (
            <button
              key={star.id}
              type="button"
              onClick={() => handleStarClick(star.id)}
              onMouseEnter={() => setHoverRating(star.id)}
              onMouseLeave={() => setHoverRating(0)}
              className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-sm transition-transform hover:scale-110 active:scale-95"
              aria-label={star.label}
              aria-pressed={rating >= star.id}
            >
              <StarIcon filled={star.id <= (hoverRating || rating)} />
            </button>
          ))}
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        {/* Textarea */}
        <div className="relative w-full bg-white rounded-xl sm:rounded-2xl md:rounded-[25px] lg:rounded-[30px] border border-zinc-200 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
          <label htmlFor="comment-input" className="sr-only">
            اكتب تعليقك هنا
          </label>
          <textarea
            id="comment-input"
            value={comment}
            onChange={handleCommentChange}
            placeholder="اكتب تعليقك هنا..."
            className="w-full resize-none px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 text-text text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 bg-transparent border-0 outline-none placeholder:text-text-alt/60"
            rows="6"
            maxLength="500"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-xs sm:text-sm text-text-alt/60">
            {comment.length}/500
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="self-start inline-flex items-center justify-center gap-2 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 lg:px-14 lg:py-4 bg-secondary rounded-full sm:rounded-[25px] md:rounded-[30px] cursor-pointer hover:bg-secondary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!comment.trim() || rating === 0}
          aria-label="تقديم تعليق"
        >
          <span className="text-white text-sm sm:text-base md:text-lg font-semibold leading-normal">
            تقديم تعليق
          </span>
        </button>
      </form>

      {/* Footer Note */}
      <footer className="pt-3 sm:pt-4 border-t border-zinc-100">
        <p className="text-text-alt text-xs sm:text-sm md:text-base leading-5 sm:leading-6 md:leading-7">
          ملاحظة: يجب أن تكون مسجلا دخولك لتقديم تعليق. يتم مراجعة جميع
          التعليقات قبل نشرها.
        </p>
      </footer>
    </div>
  );
};

// Star Icon Component
const StarIcon = ({ filled = false, ...props }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-all duration-200"
    {...props}
  >
    <path
      d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
      fill={filled ? "#FACC15" : "none"}
      stroke={filled ? "#FACC15" : "#71717A"}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </svg>
);
