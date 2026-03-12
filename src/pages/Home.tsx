import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  MOCK_GOLD_PRICE,
  MOCK_HISTORICAL,
  MOCK_MARKET_SUMMARY,
} from "@/lib/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pt-16 pb-12">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Gold Market Intelligence
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-balance">
            Smarter Gold Investment Decisions
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-8">
            Access real-time market data, intelligent forecasts, and clear
            explanations to guide your gold investment strategy.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/market-data"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition hover:bg-accent"
            >
              View Market Data
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="text-sm text-muted-foreground">Current Gold Price</div>
            <div className="mt-3 text-4xl font-bold">
              ${MOCK_GOLD_PRICE.current.toLocaleString()}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              +{MOCK_GOLD_PRICE.changePercent}% today
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-muted-foreground">Open</div>
                <div className="mt-1 font-semibold">
                  ${MOCK_GOLD_PRICE.open.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-muted-foreground">High</div>
                <div className="mt-1 font-semibold">
                  ${MOCK_GOLD_PRICE.high.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-muted-foreground">Low</div>
                <div className="mt-1 font-semibold">
                  ${MOCK_GOLD_PRICE.low.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-muted-foreground">Change</div>
                <div className="mt-1 font-semibold">
                  +${MOCK_GOLD_PRICE.change.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">6-Month Price History</h2>
            </div>

            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_HISTORICAL}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    tick={{ fontSize: 12 }}
                    width={70}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
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
        </div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-2xl border bg-card p-6 shadow-sm"
        >
          <h2 className="text-2xl font-semibold">Market Overview</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground leading-7">
            Gold continues to trade near all-time highs, supported by persistent
            inflation concerns and central bank buying activity across emerging
            markets.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {MOCK_MARKET_SUMMARY.map((item) => (
              <div key={item.label} className="rounded-xl border p-4">
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="mt-2 text-lg font-semibold">{item.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.detail}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              title: "Real-Time Pricing",
              desc: "Track gold prices with live updates and historical trends.",
            },
            {
              icon: BarChart3,
              title: "Smart Forecasting",
              desc: "Access intelligent price forecasts with confidence intervals.",
            },
            {
              icon: Shield,
              title: "Clear Explanations",
              desc: "Understand what drives each forecast in plain language.",
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                custom={i + 4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-3xl border bg-card px-8 py-10 text-center shadow-sm"
        >
          <h2 className="text-3xl font-semibold">Ready to Make Informed Decisions?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-7">
            Sign up to unlock advanced forecasting, personalized insights, and
            explanation of every prediction.
          </p>
          <div className="mt-6">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Create Free Account
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 GoldInsight. For demonstration purposes only.
        </div>
      </section>
    </div>
  );
}
