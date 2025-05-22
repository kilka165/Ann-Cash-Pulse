import Link from 'next/link';
import { Ticker } from '@/@types/coinpaprika';
import { formatCurrency } from '@/lib/presenters';
import PriceChange from '@/components/shared/PriceChange';

interface CoinPreviewCardProps {
  coin: Ticker;
  className?: string;
}

const CoinPreviewCard: React.FC<CoinPreviewCardProps> = ({ coin, className }) => {
  const fallbackIcon = (
    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm mr-3">
      {coin.symbol.substring(0, 1)}
    </div>
  );

  const price = coin.quotes.USD.price;
  const marketCap = coin.quotes.USD.market_cap;

  return (
    <Link
      href={`/coins/${coin.id}`}
      className={`block bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-sky-600/30 ${className}`}
    >
      <div className="flex items-center mb-3">
        {fallbackIcon}
        <div className="flex-1 min-w-0">
          <h3 className="text-md font-display font-semibold text-slate-100 truncate" title={coin.name}>
            {coin.name}
          </h3>
          <span className="text-xs text-slate-400 uppercase">{coin.symbol}</span>
        </div>
        <span className="text-xs bg-sky-700 text-sky-100 font-semibold px-2 py-0.5 rounded-full ml-2">
        </span>
      </div>
      <div className="my-2">
        <p className="text-xl font-semibold text-sky-400">
          {formatCurrency(price, 'USD', 2, price < 0.01 ? 6 : (price < 1 ? 4 : 2))}
        </p>
      </div>
      <div className="text-sm flex justify-between items-center">
        <span className="text-slate-400">24ч:</span>
        <PriceChange value={coin.quotes.USD.percent_change_24h} />
      </div>
      <p className="text-xs text-slate-500 mt-2 truncate">
        Капитализация: {formatCurrency(marketCap, 'USD', 0)}
      </p>
    </Link>
  );
};

export default CoinPreviewCard;