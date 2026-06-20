import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

// Generate last 6 months of activity from activities array
function buildMonthlyData(activities) {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: d.toLocaleString("default", { month: "short" }),
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      count: 0,
    });
  }

  (activities || []).forEach((activity) => {
    const date = new Date(activity.createdAt);
    const match = months.find(
      (m) => m.monthIndex === date.getMonth() && m.year === date.getFullYear()
    );
    if (match) match.count += 1;
  });

  return months.map(({ month, count }) => ({ month, count }));
}

export default function MonthlyActivityChart({ activities }) {
  const data = buildMonthlyData(activities);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-premium rounded-3xl p-6 h-full border border-white/20 hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-1">Monthly Activity</h3>
      <p className="text-sm text-gray-500 mb-6">Applications per month (last 6 months)</p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: 13 }}
            cursor={{ fill: "#f9fafb" }}
          />
          <Bar
            dataKey="count"
            name="Activities"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.7} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
