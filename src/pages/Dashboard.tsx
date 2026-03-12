import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  MOCK_GOLD_PRICE,
  MOCK_PREDICTED_PRICE,
  MOCK_CONFIDENCE,
  MOCK_SIGNAL,
} from "@/lib/mockData";
import { RANGE_DATA, RANGE_LABELS, type ChartPoint } from "@/lib/chartData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const signalConfig = {
  Bullish: { color: "text-green-600", bg: "bg-green-50", icon: TrendingUp },
  Bearish: { color: "text-red-600", bg: "bg-red-50", icon: TrendingDown },
  Neutral: { color: "text-muted-foreground", bg: "bg-muted", icon: Minus },
};

const dailyChange = 27.3;
const dailyChangePct = 1.18;

export default function DashboardPage() {
  const { user } = useAuth();
  const signal = signalConfig[MOCK_SIGNAL];
  const SignalIcon = signal.icon;
  const [activeRange, setActiveRange] = useState<string>("1M");
  const [showVolume, setShowVolume] = useState(true);

  const chartData = useMemo(() => RANGE_DATA[activeRange] ?? [], [activeRange]);

  const priceMin = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    return Math.floor(Math.min(...prices) - 10);
  }, [chartData]);

  const priceMax = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    return Math.ceil(Math.max(...prices) + 10);
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
      <div className="container py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* ── Quote Header ── */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-3xl font-display font-bold tracking-tight">
                Gold (XAU/USD)
              </h1>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                COMEX · Spot Price
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-2 flex-wrap">
              <span className="text-4xl font-display font-bold">
                ${MOCK_GOLD_PRICE.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-lg font-semibold text-green-600">
                +{dailyChange.toFixed(2)} (+{dailyChangePct.toFixed(2)}%)
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              As of Feb 28, 2025 · Market Closed · Updated at 4:00 PM EST
            </p>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Current Price
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                ${MOCK_GOLD_PRICE.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">+1.2% today</p>
            </div>
            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Next Month Forecast
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                ${MOCK_PREDICTED_PRICE.toLocaleString()}
              </p>
              <p className="text-xs mt-1" style={{ color: "hsl(43 72% 42%)" }}>
                +
                {((MOCK_PREDICTED_PRICE / MOCK_GOLD_PRICE - 1) * 100).toFixed(
                  1
                )}
                % projected
              </p>
            </div>
            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Market Signal
              </p>
              <div
                className={`flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg ${signal.bg} w-fit`}
              >
                <SignalIcon className={`h-4 w-4 ${signal.color}`} />
                <span className={`text-sm font-semibold ${signal.color}`}>
                  {MOCK_SIGNAL}
                </span>
              </div>
            </div>
            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Forecast Confidence
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                {MOCK_CONFIDENCE}%
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gold-gradient"
                  style={{ width: `${MOCK_CONFIDENCE}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Main Chart Module ── */}
          <div className="card-premium p-0 mb-6 overflow-hidden">
            {/* Chart Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-3 border-b border-border">
              {/* Range buttons */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                {RANGE_LABELS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      activeRange === r
                        ? "bg-card shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Utility controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground h-8"
                  onClick={() => setShowVolume(!showVolume)}
                >
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  Volume {showVolume ? "On" : "Off"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground h-8"
                >
                  Line
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 font-medium"
                >
                  Advanced Chart
                </Button>
              </div>
            </div>

            {/* Price Chart */}
            <div className="px-4 pt-4">
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="hsl(43 72% 42%)"
                        stopOpacity={0.12}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(43 72% 42%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(220 14% 92%)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                    axisLine={{ stroke: "hsl(220 14% 89%)" }}
                    tickLine={false}
                    interval={tickInterval}
                  />
                  <YAxis
                    domain={[priceMin, priceMax]}
                    tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${v.toLocaleString()}`}
                    width={72}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid hsl(220 14% 89%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      fontSize: 13,
                    }}
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                      "Price",
                    ]}
                    labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(43 72% 42%)"
                    strokeWidth={2}
                    fill="url(#priceFill)"
                    dot={false}
                    activeDot={{
                      r: 4,
                      stroke: "hsl(43 72% 42%)",
                      strokeWidth: 2,
                      fill: "white",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            {showVolume && (
              <div className="px-4 pb-4">
                <ResponsiveContainer width="100%" height={60}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid hsl(220 14% 89%)",
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Volume",
                      ]}
                    />
                    <Bar dataKey="volume" radius={[1, 1, 0, 0]}>
                      {chartData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            i > 0 && chartData[i].price >= chartData[i - 1].price
                              ? "hsl(142 60% 55%)"
                              : "hsl(0 72% 62%)"
                          }
                          fillOpacity={0.45}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* ── Market Insight ── */}
          <div className="card-premium p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1">
                  Market Insight
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gold prices are expected to continue their upward trajectory
                  over the next 3 months, driven primarily by persistent
                  inflation concerns and sustained central bank purchasing
                  activity. The current market signal is bullish with high
                  confidence. Consider reviewing your portfolio allocation in
                  light of these projections.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
