import React from 'react';
import ExchangeList from './components/ExchangeList';

export const metadata = {
  title: 'Криптовалютные Биржи | AnnCashPulse',
  description: 'Обзор ведущих криптовалютных бирж, их объемов торгов и поддерживаемых рынков.',
};

export default function ExchangesPage() {
  return (
    <div className="py-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
          Криптовалютные Биржи
        </h1>
        <p className="text-slate-400 mt-2 text-md">
          Информация о популярных биржах, их объемах торгов и другая статистика.
        </p>
      </div>
      <ExchangeList />
    </div>
  );
}