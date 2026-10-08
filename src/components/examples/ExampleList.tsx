import { examples } from "@/data/examples";
import type { Example } from "@/types/example";

const variantStyles = {
  list: {
    container: "flex flex-col gap-1",
    item: "rounded-lg px-2 py-2 text-base hover:bg-gray-800",
    icon: "h-10 w-10",
  },
  grid: {
    container: "grid grid-cols-2 gap-2",
    item: "rounded-xl border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm hover:border-gray-500",
    icon: "h-8 w-8",
  },
};

type ExampleListProps = {
  variant: keyof typeof variantStyles;
  onSelect: (example: Example) => void;
};

const ExampleList = ({ variant, onSelect }: ExampleListProps) => {
  const styles = variantStyles[variant];

  return (
    <ul className={styles.container}>
      {examples.map((example) => (
        <li key={example.title}>
          <button
            type="button"
            onClick={() => onSelect(example)}
            className={`flex h-full w-full items-center gap-3 text-left text-white transition-colors ${styles.item}`}
          >
            <span className={`flex shrink-0 items-center justify-center rounded-md bg-blue-700 p-1.5 ${styles.icon}`}>
              {example.icon}
            </span>
            {example.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExampleList;
