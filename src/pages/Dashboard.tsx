import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { MOCK_GOLD_PRICE, MOCK_PREDICTED_PRICE, MOCK_CONFIDENCE, MOCK_SIGNAL, MOCK_FORECAST } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

const signalConfig = {
  Bullish: { color: "text-green-600", bg: "bg-green-50", icon: TrendingUp },
  Bearish: { color: "text-red-600", bg: "bg-red-50", icon: TrendingDown },
  Neutral: { color: "text-muted-foreground", bg: "bg-muted", icon: Minus },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const signal = signalConfig[MOCK_SIGNAL];
  const SignalIcon = signal.icon;

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Good afternoon, {user?.name}</h1>
        <p className="text-muted-foreground mb-8">Here's your gold market summary.</p>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Price</p>
            <p className="text-2xl font-display font-bold mt-1">${MOCK_GOLD_PRICE.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+1.2% today</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Next Month Forecast</p>
            <p className="text-2xl font-display font-bold mt-1">${MOCK_PREDICTED_PRICE.toLocaleString()}</p>
            <p className="text-xs text-gold mt-1">+{((MOCK_PREDICTED_PRICE / MOCK_GOLD_PRICE - 1) * 100).toFixed(1)}% projected</p>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Market Signal</p>
            <div className={`flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg ${signal.bg} w-fit`}>
              <SignalIcon className={`h-4 w-4 ${signal.color}`} />
              <span className={`text-sm font-semibold ${signal.color}`}>{MOCK_SIGNAL}</span>
            </div>
          </div>
          <div className="card-premium p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Forecast Confidence</p>
            <p className="text-2xl font-display font-bold mt-1">{MOCK_CONFIDENCE}%</p>
            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full gold-gradient" style={{ width: `${MOCK_CONFIDENCE}%` }} />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card-premium p-6 mb-8">
          <h2 className="font-display text-lg font-semibold mb-4">Price History & Forecast Preview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={MOCK_FORECAST}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(43 72% 42%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(43 72% 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 89%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis domain={["dataMin - 40", "dataMax + 40"]} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 14% 89%)" }} />
              <Area type="monotone" dataKey="price" stroke="hsl(43 72% 42%)" strokeWidth={2.5} fill="url(#goldFill)" dot={{ r: 3 }} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="hsl(43 60% 60%)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insight */}
        <div className="card-premium p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base mb-1">Market Insight</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gold prices are expected to continue their upward trajectory over the next 3 months, driven primarily by persistent inflation concerns and sustained central bank purchasing activity. The current market signal is bullish with high confidence. Consider reviewing your portfolio allocation in light of these projections.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
