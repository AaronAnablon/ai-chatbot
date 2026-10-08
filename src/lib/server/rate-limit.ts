import type { ChatUsage } from "@/types/chat";
import { serverConfig } from "./config";

type Counter = {
  count: number;
  resetAt: number;
};

interface CounterStore {
  /** Adds one to the key, starting a new window if it has none. */
  increment(key: string, windowMs: number): Promise<Counter>;
  get(key: string): Promise<Counter | null>;
}

const MEMORY_STORE_PRUNE_SIZE = 10_000;

class MemoryStore implements CounterStore {
  private counters = new Map<string, Counter>();

  async increment(key: string, windowMs: number) {
    const now = Date.now();
    this.prune(now);

    const current = this.counters.get(key);
    const counter =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };

    this.counters.set(key, counter);
    return counter;
  }

  async get(key: string) {
    const counter = this.counters.get(key);
    return counter && counter.resetAt > Date.now() ? counter : null;
  }

  private prune(now: number) {
    if (this.counters.size < MEMORY_STORE_PRUNE_SIZE) return;
    for (const [key, counter] of this.counters) {
      if (counter.resetAt <= now) this.counters.delete(key);
    }
  }
}

type UpstashResult = { result?: unknown; error?: string };

class UpstashStore implements CounterStore {
  constructor(private url: string, private token: string) {}

  async increment(key: string, windowMs: number) {
    // SET NX starts the window only when the key is new; INCR keeps its expiry.
    const [, count, ttl] = await this.run("multi-exec", [
      ["SET", key, "0", "PX", String(windowMs), "NX"],
      ["INCR", key],
      ["PTTL", key],
    ]);
    const resetIn = Number(ttl) > 0 ? Number(ttl) : windowMs;
    return { count: Number(count), resetAt: Date.now() + resetIn };
  }

  async get(key: string) {
    const [count, ttl] = await this.run("pipeline", [
      ["GET", key],
      ["PTTL", key],
    ]);
    if (count === null || Number(ttl) <= 0) return null;
    return { count: Number(count), resetAt: Date.now() + Number(ttl) };
  }

  private async run(endpoint: "pipeline" | "multi-exec", commands: string[][]) {
    const response = await fetch(`${this.url}/${endpoint}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}` },
      body: JSON.stringify(commands),
    });
    if (!response.ok) {
      throw new Error(`Rate limit store responded with ${response.status}`);
    }

    const results: unknown = await response.json();
    if (!Array.isArray(results)) {
      throw new Error("Rate limit store returned an unexpected response");
    }
    return (results as UpstashResult[]).map((entry) => {
      if (entry.error) throw new Error(entry.error);
      return entry.result;
    });
  }
}

const createStore = (): CounterStore => {
  const { url, token } = serverConfig.upstash;
  if (url && token) return new UpstashStore(url, token);

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "UPSTASH_REDIS_REST_URL/TOKEN are not set: usage limits are kept in memory and reset whenever the server restarts."
    );
  }
  return new MemoryStore();
};

const store = createStore();
const { maxPrompts, windowHours } = serverConfig.limits;
const windowMs = windowHours * 60 * 60 * 1000;

const keyFor = (clientId: string) => `chat:prompts:${clientId}`;

const toUsage = (counter: Counter | null): ChatUsage => ({
  limit: maxPrompts,
  remaining: Math.max(0, maxPrompts - (counter?.count ?? 0)),
  resetAt: counter?.resetAt ?? null,
});

/** Counts one prompt against the visitor's allowance. */
export const consumePrompt = async (clientId: string) => {
  const counter = await store.increment(keyFor(clientId), windowMs);
  return { allowed: counter.count <= maxPrompts, usage: toUsage(counter) };
};

/** Reads the visitor's allowance without using any of it. */
export const getPromptUsage = async (clientId: string) =>
  toUsage(await store.get(keyFor(clientId)));
