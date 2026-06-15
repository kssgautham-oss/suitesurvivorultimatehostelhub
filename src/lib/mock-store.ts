import { useEffect, useState } from "react";

const KEY = "hostel-harmony-auth";
const ROOM_KEY = "hostel-harmony-room";

type User = { name: string; email: string };
export type Room = { code: string; roommates: [string, string, string] };
export type SeedExpense = { id: string; label: string; amount: number; paidBy: string };
export type SeedVibe = {
  question: string;
  votes: Record<string, string>;
  percentages?: Record<string, number>;
  completedQuestion?: string;
  completedWinner?: string;
  upcomingQuestion?: string;
};

const listeners = new Set<() => void>();
const roomListeners = new Set<() => void>();
let current: User | null = null;
let currentRoom: Room | null = null;
let seedExpenses: SeedExpense[] | null = null;
let seedVibe: SeedVibe | null = null;

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
      roomListeners.forEach(fn => fn());
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

export function enableDemoMode() {
  const roommates: [string, string, string] = ["Rahul", "Karthik", "You"];
  seedExpenses = [
    { id: "d1", label: "Rent", amount: 3000, paidBy: "You" },
    { id: "d2", label: "Wifi", amount: 600, paidBy: "Rahul" },
    { id: "d3", label: "Groceries", amount: 450, paidBy: "Karthik" },
  ];
  seedVibe = {
    question: "Who ate the last Maggi?",
    votes: { Rahul: "Karthik", Karthik: "Karthik", You: "Karthik" },
  };
  setUser({ name: "Demo Judge", email: "judge@suitesurvivor.app" });
  setRoom({ code: "SUITE-DEMO", roommates });
}
