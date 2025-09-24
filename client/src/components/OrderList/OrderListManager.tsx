import { useState } from "react";
import { Order } from "../../types";
import {
  SortField,
  sortOrders,
  getNextSortConfig,
  getDefaultSortConfig,
} from "../../utils/sorting";
import { SearchBar } from "./SearchBar";
import { SortHeader } from "./SortHeader";
import { OrderTable } from "./OrderTable";
import { Pagination } from "./Pagination";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";

interface OrderListManagerProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  productFilter: string;
  onProductFilterChange: (filter: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function OrderListManager({
  orders,
  loading,
  error,
  productFilter,
  onProductFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}: OrderListManagerProps) {
  const [localFilter, setLocalFilter] = useState(productFilter);
  const [sortConfig, setSortConfig] = useState(getDefaultSortConfig());

  const handleFilterChange = (value: string) => {
    setLocalFilter(value);
  };

  const handleSearch = () => {
    onProductFilterChange(localFilter);
  };

  const handleSort = (field: SortField) => {
    const newConfig = getNextSortConfig(
      sortConfig.field,
      sortConfig.direction,
      field
    );
    setSortConfig(newConfig);
  };

  const handleClearSort = () => {
    setSortConfig(getDefaultSortConfig());
  };

  const sortedOrders = sortOrders(orders, sortConfig);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Management
          </h2>
          <p className="text-gray-600">Search and filter through your orders</p>
          {sortConfig.field && (
            <SortHeader
              field={sortConfig.field}
              direction={sortConfig.direction}
              onSort={handleSort}
              onClearSort={handleClearSort}
            />
          )}
        </div>
        <SearchBar
          value={localFilter}
          onChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : orders.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <OrderTable
            orders={sortedOrders}
            sortField={sortConfig.field}
            sortDirection={sortConfig.direction}
            onSort={handleSort}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
