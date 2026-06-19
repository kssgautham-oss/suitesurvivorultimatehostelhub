import { useState } from "react";
import { Gavel, Plus, Eye, EyeOff, Sparkles, X, Flame, Coffee, Scale as ScaleIcon } from "lucide-react";
import { toast } from "sonner";
import { useRoom, useAuth } from "@/lib/mock-store";

type Perspective = {
  id: string;
  juror: string;
  text: string;
  vibe: "🫣" | "😤" | "💀" | "🧘" | "🔥";
};

type OpinionVote = { voter: string; suspect: string; intensity: number };

type QuestStatus = "Open Dispute" | "Jury Review" | "Resolved";

type Incident = {
  id: string;
  title: string;
  crime: string;
  filedBy: string;
  createdAt: number;
  perspectives: Perspective[];
  opinions: OpinionVote[];
  status: QuestStatus;
};

const STATUS_STYLES: Record<QuestStatus, string> = {
  "Open Dispute": "bg-electric-orange/20 text-electric-orange border-electric-orange/40",
  "Jury Review": "bg-neon-purple/20 text-neon-pink border-neon-purple/40",
  "Resolved": "bg-success/20 text-success border-success/40",
};

const SEED_TITLES = [
  "The Case of the Vanishing Maggi",
  "The Great Wi-Fi Hostage Crisis",
  "Operation Wet Towel on My Bed",
  "Who Killed the Last Parle-G",
];

const VIBES: Perspective["vibe"][] = ["🫣", "😤", "💀", "🧘", "🔥"];

