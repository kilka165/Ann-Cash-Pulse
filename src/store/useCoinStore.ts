import { create } from 'zustand';
import { Ticker } from '@/@types/coinpaprika';
import { fetchTickers } from '@/services/api';

interface CoinState {
  allCoins: Ticker[];
  displayCoins: Ticker[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  initCoins: () => Promise<void>;
  setPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 20;

export const useCoinStore = create<CoinState>((set, get) => ({
  allCoins: [],
  displayCoins: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  totalPages: 0,

  initCoins: async () => {
    if (get().allCoins.length > 0) {
      const { allCoins, currentPage, itemsPerPage } = get();
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      set({
        displayCoins: allCoins.slice(startIndex, endIndex),
        totalPages: Math.ceil(allCoins.length / itemsPerPage),
      });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const tickers = await fetchTickers();
      if (tickers) {
        const activeTickers = tickers
            .filter((ticker: Ticker) => ticker.rank > 0 && ticker.quotes.USD.market_cap > 0)
            .sort((a: Ticker, b: Ticker) => a.rank - b.rank);

        const totalPages = Math.ceil(activeTickers.length / get().itemsPerPage);
        const startIndex = (get().currentPage - 1) * get().itemsPerPage;
        const endIndex = startIndex + get().itemsPerPage;

        set({
          allCoins: activeTickers,
          displayCoins: activeTickers.slice(startIndex, endIndex),
          isLoading: false,
          totalPages: totalPages,
          currentPage: 1,
        });
      } else {
        set({ error: 'Не удалось загрузить список монет.', isLoading: false });
      }
    } catch (err) {
      console.error(err);
      set({ error: 'Произошла ошибка при загрузке монет.', isLoading: false });
    }
  },

  setPage: (page: number) => {
    const { allCoins, itemsPerPage, totalPages } = get();
    if (page < 1 || page > totalPages) return;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    set({
      currentPage: page,
      displayCoins: allCoins.slice(startIndex, endIndex),
    });
  },
}));