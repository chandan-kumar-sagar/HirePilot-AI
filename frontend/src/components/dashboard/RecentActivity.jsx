import { motion } from "framer-motion";
import { FileText, Briefcase, Mail, Target, Bot, Clock } from "lucide-react";

const TYPE_CONFIG = {
  Resume: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50", label: "Uploaded Resume" },
  Application: { icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50", label: "Tracked Application" },
  "Cover Letter": { icon: Mail, color: "text-pink-500", bg: "bg-pink-50", label: "Generated Cover Letter" },
  "Job Match": { icon: Target, color: "text-green-500", bg: "bg-green-50", label: "Analyzed Job Match" },
  Interview: { icon: Bot, color: "text-orange-500", bg: "bg-orange-50", label: "Interview Prep" },
};

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentActivity({ activities, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-premium rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-6">
        <Clock size={20} className="text-orange-500" />
        <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="text-5xl mb-3">🕐</div>
          <p className="font-semibold text-gray-600">No activity yet</p>
          <p className="text-sm text-gray-400 mt-1">Start by uploading your first resume!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-1">
            {activities.map((item, i) => {
              const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.Resume;
              const Icon = config.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="relative flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition cursor-pointer group"
                >
                  {/* Icon dot on timeline */}
                  <div className={`w-10 h-10 rounded-2xl ${config.bg} flex items-center justify-center shrink-0 z-10 border-2 border-white`}>
                    <Icon className={config.color} size={18} />
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400 font-medium">{config.label}</span>
                      <span className="text-gray-200">•</span>
                      <span className="text-xs text-gray-400">{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
