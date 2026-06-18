import { describe, it, expect, beforeEach } from "vitest";
import { registerAccount, validateCredentials } from "../mock-store";

// jsdom-like localStorage shim for the test runner
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string) { return this.store.get(k) ?? null; }
  setItem(k: string, v: string) { this.store.set(k, String(v)); }
  removeItem(k: string) { this.store.delete(k); }
  clear() { this.store.clear(); }
  key() { return null; }
  get length() { return this.store.size; }
}

beforeEach(() => {
  // @ts-expect-error inject minimal window + localStorage for the module under test
  globalThis.window = globalThis.window ?? {};
  // @ts-expect-error
  globalThis.localStorage = new MemoryStorage();
  // @ts-expect-error
  globalThis.window.localStorage = globalThis.localStorage;
});

describe("auth", () => {
  it("registers a new account successfully", () => {
    const res = registerAccount("Alex", "alex@hostel.app", "secret123");
    expect(res.ok).toBe(true);
  });

  it("rejects duplicate registrations (case-insensitive)", () => {
    registerAccount("Alex", "alex@hostel.app", "secret123");
    const dup = registerAccount("Alex 2", "ALEX@hostel.app", "other");
    expect(dup.ok).toBe(false);
  });

  it("rejects missing email or password on registration", () => {
    expect(registerAccount("x", "", "pw").ok).toBe(false);
    expect(registerAccount("x", "a@b.co", "").ok).toBe(false);
  });

  it("validateCredentials returns null when no account exists", () => {
    expect(validateCredentials("ghost@hostel.app", "anything")).toBeNull();
  });

  it("validateCredentials rejects wrong password", () => {
    registerAccount("Alex", "alex@hostel.app", "secret123");
    expect(validateCredentials("alex@hostel.app", "WRONG")).toBeNull();
  });

  it("validateCredentials accepts correct credentials and is case-insensitive on email", () => {
    registerAccount("Alex", "alex@hostel.app", "secret123");
    const ok = validateCredentials("ALEX@hostel.app", "secret123");
    expect(ok).not.toBeNull();
    expect(ok?.email).toBe("alex@hostel.app");
  });
});
