"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchBanners = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/home/banners`);
  if (data.status !== "success") throw new Error("Failed to fetch banners");
  return Array.isArray(data.message) ? data.message : [];
};

const fetchVideo = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/home/video`);
  if (data.status !== "success") throw new Error("Failed to fetch video");
  return data.message || null;
};

export const useHomeMeta = () => {
  const bannersQuery = useQuery({
    queryKey: ["homeBanners"],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const videoQuery = useQuery({
    queryKey: ["homeVideo"],
    queryFn: fetchVideo,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    banners: bannersQuery.data || [],
    videoUrl: videoQuery.data?.video_url || null,
  };
};
