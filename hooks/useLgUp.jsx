import { useEffect, useState } from "react";

function useIsLgUp() {
  const [isLgUp, setIsLgUp] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const listener = (e) => setIsLgUp(e.matches);
    setIsLgUp(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", listener);
    else mql.addListener(listener); // safari fallback
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", listener);
      else mql.removeListener(listener);
    };
  }, []);
  return isLgUp;
}

export default useIsLgUp;