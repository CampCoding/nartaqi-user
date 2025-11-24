"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUserFavoriteApi = async (token) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/user/favourite/user_favourites`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const useGetUserFavorite = (token) => {
  return useQuery({
    queryKey: ["userFavorites", token], // 👈 مهم جداً تغير اسم الكي
    queryFn: () => getUserFavoriteApi(token),
    enabled: !!token,
    retry: false,
  });
};
