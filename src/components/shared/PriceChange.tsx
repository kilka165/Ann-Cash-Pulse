import React from 'react';
import { formatPercentage } from '@/lib/presenters';

interface PriceChangeProps {
  value: number | undefined | null;
  className?: string;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, className = "" }) => {
  if (value === null || typeof value === 'undefined') {
    return <span className={`text-slate-400 ${className}`}>N/A</span>;
  }
  const isPositive = value > 0;
  const isNegative = value < 0;
  const colorClass = isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-slate-400';

  return (
    <span className={`${colorClass} ${className}`}>
      {isPositive ? '+' : ''}
      {formatPercentage(value, 2)}
    </span>
  );
};

export default PriceChange;