import React from 'react';
import { FiInfo } from 'react-icons/fi';

interface CoinDescriptionProps {
  description: string;
}

const CoinDescription: React.FC<CoinDescriptionProps> = ({ description }) => {
  if (!description) return null;

  const paragraphs = description.split(/\n\s*\n/).map((para, index) => (
    <p key={index} className="mb-4 last:mb-0 leading-relaxed text-slate-300">
      {para}
    </p>
  ));


  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700/50">
      <h2 className="text-xl font-display font-semibold text-slate-100 mb-4 flex items-center">
        <FiInfo className="mr-2 text-sky-400" /> Описание
      </h2>
      <div className="prose prose-sm sm:prose-base prose-invert max-w-none prose-p:text-slate-300 prose-strong:text-slate-100">
        {description}
      </div>
    </div>
  );
};

export default CoinDescription;