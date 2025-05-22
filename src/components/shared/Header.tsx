import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-gray-200 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-4xl font-extrabold tracking-tighter text-blue-400 hover:text-blue-300 transition-colors duration-300 ease-in-out">
          AnnCashPulse
        </Link>
        <nav>
          <ul className="flex space-x-8 items-center">
            <li>
              <Link href="/" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300 ease-in-out text-lg px-2 py-1 rounded-md">
                Главная
              </Link>
            </li>
            <li>
              <Link href="/coins" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300 ease-in-out text-lg px-2 py-1 rounded-md">
                Монеты
              </Link>
            </li>
            <li>
              <Link href="/exchanges" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300 ease-in-out text-lg px-2 py-1 rounded-md">
                Биржи
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-semibold text-gray-300 hover:text-blue-400 transition-colors duration-300 ease-in-out text-lg px-2 py-1 rounded-md">
                О нас
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;