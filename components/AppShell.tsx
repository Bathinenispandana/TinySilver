"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";
import SocialSticky from "@/components/SocialSticky";

export default function AppShell({ children }: { children: ReactNode }) {
  const { isLoggedIn, hasSeenLogin, markLoginSeen, loginOpen, openLogin, closeLogin } = useAuth();
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    // Only auto-open login on store pages
    if (!isAdminPage && !isLoggedIn && !hasSeenLogin) {
      const timer = setTimeout(() => openLogin(), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, hasSeenLogin, openLogin, isAdminPage]);

  // If we are in the admin dashboard, DO NOT render the store header, footer, or social buttons
  if (isAdminPage) {
    return <main className="flex-1 h-full">{children}</main>;
  }

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
