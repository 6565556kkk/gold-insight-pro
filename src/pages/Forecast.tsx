import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, ReferenceLine } from "recharts";
import { MOCK_FORECAST, MOCK_SHAP_DRIVERS, MOCK_PREDICTED_PRICE, MOCK_CONFIDENCE } from "@/lib/mockData";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

export default function ForecastPage() {
  const shapChartData = MOCK_SHAP_DRIVERS.map((d) => ({
    name: d.factor,
    value: d.impact,
  })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Gold Price Forecast</h1>
        <p className="text-muted-foreground mb-8">Intelligent price projections with confidence intervals.</p>

        {/* Top stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Price</p>
            <p className="text-2xl font-display font-bold mt-1">${MOCK_PREDICTED_PRICE.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">3-month horizon</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Confidence Level</p>
            <p className="text-2xl font-display font-bold mt-1">{MOCK_CONFIDENCE}%</p>
            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gold-gradient" style={{ width: `${MOCK_CONFIDENCE}%` }} />
            </div>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Range</p>
            <p className="text-lg font-display font-bold mt-1">$2,334 — $2,490</p>
            <p className="text-xs text-muted-foreground mt-1">Expected price band</p>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-display text-lg font-semibold mb-4">Forecast Chart</h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={MOCK_FORECAST}>
              <defs>
                <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(43 72% 42%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(43 72% 42%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 89%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 14% 89%)" }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#forecastBand)" name="Upper Band" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="transparent" name="Lower Band" />
              <Area type="monotone" dataKey="price" stroke="hsl(43 72% 42%)" strokeWidth={2.5} fill="none" dot={{ r: 4, fill: "hsl(43 72% 42%)" }} name="Actual" />
              <Area type="monotone" dataKey="forecast" stroke="hsl(43 60% 60%)" strokeWidth={2} strokeDasharray="6 3" fill="none" dot={{ r: 4, fill: "hsl(43 60% 60%)" }} name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Summary */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-display text-lg font-semibold mb-3">Forecast Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our analysis indicates gold is likely to appreciate over the next three months, reaching an estimated price of ${MOCK_PREDICTED_PRICE.toLocaleString()} by May 2025. This outlook is supported by persistent inflation expectations and strong central bank demand. The forecast confidence remains high at {MOCK_CONFIDENCE}%, with a projected price range between $2,334 and $2,490.
          </p>
        </div>

        {/* SHAP Section */}
        <div className="card-premium p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-bold">Why This Forecast?</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            The chart below shows how key market factors influenced the latest price forecast. Positive values push the prediction higher, while negative values pull it lower.
          </p>

          {/* SHAP Bar Chart */}
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={shapChartData} layout="vertical" margin={{ left: 120, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 89%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" width={110} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 14% 89%)" }} />
                <ReferenceLine x={0} stroke="hsl(220 25% 12%)" strokeWidth={1} />
                <Bar dataKey="value" radius={[4, 4, 4, 4]} name="Impact">
                  {shapChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.value >= 0 ? "hsl(145 60% 40%)" : "hsl(0 65% 55%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ranked importance */}
          <h3 className="font-display font-semibold text-base mb-4">Top Drivers</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {MOCK_SHAP_DRIVERS.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).map((driver, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="card-elevated p-4 flex items-start gap-3">
                <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  driver.direction === "positive" ? "bg-green-50" : "bg-red-50"
                }`}>
                  {driver.direction === "positive" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{driver.factor}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{driver.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Narrative */}
          <div className="rounded-xl bg-muted/50 border border-border p-5">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Key takeaway:</span> Inflation expectations and geopolitical risk had the strongest positive influence on this forecast, while rising interest rates and US dollar strength partially offset the upward momentum. Overall, the bullish factors outweigh the bearish ones, resulting in a positive price outlook.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
