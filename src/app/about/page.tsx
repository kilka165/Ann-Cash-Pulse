import React from 'react';
import Link from 'next/link';
import { FiZap, FiCode, FiHeart, FiDatabase, FiCpu, FiCheckSquare } from 'react-icons/fi';

export const metadata = {
  title: 'О проекте AnnCashPulse',
  description: 'Узнайте больше о AnnCashPulse, нашей миссии, технологиях и команде.',
};

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-sky-500 transition-colors duration-300">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-sky-500/20 text-sky-400 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold text-slate-100">{title}</h3>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">
      {children}
    </p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300 mb-4">
          О AnnCashPulse
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
          Ваш надежный проводник в захватывающем и динамичном мире криптовалют.
        </p>
      </header>

      <section className="max-w-4xl mx-auto mb-12 sm:mb-16 text-slate-300 text-left prose prose-invert prose-lg prose-headings:font-display prose-headings:text-slate-100 prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-strong:text-slate-200">
        <h2 className="!text-3xl">Наша Миссия</h2>
        <p>
          В AnnCashPulse мы стремимся сделать сложный мир криптовалют доступным и понятным для каждого. Наша миссия — предоставлять точные, своевременные и легко усваиваемые данные, которые помогут вам принимать обоснованные решения, будь вы опытным трейдером или только начинаете свой путь в криптоиндустрии.
        </p>
        <p>
          Мы верим, что информация — это ключ к успеху, и наша платформа разработана, чтобы стать вашим надежным источником знаний о курсах, рыночных тенденциях, новостях и технологиях блокчейна.
        </p>

        <h2 className="!text-3xl mt-10">Почему AnnCashPulse?</h2>
        <p>
          Наш проект родился из страсти к инновациям и желания создать по-настоящему полезный инструмент для крипто-сообщества. Мы уделяем особое внимание:
        </p>
        <ul>
          <li><strong>Актуальности данных:</strong> Информация обновляется регулярно благодаря интеграции с надежным <Link href="https://api.coinpaprika.com/" target="_blank" rel="noopener noreferrer">CoinPaprika API</Link>.</li>
          <li><strong>Пользовательскому опыту:</strong> Мы разрабатываем интуитивно понятный и адаптивный интерфейс, чтобы вы могли легко найти нужную информацию на любом устройстве.</li>
          <li><strong>Технологичности:</strong> AnnCashPulse построен на современном стеке технологий, обеспечивающем скорость, надежность и масштабируемость.</li>
        </ul>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100 mb-10 text-center">Технологии за AnnCashPulse</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard icon={<FiCpu size={28} />} title="Next.js & React">
            Современный фулстек-фреймворк для React, обеспечивающий высокую производительность, SSR и SSG для лучшего SEO и пользовательского опыта.
          </FeatureCard>
          <FeatureCard icon={<FiCode size={28} />} title="TypeScript">
            Строгая типизация для повышения надежности кода, улучшения опыта разработки и более простого рефакторинга.
          </FeatureCard>
          <FeatureCard icon={<FiZap size={28} />} title="Tailwind CSS">
            Утилитарный CSS-фреймворк, позволяющий быстро создавать кастомные дизайны без написания лишнего CSS.
          </FeatureCard>
          <FeatureCard icon={<FiDatabase size={28} />} title="Zustand">
            Легковесный и мощный менеджер состояний для React, который помогает управлять данными приложения просто и эффективно.
          </FeatureCard>
          <FeatureCard icon={<FiHeart size={28} />} title="CoinPaprika API">
            Надежный источник данных о криптовалютах, который мы используем для предоставления актуальной информации.
          </FeatureCard>
           <FeatureCard icon={<FiCheckSquare size={28} />} title="И Многое Другое">
            Мы постоянно исследуем и внедряем лучшие практики и инструменты для улучшения AnnCashPulse.
          </FeatureCard>
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100 mb-6">Присоединяйтесь к Нам!</h2>
        <p className="text-slate-400 mb-8 text-lg">
          Мы всегда рады обратной связи и новым идеям. Если у вас есть предложения или вы хотите узнать больше, не стесняйтесь <Link href="/#contact" className="text-sky-400 hover:text-sky-300 underline">связаться с нами</Link> (ссылка-заглушка, можно добавить реальную).
        </p>
        <p className="text-slate-500 text-sm">
          Спасибо, что выбрали AnnCashPulse!
        </p>
      </section>
    </div>
  );
}