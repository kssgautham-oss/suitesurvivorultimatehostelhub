import { useMemo, useState } from "react";
import { ChefHat, Sparkles, Loader2, Clock, Zap, AlertCircle } from "lucide-react";

const INGREDIENTS = [
  "Bread", "Cheese", "Maggi", "Onion", "Egg", "Tomato",
  "Butter", "Chilli", "Curd", "Biscuit", "Milk", "Banana",
] as const;
type Ingredient = typeof INGREDIENTS[number];

type Recipe = {
  name: string;
  emoji: string;
  time: string;
  tool: string;
  needs: Ingredient[];      // strict: ALL must be in picked
  steps: string[];
};

/* ---------- Curated hostel/PG dictionary (veg + non-veg) ---------- */
const DICTIONARY: Recipe[] = [
  // Bread family
  { name: "Chilli Cheese Toast", emoji: "🧀", time: "5 min", tool: "Tawa",
    needs: ["Bread", "Cheese", "Chilli"],
    steps: [
      "Butter one side of each bread slice if you have butter handy.",
      "Grate cheese, mix with finely chopped chilli, press onto bread.",
      "Toast on low flame till the cheese melts and bread is golden.",
    ] },
  { name: "Bombay Veg Sandwich", emoji: "🥪", time: "6 min", tool: "Tawa",
    needs: ["Bread", "Cheese", "Tomato", "Onion"],
    steps: [
      "Slice onion and tomato thin, season with salt and pepper.",
      "Layer cheese + onion + tomato between two bread slices.",
      "Toast both sides till crisp; cut diagonally for the aesthetic.",
    ] },
  { name: "Buttery Garlic-less Toast", emoji: "🍞", time: "3 min", tool: "Tawa",
    needs: ["Bread", "Butter"],
    steps: [
      "Heat tawa, butter both sides of the bread generously.",
      "Toast 60–90s a side till golden brown.",
      "Stack, salt lightly, vanish at 2am.",
    ] },
  { name: "Sweet Banana Toast", emoji: "🍌", time: "4 min", tool: "Tawa",
    needs: ["Bread", "Banana", "Butter"],
    steps: [
      "Butter the bread, layer banana slices on top.",
      "Toast butter-side down on low flame till caramelized.",
      "Optional: crush a biscuit over it for crunch.",
    ] },
  { name: "Bread Omelet", emoji: "🍳", time: "6 min", tool: "Tawa",
    needs: ["Bread", "Egg", "Onion"],
    steps: [
      "Whisk eggs with chopped onion, salt and pepper.",
      "Pour onto hot tawa, immediately press bread slice into it.",
      "Flip after 60s, cook the other side, fold and serve.",
    ] },
  { name: "Curd Bread Bites", emoji: "🥣", time: "3 min", tool: "No-cook",
    needs: ["Bread", "Curd"],
    steps: [
      "Tear bread into bite-size pieces in a bowl.",
      "Top with chilled curd, pinch of salt and pepper.",
      "Mix and eat immediately — it gets soggy fast.",
    ] },

  // Maggi family
  { name: "Cheesy Maggi Bomb", emoji: "🍜", time: "7 min", tool: "Kettle",
    needs: ["Maggi", "Cheese"],
    steps: [
      "Boil 1.5 cups of water in your kettle.",
      "Drop Maggi + tastemaker, cook 2 minutes.",
      "Tear cheese on top, cover for 30s, devour.",
    ] },
  { name: "Masala Maggi", emoji: "🌶️", time: "8 min", tool: "Induction",
    needs: ["Maggi", "Onion", "Tomato"],
    steps: [
      "Sauté chopped onion till translucent, add tomato, cook till mushy.",
      "Pour 1.5 cups water + tastemaker, bring to boil.",
      "Add Maggi cake, cook 2 minutes, stir and serve hot.",
    ] },
  { name: "Egg Maggi", emoji: "🥚", time: "8 min", tool: "Induction",
    needs: ["Maggi", "Egg"],
    steps: [
      "Boil 1.5 cups water, add Maggi + tastemaker.",
      "When Maggi is half-cooked, crack egg directly in and stir.",
      "Cook 2 more minutes till noodles soak the egg — golden silk.",
    ] },
  { name: "Hostel Champion Maggi", emoji: "👑", time: "10 min", tool: "Induction",
    needs: ["Maggi", "Egg", "Onion", "Tomato"],
    steps: [
      "Sauté onion + tomato till soft, crack egg in and scramble.",
      "Add 1.5 cups water + tastemaker, bring to boil.",
      "Drop Maggi, cook 2 minutes, finish with chilli if you have it.",
    ] },

  // Egg standalone
  { name: "Classic Scrambled Eggs", emoji: "🍳", time: "4 min", tool: "Tawa",
    needs: ["Egg", "Butter"],
    steps: [
      "Whisk eggs with a pinch of salt.",
      "Melt butter on low flame, pour eggs in.",
      "Stir slowly till just-set and creamy. Don't overcook.",
    ] },
  { name: "Masala Anda Bhurji", emoji: "🍽️", time: "8 min", tool: "Induction",
    needs: ["Egg", "Onion", "Tomato", "Chilli"],
    steps: [
      "Sauté onion + chilli till soft, add tomato, cook till mushy.",
      "Whisk eggs and pour in, scramble on medium heat.",
      "Season with salt + pepper, serve with bread or solo.",
    ] },

  // Sweet / drinks
  { name: "Late Night Banana Shake", emoji: "🥤", time: "3 min", tool: "Blender",
    needs: ["Banana", "Milk", "Biscuit"],
    steps: [
      "Toss banana + 1 cup milk + 2 biscuits into blender.",
      "Blend 30s till smooth and frothy.",
      "Pour into your one clean glass. Sleep peacefully.",
    ] },
  { name: "Quick Banana Milk", emoji: "🍼", time: "2 min", tool: "No-cook",
    needs: ["Banana", "Milk"],
    steps: [
      "Mash banana in a glass with a fork.",
      "Pour cold milk over, stir well.",
      "Optional sugar. Drink in 60s of zen.",
    ] },
  { name: "Biscuit Dunk Session", emoji: "🍪", time: "1 min", tool: "No-cook",
    needs: ["Biscuit", "Milk"],
    steps: [
      "Warm milk if you're feeling fancy.",
      "Dunk biscuit for exactly 2 seconds — any longer is anarchy.",
      "Repeat till packet is gone.",
    ] },
  { name: "Curd Banana Bowl", emoji: "🍌", time: "2 min", tool: "No-cook",
    needs: ["Curd", "Banana"],
    steps: [
      "Slice banana into a bowl.",
      "Top with curd, drizzle of sugar/honey if you have it.",
      "Mix and eat — closest thing to breakfast at 3am.",
    ] },
];

