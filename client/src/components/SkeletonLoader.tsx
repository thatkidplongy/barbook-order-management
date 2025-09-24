import React from "react";

interface SkeletonLoaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function SkeletonLoader({
  className = "",
  children,
}: SkeletonLoaderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      {children}
    </div>
  );
}

// Custom shimmer animation
export const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;

// Skeleton components for different shapes
export function SkeletonText({
  width = "w-24",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <SkeletonLoader
      className={`${width} ${height} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded`}
    >
      <div className={`${width} ${height} bg-gray-200 rounded`}></div>
    </SkeletonLoader>
  );
}

export function SkeletonCard({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonLoader className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
      {children}
    </SkeletonLoader>
  );
}

export function SkeletonButton({
  width = "w-20",
  height = "h-10",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <SkeletonLoader
      className={`${width} ${height} bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 rounded-md`}
    >
      <div className={`${width} ${height} bg-blue-200 rounded-md`}></div>
    </SkeletonLoader>
  );
}
