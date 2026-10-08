import { createHash } from "crypto";
import type { NextApiRequest } from "next";

const firstHeaderValue = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value)?.split(",")[0]?.trim();

// x-forwarded-for is set by the hosting proxy (Vercel overwrites any value the
// client sends). When self-hosting, run behind a proxy that does the same, or
// visitors can spoof the header to reset their limit.
const getClientIp = (req: NextApiRequest) =>
  firstHeaderValue(req.headers["x-forwarded-for"]) ||
  firstHeaderValue(req.headers["x-real-ip"]) ||
  req.socket.remoteAddress ||
  "unknown";

/** A stable, anonymised identifier for the visitor, so raw IPs are never stored. */
export const getClientId = (req: NextApiRequest) =>
  createHash("sha256").update(getClientIp(req)).digest("hex");
