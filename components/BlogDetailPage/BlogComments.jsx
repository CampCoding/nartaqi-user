"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { commentSchema } from "../utils/Schema/Comment.Schema";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDate, formatDateBackEnd } from "../utils/helpers/date";
import NoContent from "../shared/NoContent";
import { useRouter } from "next/navigation";
import { clearComment, saveComment } from "../utils/Store/Slices/BlogSlice";
import useRedirect from "../shared/Hooks/useRedirect";

import { useGetComments } from "../shared/Hooks/useGetComments";
import { useAddComment } from "../shared/Hooks/useAddComment";

const BlogComments = ({ count, id }) => {
  const commentss = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const { comments, loading, error } = useGetComments({
    id,
    payload: { blog_id: id },
  });
  const { token } = useSelector((state) => state.auth);

  return (
    <section className=" flex flex-col gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-12 lg:mt-14 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-secondary text-2xl leading-8 sm:text-[28px] sm:leading-9 md:text-[30px] md:leading-10 lg:text-[32px] lg:leading-[44px]">
          ({count})تعليقات
        </h2>
      </header>

      {/* Comments List */}
      {comments?.length > 0 ? (
        <>
          {comments?.map((comment) => (
            <BlogCommentCard key={comment.id} comment={comment} />
          ))}
        </>
      ) : (
        <>
          <NoContent title={"لا يوجد تعليقات"} />
        </>
      )}

      {/* Add Comment Form */}
      <AddBlogComment id={id} token={token} />
    </section>
  );
};

export default BlogComments;

// Comment Card Component
const BlogCommentCard = ({ comment }) => {
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
            style={{
              backgroundImage: `url(${comment?.student?.image || ""})`,
            }}
            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-cover bg-center ring-2 ring-neutral-100"
            role="img"
            aria-label={`صورة المستخدم`}
          ></div>
          <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
            <h3 className="font-bold text-text text-sm sm:text-base md:text-lg leading-5 sm:leading-6">
              {comment?.student?.name}
            </h3>
            {renderStars(comment?.rateing)}
          </div>
        </header>

        {/* Comment Text */}
        <p className="text-text text-sm sm:text-[15px] md:text-base leading-6 sm:leading-7 md:leading-7 break-words">
          {comment?.comment}
        </p>
      </div>

      {/* Date */}
      <time
        className="flex items-center justify-start sm:justify-end sm:flex-shrink-0 sm:self-start"
        dateTime="2024-03-06"
      >
        <span className="text-text-alt text-xs sm:text-sm md:text-sm leading-5 whitespace-nowrap">
          {formatDateBackEnd(comment?.created_at)}
        </span>
      </time>
    </article>
  );
};

// Add Comment Component
export const AddBlogComment = ({ id, token }) => {
  const [comment, setComment] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { commentContent } = useSelector((state) => state.blog);
  const addCommentMutation = useAddComment();

  const dispatch = useDispatch();
  const redirect = useRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (commentContent) {
      setComment(commentContent?.comment?.length);
      setRating(commentContent?.rateing);
      reset(
        {
          comment: commentContent.comment,
        },
        { keepDirty: true }
      );
    } else {
      reset();
    }
  }, [commentContent]);

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

  const onSubmit = async (data) => {

    // 1️⃣ التأكد من وجود التوكن + تخزين التعليق قبل اللوجين
    const mustLogin = redirect({
      token,
      action: saveComment,
      payload: {
        commentContent: data.comment,
        rateing: rating,
        link: window.location.pathname,
        
      },
    });

    if (!mustLogin) return;

    // 2️⃣ تجهيز بيانات الإرسال
    const payload = {
      blog_id: id,
      comment: data.comment,
      rating: rating,
    };

    // 3️⃣ تنفيذ الميوتاشن
    addCommentMutation.mutate(
      { token, payload },
      {
        onSuccess: (res) => {
          if (res.statusCode === 200) {
            toast.success("تم اضافة التعليق بنجاح");

            // حذف التعليق اللي اتحفظ قبل اللوجين
            dispatch(clearComment());

            // Reset form
            reset();
            setRating(0);
          }
        },

        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "حدث خطاء في اضافة التعليق"
          );
        },
      }
    );
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 sm:gap-5"
      >
        {/* Textarea */}
        <div className="relative w-full bg-white rounded-xl sm:rounded-2xl md:rounded-[25px] lg:rounded-[30px] border border-zinc-200 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
          <label htmlFor="comment-input" className="sr-only">
            اكتب تعليقك هنا
          </label>
          <textarea
            id="comment-input"
            {...register("comment")}
            onChange={(e) => {
              setComment(e?.target?.value?.length);
            }}
            placeholder="اكتب تعليقك هنا..."
            className="w-full resize-none px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 text-text text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 bg-transparent border-0 outline-none placeholder:text-text-alt/60"
            rows="6"
            maxLength="500"
          />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-xs sm:text-sm text-text-alt/60">
            {comment}/500
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={
            "self-start inline-flex items-center justify-center gap-2 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 lg:px-14 lg:py-4 bg-secondary rounded-full sm:rounded-[25px] md:rounded-[30px] cursor-pointer hover:bg-secondary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          }
          type="submit"
          disabled={addCommentMutation.isLoading || comment < 3 || rating === 0}
          aria-label="تقديم تعليق"
        >
          <span className="text-white text-sm sm:text-base md:text-lg font-semibold leading-normal">
            {addCommentMutation.isLoading
              ? "جاري تقدم التعليق..."
              : "تقديم تعليق"}
          </span>
        </button>
        {/* Error Message */}
        {errors.comment && (
          <div className=" text-sm sm:text-base md:text-lg text-red-500">
            {errors.comment.message}
          </div>
        )}
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
