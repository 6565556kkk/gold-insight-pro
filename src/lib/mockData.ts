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

export const MOCK_FORECAST_CONFIGS: Record<string, {
  predictedPrice: number;
  confidence: number;
  rangeLow: number;
  rangeHigh: number;
  horizonLabel: string;
  summary: string;
  takeaway: string;
  chartData: { date: string; price: number | null; forecast: number; upper?: number; lower?: number }[];
}> = {
  "1m": {
    predictedPrice: 2_375.00,
    confidence: 91,
    rangeLow: 2_330,
    rangeHigh: 2_420,
    horizonLabel: "1-month",
    summary:
      "Over the next month, gold is expected to edge higher to an estimated $2,375, supported by near-term inflation data and continued safe-haven demand. Confidence is high at 91%, with a narrow projected band between $2,330 and $2,420.",
    takeaway:
      "Short-term momentum remains positive. Inflation expectations and geopolitical tensions are the dominant drivers, while rising bond yields provide mild headwinds.",
    chartData: [
      { date: "Feb 2025", price: 2348, forecast: 2348 },
      { date: "Mar 2025", price: null, forecast: 2375, upper: 2420, lower: 2330 },
    ],
  },
  "3m": {
    predictedPrice: 2_412.50,
    confidence: 87,
    rangeLow: 2_334,
    rangeHigh: 2_490,
    horizonLabel: "3-month",
    summary:
      "Our analysis indicates gold is likely to appreciate over the next three months, reaching an estimated price of $2,412 by May 2025. This outlook is supported by persistent inflation expectations and strong central bank demand. The forecast confidence remains high at 87%, with a projected price range between $2,334 and $2,490.",
    takeaway:
      "Inflation expectations and geopolitical risk had the strongest positive influence on this forecast, while rising interest rates and US dollar strength partially offset the upward momentum. Overall, the bullish factors outweigh the bearish ones, resulting in a positive price outlook.",
    chartData: [
      { date: "Feb 2025", price: 2348, forecast: 2348 },
      { date: "Mar 2025", price: null, forecast: 2375, upper: 2420, lower: 2330 },
      { date: "Apr 2025", price: null, forecast: 2395, upper: 2455, lower: 2335 },
      { date: "May 2025", price: null, forecast: 2412, upper: 2490, lower: 2334 },
    ],
  },
};

export const MOCK_SHAP_DRIVERS = [
  { factor: "S&P 500 Index", impact: -18, direction: "negative" as const, description: "A rising stock market draws capital away from safe-haven assets like gold." },
  { factor: "Inflation Rate", impact: 45, direction: "positive" as const, description: "Higher inflation drives investors toward gold as a hedge against purchasing power erosion." },
  { factor: "Interest Rates", impact: -32, direction: "negative" as const, description: "Rising interest rates reduce gold's appeal as a non-yielding asset." },
  { factor: "10-Year Gov Bond Yield", impact: -15, direction: "negative" as const, description: "Higher bond yields increase the opportunity cost of holding gold." },
  { factor: "Silver Prices", impact: 22, direction: "positive" as const, description: "Silver and gold prices tend to move together as precious metal demand shifts." },
  { factor: "Copper Prices", impact: 12, direction: "positive" as const, description: "Rising copper prices signal industrial growth and inflationary pressure, benefiting gold." },
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
