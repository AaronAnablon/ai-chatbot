import { BsX } from "react-icons/bs";
import ExampleList from "@/components/examples/ExampleList";
import Brand from "@/components/layout/Brand";
import { siteConfig } from "@/config/site";
import type { Example } from "@/types/example";

type SidebarProps = {
  onSelectExample: (example: Example) => void;
  /** Shows a close button; used when the sidebar is opened as a mobile drawer. */
  onClose?: () => void;
};

const Sidebar = ({ onSelectExample, onClose }: SidebarProps) => (
  <nav className="flex h-full flex-col bg-black px-4 py-6 text-white">
    <div className="flex items-center justify-between gap-2">
      <Brand className="text-3xl xl:text-4xl" />
      {onClose && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="rounded-md p-1 text-3xl transition-colors hover:bg-gray-800"
        >
          <BsX />
        </button>
      )}
    </div>

    <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-wider text-gray-400">Try these examples</p>
    <div className="-mx-2 min-h-0 flex-1 overflow-y-auto">
      <ExampleList variant="list" onSelect={onSelectExample} />
    </div>

    <a
      href={siteConfig.developerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 border-t border-gray-800 pt-4 text-gray-300 transition-colors hover:text-white"
    >
      About Developer
    </a>
  </nav>
);

export default Sidebar;
