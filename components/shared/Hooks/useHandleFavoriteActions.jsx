import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { queryClient } from "../../../lib/getQueryClient";
import toast from "react-hot-toast";

export default function useHandleFavoriteActions() {
  const { token } = useSelector((state) => state.auth);

  const toggleFavorite = async ({ id, payload }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/favourite/toggle_favourite`,
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const { mutate, error, isLoading, data, isError } = useMutation({
    mutationKey: ["toggleFavorite"],
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getUserFavorite"]);
      queryClient.invalidateQueries(["homeData"]);
      queryClient.invalidateQueries(["NewestRounds"]);
      toast.success(data?.message);
    },
    retry: 1,
  });

  return { mutate, error, isLoading, data, isError };
}
