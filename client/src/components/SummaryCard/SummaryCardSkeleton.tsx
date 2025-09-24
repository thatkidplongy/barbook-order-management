import React from "react";

export function SummaryCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-6 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-4 animate-enhanced-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Revenue Card */}
        <div className="relative overflow-hidden bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="h-4 w-24 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded mb-3 animate-enhanced-pulse"></div>
            <div className="h-8 w-20 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded animate-enhanced-pulse"></div>
          </div>
        </div>

        {/* Median Price Card */}
        <div className="relative overflow-hidden bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="h-4 w-24 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded mb-3 animate-enhanced-pulse"></div>
            <div className="h-8 w-20 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded animate-enhanced-pulse"></div>
          </div>
        </div>

        {/* Top Product Card */}
        <div className="relative overflow-hidden bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="h-4 w-24 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 rounded mb-3 animate-enhanced-pulse"></div>
            <div className="h-8 w-20 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 rounded animate-enhanced-pulse"></div>
          </div>
        </div>

        {/* Unique Products Card */}
        <div className="relative overflow-hidden bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <div className="h-4 w-24 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 rounded mb-3 animate-enhanced-pulse"></div>
            <div className="h-8 w-20 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 rounded animate-enhanced-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
