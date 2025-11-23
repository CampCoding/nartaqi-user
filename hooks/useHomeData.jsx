"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHomeData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // console.log(user, "user");

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const response = await axios.post(
        `${BASE_URL}/user/categories/getAllInHome`,
        { student_id: user?.id }
      );

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! status: ${response.data.statusCode}`);
      }

      setData(response.data?.message);
    } catch (err) {
      setIsError(true);
      setError(err.message || "فشل تحميل البيانات");
      console.error("Error fetching home data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const refetch = () => {
    fetchHomeData();
  };

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
