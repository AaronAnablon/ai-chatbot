import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import type { Prefill } from "@/types/chat";

type ChatInputProps = {
  prefill?: Prefill;
  isLoading: boolean;
  isDisabled: boolean;
  maxLength?: number;
  onSend: (message: string) => void;
  /** Shown under the input, e.g. the usage note. */
  children?: ReactNode;
};

// Show the character counter once a message reaches this share of the limit.
const COUNTER_THRESHOLD = 0.8;

const ChatInput = ({ prefill, isLoading, isDisabled, maxLength, onSend, children }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim() !== "" && !isLoading && !isDisabled;
  const showCounter = maxLength !== undefined && value.length >= maxLength * COUNTER_THRESHOLD;

  useEffect(() => {
    if (!prefill) return;
    setValue(prefill.text);
    // Only focus on devices with a mouse, so the on-screen keyboard doesn't pop up over the chat.
    if (window.matchMedia("(hover: hover)").matches) textareaRef.current?.focus();
  }, [prefill]);

  // Grow with the content; the max-h class caps the height and scrolls beyond it.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const submit = () => {
    if (!canSend) return;
    onSend(value);
    setValue("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 bg-gray-900 px-3 py-3 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 transition-colors focus-within:border-purple-500">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            maxLength={maxLength}
            disabled={isDisabled}
            enterKeyHint="send"
            aria-label="Message"
            placeholder={isDisabled ? "Message limit reached" : "Type your message..."}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-base text-white placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!canSend}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500 text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <AiOutlineSend size={18} />
          </button>
        </div>

        <div className="mt-2 flex items-start justify-between gap-3 text-xs text-gray-400">
          {children}
          {showCounter && (
            <span className="shrink-0 tabular-nums">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
