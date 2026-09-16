"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Key, Database, Activity } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Authenticate user
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      if (!data.user) {
        throw new Error("No user returned after sign in.");
      }

      // 2. Verify admin role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        // If profile doesn't exist or we can't read it
        await supabase.auth.signOut();
        throw new Error("Could not verify administrator privileges.");
      }

      if (profile.role !== "ADMIN") {
        await supabase.auth.signOut();
        throw new Error("Access Denied: You do not have administrator privileges.");
      }

      // 3. Success! Redirect to dashboard
      router.push("/admin/dashboard");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo / Icon Area */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#25314d] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <ShieldCheck className="w-8 h-8 text-[#C9A66B]" />
          </div>
          <h1 className="text-2xl font-bold text-[#25314d]">Admin Portal</h1>
          <p className="text-[#827e9c] text-sm mt-1">Sign in to manage your store</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c5c6cc] mb-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#25314d] mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#c5c6cc]" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#c5c6cc] rounded-lg focus:ring-2 focus:ring-[#C9A66B] focus:border-[#C9A66B] sm:text-sm transition-colors outline-none text-[#25314d]"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#25314d] mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#c5c6cc]" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#c5c6cc] rounded-lg focus:ring-2 focus:ring-[#C9A66B] focus:border-[#C9A66B] sm:text-sm transition-colors outline-none text-[#25314d]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#25314d] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#25314d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25314d] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* 4 Feature Cards */}
        <div className="flex flex-row justify-between gap-2 mb-8">
          <div className="bg-white p-2 rounded shadow-sm border border-[#c5c6cc] flex flex-col items-center text-center flex-1">
            <div className="w-6 h-6 bg-emerald-50 rounded-md flex items-center justify-center mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <h3 className="text-[10px] font-semibold text-[#25314d] leading-tight">Secure Login</h3>
          </div>
          
          <div className="bg-white p-2 rounded shadow-sm border border-[#c5c6cc] flex flex-col items-center text-center flex-1">
            <div className="w-6 h-6 bg-indigo-50 rounded-md flex items-center justify-center mb-1">
              <Key className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <h3 className="text-[10px] font-semibold text-[#25314d] leading-tight">Access Control</h3>
          </div>

          <div className="bg-white p-2 rounded shadow-sm border border-[#c5c6cc] flex flex-col items-center text-center flex-1">
            <div className="w-6 h-6 bg-purple-50 rounded-md flex items-center justify-center mb-1">
              <Database className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <h3 className="text-[10px] font-semibold text-[#25314d] leading-tight">Data Privacy</h3>
          </div>

          <div className="bg-white p-2 rounded shadow-sm border border-[#c5c6cc] flex flex-col items-center text-center flex-1">
            <div className="w-6 h-6 bg-amber-50 rounded-md flex items-center justify-center mb-1">
              <Activity className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <h3 className="text-[10px] font-semibold text-[#25314d] leading-tight">Monitoring</h3>
          </div>
        </div>
        
        {/* Footer Area */}
        <div className="text-center">
          <p className="text-xs text-[#827e9c]">
            Secure login for authorized personnel only.<br/>
            &copy; {new Date().getFullYear()} TinySilver E-Commerce.
          </p>
        </div>
      </div>
    </div>
  );
}
