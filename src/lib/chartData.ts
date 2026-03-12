type ChartPoint = {
  time: string;
  price: number;
  volume?: number;
};

export const RANGE_LABELS = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"];

function formatDate(date: Date, mode: "hour" | "day"): string {
  if (mode === "hour") {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function generateSeries(count: number, base: number, step: number): number[] {
  return Array.from({ length: count }, (_, i) => {
    const wave = Math.sin(i / 1.5) * step * 0.6;
    const trend = i * step;
    return Math.round((base + trend + wave) * 100) / 100;
  });
}

function buildHourlyData(hours: number): ChartPoint[] {
  const now = new Date();
  const prices = generateSeries(hours, 2340, 1.2);

  return Array.from({ length: hours }, (_, i) => {
    const d = new Date(now);
    d.setHours(now.getHours() - (hours - 1 - i));

    return {
      time: formatDate(d, "hour"),
      price: prices[i],
      volume: 1200 + i * 30,
    };
  });
}

function buildDailyData(days: number): ChartPoint[] {
  const now = new Date();
  const prices = generateSeries(days, 2280, 6);

  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (days - 1 - i));

    return {
      time: formatDate(d, "day"),
      price: prices[i],
      volume: 3000 + i * 80,
    };
  });
}

function buildMonthlyData(months: number): ChartPoint[] {
  const now = new Date();
  const prices = generateSeries(months, 1900, 35);

  return Array.from({ length: months }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);

    return {
      time: d.toLocaleDateString("en-US", { month: "short" }),
      price: prices[i],
      volume: 9000 + i * 200,
    };
  });
}

function buildYearlyData(years: number): ChartPoint[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const prices = generateSeries(years, 1500, 120);

  return Array.from({ length: years }, (_, i) => {
    const year = currentYear - (years - 1 - i);

    return {
      time: year.toString(),
      price: prices[i],
      volume: 25000 + i * 1000,
    };
  });
}

function buildYTDData(): ChartPoint[] {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const count = currentMonth + 1;
  const prices = generateSeries(count, 2260, 18);

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(currentYear, i, 1);

    return {
      time: d.toLocaleDateString("en-US", { month: "short" }),
      price: prices[i],
      volume: 7000 + i * 300,
    };
  });
}

function buildAllDataFrom2015To2025(): ChartPoint[] {
  const startYear = 2015;
  const endYear = 2025;
  const segmentCount = endYear - startYear;
  const prices = generateSeries(segmentCount, 1080, 115);

  return Array.from({ length: segmentCount }, (_, i) => {
    const yearStart = startYear + i;
    const yearEnd = yearStart + 1;

    return {
      time: `${yearStart}-${yearEnd}`,
      price: prices[i],
      volume: 25000 + i * 1200,
    };
  });
}

export const RANGE_DATA: Record<string, ChartPoint[]> = {
  "1D": buildHourlyData(24),
  "5D": buildDailyData(5),
  "1M": buildDailyData(30),
  "6M": buildMonthlyData(6),
  "YTD": buildYTDData(),
  "1Y": buildMonthlyData(12),
  "5Y": buildYearlyData(5),
  "All": buildAllDataFrom2015To2025(),
};
