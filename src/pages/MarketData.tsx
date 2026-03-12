import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MOCK_TABLE_DATA } from "@/lib/mockData";
import { Clock, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RANGE_DATA, RANGE_LABELS } from "@/lib/chartData";

export default function MarketDataPage() {
  const [activeRange, setActiveRange] = useState("1M");

  const chartData = useMemo(() => {
    return RANGE_DATA[activeRange] ?? [];
  }, [activeRange]);

  const priceMin = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    return prices.length ? Math.floor(Math.min(...prices) - 10) : 0;
  }, [chartData]);

  const priceMax = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    return prices.length ? Math.ceil(Math.max(...prices) + 10) : 0;
  }, [chartData]);

  const tickInterval = useMemo(() => {
    const len = chartData.length;
    if (len <= 10) return 0;
    if (len <= 30) return 3;
    if (len <= 60) return 7;
    return Math.floor(len / 10);
  }, [chartData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">Market Data</h1>
          <p className="text-muted-foreground">
            Gold price data and historical trends.
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-2xl border bg-card shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Gold Price Chart</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground/80">
                      Last Updated
                    </div>
                    <div>February 28, 2025 — 16:00 UTC</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground/80">
                      Data Source
                    </div>
                    <div>London Bullion Market Association (LBMA)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Range buttons */}
            <div className="mt-5 flex flex-wrap gap-2 rounded-xl bg-muted p-2 w-fit">
              {RANGE_LABELS.map((range) => (
                <Button
                  key={range}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveRange(range)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    activeRange === range
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          <div className="h-[420px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  interval={tickInterval}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[priceMin, priceMax]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`,
                    "Price",
                  ]}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(43 74% 44%)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border bg-card shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Historical Data</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Open</th>
                  <th className="px-6 py-4 font-medium">High</th>
                  <th className="px-6 py-4 font-medium">Low</th>
                  <th className="px-6 py-4 font-medium">Close</th>
                  <th className="px-6 py-4 font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TABLE_DATA.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">${row.open.toFixed(2)}</td>
                    <td className="px-6 py-4">${row.high.toFixed(2)}</td>
                    <td className="px-6 py-4">${row.low.toFixed(2)}</td>
                    <td className="px-6 py-4">${row.close.toFixed(2)}</td>
                    <td className="px-6 py-4">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
