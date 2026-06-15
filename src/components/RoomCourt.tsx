import { useState } from "react";
import { Scale, Loader2, Share2, PenLine, ScrollText } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { useRoom } from "@/lib/mock-store";

type Treaty = {
  grievance: string;
  compromise: string;
  penalty: string;
  summary: string;
};

const TEMPLATES: ((g: string, names: string[]) => Treaty)[] = [
  (g, n) => ({
    grievance: `Filed by the room: "${g.slice(0, 140)}"`,
    compromise: `Quiet hours enforced from 12:00 AM to 7:00 AM. Headphones mandatory after midnight. ${n[0]} gets one "loud night" exemption per week with 6-hour notice.`,
    penalty: `Each violation = one round of midnight chai for the room (₹50 fund). Three strikes = lose AC remote privileges for a week.`,
    summary: `Peace restored. Sleep schedules respected. Snacks subsidized.`,
  }),
  (g, n) => ({
    grievance: `The court acknowledges: "${g.slice(0, 140)}"`,
    compromise: `Shared chore rotation reset every Monday. Defaulting party owes the room a homemade Maggi session within 48 hours.`,
    penalty: `Skipping chore week = ₹100 to the common pantry fund + losing the Wi-Fi password for 24 hours.`,
    summary: `Order restored to ${n.join(", ")}'s kingdom. Long live the treaty.`,
  }),
];

export default function RoomCourt() {
  const room = useRoom();
  const names = room?.roommates ?? ["A", "B", "C"];
  const [grievance, setGrievance] = useState("");
  const [loading, setLoading] = useState(false);
  const [treaty, setTreaty] = useState<Treaty | null>(null);
  const [signed, setSigned] = useState(false);

  const summon = () => {
    if (!grievance.trim()) return;
    setLoading(true);
    setTreaty(null);
    setSigned(false);
    setTimeout(() => {
      const tmpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      setTreaty(tmpl(grievance.trim(), names));
      setLoading(false);
    }, 1400);
  };

  const sign = () => {
    if (signed) return;
    setSigned(true);
    const burst = (x: number) =>
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { x, y: 0.6 },
        colors: ["#a855f7", "#f97316", "#ec4899", "#ffffff"],
      });
    burst(0.3); setTimeout(() => burst(0.7), 150); setTimeout(() => burst(0.5), 300);
    toast.success("Treaty ratified! Peace upon this room. ⚖️");
  };

  const share = async () => {
    if (!treaty) return;
    const text = `Our room just signed an official SuiteSurvivor Peace Treaty ⚖️🤖\n\nGrievance: ${grievance.trim()}\nCompromise: ${treaty.compromise}\nPenalty: ${treaty.penalty}\n\nGet your own at ${typeof window !== "undefined" ? window.location.origin : "suitesurvivor.app"}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Couldn't copy. Long-press to copy manually.");
    }
  };

  return (
    <div className="space-y-5 animate-pop-in">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <Scale className="h-3.5 w-3.5" /> Room Court
        </div>
        <h3 className="mt-2 text-2xl font-bold">File a Grievance</h3>
        <p className="text-xs text-muted-foreground mt-1">The AI mediator drafts a binding-ish peace treaty.</p>

        <textarea
          value={grievance}
          onChange={e => setGrievance(e.target.value)}
          placeholder="e.g., Karthik keeps playing Valorant until 3 AM with the lights on..."
          rows={4}
          className="mt-4 w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none placeholder:text-muted-foreground"
        />

        <button
          onClick={summon}
          disabled={!grievance.trim() || loading}
          className="mt-3 w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scale className="h-4 w-4" />}
          {loading ? "Consulting diplomatic archives…" : "Summon AI Mediator ⚖️"}
        </button>
      </div>

      {treaty && (
        <div className="relative rounded-3xl p-[2px] gradient-brand glow-purple animate-pop-in">
          <div className="rounded-[calc(1.5rem-2px)] bg-background/80 backdrop-blur-2xl p-5 space-y-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl gradient-brand grid place-items-center mb-2">
                <ScrollText className="h-6 w-6 text-white" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Hostel Peace Treaty</p>
              <h3 className="text-xl font-black text-gradient mt-1">Article I — Resolution</h3>
            </div>

            <Clause label="⚖️ Grievance" body={treaty.grievance} />
            <Clause label="🤝 Compromise" body={treaty.compromise} />
            <Clause label="🔥 Penalty Clause" body={treaty.penalty} />

            <p className="text-center text-xs italic text-muted-foreground border-t border-white/10 pt-3">{treaty.summary}</p>

            <div className="flex gap-2 pt-1">
              <button
                onClick={sign}
                disabled={signed}
                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition ${signed ? "bg-success/20 text-success border border-success/40" : "gradient-brand text-white glow-purple hover:scale-[1.02] active:scale-[0.98]"}`}
              >
                {signed ? "Treaty Ratified ✅" : <><PenLine className="h-4 w-4" /> Sign Treaty ✍️</>}
              </button>
              <button
                onClick={share}
                className="px-4 py-3 rounded-2xl glass hover:bg-white/15 transition flex items-center gap-2 font-bold"
                aria-label="Share treaty"
              >
                <Share2 className="h-4 w-4" /> 🔗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Clause({ label, body }: { label: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-3">
      <p className="text-[10px] uppercase tracking-widest text-electric-orange font-bold mb-1">{label}</p>
      <p className="text-sm leading-relaxed">{body}</p>
    </div>
  );
}
