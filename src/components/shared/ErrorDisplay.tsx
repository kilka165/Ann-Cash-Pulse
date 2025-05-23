import React from 'react';
import {FiAlertTriangle} from 'react-icons/fi';

interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative my-4 text-center" role="alert">
      <FiAlertTriangle className="inline-block mr-2 text-xl" />
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
export default ErrorDisplay;