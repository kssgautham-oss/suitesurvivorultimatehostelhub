import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, User as UserIcon, KeyRound, Check, Sparkles, Shield } from "lucide-react";
import { setUser, enableDemoMode, registerAccount, validateCredentials } from "@/lib/mock-store";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 35 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.6 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>
);

export default function AuthScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState<null | "email" | "google" | "facebook">(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = (provider: "email" | "google" | "facebook") => {
    setLoading(provider);
    setTimeout(() => {
      setUser({
        name: provider === "email" ? (name || email.split("@")[0] || "Roomie") : provider === "google" ? "Google Roomie" : "FB Roomie",
        email: provider === "email" ? email || "you@hostel.app" : `${provider}@hostel.app`,
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 animate-pop-in">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3">
            <Shield className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gradient">SuiteSurvivor</h1>
          <p className="text-sm text-muted-foreground mt-1">Ecosystem for tracking, managing & resolving drama before it starts.</p>
        </div>

        <div className="relative grid grid-cols-2 p-1 rounded-full glass mb-6">
          <div
            className="absolute top-1 bottom-1 w-1/2 rounded-full gradient-brand transition-transform duration-300"
            style={{ transform: mode === "signin" ? "translateX(0)" : "translateX(100%)" }}
          />
          {(["signin", "signup"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} className="relative z-10 py-2 text-sm font-semibold">
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {mode === "signup" && (
            <Field icon={<UserIcon className="h-4 w-4" />} placeholder="Full name" value={name} onChange={setName} />
          )}
          <Field
            icon={<Mail className="h-4 w-4" />}
            placeholder="Email"
            value={email}
            onChange={setEmail}
            type="email"
            valid={email.length > 0 ? emailValid : undefined}
          />
          <Field
            icon={<Lock className="h-4 w-4" />}
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type={show ? "text" : "password"}
            right={
              <button type="button" onClick={() => setShow(s => !s)} className="text-muted-foreground hover:text-foreground transition">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          {mode === "signup" && (
            <Field icon={<KeyRound className="h-4 w-4" />} placeholder="Room code / invite link" value={room} onChange={setRoom} />
          )}

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span
                onClick={() => setRemember(r => !r)}
                className={`h-4 w-4 rounded grid place-items-center transition ${remember ? "gradient-brand" : "glass"}`}
              >
                {remember && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-gradient font-semibold hover:opacity-80">Forgot password?</a>
          </div>

          <button
            onClick={() => submit("email")}
            disabled={!!loading}
            className="w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading === "email" ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "signin" ? "Sign In" : "Create Account"}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={() => submit("google")}
            disabled={!!loading}
            className="w-full py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-3 font-medium disabled:opacity-70"
          >
            {loading === "google" ? <Loader2 className="h-5 w-5 animate-spin" /> : <><GoogleIcon /> Sign in with Google</>}
          </button>
          <button
            onClick={() => submit("facebook")}
            disabled={!!loading}
            className="w-full py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-3 font-medium disabled:opacity-70"
          >
            {loading === "facebook" ? <Loader2 className="h-5 w-5 animate-spin" /> : <><FacebookIcon /> Sign in with Facebook</>}
          </button>

          <button
            onClick={enableDemoMode}
            disabled={!!loading}
            className="w-full mt-3 py-3 rounded-2xl gradient-brand glow-purple text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition relative overflow-hidden disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4" />
            ✨ Quick Demo Mode
          </button>
          <p className="text-[11px] text-center text-muted-foreground -mt-1">Skip auth · instant judge tour with mock data</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon, placeholder, value, onChange, type = "text", right, valid,
}: {
  icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; right?: React.ReactNode; valid?: boolean;
}) {
  const borderClass = valid === true ? "border-success/60" : valid === false ? "border-destructive/60" : "border-white/10 focus-within:border-neon-purple/60";
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl glass border transition ${borderClass}`}>
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
      {right}
    </div>
  );
}
