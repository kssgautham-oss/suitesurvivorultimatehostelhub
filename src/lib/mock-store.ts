import { useEffect, useState } from "react";

const KEY = "hostel-harmony-auth";
const ROOM_KEY = "hostel-harmony-room";

type User = { name: string; email: string };
export type Room = { code: string; roommates: [string, string, string] };

const listeners = new Set<() => void>();
const roomListeners = new Set<() => void>();
let current: User | null = null;
let currentRoom: Room | null = null;

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
