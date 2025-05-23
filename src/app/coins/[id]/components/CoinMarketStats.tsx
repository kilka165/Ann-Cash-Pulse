import React from 'react';
import { Ticker, CoinDetail } from '@/@types/coinpaprika';
import { formatCompactNumber, formatCurrency } from '@/lib/presenters';

interface CoinMarketStatsProps {
  ticker: Ticker;
  coin: CoinDetail;
}

const StatItem = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
    <div className="py-3 px-1 border-b border-slate-700/50 last:border-b-0">
        <dt className="text-sm text-slate-400">{label}</dt>
        <dd className="mt-1 text-md font-semibold text-slate-100">{value} {unit}</dd>
    </div>
);


const CoinMarketStats: React.FC<CoinMarketStatsProps> = ({ ticker, coin }) => {
  const usd = ticker.quotes.USD;

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700/50">
      <h2 className="text-xl font-display font-semibold text-slate-100 mb-4">Рыночная Статистика</h2>
      <dl className="divide-y divide-slate-700/50">
        <StatItem label="Рыночная Капитализация" value={formatCurrency(usd.market_cap, 'USD', 0)} />
        <StatItem label="Объем (24ч)" value={formatCurrency(usd.volume_24h, 'USD', 0)} />
        {ticker.circulating_supply && (
          <StatItem label="В обращении" value={ticker.circulating_supply.toLocaleString()} unit={coin.symbol.toUpperCase()} />
        )}
        {ticker.total_supply && (
          <StatItem label="Всего предложений" value={ticker.total_supply.toLocaleString()} unit={coin.symbol.toUpperCase()} />
        )}
        {coin.max_supply && (
          <StatItem label="Макс. предложение" value={coin.max_supply.toLocaleString()} unit={coin.symbol.toUpperCase()} />
        )}
        {usd.ath_price && usd.ath_date && (
            <>
             <StatItem label="All-Time High (ATH)" value={formatCurrency(usd.ath_price)} />
             <StatItem label="Дата ATH" value={new Date(usd.ath_date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })} />
             <StatItem label="От ATH" value={`${usd.percent_from_price_ath?.toFixed(2) ?? 'N/A'}%`} />
            </>
        )}
      </dl>
    </div>
  );
};

export default CoinMarketStats;