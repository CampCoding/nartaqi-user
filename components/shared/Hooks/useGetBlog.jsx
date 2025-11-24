import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetBlog(id) {
  const fetchBlog = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/blogs/get_blog`,
      { id }
    );

    return res?.data?.message ?? null;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlog,
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    blog: data ?? null,
    loading: isLoading,
    error: isError ? error?.message : null,
  };
}
