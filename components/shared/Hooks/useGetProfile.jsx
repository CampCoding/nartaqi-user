"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../utils/Store/Slices/authntcationSlice";

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
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["userData", token],
    queryFn: () => getUserDataApi(token),
    enabled: !!token,
    retry: false,
  });
};
