import { motion } from "framer-motion";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { MOCK_SHAP_DRIVERS } from "@/lib/mockData";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

export default function ExplainabilityPage() {
  const shapChartData = MOCK_SHAP_DRIVERS.map((d) => ({
    name: d.factor,
    value: d.impact,
  })).sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Forecast Explainability</h1>
        <p className="text-muted-foreground mb-8">Understand what drives our gold price predictions.</p>

        {/* SHAP Bar Chart */}
        <div className="card-premium p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-bold">Why This Forecast?</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            The chart below shows how key market factors influenced the latest price forecast. Positive values push the prediction higher, while negative values pull it lower.
          </p>

          <ResponsiveContainer width="100%" height={300}>
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

        {/* Driver Cards */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-display text-lg font-semibold mb-4">Top Drivers</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {MOCK_SHAP_DRIVERS.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).map((driver, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="card-elevated p-4 flex items-start gap-3">
                <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  driver.direction === "positive" ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"
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
        </div>

        {/* Key Takeaway */}
        <div className="card-premium p-6">
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
