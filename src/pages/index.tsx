import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import ExampleModal from "@/components/examples/ExampleModal";
import MobileDrawer from "@/components/layout/MobileDrawer";
import MobileHeader from "@/components/layout/MobileHeader";
import Sidebar from "@/components/layout/Sidebar";
import type { Prefill } from "@/types/chat";
import type { Example } from "@/types/example";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState<Example>();
  const [prefill, setPrefill] = useState<Prefill>();

  const closeMenu = () => setIsMenuOpen(false);
  const closeExample = () => setSelectedExample(undefined);

  // Escape closes the top-most layer first: the example dialog, then the menu.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedExample) setSelectedExample(undefined);
      else setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExample]);

  const handleTryExample = (prompt: string) => {
    setPrefill({ text: prompt });
    closeExample();
    closeMenu();
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-900 text-white">
      <aside className="hidden w-72 shrink-0 lg:block xl:w-80">
        <Sidebar onSelectExample={setSelectedExample} />
      </aside>
      <MobileDrawer isOpen={isMenuOpen} onClose={closeMenu} onSelectExample={setSelectedExample} />

      <main className="flex min-w-0 flex-1 flex-col">
        <MobileHeader onOpenMenu={() => setIsMenuOpen(true)} />
        <ChatWindow prefill={prefill} onSelectExample={setSelectedExample} />
      </main>

      {selectedExample && (
        <ExampleModal example={selectedExample} onTry={handleTryExample} onClose={closeExample} />
      )}
    </div>
  );
}
