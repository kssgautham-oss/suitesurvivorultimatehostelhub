import { useState } from "react";
import { ChefHat, Sparkles, Loader2, Clock, Zap } from "lucide-react";

const INGREDIENTS = ["Bread", "Cheese", "Maggi", "Onion", "Egg", "Tomato", "Butter", "Chilli", "Curd", "Biscuit", "Milk", "Banana"];

type Recipe = { name: string; time: string; tool: string; steps: string[]; emoji: string };

const RECIPES: Recipe[] = [
  { name: "Cheesy Maggi Bomb", emoji: "🍜", time: "7 min", tool: "Kettle", steps: ["Boil 1.5 cups water in kettle.", "Drop Maggi + tastemaker, cook 2 min.", "Tear cheese on top, cover 30s, devour."] },
  { name: "Hostel Grilled Sandwich", emoji: "🥪", time: "5 min", tool: "Induction", steps: ["Butter both bread slices.", "Layer cheese + tomato + onion.", "Toast on tawa till golden both sides."] },
  { name: "Anda Bhurji Wrap", emoji: "🌯", time: "8 min", tool: "Induction", steps: ["Sauté onion + chilli in butter.", "Whisk eggs, pour, scramble till fluffy.", "Wrap in warm bread, demolish."] },
  { name: "Sweet Banana Toast", emoji: "🍌", time: "4 min", tool: "Tawa", steps: ["Spread butter on bread.", "Layer banana + crushed biscuit.", "Toast 2 min till caramelized."] },
];

export default function PantryAI() {
  const [picked, setPicked] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = (i: string) => {
    setPicked(p => p.includes(i) ? p.filter(x => x !== i) : p.length >= 5 ? p : [...p, i]);
    setRecipe(null);
  };

  const generate = () => {
    setLoading(true);
    setRecipe(null);
    setTimeout(() => {
      setRecipe(RECIPES[Math.floor(Math.random() * RECIPES.length)]);
      setLoading(false);
    }, 1200);
  };

  const canGen = picked.length >= 3 && picked.length <= 5;

  return (
    <div className="space-y-5 animate-pop-in">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-electric-orange font-bold">
          <ChefHat className="h-3.5 w-3.5" /> Midnight Pantry AI
        </div>
        <h3 className="mt-2 text-2xl font-bold">Pick 3–5 ingredients</h3>
        <p className="text-xs text-muted-foreground mt-1">Selected: {picked.length}/5</p>

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

      {recipe && (
        <div className="glass-strong rounded-3xl p-5 animate-pop-in">
          <div className="text-5xl">{recipe.emoji}</div>
          <h3 className="mt-2 text-2xl font-bold text-gradient">{recipe.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="glass px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.time}</span>
            <span className="glass px-2.5 py-1 rounded-full flex items-center gap-1"><Zap className="h-3 w-3" /> {recipe.tool}</span>
          </div>
          <ol className="mt-4 space-y-2">
            {recipe.steps.map((s, idx) => (
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
