import { useState } from "react";
import { Sparkles, Wallet, ChefHat, LogOut, Scale, Flame } from "lucide-react";
import { setUser, useAuth } from "@/lib/mock-store";
import VibeCheck from "./VibeCheck";
import SplitExpense from "./SplitExpense";
import PantryAI from "./PantryAI";
import RoomCourt from "./RoomCourt";
import Tribunal from "./Tribunal";

type Tab = "vibe" | "split" | "court" | "tribunal" | "pantry";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("vibe");
  const user = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Welcome back,</p>
          <h2 className="text-xl font-bold text-gradient truncate max-w-[200px]">{user?.name ?? "Roomie"}</h2>
        </div>
        <button
          onClick={() => setUser(null)}
          className="h-10 w-10 grid place-items-center rounded-full glass hover:bg-white/15 transition"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </header>

      <main className="flex-1 px-5 pb-28 overflow-y-auto">
        {tab === "vibe" && <VibeCheck />}
        {tab === "split" && <SplitExpense />}
        {tab === "court" && <RoomCourt />}
        {tab === "tribunal" && <Tribunal />}
        {tab === "pantry" && <PantryAI />}
      </main>

      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm glass-strong rounded-full p-1.5 flex items-center justify-between z-50">
        {[
          { k: "vibe", label: "Vibe", icon: Sparkles },
          { k: "split", label: "Split", icon: Wallet },
          { k: "court", label: "Court", icon: Scale },
          { k: "tribunal", label: "Drama", icon: Flame },
          { k: "pantry", label: "Pantry", icon: ChefHat },
        ].map(({ k, label, icon: Icon }) => {
          const active = tab === k;
          return (
            <button
              key={k}
              onClick={() => setTab(k as Tab)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-full transition ${active ? "gradient-brand glow-purple text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
