import { create } from 'zustand';
import { ExchangeDetail, Market } from '@/@types/coinpaprika';
import { fetchExchangeById, fetchMarketsByExchangeId } from '@/services/api';

interface ExchangeDetailState {
  exchange: ExchangeDetail | null;
  allMarkets: Market[];
  displayMarkets: Market[];
  isLoadingExchange: boolean;
  isLoadingMarkets: boolean;
  error: string | null;
  
  currentMarketPage: number;
  marketsPerPage: number;
  totalMarketPages: number;

  loadExchangeDetails: (exchangeId: string) => Promise<void>;
  setMarketPage: (page: number) => void;
}

const MARKETS_PER_PAGE = 25;

export const useExchangeDetailStore = create<ExchangeDetailState>((set, get) => ({
  exchange: null,
  allMarkets: [],
  displayMarkets: [],
  isLoadingExchange: false,
  isLoadingMarkets: false,
  error: null,

  currentMarketPage: 1,
  marketsPerPage: MARKETS_PER_PAGE,
  totalMarketPages: 0,

  loadExchangeDetails: async (exchangeId: string) => {
    set({ isLoadingExchange: true, isLoadingMarkets: true, error: null, exchange: null, allMarkets: [], displayMarkets: [] });
    try {
      const [exchangeData, marketsData] = await Promise.all([
        fetchExchangeById(exchangeId),
        fetchMarketsByExchangeId(exchangeId)
      ]);

      let finalError = null;

      if (exchangeData) {
        set({ exchange: exchangeData, isLoadingExchange: false });
      } else {
        finalError = `Не удалось загрузить информацию о бирже ${exchangeId}.`;
        set({ isLoadingExchange: false });
      }

      if (marketsData) {
        const sortedMarkets = marketsData.sort((a, b) => (b.quotes.USD?.volume_24h || 0) - (a.quotes.USD?.volume_24h || 0));
        
        const totalPages = Math.ceil(sortedMarkets.length / get().marketsPerPage);
        const startIndex = (1 - 1) * get().marketsPerPage;
        const endIndex = startIndex + get().marketsPerPage;

        set({
          allMarkets: sortedMarkets,
          displayMarkets: sortedMarkets.slice(startIndex, endIndex),
          isLoadingMarkets: false,
          totalMarketPages: totalPages,
          currentMarketPage: 1,
        });
      } else {
        finalError = finalError ? `${finalError} Также не удалось загрузить рынки.` : `Не удалось загрузить рынки для биржи ${exchangeId}.`;
        set({ isLoadingMarkets: false });
      }
      if (finalError) set({ error: finalError });

    } catch (err) {
      console.error(err);
      set({ error: 'Произошла критическая ошибка при загрузке данных биржи.', isLoadingExchange: false, isLoadingMarkets: false });
    }
  },

  setMarketPage: (page: number) => {
    const { allMarkets, marketsPerPage, totalMarketPages } = get();
    if (page < 1 || page > totalMarketPages) return;

    const startIndex = (page - 1) * marketsPerPage;
    const endIndex = startIndex + marketsPerPage;
    set({
      currentMarketPage: page,
      displayMarkets: allMarkets.slice(startIndex, endIndex),
    });
  },
}));