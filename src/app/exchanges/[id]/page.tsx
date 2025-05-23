'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useExchangeDetailStore } from '@/store/useExchangeDetailStore';
import ExchangeInfoHeader from './components/ExchangeInfoHeader';
import ExchangeMarketList from './components/ExchangeMarketList';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Link from 'next/link';



export default function ExchangeDetailPage() {
  const params = useParams();
  const exchangeId = typeof params.id === 'string' ? params.id : '';

  const {
    exchange,
    isLoadingExchange,
    isLoadingMarkets,
    error,
    loadExchangeDetails,
  } = useExchangeDetailStore();

  useEffect(() => {
    if (exchangeId) {
      if (useExchangeDetailStore.getState().exchange?.id !== exchangeId) {
        useExchangeDetailStore.setState({ exchange: null, allMarkets: [], displayMarkets: [], error: null });
      }
      loadExchangeDetails(exchangeId);
    }
  }, [exchangeId, loadExchangeDetails]);

  if ((isLoadingExchange || isLoadingMarkets) && !exchange && !error) {
    return (
      <div className="py-20 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-400">Загрузка данных биржи...</p>
      </div>
    );
  }

  if (error && !exchange) {
    return (
      <div className="py-8 text-center">
        <ErrorDisplay message={error} />
        <Link href="/exchanges" className="mt-4 inline-block text-sky-400 hover:underline">
          Вернуться к списку бирж
        </Link>
      </div>
    );
  }

  if (!exchange) {
    return (
        <div className="py-8 text-center">
            <p className="text-slate-400">Информация о бирже не найдена или неверный ID.</p>
            <Link href="/exchanges" className="mt-4 inline-block text-sky-400 hover:underline">
              Вернуться к списку бирж
            </Link>
        </div>
    );
  }


  return (
    <div className="py-6 sm:py-8">
      <ExchangeInfoHeader exchange={exchange} />
      <ExchangeMarketList /> {}
      {error && exchange && (
           <div className="mt-6"> <ErrorDisplay message={error} /> </div>
      )}
    </div>
  );
}