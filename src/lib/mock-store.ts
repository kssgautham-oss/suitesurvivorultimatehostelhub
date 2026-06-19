import { useEffect, useState } from "react";

const KEY = "hostel-harmony-auth";
const ROOM_KEY = "hostel-harmony-room";
const ACCOUNTS_KEY = "hostel-harmony-accounts";

type Account = { name: string; email: string; password: string };

function loadAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]"); } catch { return []; }
}
function saveAccounts(a: Account[]) {
  if (typeof window !== "undefined") localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a));
}

export function registerAccount(name: string, email: string, password: string):
  { ok: true } | { ok: false; error: string } {
  const e = email.trim().toLowerCase();
  if (!e || !password) return { ok: false, error: "Email and password are required." };
  const accounts = loadAccounts();
  if (accounts.some(a => a.email === e)) return { ok: false, error: "An account with this email already exists." };
  accounts.push({ name: name.trim() || e.split("@")[0], email: e, password });
  saveAccounts(accounts);
  return { ok: true };
}

export function validateCredentials(email: string, password: string): Account | null {
  const e = email.trim().toLowerCase();
  const found = loadAccounts().find(a => a.email === e && a.password === password);
  return found ?? null;
}

type User = { name: string; email: string; alias?: string };

const ALIAS_ADJECTIVES = ["Sneaky", "Chaotic", "Midnight", "Salty", "Caffeinated", "Petty", "Feral", "Lowkey", "Spicy", "Drowsy"];
const ALIAS_NOUNS = ["Survivor", "Goblin", "Menace", "Snackster", "Gremlin", "Diva", "Phantom", "TeaSpiller", "Pajama", "Maggi"];
export function generateAlias(): string {
  const a = ALIAS_ADJECTIVES[Math.floor(Math.random() * ALIAS_ADJECTIVES.length)];
  const n = ALIAS_NOUNS[Math.floor(Math.random() * ALIAS_NOUNS.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${a}_${n}_${num}`;
}
export function setAlias(alias: string) {
  if (!current) return;
  current = { ...current, alias: alias.trim() };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(current));
  listeners.forEach(fn => fn());
}
export type Room = { code: string; roommates: string[] };
export type ExpenseCategory = "Rent" | "Food" | "Wifi" | "Utilities" | "Snacks" | "Other";
export const EXPENSE_CATEGORIES: ExpenseCategory[] = ["Rent", "Food", "Wifi", "Utilities", "Snacks", "Other"];
export type SeedExpense = { id: string; label: string; amount: number; paidBy: string; category?: ExpenseCategory };
export type SeedVibe = {
  question: string;
  votes: Record<string, string>;
  percentages?: Record<string, number>;
  completedQuestion?: string;
  completedWinner?: string;
  upcomingQuestion?: string;
};

export type CustomPoll = {
  id: string;
  question: string;
  options: string[];
  tally: Record<string, number>;
  source?: "user" | "onboarding";
};

const listeners = new Set<() => void>();
const roomListeners = new Set<() => void>();
const pollListeners = new Set<() => void>();
let current: User | null = null;
let currentRoom: Room | null = null;
let seedExpenses: SeedExpense[] | null = null;
let seedVibe: SeedVibe | null = null;
let customPolls: CustomPoll[] = [];

const DEMO_EMAIL = "judge@suitesurvivor.app";

function isValidSession(u: unknown): u is User {
  if (!u || typeof u !== "object") return false;
  const candidate = u as { name?: unknown; email?: unknown };
  if (typeof candidate.name !== "string" || typeof candidate.email !== "string") return false;
  if (!candidate.name.trim() || !candidate.email.trim()) return false;
  const email = candidate.email.toLowerCase();
  if (email === DEMO_EMAIL) return true;
  // Social mock providers issue these emails — accept as authenticated.
  if (email === "google@hostel.app" || email === "facebook@hostel.app") return true;
  // Otherwise, the session must correspond to a registered account.
  return loadAccounts().some(a => a.email === email);
}

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidSession(parsed)) current = parsed;
      else localStorage.removeItem(KEY);
    }
    const rawRoom = localStorage.getItem(ROOM_KEY);
    if (rawRoom) currentRoom = JSON.parse(rawRoom);
  } catch {}
}

export function getUser() { return current; }
export function setUser(u: User | null) {
  current = u;
  if (typeof window !== "undefined") {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else {
      localStorage.removeItem(KEY);
      localStorage.removeItem(ROOM_KEY);
      currentRoom = null;
      seedExpenses = null;
      seedVibe = null;
      customPolls = [];
      roomListeners.forEach(fn => fn());
      pollListeners.forEach(fn => fn());
    }
  }
  listeners.forEach(fn => fn());
}

export function useAuth() {
  const [user, setU] = useState<User | null>(current);
  useEffect(() => {
    const fn = () => setU(current);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);
  return user;
}

export function getRoom() { return currentRoom; }
export function setRoom(r: Room | null) {
  currentRoom = r;
  if (typeof window !== "undefined") {
    if (r) localStorage.setItem(ROOM_KEY, JSON.stringify(r));
    else localStorage.removeItem(ROOM_KEY);
  }
  roomListeners.forEach(fn => fn());
}

export function useRoom() {
  const [room, setR] = useState<Room | null>(currentRoom);
  useEffect(() => {
    const fn = () => setR(currentRoom);
    roomListeners.add(fn);
    return () => { roomListeners.delete(fn); };
  }, []);
  return room;
}

export function generateRoomCode() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SUITE-${n.toString().slice(0, 3)}`;
}

export function consumeSeedExpenses() {
  const s = seedExpenses;
  seedExpenses = null;
  return s;
}
export function consumeSeedVibe() {
  const s = seedVibe;
  seedVibe = null;
  return s;
}

export function getCustomPolls() { return customPolls; }
export function addCustomPoll(p: Omit<CustomPoll, "id" | "tally">) {
  const poll: CustomPoll = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    question: p.question,
    options: p.options,
    tally: Object.fromEntries(p.options.map(o => [o, 0])),
    source: p.source ?? "user",
  };
  customPolls = [poll, ...customPolls];
  pollListeners.forEach(fn => fn());
  return poll;
}
export function voteCustomPoll(id: string, option: string) {
  customPolls = customPolls.map(p =>
    p.id === id ? { ...p, tally: { ...p.tally, [option]: (p.tally[option] ?? 0) + 1 } } : p
  );
  pollListeners.forEach(fn => fn());
}
export function useCustomPolls() {
  const [polls, setPolls] = useState<CustomPoll[]>(customPolls);
  useEffect(() => {
    const fn = () => setPolls([...customPolls]);
    pollListeners.add(fn);
    return () => { pollListeners.delete(fn); };
  }, []);
  return polls;
}

export function enableDemoMode() {
  const roommates = ["Rahul", "Karthik", "You"];
  seedExpenses = [
    { id: "d1", label: "Rent Split", amount: 3000, paidBy: "You", category: "Rent" },
    { id: "d2", label: "Wifi Bill", amount: 600, paidBy: "Rahul", category: "Wifi" },
    { id: "d3", label: "Emergency Midnight Maggi Supplies", amount: 450, paidBy: "Karthik", category: "Snacks" },
  ];
  seedVibe = {
    question: "Who left the empty milk packet inside the induction kettle and burnt the base again?",
    votes: { Rahul: "Rahul", Karthik: "Rahul", You: "Karthik" },
    percentages: { Rahul: 60, Karthik: 30, You: 10 },
    completedQuestion: "Who is genuinely responsible for the absolute biohazard fermenting in our trash can right now?",
    completedWinner: "Karthik",
    upcomingQuestion: "Are we allowing Rahul's loud gaming friend to crash on our floor this upcoming weekend?",
  };
  customPolls = [];
  setUser({ name: "Demo Judge", email: "judge@suitesurvivor.app", alias: "The_Judge_Supreme" });
  setRoom({ code: "SUITE-DEMO", roommates });
}
