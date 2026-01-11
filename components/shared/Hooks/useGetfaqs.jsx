import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useGetfaqs() {
  const fetchFaqs = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/faqs`
      );
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
    retry: 1,
  });
}
