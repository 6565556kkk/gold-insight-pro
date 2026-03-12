export const MOCK_GOLD_PRICE = {
  current: 2947.8,
  change: 12.4,
  changePercent: 0.42,
  high: 2961.3,
  low: 2928.6,
  open: 2935.2,
};

export const MOCK_HISTORICAL = [
  { time: "Sep", price: 2580 },
  { time: "Oct", price: 2635 },
  { time: "Nov", price: 2710 },
  { time: "Dec", price: 2788 },
  { time: "Jan", price: 2855 },
  { time: "Feb", price: 2925 },
];

export const MOCK_MARKET_SUMMARY = [
  { label: "Inflation Outlook", value: "Elevated", detail: "CPI 3.1% YoY" },
  { label: "Bond Yield Trend", value: "Rising", detail: "10Y at 4.28%" },
  { label: "Central Bank Demand", value: "Strong", detail: "1,037t in 2024" },
  { label: "Safe-Haven Demand", value: "Elevated", detail: "Geopolitical risk ↑" },
];

export const MOCK_EXPLAINABILITY = [
  { factor: "US Dollar Index", impact: "-0.42", direction: "Negative" },
  { factor: "10Y Treasury Yield", impact: "-0.31", direction: "Negative" },
  { factor: "Inflation Expectations", impact: "+0.28", direction: "Positive" },
  { factor: "Oil Prices", impact: "+0.14", direction: "Positive" },
  { factor: "S&P 500", impact: "-0.09", direction: "Negative" },
];

export type HistoricalRow = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: string;
};

function formatTableDate(
  date: Date,
  mode: "hour" | "day" | "month" | "yearRange"
): string {
  if (mode === "hour") {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  if (mode === "day") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (mode === "month") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  return `${date.getFullYear()}-${date.getFullYear() + 1}`;
}

function buildHistoricalRows(
  count: number,
  mode: "hour" | "day" | "month" | "yearRange",
  basePrice: number
): HistoricalRow[] {
  const now = new Date();

  return Array.from({ length: count }, (_, i) => {
    const drift = i * 4;
    const wave = Math.sin(i / 2) * 8;
    const close = Number((basePrice + drift + wave).toFixed(2));
    const open = Number((close - 3.2).toFixed(2));
    const high = Number((close + 6.4).toFixed(2));
    const low = Number((close - 7.1).toFixed(2));

    let d = new Date(now);

    if (mode === "hour") {
      d.setHours(now.getHours() - i);
    } else if (mode === "day") {
      d.setDate(now.getDate() - i);
    } else if (mode === "month") {
      d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    } else {
      d = new Date(2024 - i, 0, 1);
    }

    return {
      date: formatTableDate(d, mode),
      open,
      high,
      low,
      close,
      volume: (1800 + i * 95).toLocaleString(),
    };
  }).reverse();
}

export const HISTORICAL_TABLE_DATA: Record<string, HistoricalRow[]> = {
  "1D": buildHistoricalRows(24, "hour", 2330),
  "5D": buildHistoricalRows(5, "day", 2310),
  "1M": buildHistoricalRows(30, "day", 2280),
  "6M": buildHistoricalRows(6, "month", 2140),
  "YTD": buildHistoricalRows(new Date().getMonth() + 1, "month", 2200),
  "1Y": buildHistoricalRows(12, "month", 2050),
  "5Y": buildHistoricalRows(5, "yearRange", 1650),
  "All": buildHistoricalRows(10, "yearRange", 1500),
};
