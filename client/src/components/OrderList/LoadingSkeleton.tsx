import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex-1">
                <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-enhanced-pulse"></div>
                <div className="h-3 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-enhanced-pulse"></div>
              </div>
              <div className="text-right">
                <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-1 animate-enhanced-pulse"></div>
                <div className="h-3 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-enhanced-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
