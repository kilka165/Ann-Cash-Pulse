import React from 'react';
import { CoinDetail, Ticker } from '@/@types/coinpaprika';
import { formatCurrency } from '@/lib/presenters';
import PriceChange from '@/components/shared/PriceChange';

interface CoinInfoHeaderProps {
  coin: CoinDetail;
  ticker: Ticker;
}

const CoinInfoHeader: React.FC<CoinInfoHeaderProps> = ({ coin, ticker }) => {
  const price = ticker.quotes.USD.price;
  const change24h = ticker.quotes.USD.percent_change_24h;
  
  const fallbackIcon = (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xl mr-3 sm:mr-4">
      {coin.symbol.substring(0, 1)}
    </div>
  );

  return (
    <div className="mb-8 p-4 sm:p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          {fallbackIcon}
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-100" title={coin.name}>
              {coin.name}
              <span className="ml-2 text-base sm:text-lg text-slate-400 uppercase">({coin.symbol})</span>
            </h1>
            <span className="text-xs sm:text-sm bg-sky-700 text-sky-100 font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">
              Ранг #{coin.rank}
            </span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-3xl sm:text-4xl font-bold text-sky-400">
            {formatCurrency(price, 'USD', 2, price < 0.01 ? 6 : (price < 1 ? 4 : 2))}
          </p>
          <div className="text-md mt-1">
            <PriceChange value={change24h} className="font-semibold" />
            <span className="text-slate-400 ml-1">(24ч)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfoHeader;