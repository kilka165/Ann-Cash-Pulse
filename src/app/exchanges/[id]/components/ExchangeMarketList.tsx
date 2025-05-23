'use client';
import React from 'react';
import { formatCurrency, formatCompactNumber } from '@/lib/presenters';
import Pagination from '@/components/shared/Pagination';
import { useExchangeDetailStore } from '@/store/useExchangeDetailStore';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Link from 'next/link';

const ExchangeMarketList = () => {
  const {
    displayMarkets,
    isLoadingMarkets,
    currentMarketPage,
    totalMarketPages,
    setMarketPage,
  } = useExchangeDetailStore();

  if (isLoadingMarkets && displayMarkets.length === 0) {
    return <div className="py-10"><LoadingSpinner /></div>;
  }

  if (!isLoadingMarkets && displayMarkets.length === 0) {
    return <p className="text-slate-400 text-center py-10">На этой бирже нет доступных рынков или данные не загружены.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-display font-semibold text-slate-100 mb-4">Торговые Пары</h2>
      <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-md border border-slate-700">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Пара</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Цена (USD)</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Объем (24ч USD)</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Категория</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {displayMarkets.map((market, index) => (
              <tr key={`${market.pair}-${index}`} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-100">
                    <Link href={`/coins/${market.base_currency_id}`} className="hover:text-sky-400 transition-colors">{market.base_currency_name}</Link>
                    <span className="text-slate-500"> / </span>
                    <Link href={`/coins/${market.quote_currency_id}`} className="hover:text-sky-400 transition-colors">{market.quote_currency_name}</Link>
                  </div>
                  <div className="text-xs text-slate-400">{market.pair}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-200">
                  {formatCurrency(market.quotes.USD?.price, 'USD', 2, market.quotes.USD?.price < 0.01 ? 6 : 4)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-200">
                  ${formatCompactNumber(market.quotes.USD?.volume_24h)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{market.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalMarketPages > 1 && (
        <Pagination
          currentPage={currentMarketPage}
          totalPages={totalMarketPages}
          onPageChange={setMarketPage}
        />
      )}
    </div>
  );
};

export default ExchangeMarketList;