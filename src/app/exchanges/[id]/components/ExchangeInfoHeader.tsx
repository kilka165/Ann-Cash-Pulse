import React from 'react';
import { ExchangeDetail } from '@/@types/coinpaprika';
import { formatCompactNumber } from '@/lib/presenters';
import { FiBarChart2, FiDollarSign, FiExternalLink, FiZap } from 'react-icons/fi';
import Link from 'next/link';

interface ExchangeInfoHeaderProps {
  exchange: ExchangeDetail;
}

const ExchangeInfoHeader: React.FC<ExchangeInfoHeaderProps> = ({ exchange }) => {
  const websiteUrl = exchange.links?.website?.[0];

  return (
    <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-100 mb-1">{exchange.name}</h1>
          <span className="text-sm bg-sky-600 text-white font-semibold px-2.5 py-1 rounded-full">
            Ранг
          </span>
        </div>
        {websiteUrl && (
          <Link
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors group text-sm"
          >
            Официальный сайт <FiExternalLink className="ml-1.5 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <div className="flex items-center text-slate-400 mb-1">
            <FiDollarSign className="mr-2 text-lg text-sky-400" /> Объем (24ч USD)
          </div>
          <p className="text-lg font-semibold text-slate-100">
            ${formatCompactNumber(exchange.quotes.USD.adjusted_volume_24h)}
          </p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <div className="flex items-center text-slate-400 mb-1">
            <FiBarChart2 className="mr-2 text-lg text-sky-400" /> Торговых пар
          </div>
          <p className="text-lg font-semibold text-slate-100">{exchange.markets.toLocaleString()}</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <div className="flex items-center text-slate-400 mb-1">
            <FiZap className="mr-2 text-lg text-sky-400" /> Криптовалют
          </div>
          <p className="text-lg font-semibold text-slate-100">{exchange.currencies.toLocaleString()}</p>
        </div>
      </div>

      {exchange.description && (
         <div className="mt-6 prose prose-sm prose-invert text-slate-300 max-w-none">
            <p>{exchange.description}</p>
         </div>
      )}
    </div>
  );
};

export default ExchangeInfoHeader;