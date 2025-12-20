import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default async function useSendCode({ endpoint, payload }) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      payload,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}
