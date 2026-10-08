import { GiHamburgerMenu } from "react-icons/gi";
import Brand from "@/components/layout/Brand";

type MobileHeaderProps = {
  onOpenMenu: () => void;
};

const MobileHeader = ({ onOpenMenu }: MobileHeaderProps) => (
  <header className="flex items-center gap-3 border-b border-gray-800 bg-black px-4 py-3 lg:hidden">
    <button
      type="button"
      aria-label="Open menu"
      onClick={onOpenMenu}
      className="rounded-md p-1 transition-colors hover:bg-gray-800"
    >
      <GiHamburgerMenu size={24} />
    </button>
    <Brand className="text-xl" />
  </header>
);

export default MobileHeader;
