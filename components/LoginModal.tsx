"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, mode === "signup" ? name || "Customer" : undefined);
    showToast(
      mode === "signup" ? "Account created — welcome!" : "Welcome back!"
    );
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-sm px-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="animate-modal-in relative w-full max-w-sm rounded-2xl bg-white p-7 sm:p-8 shadow-2xl">
        <button
          type="button"
          aria-label="Close login modal"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#0f172a] hover:bg-[#c5c6cc]/30 transition-all duration-300"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="text-xl font-semibold tracking-widest text-[#0f172a]">
            SILVERAZ
          </span>
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

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
                className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
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
              className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
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
              minLength={4}
              className="w-full rounded-lg border border-[#c5c6cc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#827e9c] transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-[#0f172a] py-3 text-sm font-semibold text-white hover:bg-[#827e9c] transition-all duration-300"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {mode === "login" && (
          <button
            type="button"
            onClick={() => showToast("Password reset link sent (simulated)")}
            className="mt-4 w-full text-center text-xs text-[#827e9c] hover:text-[#0f172a] transition-colors duration-300"
          >
            Forgot Password?
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            login("guest@silveraz.com", "Guest User");
            showToast("Continuing with Google (simulated)");
            onClose();
          }}
          className="mt-4 w-full rounded-full border border-[#c5c6cc] py-3 text-sm font-medium text-[#0f172a] hover:bg-[#c5c6cc]/30 transition-all duration-300"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-[#827e9c]">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
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
                className="font-medium text-[#0f172a] hover:text-[#827e9c] transition-colors duration-300"
              >
                Login
              </button>
            </>
          )}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-xs text-[#827e9c] hover:text-[#0f172a] underline underline-offset-2 transition-colors duration-300"
        >
          Continue browsing as guest
        </button>
      </div>
    </div>
  );
}
