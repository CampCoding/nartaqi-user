import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetComments = ({ payload, id }) => {
  const fetchComments = async (id) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/blogs/comments`,
      payload,
      {
        headers: { Accept: "application/json" },
      }
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: fetchComments,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    comments: data?.message ?? [],
    loading: isLoading,
    error: isError ? error?.message : null,
  };
};
