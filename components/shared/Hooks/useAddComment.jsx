import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token, payload }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/blogs/add_comment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // إعادة تحميل التعليقات الخاصة بنفس الـ blog_id
      queryClient.invalidateQueries(["comments", variables.payload.blog_id]);
    },
  });
};
