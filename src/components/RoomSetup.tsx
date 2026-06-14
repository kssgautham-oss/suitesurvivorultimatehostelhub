import { useState } from "react";
import { Plus, LogIn, ArrowLeft, Sparkles, Copy, Check, KeyRound, Users } from "lucide-react";
import { setRoom, generateRoomCode, type Room } from "@/lib/mock-store";

type Mode = "choose" | "create" | "join" | "success";

export default function RoomSetup() {
  const [mode, setMode] = useState<Mode>("choose");
  const [me, setMe] = useState("");
  const [r2, setR2] = useState("");
  const [r3, setR3] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState<Room | null>(null);
  const [copied, setCopied] = useState(false);

  const create = () => {
    if (!me.trim() || !r2.trim() || !r3.trim()) return;
    const room: Room = {
      code: generateRoomCode(),
      roommates: [me.trim(), r2.trim(), r3.trim()],
    };
    setPending(room);
    setMode("success");
  };

  const join = () => {
    if (code.trim().length < 3) return;
    const room: Room = {
      code: code.trim().toUpperCase().startsWith("SUITE-") ? code.trim().toUpperCase() : `SUITE-${code.trim().replace(/\D/g, "").slice(0, 3) || "742"}`,
      roommates: ["You", "Arjun", "Karthik"],
    };
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
          <button onClick={() => setMode("choose")} className="mb-4 text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition">
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
              <button
                onClick={() => setMode("create")}
                className="w-full p-4 rounded-2xl gradient-brand glow-purple text-white text-left hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center"><Plus className="h-5 w-5" /></div>
                <div>
                  <p className="font-bold">Create a New Room</p>
                  <p className="text-xs opacity-90">Name your crew & get an invite code</p>
                </div>
              </button>
              <button
                onClick={() => setMode("join")}
                className="w-full p-4 rounded-2xl glass hover:bg-white/15 text-left transition flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-xl gradient-brand grid place-items-center"><LogIn className="h-5 w-5 text-white" /></div>
                <div>
                  <p className="font-bold">Join an Existing Room</p>
                  <p className="text-xs text-muted-foreground">Got a 6-digit code from a roomie?</p>
                </div>
              </button>
            </div>
          </>
        )}

        {mode === "create" && (
          <>
            <h2 className="text-2xl font-bold text-gradient mb-1">Name your crew</h2>
            <p className="text-sm text-muted-foreground mb-5">Three roomies. One epic chaos zone.</p>
            <div className="space-y-3">
              <Field placeholder="Your nickname" value={me} onChange={setMe} />
              <Field placeholder="Roommate 2's nickname" value={r2} onChange={setR2} />
              <Field placeholder="Roommate 3's nickname" value={r3} onChange={setR3} />
              <button
                onClick={create}
                disabled={!me.trim() || !r2.trim() || !r3.trim()}
                className="w-full mt-2 py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> Generate Room Hub
              </button>
            </div>
          </>
        )}

        {mode === "join" && (
          <>
            <h2 className="text-2xl font-bold text-gradient mb-1">Join the hub</h2>
            <p className="text-sm text-muted-foreground mb-5">Pop in the code your roomie sent you.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 focus-within:border-neon-purple/60 transition">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <input
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-Digit Room Code"
                  className="flex-1 bg-transparent outline-none text-sm tracking-widest placeholder:text-muted-foreground placeholder:tracking-normal"
                />
              </div>
              <button
                onClick={join}
                disabled={code.trim().length < 3}
                className="w-full py-3 rounded-2xl gradient-brand font-semibold text-white glow-purple hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100"
              >
                Join Room
              </button>
            </div>
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
            <div className="flex justify-center gap-2 pt-2">
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
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}
