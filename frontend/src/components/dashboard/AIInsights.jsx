import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function generateInsights({ stats, jobStats }) {
  const insights = [];

  const applications = stats?.applications || 0;
  const interviews = stats?.interviews || 0;
  const coverLetters = stats?.coverLetters || 0;
  const jobMatches = stats?.jobMatches || 0;
  const resumes = stats?.resumes || 0;

  // Conversion rate
  if (applications > 0) {
    const rate = Math.round((interviews / applications) * 100);
    insights.push({
      emoji: "📊",
      text: `You have applied to ${applications} jobs. Your interview conversion rate is ${rate}%.`,
    });
  }

  // Interview prep advice
  if (interviews < 3 && applications > 5) {
    insights.push({
      emoji: "🎯",
      text: "Your interview rate is low. Focus on tailoring your cover letters and resume for each application.",
    });
  } else if (interviews > 0) {
    insights.push({
      emoji: "🔥",
      text: "Great interview rate! Focus on system design and behavioral preparation to ace upcoming interviews.",
    });
  }

  // Cover letter advice
  if (coverLetters === 0) {
    insights.push({
      emoji: "✉️",
      text: "You haven't generated any cover letters yet. AI-powered cover letters can significantly boost your response rate.",
    });
  }

  // Job match advice
  if (jobMatches === 0) {
    insights.push({
      emoji: "🎯",
      text: "Try the Job Match Analyzer to see how well your resume fits job descriptions before applying.",
    });
  } else {
    insights.push({
      emoji: "💡",
      text: `You've analyzed ${jobMatches} job matches. Use the missing skills section to build a targeted learning roadmap.`,
    });
  }

  // Resume advice
  if (resumes === 0) {
    insights.push({
      emoji: "📄",
      text: "Upload your resume to unlock AI-powered analysis, scoring, and personalized career advice.",
    });
  } else if (resumes === 1) {
    insights.push({
      emoji: "📄",
      text: "Consider creating multiple resume variants targeted at different job roles to increase your chances.",
    });
  }

  // No data fallback
  if (insights.length === 0) {
    insights.push({
      emoji: "🚀",
      text: "Start adding jobs, resumes, and applications to get personalized AI career insights.",
    });
  }

  return insights.slice(0, 3);
}

export default function AIInsights({ stats, jobStats }) {
  const insights = generateInsights({ stats, jobStats });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-lg text-white"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={20} className="text-yellow-400" />
        <h3 className="text-lg font-bold">AI Insights</h3>
        <span className="ml-auto text-xs bg-yellow-400/20 text-yellow-300 font-bold px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex gap-3"
          >
            <span className="text-2xl shrink-0">{insight.emoji}</span>
            <p className="text-sm text-gray-200 leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
