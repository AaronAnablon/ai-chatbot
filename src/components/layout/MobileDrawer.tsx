import Sidebar from "@/components/layout/Sidebar";
import type { Example } from "@/types/example";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectExample: (example: Example) => void;
};

// Stays mounted so it can slide in and out; `invisible` keeps it out of the tab order when closed.
const MobileDrawer = ({ isOpen, onClose, onSelectExample }: MobileDrawerProps) => (
  <div className="lg:hidden">
    <div
      aria-hidden="true"
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    />
    <aside
      aria-label="Menu"
      className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs transition-all duration-300 ${
        isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
      }`}
    >
      <Sidebar onSelectExample={onSelectExample} onClose={onClose} />
    </aside>
  </div>
);

export default MobileDrawer;
