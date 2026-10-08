import type { NextApiRequest, NextApiResponse } from "next";
import { getClientId } from "@/lib/server/client-id";
import { serverConfig } from "@/lib/server/config";
import { describeOpenAIError, generateReply, isOpenAIConfigured } from "@/lib/server/openai";
import { consumePrompt } from "@/lib/server/rate-limit";
import type { ChatErrorResponse, ChatReplyResponse } from "@/types/chat";

const GENERIC_ERROR = "Something went wrong. Please try again later.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatReplyResponse | ChatErrorResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method should be POST" });
    return;
  }

  if (!isOpenAIConfigured()) {
    console.error("OPENAI_API_KEY is not set. Add it to your .env file.");
    res.status(500).json({ error: GENERIC_ERROR });
    return;
  }

  const { input } = req.body as { input?: unknown };
  const prompt = typeof input === "string" ? input.trim() : "";
  const { maxInputChars } = serverConfig.limits;

  if (!prompt) {
    res.status(400).json({ error: "Please enter a message." });
    return;
  }
  if (prompt.length > maxInputChars) {
    res.status(400).json({ error: `Messages can be up to ${maxInputChars} characters long.` });
    return;
  }

  let quota: Awaited<ReturnType<typeof consumePrompt>>;
  try {
    quota = await consumePrompt(getClientId(req));
  } catch (error) {
    console.error("Usage limit check failed:", error);
    res.status(503).json({ error: GENERIC_ERROR });
    return;
  }

  if (!quota.allowed) {
    res.status(429).json({
      error: "You've reached the demo message limit. Please come back later.",
      usage: quota.usage,
    });
    return;
  }

  try {
    const reply = await generateReply(prompt);
    res.status(200).json({ reply, usage: quota.usage });
  } catch (error) {
    console.error("Chat completion failed:", describeOpenAIError(error));
    res.status(500).json({ error: GENERIC_ERROR, usage: quota.usage });
  }
}
