import { SortField, SortDirection } from "../../utils/sorting";

interface SortHeaderProps {
  field: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  onClearSort: () => void;
}

export function SortHeader({ field, direction, onClearSort }: SortHeaderProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
        />
      </svg>
      <span>
        Sorted by {field} ({direction})
      </span>
      <button
        onClick={onClearSort}
        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        title="Clear sort"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
