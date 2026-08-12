import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "SILVERAZ — Timeless Silver, Modern Elegance",
  description:
    "Handcrafted 925 sterling silver ornaments — rings, earrings, necklaces, bracelets and more. Discover timeless silver jewellery designed to become part of your story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0f172a]">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AppShell>{children}</AppShell>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
