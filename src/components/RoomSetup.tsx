import { useState } from "react";
import { Plus, LogIn, ArrowLeft, Sparkles, Copy, Check, KeyRound, Users, Moon, Sun, Snowflake, Cookie, Loader as Loader2 } from "lucide-react";
import { setRoom, generateRoomCode, addCustomPoll, type Room } from "@/lib/mock-store";
import { findRoomByCode, createRoom } from "@/lib/room-api";
import { toast } from "sonner";

type Mode = "choose" | "create" | "join" | "survey" | "success";
type Size = 2 | 3;

export default function RoomSetup() {
  const [mode, setMode] = useState<Mode>("choose");
  const [size, setSize] = useState<Size>(3);
  const [me, setMe] = useState("");
  const [r2, setR2] = useState("");
  const [r3, setR3] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState<Room | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomNotFound, setRoomNotFound] = useState(false);

  // Survey state (join flow)
  const [sleep, setSleep] = useState<"owl" | "bird" | null>(null);
  const [ac, setAc] = useState<"arctic" | "chill" | "warm" | null>(null);
  const [snack, setSnack] = useState<"share" | "ask" | "mine" | null>(null);

  const create = async () => {
    if (!me.trim() || !r2.trim() || (size === 3 && !r3.trim())) return;
    setLoading(true);
    try {
      const mates = size === 3 ? [me.trim(), r2.trim(), r3.trim()] : [me.trim(), r2.trim()];
      const roomCode = generateRoomCode();
      await createRoom(roomCode, `${me.trim()}'s Room`, mates);
      setPending({ code: roomCode, roommates: mates });
      setMode("success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const join = async () => {
    if (code.trim().length < 3) return;
    setLoading(true);
    setRoomNotFound(false);
    try {
      const room = await findRoomByCode(code);
      if (!room) {
        setRoomNotFound(true);
        setLoading(false);
        return;
      }
      setMode("survey");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to look up room");
    } finally {
      setLoading(false);
    }
  };

  const finishJoin = () => {
    const room: Room = {
      code: code.trim().toUpperCase().startsWith("SUITE-")
        ? code.trim().toUpperCase()
        : `SUITE-${code.trim().replace(/\D/g, "").slice(0, 3) || "742"}`,
      roommates: ["You", "Arjun"],
    };
    if (sleep) {
      addCustomPoll({
        question: sleep === "owl"
          ? "Poll: Who is crashing first based on bedtime habits — the night owl or the early riser?"
          : "Poll: Who's actually getting more done — early bird You or night-owl Arjun?",
        options: ["You", "Arjun"],
        source: "onboarding",
      });
    }
    if (ac) {
      addCustomPoll({
        question: `Poll: AC showdown — You want it ${ac === "arctic" ? "arctic ❄️" : ac === "chill" ? "comfortably chill" : "barely on"}, Arjun disagrees. Whose setting wins tonight?`,
        options: ["You", "Arjun"],
        source: "onboarding",
      });
    }
    if (snack) {
      addCustomPoll({
        question: snack === "share"
          ? "Poll: Snack-sharing is sacred — who will be the first to break the pact?"
          : snack === "ask"
          ? "Poll: Ask-before-you-eat rule in effect. Who'll forget within 48 hours?"
          : "Poll: 'Don't touch my Maggi' energy detected. Who gets caught raiding first?",
        options: ["You", "Arjun"],
        source: "onboarding",
      });
    }
    setRoom(room);
  };

  const confirm = () => { if (pending) setRoom(pending); };

  const copy = async () => {
    if (!pending) return;
    try { await navigator.clipboard.writeText(pending.code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-neon-purple/40 blur-3xl animate-float-blob" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-electric-orange/30 blur-3xl animate-float-blob" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 animate-pop-in">
        {mode !== "choose" && mode !== "success" && (
          <button onClick={() => { setMode(mode === "survey" ? "join" : "choose"); setRoomNotFound(false); }} className="mb-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
        )}

        {mode === "choose" && (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">Set up your room</h1>
              <p className="text-sm text-muted-foreground mt-1">Start fresh or hop into your roomies' hub.</p>
            </div>
            <div className="space-y-3">
              <button onClick={() => setMode("create")} className="w-full p-4 rounded-2xl gradient-brand glow-purple text-white text-left hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center"><Plus className="h-5 w-5" /></div>
                <div>
                  <p className="font-bold">Create a New Room</p>
                  <p className="text-xs opacity-90">Name your crew & get an invite code</p>
                </div>
              </button>
              <button onClick={() => setMode("join")} className="w-full p-4 rounded-2xl glass hover:bg-white/15 text-left transition flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center"><LogIn className="h-5 w-5 text-white" /></div>
                <div>
                  <p className="font-bold">Join an Existing Room</p>
                  <p className="text-xs text-muted-foreground">Got a code from a roomie?</p>
                </div>
              </button>
            </div>
          </>
        )}

        {mode === "create" && (
          <>
            <h2 className="text-2xl font-bold text-gradient mb-1">Name your crew</h2>
            <p className="text-sm text-muted-foreground mb-4">Pick your room size, then name the chaos squad.</p>

            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Room Size</p>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl glass">
                {([2, 3] as Size[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition ${size === s ? "gradient-brand text-white glow-purple" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {s} Roommates
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Field placeholder="Your nickname" value={me} onChange={setMe} />
              <Field placeholder="Roommate 2's nickname" value={r2} onChange={setR2} />
              {size === 3 && <Field placeholder="Roommate 3's nickname" value={r3} onChange={setR3} />}
              <button
                onClick={create}
                disabled={!me.trim() || !r2.trim() || (size === 3 && !r3.trim()) || loading}
                className="w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Generate Room Hub
              </button>
            </div>
          </>
        )}

        {mode === "join" && (
          <>
            <h2 className="text-2xl font-bold text-gradient mb-1">Join the hub</h2>
            <p className="text-sm text-muted-foreground mb-5">Pop in the code your roomie sent you.</p>
            <div className="space-y-3">
              <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl glass border transition ${roomNotFound ? "border-destructive/60" : "border-white/10 focus-within:border-neon-purple/60"}`}>
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <input
                  value={code}
                  onChange={e => { setCode(e.target.value.toUpperCase()); setRoomNotFound(false); }}
                  placeholder="Enter Room Code (e.g. SUITE-123)"
                  className="flex-1 bg-transparent outline-none text-sm tracking-widest placeholder:text-muted-foreground placeholder:tracking-normal"
                />
              </div>
              {roomNotFound && (
                <p className="text-xs text-destructive font-medium">Room Not Found — double-check the code with your roomie.</p>
              )}
              <button
                onClick={join}
                disabled={code.trim().length < 3 || loading}
                className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Next: Quick Vibe Check"}
              </button>
            </div>
          </>
        )}

        {mode === "survey" && (
          <>
            <h2 className="text-2xl font-bold text-gradient mb-1">Onboarding Vibe Check</h2>
            <p className="text-sm text-muted-foreground mb-5">3 quick taps. We'll auto-generate polls comparing your habits to your roomie.</p>

            <SurveyBlock title="Are you a night owl or an early bird?">
              <Pill active={sleep === "owl"} onClick={() => setSleep("owl")} icon={<Moon className="h-3.5 w-3.5" />} label="Night Owl" />
              <Pill active={sleep === "bird"} onClick={() => setSleep("bird")} icon={<Sun className="h-3.5 w-3.5" />} label="Early Bird" />
            </SurveyBlock>

            <SurveyBlock title="Ultimate room AC setting?">
              <Pill active={ac === "arctic"} onClick={() => setAc("arctic")} icon={<Snowflake className="h-3.5 w-3.5" />} label="Arctic 18°" />
              <Pill active={ac === "chill"} onClick={() => setAc("chill")} label="Chill 22°" />
              <Pill active={ac === "warm"} onClick={() => setAc("warm")} label="Barely On 26°" />
            </SurveyBlock>

            <SurveyBlock title="Stance on sharing snacks/Maggi?">
              <Pill active={snack === "share"} onClick={() => setSnack("share")} icon={<Cookie className="h-3.5 w-3.5" />} label="Share Freely" />
              <Pill active={snack === "ask"} onClick={() => setSnack("ask")} label="Ask First" />
              <Pill active={snack === "mine"} onClick={() => setSnack("mine")} label="Mine. Don't Touch." />
            </SurveyBlock>

            <button
              onClick={finishJoin}
              className="mt-4 w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Enter Room →
            </button>
            <button onClick={finishJoin} className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground transition">
              Skip for now
            </button>
          </>
        )}

        {mode === "success" && pending && (
          <div className="text-center space-y-4">
            <div className="mx-auto h-14 w-14 rounded-2xl gradient-brand grid place-items-center glow-purple">
              <Check className="h-7 w-7 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gradient">Room is live!</h2>
            <p className="text-sm text-muted-foreground">Share this invite code with your roomies.</p>
            <button onClick={copy} className="mx-auto flex items-center gap-2 px-5 py-3 rounded-2xl glass border border-neon-purple/40 hover:bg-white/15 transition">
              <span className="text-2xl font-black tracking-widest text-gradient">{pending.code}</span>
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
            </button>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {pending.roommates.map(r => (
                <span key={r} className="px-3 py-1 rounded-full glass text-xs font-semibold">{r}</span>
              ))}
            </div>
            <button onClick={confirm} className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition">
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
    </div>
  );
}

function SurveyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-semibold mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${active ? "gradient-brand text-white glow-purple" : "glass hover:bg-white/15 text-muted-foreground"}`}
    >
      {icon}{label}
    </button>
  );
}
