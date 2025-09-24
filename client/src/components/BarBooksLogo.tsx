import React from "react";

interface BarBooksLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export const BarBooksLogo: React.FC<BarBooksLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full text-barbook-gray"
          fill="currentColor"
        >
          {/* Top horizontal lines (pages) */}
          <path
            d="M8 12 L32 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M8 16 L30 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M8 20 L28 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Main curved shape (stylized B) */}
          <path
            d="M12 8 Q20 8 20 16 Q20 24 12 24 L12 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner curve of the B */}
          <path
            d="M16 12 Q18 12 18 16 Q18 20 16 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Flowing ribbon extension */}
          <path
            d="M20 16 Q24 14 28 18 Q32 22 28 26 Q24 30 20 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-barbook-accent/20 rounded-full blur-sm animate-glow"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <span
          className={`font-barbook font-bold text-barbook-gray ${textSizeClasses[size]} tracking-wide`}
        >
          BarBooks
        </span>
      )}
    </div>
  );
};

export default BarBooksLogo;
