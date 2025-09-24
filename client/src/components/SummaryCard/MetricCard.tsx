import React from "react";
import { formatCurrency, formatNumber } from "../../utils/formatting";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  valueColor: string;
  isCurrency?: boolean;
}

export function MetricCard({
  title,
  value,
  icon,
  gradientFrom,
  gradientTo,
  bgColor,
  borderColor,
  textColor,
  valueColor,
  isCurrency = false,
}: MetricCardProps) {
  const formattedValue =
    isCurrency && typeof value === "number"
      ? formatCurrency(value)
      : typeof value === "number"
      ? formatNumber(value)
      : value;

  return (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} p-6 rounded-xl border ${borderColor} hover:shadow-lg transition-all duration-300`}
    >
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${bgColor} rounded-full -translate-y-10 translate-x-10 opacity-20`}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}
          >
            {icon}
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${textColor}`}>{title}</p>
            <p className={`text-3xl font-bold ${valueColor}`}>
              {formattedValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
