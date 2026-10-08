export type ChatMessage = {
  role: "user" | "bot";
  content: string;
  isError?: boolean;
};

/** Wrapped in an object so picking the same example twice still refills the input. */
export type Prefill = {
  text: string;
};

export type ChatUsage = {
  limit: number;
  remaining: number;
  /** Epoch milliseconds when the allowance resets, or null before the first message. */
  resetAt: number | null;
};

export type ChatLimits = {
  windowHours: number;
  maxInputChars: number;
};

export type UsageResponse = {
  usage: ChatUsage;
  limits: ChatLimits;
};

export type ChatReplyResponse = {
  reply: string;
  usage: ChatUsage;
};

export type ChatErrorResponse = {
  error: string;
  usage?: ChatUsage;
};
