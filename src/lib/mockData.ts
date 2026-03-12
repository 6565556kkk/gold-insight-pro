export const MOCK_GOLD_PRICE = 2_347.80;
export const MOCK_PREDICTED_PRICE = 2_412.50;
export const MOCK_CONFIDENCE = 87;
export const MOCK_SIGNAL: "Bullish" | "Neutral" | "Bearish" = "Bullish";

export const MOCK_HISTORICAL = [
  { date: "Sep 2024", price: 2180 },
  { date: "Oct 2024", price: 2210 },
  { date: "Nov 2024", price: 2245 },
  { date: "Dec 2024", price: 2280 },
  { date: "Jan 2025", price: 2310 },
  { date: "Feb 2025", price: 2348 },
];

export const MOCK_FORECAST = [
  { date: "Feb 2025", price: 2348, forecast: 2348 },
  { date: "Mar 2025", price: null, forecast: 2375, upper: 2420, lower: 2330 },
  { date: "Apr 2025", price: null, forecast: 2395, upper: 2455, lower: 2335 },
  { date: "May 2025", price: null, forecast: 2412, upper: 2490, lower: 2334 },
];

export const MOCK_SHAP_DRIVERS = [
  { factor: "US Interest Rates", impact: -32, direction: "negative" as const, description: "Rising interest rates typically reduce gold's appeal as a non-yielding asset." },
  { factor: "US Dollar Index", impact: -18, direction: "negative" as const, description: "A stronger dollar makes gold more expensive for international buyers." },
  { factor: "Inflation Expectations", impact: 45, direction: "positive" as const, description: "Higher inflation expectations drive investors toward gold as a hedge." },
  { factor: "Geopolitical Risk", impact: 28, direction: "positive" as const, description: "Increased global uncertainty boosts demand for safe-haven assets." },
  { factor: "Central Bank Buying", impact: 22, direction: "positive" as const, description: "Sustained central bank purchases support long-term gold demand." },
  { factor: "Oil Prices", impact: 12, direction: "positive" as const, description: "Rising energy costs contribute to inflationary pressure, benefiting gold." },
];

export const MOCK_TABLE_DATA = [
  { date: "2025-02-28", open: 2340.10, high: 2355.40, low: 2332.80, close: 2347.80, volume: "182K" },
  { date: "2025-02-27", open: 2335.50, high: 2348.20, low: 2328.90, close: 2340.10, volume: "175K" },
  { date: "2025-02-26", open: 2328.00, high: 2342.10, low: 2320.50, close: 2335.50, volume: "168K" },
  { date: "2025-02-25", open: 2318.70, high: 2336.80, low: 2315.20, close: 2328.00, volume: "191K" },
  { date: "2025-02-24", open: 2325.90, high: 2330.40, low: 2310.60, close: 2318.70, volume: "157K" },
  { date: "2025-02-21", open: 2312.40, high: 2329.50, low: 2308.30, close: 2325.90, volume: "164K" },
  { date: "2025-02-20", open: 2305.80, high: 2318.70, low: 2298.40, close: 2312.40, volume: "149K" },
  { date: "2025-02-19", open: 2298.50, high: 2310.20, low: 2290.80, close: 2305.80, volume: "173K" },
];
