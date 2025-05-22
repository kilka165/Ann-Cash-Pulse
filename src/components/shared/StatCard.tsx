import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  unit?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, unit = '', className }) => (
  <div className={`bg-slate-800 p-5 sm:p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center text-center ${className}`}>
    <div className="flex items-center justify-center mb-3 w-10 h-10 sm:w-12 sm:h-12 bg-sky-500/20 text-sky-400 rounded-full">
      {icon}
    </div>
    <h3 className="text-xs sm:text-sm text-slate-400 mb-1 uppercase tracking-wider">{title}</h3>
    <p className="text-xl sm:text-2xl text-slate-100">
      {value}
      {unit && <span className="text-base sm:text-lg ml-1">{unit}</span>}
    </p>
  </div>
);

export default StatCard;