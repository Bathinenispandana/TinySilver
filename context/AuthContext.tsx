"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Account {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  account: Account;
  hasSeenLogin: boolean;
  logout: () => Promise<void>;
  updateAccount: (data: Partial<Account>) => Promise<void>;
  markLoginSeen: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  loginOpen: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SEEN_KEY = "srz_seen_login";

const defaultAccount: Account = {
  name: "Guest User",
  email: "",
  phone: "",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<Account>(defaultAccount);
  const [hasSeenLogin, setHasSeenLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Client-side hydration for hasSeenLogin
    try {
      const seen = localStorage.getItem(SEEN_KEY) === "true";
      setHasSeenLogin(seen);
    } catch {
      setHasSeenLogin(true);
    }

    // Set initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    async function handleSession(session: any) {
      if (session) {
        setIsLoggedIn(true);
        // Fetch profile data from our custom table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setAccount({
          name: profile?.full_name || session.user.user_metadata?.full_name || session.user.user_metadata?.name || "Customer",
          email: session.user.email || "",
          phone: profile?.phone || "",
        });
      } else {
        setIsLoggedIn(false);
        setAccount(defaultAccount);
      }
      setLoading(false);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateAccount = async (data: Partial<Account>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    // Update Supabase profiles table
    await supabase
      .from('profiles')
      .update({
        full_name: data.name ?? account.name,
        phone: data.phone ?? account.phone,
      })
      .eq('id', session.user.id);

    setAccount((prev) => ({ ...prev, ...data }));
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
        logout,
        updateAccount,
        markLoginSeen,
        openLogin: () => setLoginOpen(true),
        closeLogin: () => { setLoginOpen(false); markLoginSeen(); },
        loginOpen,
        loading
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
