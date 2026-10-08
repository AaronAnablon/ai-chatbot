const readPositiveInt = (name: string, fallback: number): number => {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

// Vercel's Upstash integration (Storage tab) adds the KV_ names; a manual setup uses UPSTASH_.
// The URL and token are always read as a pair so they can't come from different databases.
const readUpstashCredentials = () =>
  process.env.UPSTASH_REDIS_REST_URL
    ? { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "" }
    : { url: process.env.KV_REST_API_URL ?? "", token: process.env.KV_REST_API_TOKEN ?? "" };

export const serverConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? "",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    maxReplyTokens: readPositiveInt("OPENAI_MAX_TOKENS", 300),
  },
  limits: {
    maxPrompts: readPositiveInt("RATE_LIMIT_MAX_PROMPTS", 10),
    windowHours: readPositiveInt("RATE_LIMIT_WINDOW_HOURS", 24),
    maxInputChars: readPositiveInt("MAX_INPUT_CHARS", 2000),
  },
  upstash: readUpstashCredentials(),
};
