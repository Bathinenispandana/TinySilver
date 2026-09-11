"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, LogOut, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  email: string;
}

export default function AdminHeader({ email }: AdminHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-[#25314d] border-b border-black/10 flex items-center justify-between px-6 lg:px-8 shadow-sm relative z-50">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <Link
          href="/admin"
          className="flex shrink-0 items-center rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/60"
        >
          <Image
            src="/tinysilver.webp"
            alt="Tiny Silver Admin"
            width={160}
            height={60}
            priority
            className="h-12 w-auto object-contain"
          />
          <span className="ml-3 text-[#C9A66B] font-semibold text-lg tracking-wide hidden sm:block border-l border-white/20 pl-3">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Middle: Search (Optional for future) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
        <input
          type="text"
          placeholder="Search orders, customers..."
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B] transition-all"
        />
      </div>

      {/* Right side: Profile Menu */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A66B]/60"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-tight">Admin User</p>
            <p className="text-xs text-white/60">{email}</p>
          </div>
          <div className="h-10 w-10 bg-[#C9A66B] text-[#25314d] rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
            {email ? email.charAt(0).toUpperCase() : "A"}
          </div>
          <ChevronDown className="h-4 w-4 text-white/70" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-[120%] mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden py-1">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800">Signed in as</p>
              <p className="text-xs text-slate-500 truncate">{email}</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
