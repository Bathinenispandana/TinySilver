"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Account {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  account: Account;
  hasSeenLogin: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateAccount: (data: Partial<Account>) => void;
  markLoginSeen: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_KEY = "srz_auth";
const ACCOUNT_KEY = "srz_account";
const SEEN_KEY = "srz_seen_login";

const defaultAccount: Account = {
  name: "Guest User",
  email: "",
  phone: "",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<Account>(defaultAccount);
  const [hasSeenLogin, setHasSeenLogin] = useState(true); // default true until hydrated, to avoid flash

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem(AUTH_KEY) === "true";
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setIsLoggedIn(loggedIn);
      const storedAccount = localStorage.getItem(ACCOUNT_KEY);
      if (storedAccount) setAccount(JSON.parse(storedAccount));
      const seen = localStorage.getItem(SEEN_KEY) === "true";
      setHasSeenLogin(seen);
    } catch {
      setHasSeenLogin(true);
    }
  }, []);

  const login = (email: string, name?: string) => {
    setIsLoggedIn(true);
    const updated = {
      ...account,
      email: email || account.email,
      name: name || account.name || "Customer",
    };
    setAccount(updated);
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated));
    localStorage.setItem(SEEN_KEY, "true");
    setHasSeenLogin(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(AUTH_KEY, "false");
  };

  const updateAccount = (data: Partial<Account>) => {
    setAccount((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const markLoginSeen = () => {
    localStorage.setItem(SEEN_KEY, "true");
    setHasSeenLogin(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        account,
        hasSeenLogin,
        login,
        logout,
        updateAccount,
        markLoginSeen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
