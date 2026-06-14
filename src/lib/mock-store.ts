import { useEffect, useState } from "react";

const KEY = "hostel-harmony-auth";

type User = { name: string; email: string };

const listeners = new Set<() => void>();
let current: User | null = null;

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) current = JSON.parse(raw);
  } catch {}
}

export function getUser() { return current; }
export function setUser(u: User | null) {
  current = u;
  if (typeof window !== "undefined") {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
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
