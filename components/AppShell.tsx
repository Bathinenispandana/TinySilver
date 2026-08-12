"use client";

import { useEffect, useState, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function AppShell({ children }: { children: ReactNode }) {
  const { isLoggedIn, hasSeenLogin, markLoginSeen } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !hasSeenLogin) {
      const timer = setTimeout(() => setLoginOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, hasSeenLogin]);

  const closeLogin = () => {
    setLoginOpen(false);
    markLoginSeen();
  };

  return (
    <>
      <Header onOpenLogin={() => setLoginOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
