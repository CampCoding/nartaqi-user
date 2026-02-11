
"use client";

import { useEffect, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/settings/getSocialAccounts";

/**
 * Fetch social accounts (no token, no headers, no abort).
 * Response shape:
 * { statusCode: 200, status: "success", message: [ { id, platform_name, platform_link, image, image_url } ] }
 */
export default function useSocialAccounts(endpoint = ENDPOINT) {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(endpoint, { method: "GET" });
        const data = await res.json();

        const list = Array.isArray(data?.message) ? data.message : [];

        setAccounts(list);
      } catch (e) {
        setError("تعذر تحميل حسابات التواصل حالياً. حاول مرة أخرى.");
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint]);

  return { loading, error, accounts };
}
