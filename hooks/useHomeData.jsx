"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchHomeData = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/categories/getAllInHome`);

  if (data.status !== "success") {
    throw new Error(data?.message || "Failed to fetch home data");
  }

  return data.message;
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 5, // 5 mins cache
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
