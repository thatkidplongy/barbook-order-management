import React from "react";
import { Summary } from "../../types";
import { SummaryCardSkeleton } from "./SummaryCardSkeleton";
import { MetricCard } from "./MetricCard";

interface SummaryCardManagerProps {
  summary: Summary | null;
  loading: boolean;
  error: string | null;
}

export function SummaryCardManager({
  summary,
  loading,
  error,
}: SummaryCardManagerProps) {
  if (loading) {
    return <SummaryCardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unable to Load Analytics
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600">Start by creating your first order</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">Real-time order insights and metrics</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Total Revenue"
          value={summary.totalRevenue}
          icon={
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          }
          gradientFrom="from-blue-50"
          gradientTo="to-blue-100"
          bgColor="bg-blue-500"
          borderColor="border-blue-200"
          textColor="text-blue-600"
          valueColor="text-blue-900"
          isCurrency={true}
        />

        <MetricCard
          title="Median Order Price"
          value={summary.medianOrderPrice}
          icon={
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          gradientFrom="from-green-50"
          gradientTo="to-green-100"
          bgColor="bg-green-500"
          borderColor="border-green-200"
          textColor="text-green-600"
          valueColor="text-green-900"
          isCurrency={true}
        />

        <MetricCard
          title="Top Product"
          value={summary.topProductByQty || "N/A"}
          icon={
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
          gradientFrom="from-purple-50"
          gradientTo="to-purple-100"
          bgColor="bg-purple-500"
          borderColor="border-purple-200"
          textColor="text-purple-600"
          valueColor="text-purple-900"
        />

        <MetricCard
          title="Unique Products"
          value={summary.uniqueProductCount}
          icon={
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          }
          gradientFrom="from-orange-50"
          gradientTo="to-orange-100"
          bgColor="bg-orange-500"
          borderColor="border-orange-200"
          textColor="text-orange-600"
          valueColor="text-orange-900"
        />
      </div>
    </div>
  );
}
