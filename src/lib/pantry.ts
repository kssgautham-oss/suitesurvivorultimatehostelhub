export const INGREDIENTS = [
  "Bread", "Cheese", "Maggi", "Onion", "Egg", "Tomato",
  "Butter", "Chilli", "Curd", "Biscuit", "Milk", "Banana",
] as const;
export type Ingredient = typeof INGREDIENTS[number];

export type Recipe = {
  name: string;
  emoji: string;
  time: string;
  tool: string;
  needs: Ingredient[];
  steps: string[];
};

export type MatchResult = {
  recipe: Recipe;
  used: Ingredient[];       // subset of picked that the recipe uses
  unused: Ingredient[];     // picked ingredients not needed by this recipe
  coverage: number;         // 0-1 ratio of used/picked
};

/* ---------- Curated hostel/PG dictionary (veg + non-veg) ---------- */
export const DICTIONARY: Recipe[] = [
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
export function dynamicRecipe(picked: Ingredient[]): Recipe {
  const set = new Set(picked);
  const has = (i: Ingredient) => set.has(i);

  const list = picked.join(" + ");
  const steps: string[] = [];
  let tool = "Tawa";
  let emoji = "🍳";
  let name = `${picked[0]} Hostel Mashup`;

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
    tool = "No-cook";
    emoji = "🍽️";
    name = "Hostel Snack Plate";
    steps.push(`Arrange ${list} on a plate.`);
    steps.push("Season with salt/sugar depending on the vibe.");
    steps.push("Eat in bed. Don't tell mom.");
  }

  steps.push(`Uses only what you picked: ${list}. Nothing else required.`);

  const time = picked.length <= 2 ? "3 min" : picked.length === 3 ? "6 min" : "8 min";
  return { name, emoji, time, tool, needs: picked, steps };
}

/* ---------- Strict matcher with explanations ---------- */
export function matchRecipes(picked: Ingredient[]): MatchResult[] {
  if (picked.length === 0) return [];
  const set = new Set(picked);
  const matches = DICTIONARY.filter(r => r.needs.every(n => set.has(n)));
  matches.sort((a, b) => b.needs.length - a.needs.length);

  return matches.map(r => {
    const used = r.needs.filter(n => set.has(n));
    const unused = picked.filter(p => !r.needs.includes(p));
    const coverage = picked.length > 0 ? used.length / picked.length : 0;
    return { recipe: r, used, unused, coverage };
  });
}

/* ---------- Egg combo validator ---------- */
export function getEggWarnings(picked: Ingredient[]): string[] {
  const set = new Set(picked);
  if (!set.has("Egg")) return [];
  const warnings: string[] = [];
  // Egg + Milk is a weird combo (not dangerous, just odd)
  if (set.has("Milk") && !set.has("Banana") && !set.has("Biscuit")) {
    warnings.push("Egg + milk without banana/biscuit? That's an unusual combo.");
  }
  // Egg + Curd is culturally avoided by some
  if (set.has("Curd")) {
    warnings.push("Egg + curd is a conflicting combo for many. Consider dropping one.");
  }
  // Egg + Biscuit is just odd
  if (set.has("Biscuit") && !set.has("Milk") && !set.has("Banana")) {
    warnings.push("Egg + biscuit without milk/banana? Might not work well together.");
  }
  return warnings;
}

/* ---------- Recipe card exporter ---------- */
export function exportRecipeCard(recipe: Recipe): string {
  const lines = [
    `🍽️ ${recipe.name} ${recipe.emoji}`,
    ``,
    `⏱️ ${recipe.time} · 🔧 ${recipe.tool}`,
    ``,
    `Ingredients: ${recipe.needs.join(", ")}`,
    ``,
    `Steps:`,
    ...recipe.steps.map((s, i) => `${i + 1}. ${s}`),
    ``,
    `— Generated by SuiteSurvivor Midnight Pantry AI`,
  ];
  return lines.join("\n");
}
