"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LogIn, UserPlus } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/src/lib/supabase";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Supabase keys are missing. Add them to .env.local to enable auth.");
      return;
    }

    setIsLoading(true);
    const authAction =
      mode === "sign-in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`
            }
          });

    const { error } = await authAction;
    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (mode === "sign-up") {
      setMessage("Account created. Check your email if confirmation is enabled.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="auth-card">
      <div className="auth-toggle" role="tablist" aria-label="Auth mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sign-in"}
          className={mode === "sign-in" ? "active" : ""}
          onClick={() => setMode("sign-in")}
        >
          <LogIn aria-hidden="true" size={17} />
          Login
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sign-up"}
          className={mode === "sign-up" ? "active" : ""}
          onClick={() => setMode("sign-up")}
        >
          <UserPlus aria-hidden="true" size={17} />
          Sign up
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="dispatch@company.com"
            required
          />
        </label>
        <label>
          <span>Password</span>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
            </button>
          </div>
        </label>
        <button className="primary-button full-button" type="submit" disabled={isLoading || !isSupabaseConfigured}>
          {isLoading ? <LoaderCircle className="spin" aria-hidden="true" size={18} /> : <LogIn aria-hidden="true" size={18} />}
          {mode === "sign-in" ? "Login to dashboard" : "Create account"}
        </button>
      </form>

      {message ? <p className="auth-message">{message}</p> : null}
      {!isSupabaseConfigured ? (
        <p className="auth-message setup-message">Add Supabase project values before enabling production login.</p>
      ) : null}
    </div>
  );
}
