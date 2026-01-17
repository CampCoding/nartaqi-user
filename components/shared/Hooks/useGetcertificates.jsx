import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetCertificates(token) {
  const fetchCertificates = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/certificates`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data?.message ?? null;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["certificates", token],
    queryFn: fetchCertificates,
    enabled: !!token,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    certificates: data ?? null,
    loading: isLoading,
    error: isError ? error?.message : null,
  };
}
