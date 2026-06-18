import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Shuffle, Ghost } from "lucide-react";
import { generateAlias, setAlias } from "@/lib/mock-store";

export default function AliasOnboarding() {
  const [alias, setLocalAlias] = useState(generateAlias);

  const reroll = () => setLocalAlias(generateAlias());

  const confirm = () => {
    const trimmed = alias.trim();
    if (trimmed.length < 3) { toast.error("Alias must be at least 3 characters."); return; }
    if (trimmed.length > 24) { toast.error("Alias must be under 24 characters."); return; }
    if (/\s/.test(trimmed)) { toast.error("No spaces — use _ or - instead."); return; }
    setAlias(trimmed);
    toast.success(`Welcome, ${trimmed}. Your real name stays a mystery.`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 animate-pop-in">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3">
            <Ghost className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-gradient">Pick your hostel alias</h1>
          <p className="text-sm text-muted-foreground mt-1">Anonymity rule: your real name never shows up. Pick a handle the jury will know you by.</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <input
              value={alias}
              onChange={(e) => setLocalAlias(e.target.value)}
              maxLength={24}
              placeholder="e.g. Room302_Survivor"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <button
            onClick={reroll}
            className="w-full py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center justify-center gap-2 font-medium"
          >
            <Shuffle className="h-4 w-4" /> Generate another one
          </button>

          <button
            onClick={confirm}
            className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Lock in alias
          </button>

          <p className="text-[11px] text-center text-muted-foreground pt-1">
            This is the only name shown on the Dashboard, Drama Board, polls, and splits.
          </p>
        </div>
      </div>
    </div>
  );
}
