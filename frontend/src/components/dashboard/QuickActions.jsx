import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, MessageSquare, Briefcase, Mail, Bot, Zap } from "lucide-react";

const ACTIONS = [
  {
    icon: FileText,
    label: "Upload Resume",
    sub: "Analyze with AI scoring",
    path: "/resume-center",
    from: "from-blue-500",
    to: "to-blue-600",
    shadow: "shadow-blue-200",
  },
  {
    icon: MessageSquare,
    label: "Generate Questions",
    sub: "AI interview prep",
    path: "/interviews",
    from: "from-purple-500",
    to: "to-purple-600",
    shadow: "shadow-purple-200",
  },
  {
    icon: Briefcase,
    label: "Add Job",
    sub: "Track your application",
    path: "/jobs",
    from: "from-orange-500",
    to: "to-orange-600",
    shadow: "shadow-orange-200",
  },
  {
    icon: Mail,
    label: "Cover Letter",
    sub: "AI-powered generation",
    path: "/cover-letters",
    from: "from-pink-500",
    to: "to-pink-600",
    shadow: "shadow-pink-200",
  },
  {
    icon: Bot,
    label: "Ask AI Coach",
    sub: "Career guidance",
    path: "/career-coach",
    from: "from-green-500",
    to: "to-green-600",
    shadow: "shadow-green-200",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <Zap size={20} className="text-yellow-500" />
        <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
      </div>

      <div className="space-y-3">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.07 }}
              onClick={() => navigate(action.path)}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl hover:shadow-lg ${action.shadow} transition-all duration-200 hover:-translate-y-0.5 group text-left`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.from} ${action.to} flex items-center justify-center shrink-0 shadow-sm`}>
                <Icon size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{action.label}</p>
                <p className="text-xs text-gray-400">{action.sub}</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition shrink-0">
                <span className="text-gray-400 text-lg leading-none">→</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
