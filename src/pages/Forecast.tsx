import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, ReferenceLine } from "recharts";
import { MOCK_SHAP_DRIVERS, MOCK_FORECAST_CONFIGS } from "@/lib/mockData";
import { Info, TrendingUp, TrendingDown, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AVAILABLE_VARIABLES = [
  { id: "sp500", label: "S&P 500 Index" },
  { id: "inflation", label: "Inflation Rate" },
  { id: "interest", label: "Interest Rates" },
  { id: "bond10y", label: "10-Year Gov Bond Yield" },
  { id: "silver", label: "Silver Prices" },
  { id: "copper", label: "Copper Prices" },
] as const;

type HorizonKey = "1m" | "3m";

export default function ForecastPage() {
  const [horizon, setHorizon] = useState<HorizonKey>("3m");
  const [selectedVars, setSelectedVars] = useState<string[]>(
    AVAILABLE_VARIABLES.map((v) => v.id)
  );

  const config = MOCK_FORECAST_CONFIGS[horizon];

  const toggleVariable = (id: string) => {
    setSelectedVars((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  // Filter SHAP drivers based on selected variables
  const variableToDriverMap: Record<string, string> = {
    sp500: "S&P 500 Index",
    inflation: "Inflation Rate",
    interest: "Interest Rates",
    bond10y: "10-Year Gov Bond Yield",
    silver: "Silver Prices",
    copper: "Copper Prices",
  };

  const filteredDrivers = useMemo(() => {
    const activeFactors = selectedVars.map((v) => variableToDriverMap[v]).filter(Boolean);
    return MOCK_SHAP_DRIVERS.filter((d) => activeFactors.includes(d.factor));
  }, [selectedVars]);

  const shapChartData = filteredDrivers
    .map((d) => ({ name: d.factor, value: d.impact }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Gold Price Forecast</h1>
        <p className="text-muted-foreground mb-6">Intelligent price projections with confidence intervals.</p>

        {/* Controls */}
        <div className="flex flex-wrap items-end gap-4 mb-8">
          {/* Horizon Dropdown */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Horizon</Label>
            <Select value={horizon} onValueChange={(v) => setHorizon(v as HorizonKey)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Variables Multi-select */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Predictor Variables</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[260px] justify-between font-normal">
                  <span className="truncate">{selectedVars.length} of {AVAILABLE_VARIABLES.length} selected</span>
                  <SlidersHorizontal className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[260px] p-3" align="start">
                <div className="space-y-2">
                  {AVAILABLE_VARIABLES.map((v) => (
                    <label key={v.id} className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 rounded-md px-2 py-1.5 -mx-1 transition-colors">
                      <Checkbox
                        checked={selectedVars.includes(v.id)}
                        onCheckedChange={() => toggleVariable(v.id)}
                      />
                      <span className="text-sm">{v.label}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Selected badges */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {selectedVars.map((id) => {
              const v = AVAILABLE_VARIABLES.find((x) => x.id === id);
              return v ? (
                <Badge key={id} variant="secondary" className="text-xs font-normal">
                  {v.label}
                </Badge>
              ) : null;
            })}
          </div>
        </div>

        {/* Top stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Price</p>
            <p className="text-2xl font-display font-bold mt-1">${config.predictedPrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{config.horizonLabel} horizon</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Confidence Level</p>
            <p className="text-2xl font-display font-bold mt-1">{config.confidence}%</p>
            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gold-gradient" style={{ width: `${config.confidence}%` }} />
            </div>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Range</p>
            <p className="text-lg font-display font-bold mt-1">${config.rangeLow.toLocaleString()} — ${config.rangeHigh.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Expected price band</p>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-display text-lg font-semibold mb-4">Forecast Chart</h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={config.chartData}>
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
            {config.summary}
          </p>
        </div>

        {/* SHAP Section */}
        <div className="card-premium p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl font-bold">Why This Forecast?</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            The chart below shows how your selected market factors influenced the latest price forecast. Positive values push the prediction higher, while negative values pull it lower.
          </p>

          {shapChartData.length > 0 ? (
            <>
              <div className="mb-8">
                <ResponsiveContainer width="100%" height={Math.max(160, shapChartData.length * 44)}>
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

              <h3 className="font-display font-semibold text-base mb-4">Top Drivers</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {filteredDrivers.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).map((driver, i) => (
                  <motion.div key={driver.factor} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
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
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Please select at least one predictor variable to see forecast drivers.
            </div>
          )}

          {/* Narrative */}
          <div className="rounded-xl bg-muted/50 border border-border p-5">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Key takeaway:</span> {config.takeaway}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
