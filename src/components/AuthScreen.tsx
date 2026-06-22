import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader as Loader2, Mail, Lock, User as UserIcon, KeyRound, Check, Sparkles, Shield, ChefHat, Wallet, Scale, ArrowRight, Users, MessageSquare, Hop as Home, Zap, Star, Send, Hash, CircleCheck as CheckCircle2 } from "lucide-react";
import { setUser, enableDemoMode, registerAccount, validateCredentials } from "@/lib/mock-store";
import { submitReview } from "@/lib/room-api";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 35 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const FEATURES = [
  {
    icon: Home,
    title: "Room Management",
    body: "Create or join rooms with unique codes. Track roommates, manage shared spaces, and keep everyone in sync.",
    accent: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
  },
  {
    icon: Wallet,
    title: "Group Expense Tracking",
    body: "Split rent, utilities, food, and snacks with itemized chips. Real-time balances so everyone knows who owes what.",
    accent: "bg-electric-orange/15 text-electric-orange border-electric-orange/30",
  },
  {
    icon: MessageSquare,
    title: "Shared Reviews",
    body: "Rate your room experience and leave feedback. Honest reviews help future roommates find the right vibe.",
    accent: "bg-success/15 text-success border-success/30",
  },
  {
    icon: ChefHat,
    title: "Midnight Pantry AI",
    body: "Match your exact hostel ingredients. Pick 2–5 items and get a strict-mode recipe that uses only what you have.",
    accent: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
  },
  {
    icon: Scale,
    title: "The Tribunal",
    body: "Move room disputes cleanly from Open Dispute to Jury Review to Resolved. Anonymous POV voting keeps it fair.",
    accent: "bg-electric-orange/15 text-electric-orange border-electric-orange/30",
  },
  {
    icon: Zap,
    title: "Instant Demo Mode",
    body: "No sign-up required. Jump straight into a fully populated dashboard and explore every feature in seconds.",
    accent: "bg-success/15 text-success border-success/30",
  },
];