/* ---------- Dynamic generator (used when no curated match) ---------- */
function dynamicRecipe(picked: Ingredient[]): Recipe {
  const set = new Set(picked);
  const has = (i: Ingredient) => set.has(i);

  const list = picked.join(" + ");
  const steps: string[] = [];
  let tool = "Tawa";
  let emoji = "🍳";
  let name = `${picked[0]} Hostel Mashup`;

  // Decide cooking base
  if (has("Maggi")) {
    tool = "Induction";
    emoji = "🍜";
    name = picked.length === 1 ? "Plain Maggi" : `Custom Maggi (${picked.filter(p => p !== "Maggi").join(" + ")})`;
    if (has("Onion") || has("Tomato") || has("Chilli")) {
      steps.push(`Sauté ${[has("Onion") && "onion", has("Chilli") && "chilli", has("Tomato") && "tomato"].filter(Boolean).join(" + ")} till soft.`);
    }
    if (has("Egg")) steps.push("Crack egg in and scramble lightly.");
    steps.push("Add 1.5 cups water + Maggi tastemaker, bring to a boil.");
    steps.push("Drop Maggi cake, cook 2 minutes.");
    if (has("Cheese")) steps.push("Tear cheese on top, cover 30s till melted.");
    if (has("Butter")) steps.push("Finish with a tiny knob of butter for shine.");
  } else if (has("Egg")) {
    tool = "Tawa";
    emoji = "🍳";
    name = has("Bread") ? "Bread + Egg Stack" : "Custom Egg Plate";
    if (has("Butter")) steps.push("Heat tawa, melt butter on low flame.");
    else steps.push("Heat tawa on low flame, light oil/ghee if you have it.");
    if (has("Onion") || has("Tomato") || has("Chilli")) {
      steps.push(`Sauté ${[has("Onion") && "onion", has("Chilli") && "chilli", has("Tomato") && "tomato"].filter(Boolean).join(" + ")} till soft.`);
    }
    steps.push("Whisk eggs with salt and pepper, pour into the pan.");
    if (has("Cheese")) steps.push("Sprinkle cheese while still wet so it melts in.");
    steps.push("Scramble gently till just-set.");
    if (has("Bread")) steps.push("Pile onto bread (toast it first if you have butter), fold, eat.");
  } else if (has("Bread")) {
    tool = "Tawa";
    emoji = "🥪";
    name = "Custom Hostel Sandwich";
    if (has("Butter")) steps.push("Butter both bread slices on one side.");
    const fillings = [has("Cheese") && "cheese", has("Tomato") && "tomato", has("Onion") && "onion", has("Chilli") && "chilli", has("Curd") && "a thin curd smear", has("Banana") && "banana slices"].filter(Boolean);
    if (fillings.length) steps.push(`Layer ${fillings.join(" + ")} between the slices.`);
    else steps.push("Stack the slices together as-is.");
    steps.push("Toast both sides on low flame till golden and crisp.");
  } else if (has("Milk")) {
    tool = "No-cook";
    emoji = "🥛";
    name = "Quick Milk Mix";
    const adds = [has("Banana") && "mashed banana", has("Biscuit") && "crushed biscuit"].filter(Boolean);
    if (adds.length) steps.push(`Stir ${adds.join(" + ")} into a glass of milk.`);
    else steps.push("Pour milk into a glass. Warm it if you want.");
    steps.push("Add sugar to taste, drink slowly.");
  } else if (has("Curd")) {
    tool = "No-cook";
    emoji = "🥣";
    name = "Curd Bowl";
    const adds = [has("Banana") && "banana slices", has("Biscuit") && "crushed biscuit", has("Tomato") && "chopped tomato", has("Onion") && "fine onion", has("Chilli") && "chopped chilli"].filter(Boolean);
    steps.push("Spoon curd into a bowl, season with salt.");
    if (adds.length) steps.push(`Top with ${adds.join(" + ")}.`);
    steps.push("Mix gently and eat cold.");
  } else {
    // last-resort: just describe the snack plate
    tool = "No-cook";
    emoji = "🍽️";
    name = "Hostel Snack Plate";
    steps.push(`Arrange ${list} on a plate.`);
    steps.push("Season with salt/sugar depending on the vibe.");
    steps.push("Eat in bed. Don't tell mom.");
  }

  // Always remind only-selected ingredients
  steps.push(`Uses only what you picked: ${list}. Nothing else required.`);

  const time = picked.length <= 2 ? "3 min" : picked.length === 3 ? "6 min" : "8 min";
  return { name, emoji, time, tool, needs: picked, steps };
}

