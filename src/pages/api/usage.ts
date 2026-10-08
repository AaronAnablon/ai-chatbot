import type { NextApiRequest, NextApiResponse } from "next";
import { getClientId } from "@/lib/server/client-id";
import { serverConfig } from "@/lib/server/config";
import { getPromptUsage } from "@/lib/server/rate-limit";
import type { ChatErrorResponse, UsageResponse } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsageResponse | ChatErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method should be GET" });
    return;
  }

  try {
    const usage = await getPromptUsage(getClientId(req));
    const { windowHours, maxInputChars } = serverConfig.limits;
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ usage, limits: { windowHours, maxInputChars } });
  } catch (error) {
    console.error("Usage lookup failed:", error);
    res.status(503).json({ error: "Something went wrong. Please try again later." });
  }
}
