import React from 'react';
import { Tag } from '@/@types/coinpaprika';
import { FiTag } from 'react-icons/fi';

interface CoinTagsProps {
  tags: Tag[];
}

const CoinTags: React.FC<CoinTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700/50">
      <h2 className="text-lg font-display font-semibold text-slate-100 mb-3 flex items-center">
        <FiTag className="mr-2 text-sky-400" /> Теги
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag.id} className="text-xs bg-slate-700 text-sky-300 px-2.5 py-1 rounded-full">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CoinTags;