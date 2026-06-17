import { motion } from "framer-motion";
import { FileText, Briefcase, Users, Mail, ScanSearch, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!value) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(value / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
}

const STAT_CONFIG = [
  { key: "resumes", label: "Resumes", icon: FileText, from: "from-blue-500", to: "to-blue-600", bg: "bg-blue-500/10", text: "text-blue-500 dark:text-blue-400" },
  { key: "applications", label: "Applications", icon: Briefcase, from: "from-purple-500", to: "to-purple-600", bg: "bg-purple-500/10", text: "text-purple-500 dark:text-purple-400" },
  { key: "interviews", label: "Interviews", icon: Users, from: "from-orange-500", to: "to-orange-600", bg: "bg-orange-500/10", text: "text-orange-500 dark:text-orange-400" },
  { key: "coverLetters", label: "Cover Letters", icon: Mail, from: "from-pink-500", to: "to-pink-600", bg: "bg-pink-500/10", text: "text-pink-500 dark:text-pink-400" },
  { key: "jobMatches", label: "Job Matches", icon: ScanSearch, from: "from-green-500", to: "to-green-600", bg: "bg-green-500/10", text: "text-green-500 dark:text-green-400" },
];

export default function StatsCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {STAT_CONFIG.map((config, i) => {
        const Icon = config.icon;
        const value = stats?.[config.key] || 0;

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card text-card-foreground rounded-3xl p-5 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-11 h-11 rounded-2xl ${config.bg} flex items-center justify-center mb-4`}>
              <Icon className={config.text} size={22} />
            </div>
            <div className="text-3xl font-black mb-1">
              {loading ? (
                <div className="h-8 w-10 bg-muted rounded-lg animate-pulse" />
              ) : (
                <AnimatedCounter value={value} />
              )}
            </div>
            <div className="text-sm font-medium text-muted-foreground">{config.label}</div>
            <div className={`flex items-center gap-1 text-xs ${config.text} font-medium mt-2`}>
              <TrendingUp size={11} />
              All time
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
