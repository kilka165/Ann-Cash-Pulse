export interface GlobalStats {
  market_cap_usd: number;
  volume_24h_usd: number;
  bitcoin_dominance_percentage: number;
  cryptocurrencies_number: number;
  market_cap_ath_value: number;
  market_cap_ath_date: string;
  volume_24h_ath_value: number;
  volume_24h_ath_date: string;
  market_cap_change_24h: number;
  volume_24h_change_24h: number;
  last_updated: number;
}

export interface Quote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number | null;
  ath_date: string | null;
  percent_from_price_ath: number | null;
}

export interface Ticker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: Quote;
  };
}

export interface CoinDetail extends Ticker {
  description: string | null;
  message: string;
  open_source: boolean;
  started_at: string | null;
  development_status: string | null;
  hardware_wallet: boolean;
  proof_type: string | null;
  org_structure: string | null;
  hash_algorithm: string | null;
  links: Links;
  links_extended: LinkExtended[];
  whitepaper: Whitepaper;
  tags: Tag[];
  team: TeamMember[];
  is_active: boolean;
  is_new: boolean;
}

export interface Links {
  explorer?: string[];
  facebook?: string[];
  reddit?: string[];
  source_code?: string[];
  website?: string[];
  youtube?: string[];
}

export interface LinkExtended {
  url: string;
  type: string;
  stats?: {
    [key: string]: number;
  };
}

export interface Whitepaper {
  link: string | null;
  thumbnail: string | null;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
}

export interface Exchange {
    id: string;
    name: string;
    rank: number;
    fiats: { name: string, symbol: string }[];
    adjusted_volume_24h_share: number | null;
    quotes: {
        USD: ExchangeQuote;
    };
    last_updated: string;
    links?: {
        website?: string[];
        twitter?: string[];
    };
    currencies: number;
    markets: number;
    confidence_score: number | null;
}

export interface ExchangeQuote {
    reported_volume_24h: number;
    adjusted_volume_24h: number;
}


export interface HistoricalOHLCV {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export interface Market {
  pair: string;
  base_currency_id: string;
  base_currency_name: string;
  quote_currency_id: string;
  quote_currency_name: string;
  market_url?: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  adjusted_volume_24h_share: number | null;
  quotes: {
    USD: MarketQuote;
  };
  last_updated: string;
  market_cap_usd?: number;
  price_ath_usd?: number;
  volume_24h_usd_ath?: number;
}

export interface MarketQuote {
  price: number;
  volume_24h: number;
}

export interface ExchangeDetail extends Exchange {
    description?: string | null;
}