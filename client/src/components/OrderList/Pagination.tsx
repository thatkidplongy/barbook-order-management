interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 disabled:text-gray-500 text-black py-1 border rounded disabled:bg-gray-100 hover:bg-gray-50 transition-colors duration-200"
      >
        Previous
      </button>
      <span className="px-3 py-1 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:bg-gray-100 disabled:text-gray-500 text-black hover:bg-gray-50 transition-colors duration-200"
      >
        Next
      </button>
    </div>
  );
}
