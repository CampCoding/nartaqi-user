"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUserDataApi = async (token) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/authentication/student_info`,
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

export const useGetProfile = (token) => {
  return useQuery({
    queryKey: ["userData", token],
    queryFn: () => getUserDataApi(token),
    enabled: !!token,
    retry: false,
  });
};
