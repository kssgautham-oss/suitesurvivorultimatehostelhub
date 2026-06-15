import { useMemo, useState } from "react";
import { Share2, RotateCw, Flame, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useRoom, consumeSeedVibe } from "@/lib/mock-store";

const QUESTIONS = [
  "Who is most likely to leave the AC running?",
  "Who has the most chaotic study schedule?",
  "Who steals the last Maggi packet?",
  "Whose alarm wakes everyone up at 6 AM?",
  "Who would survive longest without internet?",
  "Whose side of the room is a biohazard?",
];

export default function VibeCheck() {
  const room = useRoom();
  const ROOMMATES = room?.roommates ?? ["A", "B", "C"];

  const seed = useMemo(() => consumeSeedVibe(), []);
  const [customQ, setCustomQ] = useState<string | null>(seed?.question ?? null);
  const [qIndex, setQIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string | null>>(
    seed
      ? Object.fromEntries(ROOMMATES.map(r => [r, seed.votes[r] ?? null]))
      : Object.fromEntries(ROOMMATES.map(r => [r, null]))
  );

  const allVoted = ROOMMATES.every(r => votes[r]);
  const question = customQ ?? QUESTIONS[qIndex];

  const verdict = useMemo(() => {
    const tally: Record<string, number> = {};
    Object.values(votes).forEach(v => { if (v) tally[v] = (tally[v] ?? 0) + 1; });
    let winner = ""; let max = 0;
    Object.entries(tally).forEach(([k, v]) => { if (v > max) { winner = k; max = v; } });
    return { winner, max, tally };
  }, [votes]);

  const reset = () => {
    setCustomQ(null);
    setQIndex(i => (i + 1) % QUESTIONS.length);
    setVotes(Object.fromEntries(ROOMMATES.map(r => [r, null])));
  };

  const share = async () => {
    const text = `🔥 SuiteSurvivor Verdict: ${verdict.winner} wins "${question}" — ${verdict.max}/${ROOMMATES.length} votes. #RoomieDrama\n\nPick your own hot take at ${typeof window !== "undefined" ? window.location.origin : "suitesurvivor.app"}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      if (navigator.share) {
        try { await navigator.share({ text, title: "SuiteSurvivor" }); } catch {}
      } else {
        toast.error("Couldn't copy. Long-press to share manually.");
      }
    }
  };

  return (
    <div className="space-y-5 animate-pop-in">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <Flame className="h-3.5 w-3.5" /> Roommate Hot Take
        </div>
        <h3 className="mt-2 text-2xl font-bold leading-snug">{question}</h3>

        <div className="mt-5 space-y-3">
          {ROOMMATES.map(voter => (
            <div key={voter} className="glass rounded-2xl p-3">
              <p className="text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-foreground">{voter}</span> votes for…
              </p>
              <div className="grid grid-cols-3 gap-2">
                {ROOMMATES.map(target => {
                  const picked = votes[voter] === target;
                  return (
                    <button
                      key={target}
                      onClick={() => setVotes(v => ({ ...v, [voter]: target }))}
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

      {allVoted && (
        <div className="relative rounded-3xl p-6 overflow-hidden animate-pop-in gradient-brand glow-purple">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative text-center text-white space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">The Verdict Is In</p>
            <h2 className="text-4xl font-black drop-shadow-lg">{verdict.winner}</h2>
            <p className="text-sm opacity-90 italic">"{question}"</p>
            <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
              {ROOMMATES.map(r => (
                <span key={r} className={`px-2 py-1 rounded-full text-[10px] font-bold ${r === verdict.winner ? "bg-white text-neon-purple" : "bg-white/20"}`}>
                  {r} · {verdict.tally[r] ?? 0}
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
    </div>
  );
}
