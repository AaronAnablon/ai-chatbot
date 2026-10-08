import { FaHandPointRight, FaRobot } from "react-icons/fa";
import ExampleList from "@/components/examples/ExampleList";
import { siteConfig } from "@/config/site";
import type { Example } from "@/types/example";

type EmptyStateProps = {
  onSelectExample: (example: Example) => void;
};

const EmptyState = ({ onSelectExample }: EmptyStateProps) => (
  <div className="flex flex-1 flex-col items-center justify-center py-4 text-center text-gray-300">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300">
      <FaRobot size={28} />
    </div>
    <h2 className="text-xl font-semibold text-white sm:text-2xl">Don&apos;t hesitate to interact with it.</h2>
    <p className="mt-3 max-w-md text-sm sm:text-base">
      Feel free to experiment with different questions and topics. I hope you have a fantastic experience
      engaging with the AI Chatbot!
    </p>

    {/* On large screens the examples are always visible in the sidebar. */}
    <div className="mt-6 w-full max-w-md lg:hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Try an example</p>
      <ExampleList variant="grid" onSelect={onSelectExample} />
    </div>

    <p className="mt-8 max-w-md text-sm">If you have any feedback or suggestions, I&apos;d love to hear from you.</p>
    <a
      href={siteConfig.developerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex items-center gap-2 font-medium text-purple-300 transition-colors hover:text-purple-200"
    >
      <FaHandPointRight size={18} /> Click me!
    </a>
    <p className="mt-6 max-w-md text-sm text-gray-400">Chat away and enjoy your time with this friendly AI companion!</p>
  </div>
);

export default EmptyState;
