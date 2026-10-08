import type { ChatMessage } from "@/types/chat";

const bubbleStyles = {
  user: "rounded-br-sm bg-purple-500 text-white",
  bot: "rounded-bl-sm bg-gray-800 text-white",
  error: "rounded-bl-sm border border-red-500/40 bg-red-500/10 text-red-200",
};

type MessageBubbleProps = {
  message: ChatMessage;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const style = message.isError ? bubbleStyles.error : bubbleStyles[message.role];

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%] sm:text-base ${style}`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
