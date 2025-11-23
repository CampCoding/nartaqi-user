import axios from "axios";
import toast from "react-hot-toast";

export default async function useApplyMarketer({ payload }) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/marketers/apply`,
      payload,
      {
        headers: {
          Accept: "application/form-data",
        },
      }
    );
    if (res.data.statusCode === 200) {
      toast.success("تم التقديم بنجاح");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}
