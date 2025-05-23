import { GlobalStats, Ticker, CoinDetail, Exchange, HistoricalOHLCV } from '@/@types/coinpaprika';

const API_BASE_URL = 'https://api.coinpaprika.com/v1';

async function fetchData<T>(endpoint: string, errorMessage: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      console.error(`API Error: ${errorMessage}. Status: ${response.status}`, await response.text());
      return null;
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Network or parsing error in ${errorMessage}:`, error);
    return null;
  }
}

export async function fetchGlobalStats(): Promise<GlobalStats | null> {
  return fetchData<GlobalStats>('/global', 'Failed to fetch global stats');
}

export async function fetchTickers(limit?: number): Promise<Ticker[] | null> {
  const endpoint = limit ? `/tickers?quotes=USD&limit=${limit}` : '/tickers?quotes=USD';
  const tickers = await fetchData<Ticker[]>(endpoint, 'Failed to fetch tickers');
  return tickers ? tickers.sort((a, b) => a.rank - b.rank) : null;
}

export async function fetchTopTickers(limit: number = 5): Promise<Ticker[] | null> {
    const response = await fetch(`${API_BASE_URL}/tickers?quotes=USD`);
    if (!response.ok) {
      console.error('API Error: Failed to fetch tickers', response.status, await response.text());
      return null;
    }
    let data: Ticker[] = await response.json();
    data = data.sort((a, b) => a.rank - b.rank);
    return data.slice(0, limit);
}


export async function fetchCoinById(coinId: string): Promise<CoinDetail | null> {
  return fetchData<CoinDetail>(`/coins/${coinId}`, `Failed to fetch coin ${coinId}`);
}

export async function fetchTickerForCoin(coinId: string): Promise<Ticker | null> {
  return fetchData<Ticker>(`/tickers/${coinId}?quotes=USD`, `Failed to fetch ticker for coin ${coinId}`);
}

export async function fetchHistoricalOHLCV(coinId: string, startDate?: string): Promise<HistoricalOHLCV[] | null> {
  const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endpoint = `/coins/${coinId}/ohlcv/historical?start=${start}"es=USD`;
  return fetchData<HistoricalOHLCV[]>(endpoint, `Failed to fetch historical data for ${coinId}`);
}

export async function fetchExchanges(): Promise<Exchange[] | null> {
  return fetchData<Exchange[]>('/exchanges?quotes=USD', 'Failed to fetch exchanges');
}