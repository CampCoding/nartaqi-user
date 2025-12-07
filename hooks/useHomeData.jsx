"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchHomeData = async (student_id) => {
  const requestBody = {};

  if (student_id) {
    requestBody.student_id = student_id;
  }

  const { data } = await axios.post(
    `${BASE_URL}/user/categories/getAllInHome`,
    requestBody
  );

  if (data.status !== "success") {
    throw new Error(data?.message || "Failed to fetch home data");
  }

  return data.message;
};

export const useHomeData = (student_id) => {
  return useQuery({
    queryKey: ["homeData", student_id],
    queryFn: () => fetchHomeData(student_id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};
