const dotClassName = "h-2 w-2 animate-bounce rounded-full bg-gray-400";

const TypingIndicator = () => (
  <div className="flex justify-start" role="status" aria-label="The chatbot is typing">
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-800 px-4 py-4">
      <span className={`${dotClassName} [animation-delay:-0.3s]`} />
      <span className={`${dotClassName} [animation-delay:-0.15s]`} />
      <span className={dotClassName} />
    </div>
  </div>
);

export default TypingIndicator;
