import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function useRedirect() {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * redirectIfNoToken:
   * - token: التوكن
   * - action: أكشن الريدكس اللي يتنفذ
   * - payload: الداتا اللي تتبعت للأكشن
   */
  const redirectIfNoToken = ({ token, action, payload }) => {
    if (!token) {
      if (action && payload) {
        dispatch(action(payload));
      }

      toast.error("يجب تسجيل الدخول اولا");
      router.push("/login");

      return false; // يعني مفيش توكن
    }

    return true; // يعني فيه توكن
  };

  return redirectIfNoToken;
}
