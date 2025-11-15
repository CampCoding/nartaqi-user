// shared/Hooks/useGetBlogs.jsx (مثلاً)
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../utils/Store/Slices/BlogSlice.jsx";
// عدّل الباث حسب مشروعك

export default function     useGetBlogs() {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return {
    blogs,
    loading,
    error,
  };
}
