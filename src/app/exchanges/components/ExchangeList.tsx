'use client';

import React, { useEffect } from 'react';
import { useExchangeStore } from '@/store/useExchangeStore';
import ExchangeCard from './ExchangeCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Pagination from '@/components/shared/Pagination';

const ExchangeList = () => {
  const {
    displayExchanges,
    isLoading,
    error,
    currentPage,
    totalPages,
    setPage,
    initExchanges,
  } = useExchangeStore();

  useEffect(() => {
    if (useExchangeStore.getState().allExchanges.length === 0) {
      initExchanges();
    }
  }, [initExchanges]);

  if (isLoading && displayExchanges.length === 0) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

   if (!isLoading && displayExchanges.length === 0 && useExchangeStore.getState().allExchanges.length > 0) {
    return <p className="text-center text-slate-400 my-10">Нет бирж для отображения.</p>;
  }
  if (!isLoading && displayExchanges.length === 0 && useExchangeStore.getState().allExchanges.length === 0 && !error) {
    return <p className="text-center text-slate-400 my-10">Список бирж пуст или еще не загружен.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {displayExchanges.map(exchange => (
          <ExchangeCard key={exchange.id} exchange={exchange} />
        ))}
      </div>
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ExchangeList;