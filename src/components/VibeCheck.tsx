import { useMemo, useState } from "react";
import { RotateCw, Flame, Link2, CheckCircle2, Clock, Plus, X, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useRoom, consumeSeedVibe, useCustomPolls, addCustomPoll, voteCustomPoll, type SeedVibe } from "@/lib/mock-store";

const QUESTIONS = [
  "Who left the empty milk packet inside the induction kettle and burnt the base again?",
  "Whose unwashed laundry pile is silently evolving into a new life form?",
  "Who steals the last Maggi packet at 2 AM without restocking?",
  "Whose 6 AM alarm rings 14 times before they touch it?",
  "Who would survive longest if the Wi-Fi died for a week?",
  "Whose side of the room qualifies as an official biohazard zone?",
];

export default function VibeCheck() {
  const room = useRoom();
  const ROOMMATES = room?.roommates ?? ["A", "B", "C"];

  const seed = useMemo<SeedVibe | null>(() => consumeSeedVibe(), []);
  const [seedExtras] = useState(seed);
  const [customQ, setCustomQ] = useState<string | null>(seed?.question ?? null);
  const [customPct, setCustomPct] = useState<Record<string, number> | null>(seed?.percentages ?? null);
  const [qIndex, setQIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string | null>>(
    seed
      ? Object.fromEntries(ROOMMATES.map(r => [r, seed.votes[r] ?? null]))
      : Object.fromEntries(ROOMMATES.map(r => [r, null]))
  );

  const polls = useCustomPolls();
  const [builderOpen, setBuilderOpen] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [newOpts, setNewOpts] = useState<string[]>(["", ""]);

  const allVoted = ROOMMATES.every(r => votes[r]);
  const question = customQ ?? QUESTIONS[qIndex];

  const verdict = useMemo(() => {
    if (customPct) {
      let winner = ""; let max = 0;
      Object.entries(customPct).forEach(([k, v]) => { if (v > max) { winner = k; max = v; } });
      return { winner, max, tally: customPct, isPercent: true };
    }
    const tally: Record<string, number> = {};
    Object.values(votes).forEach(v => { if (v) tally[v] = (tally[v] ?? 0) + 1; });
    let winner = ""; let max = 0;
    Object.entries(tally).forEach(([k, v]) => { if (v > max) { winner = k; max = v; } });
    return { winner, max, tally, isPercent: false };
  }, [votes, customPct]);

  const reset = () => {
    setCustomQ(null);
    setCustomPct(null);
    setQIndex(i => (i + 1) % QUESTIONS.length);
    setVotes(Object.fromEntries(ROOMMATES.map(r => [r, null])));
  };

  const share = async () => {
    const detail = verdict.isPercent
      ? `${verdict.winner} takes the crown with ${verdict.max}% of votes`
      : `${verdict.winner} wins — ${verdict.max}/${ROOMMATES.length} votes`;
    const text = `🔥 SuiteSurvivor Verdict: "${question}" → ${detail}. #RoomieDrama\n\nPick your own hot take at ${typeof window !== "undefined" ? window.location.origin : "suitesurvivor.app"}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Couldn't copy. Long-press to share manually.");
    }
  };

  const submitPoll = () => {
    const opts = newOpts.map(o => o.trim()).filter(Boolean);
    if (!newQ.trim() || opts.length < 2) {
      toast.error("Need a question and at least 2 options.");
      return;
    }
    addCustomPoll({ question: newQ.trim(), options: opts, source: "user" });
    toast.success("Poll launched! 🚀");
    setNewQ(""); setNewOpts(["", ""]); setBuilderOpen(false);
  };

  return (
    <div className="space-y-5 animate-pop-in">
      {/* Custom Poll Builder trigger */}
      <button
        onClick={() => setBuilderOpen(o => !o)}
        className="w-full glass-strong rounded-3xl p-4 flex items-center gap-3 hover:bg-white/10 transition group"
      >
        <div className="h-10 w-10 rounded-2xl gradient-brand grid place-items-center glow-purple group-hover:scale-110 transition">
          {builderOpen ? <X className="h-5 w-5 text-white" /> : <Plus className="h-5 w-5 text-white" />}
        </div>
        <div className="text-left flex-1">
          <p className="font-bold text-sm">Create Custom Poll</p>
          <p className="text-[11px] text-muted-foreground">Drop your own roomie drama for a vote</p>
        </div>
        <Sparkles className="h-4 w-4 text-electric-orange" />
      </button>

      {builderOpen && (
        <div className="glass-strong rounded-3xl p-5 space-y-3 animate-pop-in">
          <p className="text-[10px] uppercase tracking-widest text-electric-orange font-bold">New Poll</p>
          <input
            value={newQ}
            onChange={e => setNewQ(e.target.value)}
            placeholder="e.g. Who forgot to lock the main door?"
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
          />
          <div className="space-y-2">
            {newOpts.map((o, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={o}
                  onChange={e => setNewOpts(arr => arr.map((v, idx) => idx === i ? e.target.value : v))}
                  placeholder={`Option ${i + 1}`}
                  className="flex-1 px-4 py-2.5 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
                />
                {newOpts.length > 2 && (
                  <button onClick={() => setNewOpts(arr => arr.filter((_, idx) => idx !== i))} className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-destructive/20">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
            {newOpts.length < 4 && (
              <button onClick={() => setNewOpts(arr => [...arr, ""])} className="text-xs text-electric-orange font-semibold flex items-center gap-1 hover:underline">
                <Plus className="h-3 w-3" /> Add option ({4 - newOpts.length} left)
              </button>
            )}
          </div>
          <button onClick={submitPoll} className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition">
            <Wand2 className="h-4 w-4" /> Launch Poll
          </button>
        </div>
      )}

      {/* Live custom polls */}
      {polls.map(p => {
        const total = Object.values(p.tally).reduce((a, b) => a + b, 0);
        return (
          <div key={p.id} className="glass-strong rounded-3xl p-5 animate-pop-in">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neon-purple font-bold">
              <Sparkles className="h-3.5 w-3.5" /> {p.source === "onboarding" ? "Auto-Generated Poll" : "Custom Poll"}
            </div>
            <h3 className="mt-2 text-lg font-bold leading-snug">{p.question}</h3>
            <div className="mt-4 space-y-2">
              {p.options.map(opt => {
                const count = p.tally[opt] ?? 0;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <button
                    key={opt}
                    onClick={() => voteCustomPoll(p.id, opt)}
                    className="w-full relative overflow-hidden glass rounded-2xl p-3 text-left hover:bg-white/15 transition"
                  >
                    <div className="absolute inset-y-0 left-0 gradient-brand opacity-30 transition-all duration-500" style={{ width: `${pct}%` }} />
                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-semibold">{opt}</span>
                      <span className="text-xs font-bold text-gradient">{pct}% · {count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <Flame className="h-3.5 w-3.5" /> Active Poll
        </div>
        <h3 className="mt-2 text-2xl font-bold leading-snug">{question}</h3>

        <div className="mt-5 space-y-3">
          {ROOMMATES.map(voter => (
            <div key={voter} className="glass rounded-2xl p-3">
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-foreground">{voter}</span> votes for…
              </p>
              <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${ROOMMATES.length}, minmax(0, 1fr))` }}>
                {ROOMMATES.map(target => {
                  const picked = votes[voter] === target;
                  return (
                    <button
                      key={target}
                      onClick={() => { setVotes(v => ({ ...v, [voter]: target })); setCustomPct(null); }}
                      className={`py-2 rounded-xl text-xs font-semibold transition ${picked ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`}
                    >
                      {target}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(allVoted || customPct) && (
        <div className="relative rounded-3xl p-6 overflow-hidden animate-pop-in gradient-brand glow-purple">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative text-center text-white space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">The Verdict Is In</p>
            <h2 className="text-4xl font-black drop-shadow-lg">{verdict.winner}</h2>
            <p className="text-sm opacity-90 italic">"{question}"</p>
            <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
              {ROOMMATES.map(r => (
                <span key={r} className={`px-2 py-1 rounded-full text-[10px] font-bold ${r === verdict.winner ? "bg-white text-neon-purple" : "bg-white/20"}`}>
                  {r} · {verdict.tally[r] ?? 0}{verdict.isPercent ? "%" : ""}
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-3">
              <button onClick={share} className="flex-1 py-2.5 rounded-xl bg-white text-neon-purple font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition">
                <Link2 className="h-4 w-4" /> 🔗 Share Verdict
              </button>
              <button onClick={reset} className="px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur font-bold flex items-center justify-center gap-2 hover:bg-white/30 transition">
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {seedExtras?.completedQuestion && (
        <div className="glass-strong rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-success font-bold">
            <CheckCircle2 className="h-3.5 w-3.5" /> Completed Poll
          </div>
          <p className="mt-2 text-sm leading-relaxed">{seedExtras.completedQuestion}</p>
          {seedExtras.completedWinner && (
            <div className="mt-3 flex items-center justify-between glass rounded-2xl p-3">
              <span className="text-xs text-muted-foreground">Verdict</span>
              <span className="font-black text-gradient">{seedExtras.completedWinner}</span>
            </div>
          )}
        </div>
      )}

      {seedExtras?.upcomingQuestion && (
        <div className="glass-strong rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
            <Clock className="h-3.5 w-3.5" /> Upcoming Poll
          </div>
          <p className="mt-2 text-sm leading-relaxed">{seedExtras.upcomingQuestion}</p>
          <p className="mt-2 text-[10px] text-muted-foreground italic">Drops next — get ready to take sides.</p>
        </div>
      )}
    </div>
  );
}
