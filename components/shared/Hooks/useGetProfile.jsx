import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDate } from "../../utils/Store/Slices/UserSllice.jsx";
// ← عدّل المسار حسب مكانك

export default function useGetProfile(payload) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (payload) {
      dispatch(getUserDate(payload));
    }
  }, [payload, dispatch]);

  return {
    user,
    loading,
    error,
  };
}
