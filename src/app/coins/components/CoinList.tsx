'use client';
import React from 'react';
import { useCoinStore } from '@/store/useCoinStore';
import CoinPreviewCard from '@/components/shared/CoinPreviewCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Pagination from '@/components/shared/Pagination';

const CoinList = () => {
  const {
    displayCoins,
    isLoading,
    error,
    currentPage,
    totalPages,
    setPage,
    initCoins,
  } = useCoinStore();

  React.useEffect(() => {
    if (useCoinStore.getState().allCoins.length === 0) {
        initCoins();
    }
  }, [initCoins]);


  if (isLoading && displayCoins.length === 0) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!isLoading && displayCoins.length === 0 && useCoinStore.getState().allCoins.length > 0) {
    return <p className="text-center text-slate-400 my-10">Нет монет для отображения (возможно, ошибка пагинации или пустой список).</p>;
  }
   if (!isLoading && displayCoins.length === 0 && useCoinStore.getState().allCoins.length === 0 && !error) {
    return <p className="text-center text-slate-400 my-10">Список монет пуст или еще не загружен.</p>;
  }


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {displayCoins.map(coin => (
          <CoinPreviewCard key={coin.id} coin={coin} />
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

export default CoinList;