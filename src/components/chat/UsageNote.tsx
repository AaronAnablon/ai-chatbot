import type { ChatLimits, ChatUsage } from "@/types/chat";

type UsageNoteProps = {
  usage?: ChatUsage;
  limits?: ChatLimits;
};

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

const formatPeriod = (hours: number) => (hours === 24 ? "per day" : `every ${plural(hours, "hour")}`);

const formatTimeUntil = (timestamp: number) => {
  const minutes = Math.max(1, Math.ceil((timestamp - Date.now()) / 60_000));
  return minutes < 60 ? plural(minutes, "minute") : plural(Math.ceil(minutes / 60), "hour");
};

const UsageNote = ({ usage, limits }: UsageNoteProps) => {
  if (!usage || !limits) {
    return <p>This is a demo with a limited number of messages.</p>;
  }

  if (usage.remaining === 0) {
    return (
      <p className="text-amber-300">
        You&apos;ve used all {usage.limit} demo messages.
        {usage.resetAt && ` You can chat again in about ${formatTimeUntil(usage.resetAt)}.`}
      </p>
    );
  }

  return (
    <p>
      Demo version: up to {usage.limit} messages {formatPeriod(limits.windowHours)}, with short replies.{" "}
      <span className="font-medium text-gray-200">{usage.remaining} left.</span>
    </p>
  );
};

export default UsageNote;
