import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MOCK_HISTORICAL, MOCK_TABLE_DATA } from "@/lib/mockData";
import { Clock, Database } from "lucide-react";

export default function MarketDataPage() {
  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Market Data</h1>
        <p className="text-muted-foreground mb-8">Gold price data and historical trends.</p>

        {/* Chart */}
        <div className="card-premium p-6 mb-6">
          <h2 className="font-display text-lg font-semibold mb-4">Gold Price Chart</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={MOCK_HISTORICAL}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 89%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis domain={["dataMin - 30", "dataMax + 30"]} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 14% 89%)" }} />
              <Line type="monotone" dataKey="price" stroke="hsl(43 72% 42%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(43 72% 42%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Meta info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="card-elevated p-5 flex items-center gap-3">
            <Clock className="h-5 w-5 text-gold" />
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-xs text-muted-foreground">February 28, 2025 — 16:00 UTC</p>
            </div>
          </div>
          <div className="card-elevated p-5 flex items-center gap-3">
            <Database className="h-5 w-5 text-gold" />
            <div>
              <p className="text-sm font-medium">Data Source</p>
              <p className="text-xs text-muted-foreground">London Bullion Market Association (LBMA)</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-premium overflow-hidden">
          <div className="p-6 pb-3">
            <h2 className="font-display text-lg font-semibold">Historical Data</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Open</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">High</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Low</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Close</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Volume</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TABLE_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium">{row.date}</td>
                    <td className="px-6 py-3 text-right">${row.open.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right">${row.high.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right">${row.low.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right">${row.close.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right text-muted-foreground">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
