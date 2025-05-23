import React from 'react';

const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div
        className={`animate-spin rounded-full border-4 border-sky-500 border-t-transparent ${sizeClasses[size]}`}
        role="status"
      >
        <span className="sr-only">Загрузка...</span>
      </div>
    </div>
  );
};
export default LoadingSpinner;