export default function AuthScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState<null | "email" | "google" | "apple" | "demo">(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = (provider: "email" | "google" | "apple") => {
    if (provider === "email") {
      if (!emailValid) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!password) {
        toast.error("Password is required.");
        return;
      }
      setLoading("email");
      setTimeout(() => {
        if (mode === "signup") {
          if (!name.trim()) {
            setLoading(null);
            toast.error("Please enter your full name.");
            return;
          }
          if (password.length < 6) {
            setLoading(null);
            toast.error("Password must be at least 6 characters.");
            return;
          }
          const res = registerAccount(name, email, password);
          if (!res.ok) {
            setLoading(null);
            toast.error(res.error);
            return;
          }
          toast.success("Account created. Welcome to SuiteSurvivor!");
          setUser({ name: name.trim(), email: email.trim().toLowerCase() });
        } else {
          const acct = validateCredentials(email, password);
          if (!acct) {
            setLoading(null);
            setPassword("");
            toast.error("Invalid credentials or account does not exist.");
            return;
          }
          setUser({ name: acct.name, email: acct.email });
        }
      }, 800);
      return;
    }
    setLoading(provider);
    setTimeout(() => {
      setUser({
        name: provider === "google" ? "Google Roomie" : "Apple Roomie",
        email: `${provider}@hostel.app`,
      });
    }, 1200);
  };

  const startDemo = () => {
    setLoading("demo");
    setTimeout(() => {
      enableDemoMode();
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-neon-purple/25 blur-3xl animate-float-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 px-4 pt-16 pb-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-neon-purple">
            <Sparkles className="h-3.5 w-3.5" />
            The Ultimate Space for Roommates to Co-Live &amp; Sync
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gradient leading-[1.1] tracking-tight">
            SuiteSurvivor
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The all-in-one hub to vibe with roommates, split expenses, resolve drama, and share reviews — before things boil over.
          </p>

          {/* Primary CTA — Demo Mode */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startDemo}
              disabled={!!loading}
              className="group px-8 py-4 rounded-2xl gradient-brand text-white font-black text-base glow-purple hover:scale-[1.03] active:scale-[0.97] transition disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2 relative overflow-hidden"
            >
              {loading === "demo" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Zap className="h-5 w-5 transition group-hover:scale-110" />
              )}
              {loading === "demo" ? "Launching instant tour…" : "Quick Demo Mode — Skip Auth"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <span className="text-xs text-muted-foreground">
              No sign-up required. Explore every feature in 60 seconds.
            </span>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="relative z-10 px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass-strong rounded-2xl p-5 flex flex-col gap-3 transition hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <div className={`shrink-0 h-10 w-10 rounded-xl grid place-items-center border ${f.accent}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW SUBMISSION SECTION */}
      <section className="relative z-10 px-4 pb-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium">share your room experience</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <InlineReviewForm />
        </div>
      </section>

      {/* AUTH CARD */}
      <section className="relative z-10 px-4 pb-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or sign in to save your room</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            {/* Mode toggle */}
            <div className="relative grid grid-cols-2 p-1 rounded-full glass mb-6">
              <div
                className="absolute top-1 bottom-1 w-1/2 rounded-full gradient-brand transition-transform duration-300"
                style={{
                  transform: mode === "signin" ? "translateX(0)" : "translateX(100%)",
                }}
              />
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="relative z-10 py-2 text-sm font-semibold"
                >
                  {m === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {mode === "signup" && (
                <Field
                  icon={<UserIcon className="h-4 w-4" />}
                  placeholder="Full name"
                  value={name}
                  onChange={setName}
                />
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
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="text-muted-foreground hover:text-foreground transition"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              {mode === "signup" && (
                <Field
                  icon={<KeyRound className="h-4 w-4" />}
                  placeholder="Room code / invite link (optional)"
                  value={room}
                  onChange={setRoom}
                />
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span
                    onClick={() => setRemember((r) => !r)}
                    className={`h-4 w-4 rounded grid place-items-center transition ${remember ? "gradient-brand" : "glass"}`}
                  >
                    {remember && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-gradient font-semibold hover:opacity-80">
                  Forgot password?
                </a>
              </div>

              <button
                onClick={() => submit("email")}
                disabled={!!loading}
                className="w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading === "email" ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </div>

            {/* Social login */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => submit("google")}
                disabled={!!loading}
                className="py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium disabled:opacity-70"
              >
                {loading === "google" ? <Loader2 className="h-5 w-5 animate-spin" /> : <><GoogleIcon /> Google</>}
              </button>
              <button
                onClick={() => submit("apple")}
                disabled={!!loading}
                className="py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium disabled:opacity-70"
              >
                {loading === "apple" ? <Loader2 className="h-5 w-5 animate-spin" /> : <><AppleIcon /> Apple</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-foreground transition">Privacy Policy</a>
            <span className="text-white/10">|</span>
            <a href="/privacy" className="hover:text-foreground transition">Terms of Service</a>
            <span className="text-white/10">|</span>
            <a href="/admin" className="hover:text-foreground transition">Admin</a>
          </div>
          <p className="opacity-60">SuiteSurvivor. Built for hostel life.</p>
        </div>
      </footer>
    </div>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  right,
  valid,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  right?: React.ReactNode;
  valid?: boolean;
}) {
  const borderClass =
    valid === true ? "border-success/60" : valid === false ? "border-destructive/60" : "border-white/10 focus-within:border-neon-purple/60";
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl glass border transition ${borderClass}`}>
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
      {right}
    </div>
  );
}

function InlineReviewForm() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim().length > 0 && roomCode.trim().length >= 3 && rating > 0 && feedback.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await submitReview(roomCode.trim(), name.trim(), rating, feedback.trim());
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setName("");
    setRoomCode("");
    setRating(0);
    setHoverRating(0);
    setFeedback("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="glass-strong rounded-3xl p-8 text-center space-y-4 animate-pop-in">
        <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple">
          <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-black text-gradient">Thanks for your review!</h3>
        <p className="text-sm text-muted-foreground">
          Your feedback helps future roommates find the right vibe.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-2xl gradient-brand text-white font-semibold glow-purple hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 space-y-5 animate-pop-in">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-black text-gradient">Leave a Review</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Rate your room experience and share honest feedback.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Room code (e.g. SUITE-123)"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <p className="text-xs font-semibold mb-2 text-muted-foreground">Rating</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              const active = value <= (hoverRating || rating);
              return (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(value)}
                  className="p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition ${active ? "text-electric-orange fill-electric-orange" : "text-muted-foreground/30"}`}
                  />
                </button>
              );
            })}
            <span className="ml-2 text-sm font-bold text-electric-orange">
              {rating > 0 ? `${rating}/5` : "Select a rating"}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold mb-2 text-muted-foreground">Feedback</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How was your room experience? What would you change?"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none placeholder:text-muted-foreground"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-4 w-4" /> Submit Review</>}
        </button>
      </div>
    </div>
  );
}
