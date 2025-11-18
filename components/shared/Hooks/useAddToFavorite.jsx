"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function useAddToFavorite() {
  const token = useSelector((state) => state.auth.token);
  const addToFavorite = async ({ id }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/add_to_favorite`,
      { id },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  return useMutation({
    mutationFn: addToFavorite,

    onSuccess: (data) => {
      toast.success(data?.message || "تمت الإضافة للمفضلة");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطأ");
    },
  });
}
