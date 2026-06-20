import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ApplicationChart({ stats }) {
  const data = [
    { name: "Saved", value: stats?.saved || 0 },
    { name: "Applied", value: stats?.applied || 0 },
    { name: "Interview", value: stats?.interview || 0 },
    { name: "Offer", value: stats?.offer || 0 },
    { name: "Rejected", value: stats?.rejected || 0 },
  ].filter(d => d.value > 0);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-premium rounded-3xl p-6 h-full border border-white/20 hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-1">Application Funnel</h3>
      <p className="text-sm text-gray-500 mb-6">
        {total} total jobs tracked
      </p>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-300 text-sm">
          <div className="text-5xl mb-2">📊</div>
          No job data yet. Start tracking jobs!
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: 13 }}
            />
            <Legend iconType="circle" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
