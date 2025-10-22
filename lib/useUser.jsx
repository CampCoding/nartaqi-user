"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "nartaquee_user";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (_) {}
    setIsLoading(false);
  }, []);

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (_) {}
  }, [user]);

  const login = useCallback(async ({ phone, password, type }) => {
    await new Promise((r) => setTimeout(r, 300));
    if (!phone || !password) throw new Error("Phone and password are required");
    const mockUser = { id: "demo-user", phone, name: "test-user" };
    if (type) {
      mockUser.type = type;
    }
    setUser(mockUser);
    return mockUser;
  }, []);

  const register = useCallback(
    async ({ firstName, middleName, lastName, gender, phone, password }) => {
      await new Promise((r) => setTimeout(r, 300));
      if (!firstName || !lastName || !phone || !password)
        throw new Error("Missing required fields");
      const mockUser = {
        id: "demo-user",
        phone,
        name: [firstName, middleName, lastName].filter(Boolean).join(" "),
        gender: gender || "unknown",
      };
      setUser(mockUser);
      return mockUser;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
