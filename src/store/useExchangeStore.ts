import { create } from 'zustand';
import { Exchange } from '@/@types/coinpaprika';
import { fetchExchanges } from '@/services/api';

interface ExchangeState {
  allExchanges: Exchange[];
  displayExchanges: Exchange[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  initExchanges: () => Promise<void>;
  setPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 15;

export const useExchangeStore = create<ExchangeState>((set, get) => ({
  allExchanges: [],
  displayExchanges: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  totalPages: 0,

  initExchanges: async () => {
    if (get().allExchanges.length > 0) {
      const { allExchanges, currentPage, itemsPerPage } = get();
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      set({
        displayExchanges: allExchanges.slice(startIndex, endIndex),
        totalPages: Math.ceil(allExchanges.length / itemsPerPage),
      });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const exchanges = await fetchExchanges();
      if (exchanges) {
        const sortedExchanges = exchanges
          .filter(ex => ex.quotes.USD.adjusted_volume_24h > 0)
          .sort((a, b) => a.rank - b.rank);

        const totalPages = Math.ceil(sortedExchanges.length / get().itemsPerPage);
        const startIndex = (get().currentPage - 1) * get().itemsPerPage;
        const endIndex = startIndex + get().itemsPerPage;

        set({
          allExchanges: sortedExchanges,
          displayExchanges: sortedExchanges.slice(startIndex, endIndex),
          isLoading: false,
          totalPages: totalPages,
          currentPage: 1,
        });
      } else {
        set({ error: 'Не удалось загрузить список бирж.', isLoading: false });
      }
    } catch (err) {
      console.error(err);
      set({ error: 'Произошла ошибка при загрузке бирж.', isLoading: false });
    }
  },

  setPage: (page: number) => {
    const { allExchanges, itemsPerPage, totalPages } = get();
    if (page < 1 || page > totalPages) return;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    set({
      currentPage: page,
      displayExchanges: allExchanges.slice(startIndex, endIndex),
    });
  },
}));