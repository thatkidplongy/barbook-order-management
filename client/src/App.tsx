import { useState } from "react";
import { SummaryCard } from "./components/SummaryCard";
import { OrderForm } from "./components/OrderForm";
import { OrderList } from "./components/OrderList";
import { useSummary } from "./hooks/useSummary";
import { useOrders } from "./hooks/useOrders";
import { useCreateOrder } from "./hooks/useCreateOrder";

const ITEMS_PER_PAGE = 10;

function App() {
  const [productFilter, setProductFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: summary,
    loading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useSummary();
  const {
    data: orders,
    total: totalOrders,
    loading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrders({
    product: productFilter || undefined,
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  console.log("ordersError", ordersError);

  const {
    createOrder,
    loading: createLoading,
    error: createError,
  } = useCreateOrder();

  const handleCreateOrder = async (orderData: any) => {
    const result = await createOrder(orderData);
    if (result) {
      // Refresh both summary and orders list
      await Promise.all([refetchSummary(), refetchOrders()]);
    }
  };

  const handleProductFilterChange = (filter: string) => {
    setProductFilter(filter);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total pages using the total count from the API
  const totalPages = Math.max(1, Math.ceil(totalOrders / ITEMS_PER_PAGE));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  BarBook
                </h1>
              </div>
              <p className="text-lg text-gray-600 font-medium">
                Advanced Order Management & Analytics Dashboard
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
                <span className="text-sm font-medium text-gray-600">
                  Live Dashboard
                </span>
                <div className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {createError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Error creating order
                </h3>
                <p className="text-sm text-red-700 mt-1">{createError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Analytics Section */}
          <div className="xl:col-span-2">
            <SummaryCard
              summary={summary}
              loading={summaryLoading}
              error={summaryError}
            />
          </div>

          {/* Order Creation Section */}
          <div className="xl:col-span-1">
            <OrderForm onSubmit={handleCreateOrder} loading={createLoading} />
          </div>
        </div>

        <OrderList
          orders={orders || []}
          loading={ordersLoading}
          error={ordersError}
          productFilter={productFilter}
          onProductFilterChange={handleProductFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
