import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MOCK_GOLD_PRICE, MOCK_HISTORICAL } from "@/lib/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-light blur-[100px]" />
        </div>
        <div className="container relative py-24 md:py-36">
          <motion.div className="max-w-2xl" initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="text-gold-light text-sm font-medium tracking-widest uppercase mb-4">
              Gold Market Intelligence
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Smarter Gold Investment Decisions
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-primary-foreground/70 mb-8 max-w-lg">
              Access real-time market data, intelligent forecasts, and clear explanations to guide your gold investment strategy.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gold-gradient text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/market" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-foreground/20 text-primary-foreground/80 hover:bg-primary-foreground/5 transition-colors">
                View Market Data
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Price + Chart */}
      <section className="container py-16 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-premium p-6">
            <p className="text-sm text-muted-foreground mb-1">Current Gold Price</p>
            <p className="text-3xl font-display font-bold text-foreground">${MOCK_GOLD_PRICE.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +1.2% today
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2 card-premium p-6">
            <p className="text-sm text-muted-foreground mb-4">6-Month Price History</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={MOCK_HISTORICAL}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 89%)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <YAxis domain={["dataMin - 30", "dataMax + 30"]} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 14% 89%)" }} />
                <Line type="monotone" dataKey="price" stroke="hsl(43 72% 42%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="container pb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">Market Overview</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Gold continues to trade near all-time highs, supported by persistent inflation concerns and central bank buying activity across emerging markets.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: "Real-Time Pricing", desc: "Track gold prices with live updates and historical trends." },
            { icon: BarChart3, title: "Smart Forecasting", desc: "Access intelligent price forecasts with confidence intervals." },
            { icon: Shield, title: "Clear Explanations", desc: "Understand what drives each forecast in plain language." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-premium p-6 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-xl gold-gradient flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Make Informed Decisions?</h2>
          <p className="text-primary-foreground/60 mb-8 max-w-md mx-auto">
            Sign up to unlock advanced forecasting, personalized insights, and explanation of every prediction.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg gold-gradient text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            Create Free Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 GoldInsight. For demonstration purposes only.
        </div>
      </footer>
    </div>
  );
}
