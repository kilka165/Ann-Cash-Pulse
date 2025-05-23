import React from 'react';
import { fetchCoinById, fetchTickerForCoin } from '@/services/api';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import CoinInfoHeader from './components/CoinInfoHeader';
import CoinMarketStats from './components/CoinMarketStats';
import CoinDescription from './components/CoinDescription';
import CoinTags from './components/CoinTags';
import CoinLinks from './components/CoinLinks';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const coinId = params.id;
  const coinData = await fetchCoinById(coinId);

  if (!coinData || !coinData.name) {
    return {
      title: 'Монета не найдена | AnnCashPulse',
      description: 'Запрашиваемая криптовалюта не найдена.',
    };
  }

  return {
    title: `${coinData.name} (${coinData.symbol}) - Цена, Капитализация | AnnCashPulse`,
    description: `Актуальная информация о ${coinData.name}: цена, рыночная капитализация, описание. ${coinData.description?.substring(0, 150) || ''}...`,
  };
}

interface CoinPageProps {
  params: {
    id: string;
  };
}

export default async function CoinDetailPage({ params }: CoinPageProps) {
  const coinId = params.id;
  console.log(`[CoinDetailPage] Fetching data for coinId: ${coinId}`);

  const [coinDetails, tickerData] = await Promise.all([
    fetchCoinById(coinId),
    fetchTickerForCoin(coinId),
  ]);

  console.log('[CoinDetailPage] Data received:', {
    hasCoinDetails: !!coinDetails,
    hasTickerData: !!tickerData,
  });

  if (!coinDetails) {
    return (
      <div className="py-8 container mx-auto px-4 text-center">
        <ErrorDisplay message={`Не удалось загрузить основную информацию для монеты с ID: ${coinId}. Возможно, такой монеты не существует.`} />
        <Link href="/coins" className="mt-4 inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md">
          Назад к списку монет
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 container mx-auto px-4">
      {tickerData ? (
        <CoinInfoHeader coin={coinDetails} ticker={tickerData} />
      ) : (
        <div className="mb-8 p-4 sm:p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700/50">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-100" title={coinDetails.name}>
            {coinDetails.name}
            <span className="ml-2 text-base sm:text-lg text-slate-400 uppercase">({coinDetails.symbol})</span>
          </h1>
          <p className="text-slate-400 mt-2">Актуальные рыночные данные временно недоступны.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {tickerData ? (
             <CoinMarketStats ticker={tickerData} coin={coinDetails} />
          ) : (
            <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg border border-slate-700/50">
              <h2 className="text-xl font-display font-semibold text-slate-100 mb-4">Рыночная Статистика</h2>
              <p className="text-slate-400">Данные недоступны.</p>
            </div>
          )}
          <CoinDescription description={coinDetails.description || "Описание для этой монеты отсутствует."} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <CoinTags tags={coinDetails.tags || []} />
          <CoinLinks links={coinDetails.links} linksExtended={coinDetails.links_extended} whitepaper={coinDetails.whitepaper} />
        </div>
      </div>
    </div>
  );
}