"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { createClient } from "@/lib/supabase/client";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Individual loading states
  const [submitLoading, setSubmitLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  
  const isAnyLoading = submitLoading || googleLoading || forgotLoading;

  const overlayRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isAnyLoading) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, isAnyLoading]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setSubmitLoading(true);
    
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name || "Customer",
            }
          }
        });
        
        if (error) throw error;
        showToast("Account created successfully! Welcome.");
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        showToast("Welcome back!");
        onClose();
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      showToast(err.message || "Could not connect to Google");
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      return showToast("Please enter your email address first.");
    }
    setForgotLoading(true);
    // Use the auth callback so the server session is established via PKCE before redirecting!
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });
    setForgotLoading(false);
    if (error) {
      showToast(error.message);
    } else {
      showToast("Password reset link sent to your email!");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current && !isAnyLoading) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-sm px-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="animate-modal-in relative flex max-h-[80vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          aria-label="Close login modal"
          onClick={onClose}
          disabled={isAnyLoading}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#0f172a] backdrop-blur-sm hover:bg-[#c5c6cc]/30 transition-all duration-300 disabled:opacity-50"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="overflow-y-auto p-7 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex w-full justify-center">
              <img
                src="/tinysilver.webp"
                alt="Tiny Silver Logo"
                className="h-16 w-auto object-contain sm:h-16 lg:h-20"
              />
            </div>
            <h2
              id="login-modal-title"
              className="mt-5 text-lg font-semibold text-[#0f172a]"
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-1 text-sm text-[#827e9c]">
              {mode === "login"
                ? "Sign in to continue your silver journey."
                : "Join us for early access to new arrivals."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" autoComplete="off">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isAnyLoading}
                  autoComplete="off"
                  className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300 disabled:opacity-50"
                  placeholder="Ananya Sharma"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isAnyLoading}
                autoComplete="off"
                className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#0f172a]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isAnyLoading}
                autoComplete="new-password"
                className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isAnyLoading}
              className="mt-1 flex w-full justify-center items-center gap-2 rounded-full bg-[#0f172a] py-3 text-sm font-semibold text-white hover:bg-[#827e9c] transition-all duration-300 disabled:opacity-70"
            >
              {submitLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {mode === "login" && (
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isAnyLoading}
              className="mt-4 flex w-full justify-center items-center gap-2 text-center text-xs text-[#827e9c] hover:text-[#0f172a] transition-colors duration-300 disabled:opacity-50"
            >
              {forgotLoading && <Loader2 className="h-3 w-3 animate-spin" />}
              Forgot Password?
            </button>
          )}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isAnyLoading}
            className="mt-4 flex w-full justify-center items-center gap-2 rounded-full border border-[#c5c6cc] py-3 text-sm font-medium text-[#0f172a] hover:bg-[#c5c6cc]/30 transition-all duration-300 disabled:opacity-50"
          >
            {googleLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Continue with Google
          </button>

          <p className="mt-5 text-center text-sm text-[#827e9c]">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  disabled={isAnyLoading}
                  className="font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300 disabled:opacity-50"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  disabled={isAnyLoading}
                  className="font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300 disabled:opacity-50"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