/* ---------- Strict matcher ---------- */
function matchRecipes(picked: Ingredient[]): Recipe[] {
  if (picked.length === 0) return [];
  const set = new Set(picked);
  // STRICT: a recipe is valid only if every required ingredient is selected.
  // Never recommend recipes that need ingredients the user did NOT pick.
  const matches = DICTIONARY.filter(r => r.needs.every(n => set.has(n)));
  // Rank: more overlap with picked = better fit (uses more of what's selected).
  matches.sort((a, b) => b.needs.length - a.needs.length);
  return matches;
}

export default function PantryAI() {
  const [picked, setPicked] = useState<Ingredient[]>([]);
  const [generated, setGenerated] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = (i: Ingredient) => {
    setPicked(p => p.includes(i) ? p.filter(x => x !== i) : p.length >= 5 ? p : [...p, i]);
    setGenerated(null);
  };

  const matches = useMemo(() => matchRecipes(picked), [picked]);

  const generate = () => {
    setLoading(true);
    setGenerated(null);
    setTimeout(() => {
      // Strict: if there's a curated match, surface the best one.
      // Otherwise, build a dynamic recipe from ONLY the picked ingredients.
      setGenerated(matches[0] ?? dynamicRecipe(picked));
      setLoading(false);
    }, 900);
  };

  const canGen = picked.length >= 2 && picked.length <= 5;

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

      {/* Strict matches preview */}
      {picked.length >= 2 && !generated && (
        matches.length > 0 ? (
          <div className="glass-strong rounded-3xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-neon-pink font-bold mb-2">
              {matches.length} strict match{matches.length > 1 ? "es" : ""}
            </p>
            <div className="space-y-2">
              {matches.slice(0, 4).map(r => (
                <button
                  key={r.name}
                  onClick={() => setGenerated(r)}
                  className="w-full text-left glass rounded-2xl p-3 hover:bg-white/15 transition flex items-center gap-3"
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold truncate">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {r.needs.join(" + ")} · {r.time}
                    </p>
                  </div>
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
          <div className="text-5xl">{generated.emoji}</div>
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
