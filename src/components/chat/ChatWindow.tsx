import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import ChatInput from "@/components/chat/ChatInput";
import EmptyState from "@/components/chat/EmptyState";
import MessageBubble from "@/components/chat/MessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import UsageNote from "@/components/chat/UsageNote";
import { useChat } from "@/hooks/useChat";
import type { Prefill } from "@/types/chat";
import type { Example } from "@/types/example";

type ChatWindowProps = {
  prefill?: Prefill;
  onSelectExample: (example: Example) => void;
};

const ChatWindow = ({ prefill, onSelectExample }: ChatWindowProps) => {
  const { messages, isLoading, usage, limits, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    container?.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-4 px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <EmptyState onSelectExample={onSelectExample} />
          ) : (
            <>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isLoading ? (
                <TypingIndicator />
              ) : (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={clearMessages}
                    className="flex items-center gap-2 rounded-full border border-gray-700 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                  >
                    <FaTrash size={12} /> Clear Conversation
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ChatInput
        prefill={prefill}
        isLoading={isLoading}
        isDisabled={usage?.remaining === 0}
        maxLength={limits?.maxInputChars}
        onSend={sendMessage}
      >
        <UsageNote usage={usage} limits={limits} />
      </ChatInput>
    </div>
  );
};

export default ChatWindow;
