export interface Contract {
  token: number;
  symbol: string;
  name: string;
  expiry: string;
  strike: number;
  lotsize: number;
  instrumenttype: string;
  exch_seg: string;
  tick_size: number;
}

export interface OptionData {
  strikePrice: number;
  expiryDate: string;
  underlying: string;
  identifier: string;
  openInterest: number;
  changeinOpenInterest: number;
  pchangeinOpenInterest: number;
  totalTradedVolume: number;
  impliedVolatility: number;
  lastPrice: number;
  change: number;
  pChange: number;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  bidQty: number;
  bidprice: number;
  askQty: number;
  askPrice: number;
  underlyingValue: number;
  token: number;
}

export interface OptionChainRow {
  strikePrice: number;
  CE: OptionData;
  PE: OptionData;
}

export interface OptionChainData {
  data: OptionChainRow[];
}

export interface WebSocketData {
  token: number;
  price: number;
  timestamp: number;
}