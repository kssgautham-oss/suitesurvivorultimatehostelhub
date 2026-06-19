import { useMemo, useState } from "react";
import { ChefHat, Sparkles, Loader as Loader2, Clock, Zap, CircleAlert as AlertCircle, Share2, Check, Egg, X } from "lucide-react";
import { toast } from "sonner";
import {
  INGREDIENTS,
  matchRecipes,
  dynamicRecipe,
  getEggWarnings,
  exportRecipeCard,
  type Ingredient,
  type Recipe,
} from "@/lib/pantry";

export default function PantryAI() {
  const [picked, setPicked] = useState<Ingredient[]>([]);
  const [generated, setGenerated] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggle = (i: Ingredient) => {
    setPicked(p => p.includes(i) ? p.filter(x => x !== i) : p.length >= 5 ? p : [...p, i]);
    setGenerated(null);
  };

  const matches = useMemo(() => matchRecipes(picked), [picked]);
  const warnings = useMemo(() => getEggWarnings(picked), [picked]);

  const generate = () => {
    setLoading(true);
    setGenerated(null);
    setTimeout(() => {
      setGenerated(matches[0]?.recipe ?? dynamicRecipe(picked));
      setLoading(false);
    }, 900);
  };

  const canGen = picked.length >= 2 && picked.length <= 5;

  const share = async () => {
    if (!generated) return;
    const text = exportRecipeCard(generated);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Recipe card copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Long-press to copy manually.");
    }
  };

  return (
    <div className="space-y-5 animate-pop-in">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <ChefHat className="h-3.5 w-3.5" /> Midnight Pantry AI
        </div>
        <h3 className="mt-2 text-2xl font-bold">Pick 2–5 ingredients</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Strict mode: only recipes that fit your exact selection. Selected {picked.length}/5.
        </p>

        {/* Egg warnings */}
        {warnings.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl bg-electric-orange/10 border border-electric-orange/30 p-2.5">
                <Egg className="h-4 w-4 text-electric-orange shrink-0 mt-0.5" />
                <p className="text-xs text-electric-orange font-medium">{w}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {INGREDIENTS.map(i => {
            const on = picked.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition ${on ? "gradient-brand text-white glow-purple scale-105" : "glass hover:bg-white/15"}`}
              >
                {i}
              </button>
            );
          })}
        </div>

        <button
          onClick={generate}
          disabled={!canGen || loading}
          className="mt-5 w-full py-3 rounded-2xl gradient-brand text-white font-bold glow-purple disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Cooking up magic…" : "Generate Recipe"}
        </button>
      </div>

      {/* Strict matches preview with explanations */}
      {picked.length >= 2 && !generated && (
        matches.length > 0 ? (
          <div className="glass-strong rounded-3xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-neon-pink font-bold mb-2">
              {matches.length} strict match{matches.length > 1 ? "es" : ""}
            </p>
            <div className="space-y-2">
              {matches.slice(0, 4).map(m => (
                <button
                  key={m.recipe.name}
                  onClick={() => setGenerated(m.recipe)}
                  className="w-full text-left glass rounded-2xl p-3 hover:bg-white/15 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.recipe.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold truncate">{m.recipe.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {m.recipe.needs.join(" + ")} · {m.recipe.time}
                      </p>
                    </div>
                  </div>
                  {/* Match explanation */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.used.map(u => (
                      <span key={u} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/20 text-success border border-success/30">
                        ✓ {u}
                      </span>
                    ))}
                    {m.unused.map(u => (
                      <span key={u} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-muted-foreground border border-white/10">
                        +{u}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    Uses {Math.round(m.coverage * 100)}% of your selection · {m.unused.length > 0 ? `${m.unused.length} extra${m.unused.length > 1 ? "s" : ""} unused` : "Perfect fit"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-4 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-electric-orange mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              No curated recipe needs <em>only</em> {picked.join(", ")}. Hit Generate to dynamically build one from exactly what you picked.
            </p>
          </div>
        )
      )}

      {generated && (
        <div className="glass-strong rounded-3xl p-5 animate-pop-in">
          <div className="flex items-start justify-between gap-2">
            <div className="text-5xl">{generated.emoji}</div>
            <button
              onClick={share}
              className="shrink-0 h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/15 transition"
              aria-label="Copy recipe card"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Share2 className="h-4 w-4" />}
            </button>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-gradient">{generated.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="glass px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="h-3 w-3" /> {generated.time}</span>
            <span className="glass px-2.5 py-1 rounded-full flex items-center gap-1"><Zap className="h-3 w-3" /> {generated.tool}</span>
            <span className="glass px-2.5 py-1 rounded-full text-neon-pink font-bold">{generated.needs.join(" + ")}</span>
          </div>
          <ol className="mt-4 space-y-2">
            {generated.steps.map((s, idx) => (
              <li key={idx} className="flex gap-3 glass rounded-2xl p-3">
                <span className="h-6 w-6 shrink-0 rounded-full gradient-brand grid place-items-center text-xs font-bold">{idx + 1}</span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
