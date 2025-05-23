import React from 'react';
import Link from 'next/link';
import { Exchange } from '@/@types/coinpaprika';
import { formatCompactNumber } from '@/lib/presenters';
import { FiExternalLink, FiTrendingUp, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

interface ExchangeCardProps {
  exchange: Exchange;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ exchange }) => {
  const websiteUrl = exchange.links?.website?.[0];

  return (
    <Link
      href={`/exchanges/${exchange.id}`}
      className="block bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 hover:border-sky-500 transition-all duration-300 flex-col justify-between h-full transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-display font-semibold text-slate-100 pr-2" title={exchange.name}>
            {exchange.name}
          </h3>
          <span className="text-xs bg-sky-700 text-sky-100 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
            #{exchange.rank}
          </span>
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center">
            <FiTrendingUp className="mr-2 text-sky-400" />
            Объем (24ч): <span className="font-semibold text-slate-100 ml-1">${formatCompactNumber(exchange.quotes.USD.adjusted_volume_24h)}</span>
          </div>
          <div className="flex items-center">
            <FiBarChart2 className="mr-2 text-sky-400" />
            Рынков: <span className="font-semibold text-slate-100 ml-1">{exchange.markets.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <FiCheckCircle className="mr-2 text-sky-400" />
            Валют: <span className="font-semibold text-slate-100 ml-1">{exchange.currencies.toLocaleString()}</span>
          </div>
           {exchange.confidence_score !== null && typeof exchange.confidence_score !== 'undefined' && (
            <div className="flex items-center">
               <FiCheckCircle className="mr-2 text-green-400" />
               Score: <span className="font-semibold text-slate-100 ml-1">{exchange.confidence_score.toFixed(2)}</span>
            </div>
           )}
        </div>
      </div>

      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center justify-center text-sm text-sky-400 hover:text-sky-300 transition-colors group self-start relative z-10" // z-10 чтобы ссылка была "поверх"
        >
          Перейти на сайт
          <FiExternalLink className="ml-1.5 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      )}
    </Link>
  );
};

export default ExchangeCard;