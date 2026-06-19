import { describe, it, expect } from "vitest";
import {
  INGREDIENTS,
  DICTIONARY,
  dynamicRecipe,
  matchRecipes,
  getEggWarnings,
  exportRecipeCard,
} from "../pantry";

describe("pantry dictionary", () => {
  it("has unique recipe names", () => {
    const names = DICTIONARY.map(r => r.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("every recipe uses only valid ingredients", () => {
    const valid = new Set(INGREDIENTS);
    for (const r of DICTIONARY) {
      for (const need of r.needs) {
        expect(valid.has(need)).toBe(true);
      }
    }
  });

  it("every recipe has at least one ingredient", () => {
    for (const r of DICTIONARY) {
      expect(r.needs.length).toBeGreaterThan(0);
    }
  });
});

describe("matchRecipes", () => {
  it("returns empty array for no picked ingredients", () => {
    expect(matchRecipes([])).toEqual([]);
  });

  it("matches Chilli Cheese Toast exactly", () => {
    const picked: typeof INGREDIENTS[number][] = ["Bread", "Cheese", "Chilli"];
    const results = matchRecipes(picked);
    expect(results.length).toBeGreaterThanOrEqual(1);
    const toast = results.find(r => r.recipe.name === "Chilli Cheese Toast");
    expect(toast).toBeDefined();
    expect(toast!.used).toEqual(["Bread", "Cheese", "Chilli"]);
    expect(toast!.unused).toEqual([]);
    expect(toast!.coverage).toBe(1);
  });

  it("does NOT match recipes that need unselected ingredients", () => {
    const picked: typeof INGREDIENTS[number][] = ["Bread", "Cheese"];
    const results = matchRecipes(picked);
    const toast = results.find(r => r.recipe.name === "Chilli Cheese Toast");
    expect(toast).toBeUndefined();
  });

  it("shows unused ingredients when picked has extras", () => {
    const picked: typeof INGREDIENTS[number][] = ["Bread", "Cheese", "Chilli", "Egg", "Onion"];
    const results = matchRecipes(picked);
    const toast = results.find(r => r.recipe.name === "Chilli Cheese Toast");
    expect(toast).toBeDefined();
    expect(toast!.unused.sort()).toEqual(["Egg", "Onion"]);
    expect(toast!.coverage).toBe(3 / 5);
  });

  it("ranks by coverage (more used ingredients = higher)", () => {
    const picked: typeof INGREDIENTS[number][] = ["Maggi", "Egg", "Onion", "Tomato"];
    const results = matchRecipes(picked);
    expect(results[0].recipe.name).toBe("Hostel Champion Maggi");
    expect(results[0].coverage).toBe(1);
  });
});

describe("dynamicRecipe", () => {
  it("generates a recipe for any valid ingredient combo", () => {
    const picked: typeof INGREDIENTS[number][] = ["Banana", "Milk"];
    const r = dynamicRecipe(picked);
    expect(r.needs).toEqual(picked);
    expect(r.steps.length).toBeGreaterThan(0);
    expect(r.name).toBeTruthy();
  });

  it("names Maggi-based recipes correctly", () => {
    const r = dynamicRecipe(["Maggi"]);
    expect(r.name).toBe("Plain Maggi");
  });

  it("names egg-based recipes with bread", () => {
    const r = dynamicRecipe(["Egg", "Bread"]);
    expect(r.name).toBe("Bread + Egg Stack");
  });

  it("names egg-based recipes without bread", () => {
    const r = dynamicRecipe(["Egg", "Onion"]);
    expect(r.name).toBe("Custom Egg Plate");
  });

  it("always includes the ingredient list in steps", () => {
    const r = dynamicRecipe(["Banana", "Milk", "Biscuit"]);
    const last = r.steps[r.steps.length - 1];
    expect(last).toContain("Banana");
    expect(last).toContain("Milk");
    expect(last).toContain("Biscuit");
  });
});

describe("getEggWarnings", () => {
  it("returns empty when egg is not picked", () => {
    expect(getEggWarnings(["Bread", "Cheese"])).toEqual([]);
  });

  it("warns about egg + curd", () => {
    const w = getEggWarnings(["Egg", "Curd"]);
    expect(w.some(s => s.includes("curd"))).toBe(true);
  });

  it("warns about egg + milk without banana/biscuit", () => {
    const w = getEggWarnings(["Egg", "Milk"]);
    expect(w.some(s => s.includes("unusual"))).toBe(true);
  });

  it("does NOT warn about egg + milk + banana (valid shake combo)", () => {
    const w = getEggWarnings(["Egg", "Milk", "Banana"]);
    expect(w.some(s => s.includes("unusual"))).toBe(false);
  });

  it("warns about egg + biscuit without milk/banana", () => {
    const w = getEggWarnings(["Egg", "Biscuit"]);
    expect(w.some(s => s.includes("biscuit"))).toBe(true);
  });

  it("does NOT warn about egg + biscuit + milk", () => {
    const w = getEggWarnings(["Egg", "Biscuit", "Milk"]);
    expect(w.some(s => s.includes("biscuit"))).toBe(false);
  });
});

describe("exportRecipeCard", () => {
  it("formats a recipe into a shareable card", () => {
    const recipe = DICTIONARY[0];
    const card = exportRecipeCard(recipe);
    expect(card).toContain(recipe.name);
    expect(card).toContain(recipe.emoji);
    expect(card).toContain(recipe.time);
    expect(card).toContain(recipe.tool);
    expect(card).toContain("SuiteSurvivor");
    expect(card).toContain("1.");
  });

  it("includes all steps numbered", () => {
    const recipe = DICTIONARY[0];
    const card = exportRecipeCard(recipe);
    for (let i = 0; i < recipe.steps.length; i++) {
      expect(card).toContain(`${i + 1}. ${recipe.steps[i]}`);
    }
  });
});
