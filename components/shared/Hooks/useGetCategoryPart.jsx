import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCategoryPart = (id) => {
  const fetchGetCategoryPart = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/parts/getCategoryParts`,
      {
        course_category_id: id,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCategoryPart", id],
    queryFn: fetchGetCategoryPart,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    parts: data?.message ?? [],
    loading: isLoading,
    error: isError ? error?.message : null,
  };
};