export default function Tribunal() {
  const room = useRoom();
  const user = useAuth();
  const currentAlias = user?.alias ?? "You";
  const names = room?.roommates ?? ["A", "B", "C"];
  const suspects = [...names, "The Ghost 👻", "Nobody, chill"];

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [openFile, setOpenFile] = useState(false);
  const [openPOV, setOpenPOV] = useState<Incident | null>(null);
  const [openOpinion, setOpenOpinion] = useState<Incident | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

  // file form
  const [title, setTitle] = useState("");
  const [crime, setCrime] = useState("");

  // pov form
  const [pText, setPText] = useState("");
  const [pVibe, setPVibe] = useState<Perspective["vibe"]>("🫣");

  // opinion form
  const [oSuspect, setOSuspect] = useState(suspects[0]);
  const [oIntensity, setOIntensity] = useState(60);

  const spillTea = () => {
    if (!crime.trim()) return;
    const inc: Incident = {
      id: Date.now().toString(36),
      title: title.trim() || SEED_TITLES[Math.floor(Math.random() * SEED_TITLES.length)],
      crime: crime.trim(),
      filedBy: currentAlias,
      createdAt: Date.now(),
      perspectives: [],
      opinions: [],
      status: "Open Dispute",
    };
    setIncidents([inc, ...incidents]);
    setTitle(""); setCrime("");
    setOpenFile(false);
    toast.success("Tea spilled. The room is watching. ☕🔥");
  };

  const submitPOV = () => {
    if (!openPOV || !pText.trim()) return;
    const alreadyPOV = openPOV.perspectives.some(p => p.juror === currentAlias);
    if (alreadyPOV) {
      toast.error("You already shared your POV on this case.");
      setOpenPOV(null);
      return;
    }
    const updated: Incident = {
      ...openPOV,
      status: openPOV.status === "Resolved" ? "Resolved" : "Jury Review",
      perspectives: [
        ...openPOV.perspectives,
        { id: Date.now().toString(36), juror: currentAlias, text: pText.trim(), vibe: pVibe },
      ],
    };
    setIncidents(incidents.map(i => (i.id === updated.id ? updated : i)));
    setOpenPOV(null);
    setPText("");
    toast.success("POV added to the lore. 🎭");
  };

  const toggleResolved = (inc: Incident) => {
    const next: QuestStatus = inc.status === "Resolved"
      ? (inc.perspectives.length > 0 ? "Jury Review" : "Open Dispute")
      : "Resolved";
    setIncidents(incidents.map(i => (i.id === inc.id ? { ...i, status: next } : i)));
    toast.success(next === "Resolved" ? "Case closed. Peace restored. 🕊️" : "Case reopened. Drama is back. 🔥");
  };

  const submitOpinion = () => {
    if (!openOpinion) return;
    const alreadyVoted = openOpinion.opinions.some(o => o.voter === currentAlias);
    if (alreadyVoted) {
      toast.error("You already cast your verdict on this case.");
      setOpenOpinion(null);
      return;
    }
    const updated: Incident = {
      ...openOpinion,
      opinions: [
        ...openOpinion.opinions,
        { voter: currentAlias, suspect: oSuspect, intensity: oIntensity },
      ],
    };
    setIncidents(incidents.map(i => (i.id === updated.id ? updated : i)));
    setOpenOpinion(null);
    toast.success("Vote locked in. The room has spoken. ⚖️");
  };

  const toggleReveal = (id: string) =>
    setReveal(r => ({ ...r, [id]: !r[id] }));

  const hasUserPOV = (inc: Incident) => inc.perspectives.some(p => p.juror === currentAlias);
  const hasUserOpinion = (inc: Incident) => inc.opinions.some(o => o.voter === currentAlias);

  return (
    <div className="space-y-5 animate-pop-in">
      {/* Header */}
      <div className="relative rounded-3xl p-[2px] gradient-brand glow-purple">
        <div className="rounded-[calc(1.5rem-2px)] bg-background/85 backdrop-blur-2xl p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-electric-orange font-bold">
            <Flame className="h-3.5 w-3.5" /> The Drama Board
          </div>
          <h3 className="mt-2 text-2xl font-black text-gradient">Hostel Tribunal 👀</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Log the chaos. Drop your POV. Let the room decide who's guilty.
          </p>
          <button
            onClick={() => setOpenFile(true)}
            className="mt-4 w-full py-3.5 rounded-2xl gradient-brand text-white font-black glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 text-base"
          >
            <Coffee className="h-5 w-5" /> Spill the Tea ☕
          </button>
        </div>
      </div>

      {/* Empty state */}
      {incidents.length === 0 && (
        <div className="glass rounded-3xl p-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl glass-strong grid place-items-center mb-2">
            <Gavel className="h-6 w-6 text-neon-pink" />
          </div>
          <p className="text-sm font-bold">The board is suspiciously quiet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            No drama logged yet. Either you live in heaven, or somebody is hiding the receipts.
          </p>
        </div>
      )}

      {/* Cases */}
      {incidents.map(inc => {
        const revealed = !!reveal[inc.id];
        const verdict = computeVerdict(inc.opinions);
        const userHasPOV = hasUserPOV(inc);
        const userHasOpinion = hasUserOpinion(inc);
        return (
          <div key={inc.id} className="glass-strong rounded-3xl p-5 space-y-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Case #{inc.id.slice(-4).toUpperCase()} · Filed by {inc.filedBy}
                </p>
                <h4 className="text-lg font-black text-gradient mt-1 truncate">{inc.title}</h4>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-wider border whitespace-nowrap ${STATUS_STYLES[inc.status]}`}>
                  {inc.status}
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full glass text-neon-pink font-bold whitespace-nowrap">
                  {inc.perspectives.length} POV · {inc.opinions.length} votes
                </span>
              </div>
            </div>

            {/* The crime */}
            <div className="glass rounded-2xl p-3">
              <p className="text-[10px] uppercase tracking-widest text-electric-orange font-bold mb-1">
                🔥 The Alleged Crime
              </p>
              <p className="text-sm leading-relaxed">{inc.crime}</p>
            </div>

            {/* Lore Timeline */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-widest text-neon-purple font-bold">
                  🎭 The Lore Timeline
                </p>
                {inc.perspectives.length > 0 && (
                  <button
                    onClick={() => toggleReveal(inc.id)}
                    className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-full glass hover:bg-white/15 transition"
                  >
                    {revealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {revealed ? "Hide" : "Reveal"}
                  </button>
                )}
              </div>

              {inc.perspectives.length === 0 ? (
                <div className="glass rounded-2xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    No POVs yet. The lore is unwritten. Be the first storyteller.
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
                  {inc.perspectives.map((p, i) => (
                    <div
                      key={p.id}
                      className="snap-start shrink-0 w-[78%] sm:w-[48%] rounded-2xl p-[1.5px] gradient-brand"
                    >
                      <div className="rounded-[calc(1rem-1.5px)] bg-background/85 backdrop-blur-xl p-3 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-electric-orange">
                            POV #{i + 1}
                          </span>
                          <span className="text-base">{p.vibe}</span>
                        </div>
                        <p className="text-sm leading-relaxed italic flex-1">"{p.text}"</p>
                        <p className="text-[10px] text-muted-foreground mt-2 pt-2 border-t border-white/10">
                          — {revealed ? p.juror : "Anonymous Juror"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => { setOpenPOV(inc); setPText(""); setPVibe("🫣"); }}
                disabled={userHasPOV}
                className={`mt-2 w-full py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${userHasPOV ? "glass opacity-50 cursor-not-allowed" : "glass hover:bg-white/15"}`}
              >
                <Plus className="h-4 w-4 text-neon-pink" /> {userHasPOV ? "POV Already Shared" : "Drop Your POV"}
              </button>
            </div>

            {/* Opinion Tracker */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neon-purple font-bold mb-2">
                ⚖️ Opinion Tracker
              </p>
              {verdict.total === 0 ? (
                <div className="glass rounded-2xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    No votes yet. The jury is still buffering…
                  </p>
                </div>
              ) : (
                <div className="glass rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Room consensus</span>
                    <span className="text-xs font-black text-gradient">{verdict.topSuspect} · {verdict.topPct}%</span>
                  </div>
                  {verdict.bars.map(b => (
                    <div key={b.suspect}>
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-bold truncate">{b.suspect}</span>
                        <span className="text-muted-foreground">{b.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full gradient-brand"
                          style={{ width: `${b.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>🌡️ Drama intensity</span>
                    <span className="font-bold text-electric-orange">{verdict.avgIntensity}%</span>
                  </div>
                </div>
              )}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setOpenOpinion(inc); setOSuspect(suspects[0]); setOIntensity(60); }}
                  disabled={userHasOpinion}
                  className={`py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${userHasOpinion ? "glass opacity-50 cursor-not-allowed" : "glass hover:bg-white/15"}`}
                >
                  <ScaleIcon className="h-4 w-4 text-electric-orange" /> {userHasOpinion ? "Verdict Locked" : "Verdict"}
                </button>
                <button
                  onClick={() => toggleResolved(inc)}
                  className={`py-2.5 rounded-2xl transition text-sm font-bold flex items-center justify-center gap-2 ${inc.status === "Resolved" ? "glass hover:bg-white/15" : "gradient-brand text-white glow-purple hover:scale-[1.02] active:scale-[0.98]"}`}
                >
                  {inc.status === "Resolved" ? "↩ Reopen" : "✓ Resolve"}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* File modal */}
      {openFile && (
        <Modal onClose={() => setOpenFile(false)} title="Spill the Tea ☕">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Headline (optional) — e.g. The Maggi Massacre"
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
          />
          <textarea
            value={crime}
            onChange={e => setCrime(e.target.value)}
            placeholder="What went down? Spill every detail. The room needs to know."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
          />
          <p className="text-[10px] text-muted-foreground">Filing as: <span className="font-bold text-foreground">{currentAlias}</span></p>
          <button
            onClick={spillTea}
            disabled={!crime.trim()}
            className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Flame className="h-4 w-4" /> Post to the Drama Board
          </button>
        </Modal>
      )}

      {/* POV modal */}
      {openPOV && (
        <Modal onClose={() => setOpenPOV(null)} title="Drop Your POV 🎭">
          <p className="text-xs text-muted-foreground -mt-1">
            On: <span className="text-foreground font-bold">{openPOV.title}</span>
          </p>
          <p className="text-[10px] text-muted-foreground">Submitting as: <span className="font-bold text-foreground">{currentAlias}</span> · stays anonymous until Reveal.</p>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Your vibe</p>
            <div className="flex gap-2">
              {VIBES.map(v => (
                <button
                  key={v}
                  onClick={() => setPVibe(v)}
                  className={`h-10 w-10 rounded-2xl text-lg transition ${pVibe === v ? "gradient-brand glow-purple scale-110" : "glass hover:bg-white/15"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={pText}
            onChange={e => setPText(e.target.value)}
            placeholder="Your version of events. Maybe it wasn't even a crime. Maybe it was self-defense against bad vibes…"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
          />
          <button
            onClick={submitPOV}
            disabled={!pText.trim()}
            className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" /> Add to the Lore
          </button>
        </Modal>
      )}

      {/* Opinion modal */}
      {openOpinion && (
        <Modal onClose={() => setOpenOpinion(null)} title="Cast Your Verdict ⚖️">
          <p className="text-xs text-muted-foreground -mt-1">
            On: <span className="text-foreground font-bold">{openOpinion.title}</span>
          </p>
          <p className="text-[10px] text-muted-foreground">Voting as: <span className="font-bold text-foreground">{currentAlias}</span></p>
          <ChipPicker label="Who caused this?" value={oSuspect} options={suspects} onChange={setOSuspect} />
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">How sure are you?</p>
              <span className="text-xs font-black text-electric-orange">{oIntensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={oIntensity}
              onChange={e => setOIntensity(Number(e.target.value))}
              className="w-full accent-[color:var(--neon-purple,#a855f7)]"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>🤷 Mid hunch</span>
              <span>🔥 1000% sure</span>
            </div>
          </div>
          <button
            onClick={submitOpinion}
            className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <ScaleIcon className="h-4 w-4" /> Lock In Verdict
          </button>
        </Modal>
      )}
    </div>
  );
}

function computeVerdict(opinions: OpinionVote[]) {
  const total = opinions.length;
  if (total === 0) return { total: 0, bars: [], topSuspect: "—", topPct: 0, avgIntensity: 0 };
  const counts: Record<string, number> = {};
  let intSum = 0;
  for (const o of opinions) {
    counts[o.suspect] = (counts[o.suspect] ?? 0) + 1;
    intSum += o.intensity;
  }
  const bars = Object.entries(counts)
    .map(([suspect, n]) => ({ suspect, pct: Math.round((n / total) * 100) }))
    .sort((a, b) => b.pct - a.pct);
  return {
    total,
    bars,
    topSuspect: bars[0].suspect,
    topPct: bars[0].pct,
    avgIntensity: Math.round(intSum / total),
  };
}

function ChipPicker({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${value === n ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in">
      <div className="w-full max-w-md rounded-3xl p-[2px] gradient-brand glow-purple max-h-[90vh] overflow-hidden">
        <div className="rounded-[calc(1.5rem-2px)] bg-background/90 backdrop-blur-2xl p-5 space-y-3 max-h-[calc(90vh-4px)] overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl -mx-5 px-5 -mt-5 pt-5 pb-2">
            <h3 className="text-lg font-black text-gradient">{title}</h3>
            <button
              onClick={onClose}
              className="h-8 w-8 grid place-items-center rounded-full glass hover:bg-white/15 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
