import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBlogs = () => {
  const fetchBlogs = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/blogs`,
      {
        headers: { Accept: "application/json" },
      }
    );
  

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    blogs: data ?? [],
    loading: isLoading,
    error: isError ? error?.message : null,
  };
};
