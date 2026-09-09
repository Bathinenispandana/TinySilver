"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/context/ToastContext";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const supabase = createClient();

  // Supabase automatically extracts the recovery token from the URL hash
  // and establishes a session. We just need to wait for that to happen.
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If there's no session, the link might be invalid or expired.
        // But since this can take a millisecond to process from the hash, 
        // we'll rely on Supabase's onAuthStateChange or just let the user try.
      }
    };
    checkSession();
  }, [supabase]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      return showToast("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      showToast("Password updated successfully!");
      // Redirect back to the homepage
      router.push("/");
    } catch (error: any) {
      showToast(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex w-full justify-center mb-6">
          <img
            src="/tinysilver.webp"
            alt="Tiny Silver Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#0f172a] mb-2">
          Update Password
        </h1>
        <p className="text-sm text-center text-[#827e9c] mb-8">
          Please enter your new password below.
        </p>

        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="new-password"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
              autoComplete="new-password"
              className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-3 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300 disabled:opacity-50"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full justify-center items-center gap-2 rounded-full bg-[#0f172a] py-3 text-sm font-semibold text-white hover:bg-[#827e9c] transition-all duration-300 disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}
