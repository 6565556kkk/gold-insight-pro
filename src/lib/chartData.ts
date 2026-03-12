// Realistic gold price mock data for various time ranges

function generateIntraday(): { time: string; price: number; volume: number }[] {
  const base = 2347.8;
  const points: { time: string; price: number; volume: number }[] = [];
  for (let h = 9; h <= 16; h++) {
    for (let m = 0; m < 60; m += 5) {
      const t = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      const noise = (Math.sin(h * 3 + m * 0.1) * 8) + (Math.random() - 0.5) * 6;
      const price = +(base + noise + (h - 9) * 1.2).toFixed(2);
      const volume = Math.floor(800 + Math.random() * 1200 + (h === 10 || h === 15 ? 600 : 0));
      points.push({ time: t, price, volume });
    }
  }
  return points;
}

function generateDays(count: number, endPrice: number, startOffset: number): { time: string; price: number; volume: number }[] {
  const points: { time: string; price: number; volume: number }[] = [];
  const startPrice = endPrice - startOffset;
  const today = new Date(2025, 1, 28);
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const progress = 1 - i / count;
    const trend = startPrice + (endPrice - startPrice) * progress;
    const noise = (Math.sin(i * 0.7) * 12) + (Math.random() - 0.5) * 10;
    const price = +(trend + noise).toFixed(2);
    const volume = Math.floor(140000 + Math.random() * 80000);
    const label = `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getDate().toString().padStart(2, "0")}`;
    points.push({ time: label, price, volume });
  }
  return points;
}

function generateMonths(count: number, endPrice: number, startOffset: number): { time: string; price: number; volume: number }[] {
  const points: { time: string; price: number; volume: number }[] = [];
  const startPrice = endPrice - startOffset;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startDate = new Date(2025, 1, 1);
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() - i);
    const progress = 1 - i / count;
    const trend = startPrice + (endPrice - startPrice) * progress;
    const cycle = Math.sin(i * 0.4) * 25 + Math.cos(i * 0.15) * 15;
    const price = +(trend + cycle).toFixed(2);
    const volume = Math.floor(3200000 + Math.random() * 1500000);
    const label = `${months[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
    points.push({ time: label, price, volume });
  }
  return points;
}

export type ChartPoint = { time: string; price: number; volume: number };

// YTD = Jan 1 2025 to Feb 28 2025 ≈ 2 months of trading days
// 1Y = 12 months, 5Y = 60 months, All = Jan 2015 to Feb 2025 ≈ 122 months
export const RANGE_DATA: Record<string, ChartPoint[]> = {
  "1D": generateIntraday(),
  "5D": generateDays(5, 2347.8, 18),
  "1M": generateDays(22, 2347.8, 42),
  "6M": generateMonths(6, 2347.8, 120),
  "YTD": generateDays(42, 2347.8, 55),
  "1Y": generateMonths(12, 2347.8, 200),
  "5Y": generateMonths(60, 2347.8, 680),
  "All": generateMonths(122, 2347.8, 1150),
};

export const RANGE_LABELS = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"] as const;
