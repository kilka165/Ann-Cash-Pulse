// app/(main)/page.tsx
import Link from 'next/link';
import { FiArrowRight, FiTrendingUp, FiBarChart2, FiGlobe, FiDollarSign, FiZap, FiActivity } from 'react-icons/fi';
import { fetchGlobalStats, fetchTopTickers } from '@/services/api';
import { formatCompactNumber, formatPercentage } from '@/lib/presenters';
import StatCard from '@/components/shared/StatCard';
import CoinPreviewCard from '@/components/shared/CoinPreviewCard';

export default async function HomePage() {
  const [globalStats, topCoinsData] = await Promise.all([
    fetchGlobalStats(),
    fetchTopTickers(5) // Загружаем топ-5 монет
  ]);

  const topCoins = topCoinsData || []; // Гарантируем, что topCoins это массив, даже если API вернул null

  return (
    <div className="flex flex-col items-center text-center px-4 py-12 sm:py-16">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mb-16 sm:mb-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl  mb-6 leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300">
            AnnCashPulse
          </span>
          <span className="block text-slate-100 mt-2 text-3xl sm:text-4xl lg:text-5xl">Ваш Навигатор в Мире Криптовалют</span>
        </h1>
        <p className="text-md sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
          Откройте для себя актуальные курсы, глубокий анализ рынка и самые свежие новости. AnnCashPulse — ваш надежный партнер для принятия взвешенных решений.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            href="/coins"
            className="group inline-flex items-center justify-center w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-sky-500/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Исследовать Монеты
            <FiArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/exchanges"
            className="group inline-flex items-center justify-center w-full sm:w-auto bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-100 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Обзор Бирж
            <FiTrendingUp className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Market Overview Section */}
      {globalStats ? (
        <section className="w-full max-w-5xl mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-[var(--font-manrope)] font-bold text-slate-100 mb-8 text-left sm:text-center">Обзор Рынка</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <StatCard title="Капитализация" value={`$${formatCompactNumber(globalStats.market_cap_usd)}`} icon={<FiGlobe size={20} />} />
            <StatCard title="Объем (24ч)" value={`$${formatCompactNumber(globalStats.volume_24h_usd)}`} icon={<FiActivity size={20} />} />
            <StatCard title="BTC Доминация" value={formatPercentage(globalStats.bitcoin_dominance_percentage)} icon={<FiZap size={20} />} />
            <StatCard title="Криптовалют" value={globalStats.cryptocurrencies_number.toLocaleString('en-US')} icon={<FiDollarSign size={20} />} />
          </div>
        </section>
      ) : (
         <div className="w-full max-w-5xl mb-16 sm:mb-24 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-center">Не удалось загрузить обзор рынка. Пожалуйста, попробуйте обновить страницу позже.</p>
         </div>
      )}

      {/* Top Cryptocurrencies Section */}
      {topCoins.length > 0 ? (
        <section className="w-full max-w-6xl mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-[var(--font-manrope)] font-bold text-slate-100 text-left mb-4 sm:mb-0">Топ Монет по Капитализации</h2>
            <Link href="/coins" className="text-sky-400 hover:text-sky-300 transition-colors font-medium inline-flex items-center self-start sm:self-center">
              Все монеты <FiArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {topCoins.map((coin) => (
              <CoinPreviewCard key={coin.id} coin={coin} />
            ))}
          </div>
        </section>
      ) : globalStats /* Только если глобальные данные тоже не загрузились, не показываем отдельную ошибку для монет */ ? null : (
         <div className="w-full max-w-5xl mb-16 sm:mb-24 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-center">Не удалось загрузить список топ монет. Пожалуйста, попробуйте обновить страницу позже.</p>
         </div>
      )}

      {/* Key Features Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-[var(--font-manrope)] font-bold text-slate-100 mb-8 text-left sm:text-center">Ключевые Возможности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Актуальные Данные", icon: <FiBarChart2 size={24} />, text: "Получайте информацию о курсах и рыночной капитализации в реальном времени." },
            { title: "Анализ Трендов", icon: <FiTrendingUp size={24} />, text: "Отслеживайте исторические данные и выявляйте рыночные тенденции для ваших инвестиций." },
            { title: "Простой Интерфейс", icon: <FiArrowRight size={24} />, text: "Интуитивно понятный дизайн для легкого доступа к необходимой информации." },
          ].map(feature => (
            <div key={feature.title} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-sky-500 transition-colors duration-300 text-left">
              <div className="flex items-center justify-center mb-4 w-12 h-12 bg-sky-500/20 text-sky-400 rounded-full mx-auto md:mx-0">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-[var(--font-manrope)] font-semibold text-slate-100 mb-2 text-center md:text-left">{feature.title}</h3>
              <p className="text-slate-400 text-sm text-center md:text-left">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}