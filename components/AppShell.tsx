"use client";

import { useEffect, useState, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";
import SocialSticky from "@/components/SocialSticky";

export default function AppShell({ children }: { children: ReactNode }) {
  const { isLoggedIn, hasSeenLogin, markLoginSeen, loginOpen, openLogin, closeLogin } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !hasSeenLogin) {
      const timer = setTimeout(() => openLogin(), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, hasSeenLogin, openLogin]);

  return (
    <>
      <Header onOpenLogin={openLogin} />
      <main className="flex-1">{children}</main>
      <SocialSticky />
      <Footer />
      <LoginModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
