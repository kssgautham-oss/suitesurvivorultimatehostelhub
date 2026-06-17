import { useState } from "react";
import { Gavel, Plus, Eye, EyeOff, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useRoom } from "@/lib/mock-store";

type Perspective = {
  id: string;
  juror: string; // roommate slot index label, kept anonymous in UI
  text: string;
};

type Incident = {
  id: string;
  title: string;
  crime: string;
  filedBy: string;
  createdAt: number;
  perspectives: Perspective[];
};

const SEED_TITLES = [
  "The Case of the Vanishing Maggi",
  "The Great Wi-Fi Hostage Crisis",
  "Operation Wet Towel on My Bed",
];

export default function Tribunal() {
  const room = useRoom();
  const names = room?.roommates ?? ["A", "B", "C"];
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [openFile, setOpenFile] = useState(false);
  const [openCase, setOpenCase] = useState<Incident | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

  // file form
  const [title, setTitle] = useState("");
  const [crime, setCrime] = useState("");
  const [filedBy, setFiledBy] = useState(names[0]);

  // perspective form
  const [pJuror, setPJuror] = useState(names[0]);
  const [pText, setPText] = useState("");

  const fileCase = () => {
    if (!crime.trim()) return;
    const inc: Incident = {
      id: Date.now().toString(36),
      title: title.trim() || SEED_TITLES[Math.floor(Math.random() * SEED_TITLES.length)],
      crime: crime.trim(),
      filedBy,
      createdAt: Date.now(),
      perspectives: [],
    };
    setIncidents([inc, ...incidents]);
    setTitle(""); setCrime(""); setFiledBy(names[0]);
    setOpenFile(false);
    toast.success("Case filed. The tribunal awaits testimony. 🪑");
  };

  const submitPerspective = () => {
    if (!openCase || !pText.trim()) return;
    const updated: Incident = {
      ...openCase,
      perspectives: [
        ...openCase.perspectives,
        { id: Date.now().toString(36), juror: pJuror, text: pText.trim() },
      ],
    };
    setIncidents(incidents.map(i => (i.id === updated.id ? updated : i)));
    setOpenCase(updated);
    setPText("");
    toast.success("Testimony recorded anonymously. 🤐");
  };

  const toggleReveal = (id: string) =>
    setReveal(r => ({ ...r, [id]: !r[id] }));

  return (
    <div className="space-y-5 animate-pop-in">
      {/* Header */}
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <Gavel className="h-3.5 w-3.5" /> The Tribunal
        </div>
        <h3 className="mt-2 text-2xl font-bold">Incident Log</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Log the crime. Let the jury speak. Survival-show style.
        </p>
        <button
          onClick={() => setOpenFile(true)}
          className="mt-4 w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> File a New Incident
        </button>
      </div>

      {/* Empty state */}
      {incidents.length === 0 && (
        <div className="glass rounded-3xl p-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl glass-strong grid place-items-center mb-2">
            <Gavel className="h-6 w-6 text-neon-pink" />
          </div>
          <p className="text-sm font-bold">Court is in recess.</p>
          <p className="text-xs text-muted-foreground mt-1">
            No incidents logged yet. Either your room is a utopia, or someone is suppressing evidence.
          </p>
        </div>
      )}

      {/* Cases */}
      {incidents.map(inc => {
        const revealed = !!reveal[inc.id];
        return (
          <div key={inc.id} className="glass-strong rounded-3xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Case #{inc.id.slice(-4).toUpperCase()} · Filed by {inc.filedBy}
                </p>
                <h4 className="text-lg font-black text-gradient mt-1 truncate">{inc.title}</h4>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full glass text-neon-pink font-bold whitespace-nowrap">
                {inc.perspectives.length} 🗣️
              </span>
            </div>

            <div className="glass rounded-2xl p-3">
              <p className="text-[10px] uppercase tracking-widest text-electric-orange font-bold mb-1">
                🔥 The Alleged Crime
              </p>
              <p className="text-sm leading-relaxed">{inc.crime}</p>
            </div>

            {/* Jury */}
            {inc.perspectives.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-neon-purple font-bold">
                    🪑 Jury Box · Different Possibilities
                  </p>
                  <button
                    onClick={() => toggleReveal(inc.id)}
                    className="text-[10px] flex items-center gap-1 px-2 py-1 rounded-full glass hover:bg-white/15 transition"
                  >
                    {revealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {revealed ? "Hide names" : "Reveal jury"}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inc.perspectives.map((p, i) => (
                    <div
                      key={p.id}
                      className="relative rounded-2xl p-[1.5px] gradient-brand"
                    >
                      <div className="rounded-[calc(1rem-1.5px)] bg-background/80 backdrop-blur-xl p-3 h-full">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-electric-orange">
                            Juror #{i + 1}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {revealed ? p.juror : "Anonymous"}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed italic">"{p.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => { setOpenCase(inc); setPJuror(names[0]); setPText(""); }}
              className="w-full py-2.5 rounded-2xl glass hover:bg-white/15 transition text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-neon-pink" /> Submit Your Perspective
            </button>
          </div>
        );
      })}

      {/* File modal */}
      {openFile && (
        <Modal onClose={() => setOpenFile(false)} title="File a New Incident">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Case title (optional)"
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60"
          />
          <textarea
            value={crime}
            onChange={e => setCrime(e.target.value)}
            placeholder="What happened? Describe the alleged crime in dramatic detail…"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
          />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Filed by</p>
            <div className="flex flex-wrap gap-2">
              {names.map(n => (
                <button
                  key={n}
                  onClick={() => setFiledBy(n)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${filedBy === n ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={fileCase}
            disabled={!crime.trim()}
            className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Gavel className="h-4 w-4" /> Open the Case
          </button>
        </Modal>
      )}

      {/* Perspective modal */}
      {openCase && (
        <Modal onClose={() => setOpenCase(null)} title="Your Perspective (Anonymous)">
          <p className="text-xs text-muted-foreground -mt-1">
            On: <span className="text-foreground font-bold">{openCase.title}</span>
          </p>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">Submitting as</p>
            <div className="flex flex-wrap gap-2">
              {names.map(n => (
                <button
                  key={n}
                  onClick={() => setPJuror(n)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${pJuror === n ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15"}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">
              🤫 Identity stays hidden until the room hits "Reveal jury".
            </p>
          </div>
          <textarea
            value={pText}
            onChange={e => setPText(e.target.value)}
            placeholder="Your version of events. Maybe it wasn't even a crime. Maybe it was self-defense against bad vibes…"
            rows={4}
            className="w-full px-4 py-3 rounded-2xl glass outline-none text-sm border border-white/10 focus:border-neon-purple/60 resize-none"
          />
          <button
            onClick={submitPerspective}
            disabled={!pText.trim()}
            className="w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" /> Submit Testimony
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in">
      <div className="w-full max-w-md rounded-3xl p-[2px] gradient-brand glow-purple">
        <div className="rounded-[calc(1.5rem-2px)] bg-background/90 backdrop-blur-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
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
