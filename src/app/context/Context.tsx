"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProviderProps {
  children: ReactNode;
}

export type UserType = {
  id: string;
  email: string;
};

type contextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const AuthContext = createContext<contextType | null>(null);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      try {
        setUser(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUser = (): contextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthUser must be used within a ContextProvider");
  }
  return context;
};
