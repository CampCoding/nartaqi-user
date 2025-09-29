"use client";

import React, { useState } from "react";

const BlogComments = () => {
  return (
    <section className="px-[32px] flex flex-col gap-[32px] mt-[56px]">
      <header className="  h-[60px] text-bold text-secondary text-[32px] leading-[normal] ">
        تعليقات (١٢)
      </header>

      <main className="flex flex-col gap-[24px]">
        <BlogCommentCard />
        <BlogCommentCard />
        <BlogCommentCard />
        <BlogCommentCard />
        <BlogCommentCard />
      </main>

      <AddBlogComment />
    </section>
  );
};

export default BlogComments;

// import FRAME1 from "./FRAME.svg";

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
      <div dir="ltr" className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            {index < rating ? (
              <svg
                width={16}
                height={16}
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
                width={16}
                height={16}
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
      className="flex items-center justify-between px-6 py-8 relative bg-white rounded-[30px] border border-solid border-zinc-200"
      role="article"
      aria-label="مراجعة المستخدم"
    >
      <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
        <header className="inline-flex items-start gap-4 relative flex-[0_0_auto]">
          <div
            className="relative w-10 h-10 rounded-full bg-[url('/images/Image-124.png')] bg-cover bg-[50%_50%]"
            role="img"
            aria-label={`صورة المستخدم ${reviewData.author}`}
          />
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <h3 className="self-stretch text-bold  relative text-text text-base leading-6 ">
              {reviewData.author}
            </h3>
            {renderStars(4)}
          </div>
        </header>

        <p className="w-fit  whitespace-nowrap relative text-text text-base leading-6 ">
          {reviewData.comment}
        </p>
      </div>

      <time
        className="inline-flex h-5 items-center relative flex-[0_0_auto]"
        dateTime="2024-03-06"
      >
        <div className="relative self-stretch w-[84px]  text-text-alt text-sm leading-5 ">
          {reviewData.date}
        </div>
      </time>
    </article>
  );
};

export const AddBlogComment = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const starIcons = [
    { id: 1, src: <StarIcon />, alt: "Star 1" },
    { id: 2, src: <StarIcon />, alt: "Star 2" },
    { id: 3, src: <StarIcon />, alt: "Star 3" },
    { id: 4, src: <StarIcon />, alt: "Star 4" },
    { id: 5, src: <StarIcon />, alt: "Star 5" },
  ];

  const handleStarClick = (starId) => {
    setRating(starId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Comment:", comment, "Rating:", rating);
  };

  return (
    <div className="flex flex-col items-start gap-7  relative bg-white">
      <header className="flex flex-col items-start gap-4 px-4 py-0 self-stretch w-full relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]">
          <h1 className="relative self-stretch mt-[-1.00px]  font-bold text-text text-[32px] tracking-[-0.60px] leading-6 ">
            أضف تعليقك
          </h1>
          <p className="self-stretch  text-text-alt text-sm leading-5 relative ">
            شاركنا أفكارك حول هذه المقالة
          </p>
        </div>
        <div
          className="inline-flex items-center gap-2 relative flex-[0_0_auto]"
          role="group"
          aria-label="تقييم بالنجوم"
        >
          {starIcons.map((star) => (
            <button
              key={star.id}
              type="button"
              onClick={() => handleStarClick(star.id)}
              className="relative w-[22px] h-[21.02px] mt-[-1.00px] mb-[-1.00px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-sm"
              aria-label={`تقييم ${star.id} نجوم`}
              aria-pressed={rating >= star.id}
            >
              {star.src}
            </button>
          ))}
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 self-stretch w-full relative flex-[0_0_auto]"
      >
        <div className="flex items-start justify-end px-4  relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[30px] border border-solid border-zinc-200">
          <label htmlFor="comment-input" className="sr-only">
            اكتب تعليقك هنا
          </label>
          <textarea
            id="comment-input"
            value={comment}
            onChange={handleCommentChange}
            placeholder="اكتب تعليقك هنا..."
            className="w-full h-full resize-none py-14 text-text-alt text-lg leading-5  bg-transparent border-0 outline-none focus:text-zinc-700"
            rows="1d"
            style={{ minHeight: "auto" }}
          />
        </div>

        <button
          className="inline-flex mr-auto items-center justify-center gap-2 px-12 py-6 relative bg-secondary rounded-[30px] cursor-pointer hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-colors duration-200"
          type="button"
          aria-label="تقديم تعليق"
        >
          <span className="relative flex items-center justify-center w-fit  text-neutral-50 text-base text-center leading-[normal] ">
            تقديم تعليق
          </span>
        </button>
      </form>

      <footer>
        <p className="self-stretch  text-text-alt text-xl leading-5 relative ">
          ملاحظة: يجب أن تكون مسجلا دخولك لتقديم تعليق. يتم مراجعة جميع
          التعليقات قبل نشرها.
        </p>
      </footer>
    </div>
  );
};

const StarIcon = (props) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
      stroke="#71717A"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </svg>
);
