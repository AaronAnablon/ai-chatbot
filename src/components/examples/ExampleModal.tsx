import { BsX } from "react-icons/bs";
import type { Example } from "@/types/example";

type ExampleModalProps = {
  example: Example;
  onTry: (prompt: string) => void;
  onClose: () => void;
};

const sectionTitleClassName = "mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400";
const sectionBodyClassName = "whitespace-pre-line rounded-lg p-4 text-sm text-gray-900 sm:text-base";

// A bottom sheet on phones and a centered dialog on larger screens.
const ExampleModal = ({ example, onTry, onClose }: ExampleModalProps) => (
  <div
    className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
    onClick={onClose}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="example-title"
      onClick={(event) => event.stopPropagation()}
      className="flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-gray-800 text-white shadow-xl sm:max-w-2xl sm:rounded-2xl"
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-700 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-700 p-2">
            {example.icon}
          </div>
          <div>
            <h2 id="example-title" className="text-xl font-bold sm:text-2xl">
              {example.title}
            </h2>
            <p className="mt-1 text-sm text-gray-300 sm:text-base">{example.description}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded-md p-1 text-2xl text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        >
          <BsX />
        </button>
      </div>

      <div className="min-h-0 space-y-5 overflow-y-auto p-5 sm:p-6">
        <section>
          <h3 className={sectionTitleClassName}>Prompt</h3>
          <div className={`${sectionBodyClassName} bg-gray-100`}>{example.prompt}</div>
        </section>
        <section>
          <h3 className={sectionTitleClassName}>Sample response</h3>
          <div className={`${sectionBodyClassName} bg-green-100`}>{example.sample}</div>
        </section>
      </div>

      <div className="flex justify-end border-t border-gray-700 p-5 sm:p-6">
        <button
          type="button"
          onClick={() => onTry(example.prompt)}
          className="w-full rounded-lg bg-blue-500 px-5 py-2.5 font-semibold transition-colors hover:bg-blue-600 sm:w-auto"
        >
          Try this
        </button>
      </div>
    </div>
  </div>
);

export default ExampleModal;
