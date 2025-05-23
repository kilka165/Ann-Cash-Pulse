import React from 'react';
import CoinList from './components/CoinList';

export const metadata = {
  title: 'Список Криптовалют | AnnCashPulse',
  description: 'Просматривайте актуальные курсы и рыночную информацию по всем доступным криптовалютам.',
};

export default function CoinsPage() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
          Все Криптовалюты
        </h1>
        <p className="text-slate-400 mt-2 text-md">
          Исследуйте полный список монет, отслеживайте их цены и рыночную капитализацию.
        </p>
      </div>
      {}
      <CoinList />
    </div>
  );
}