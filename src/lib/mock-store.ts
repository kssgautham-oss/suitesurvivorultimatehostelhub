import { useEffect, useState } from "react";

const KEY = "hostel-harmony-auth";
const ROOM_KEY = "hostel-harmony-room";

type User = { name: string; email: string };
export type Room = { code: string; roommates: string[] };
export type SeedExpense = { id: string; label: string; amount: number; paidBy: string };
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

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) current = JSON.parse(raw);
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
    { id: "d1", label: "Rent Split", amount: 3000, paidBy: "You" },
    { id: "d2", label: "Wifi Bill", amount: 600, paidBy: "Rahul" },
    { id: "d3", label: "Emergency Midnight Maggi Supplies", amount: 450, paidBy: "Karthik" },
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
  setUser({ name: "Demo Judge", email: "judge@suitesurvivor.app" });
  setRoom({ code: "SUITE-DEMO", roommates });
}
