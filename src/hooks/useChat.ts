import { useEffect, useState } from "react";
import type {
  ChatErrorResponse,
  ChatLimits,
  ChatMessage,
  ChatReplyResponse,
  ChatUsage,
  UsageResponse,
} from "@/types/chat";

const FALLBACK_ERROR = "Sorry! Something went wrong in the server. Please try to send message later";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usage, setUsage] = useState<ChatUsage>();
  const [limits, setLimits] = useState<ChatLimits>();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/usage", { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<UsageResponse>) : undefined))
      .then((data) => {
        if (!data) return;
        setUsage(data.usage);
        setLimits(data.limits);
      })
      // The usage note is informational; chatting still works without it.
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const addMessage = (message: ChatMessage) => setMessages((previous) => [...previous, message]);

  const sendMessage = async (content: string) => {
    const message = content.trim();
    if (!message || isLoading) return;

    addMessage({ role: "user", content: message });
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: message }),
      });
      const data = (await response.json()) as ChatReplyResponse | ChatErrorResponse;

      if (data.usage) setUsage(data.usage);
      addMessage(
        "reply" in data
          ? { role: "bot", content: data.reply }
          : { role: "bot", content: data.error, isError: true }
      );
    } catch (error) {
      console.error(error);
      addMessage({ role: "bot", content: FALLBACK_ERROR, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return { messages, isLoading, usage, limits, sendMessage, clearMessages };
};
