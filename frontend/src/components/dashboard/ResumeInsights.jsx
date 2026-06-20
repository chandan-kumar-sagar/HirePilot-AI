import { motion } from "framer-motion";
import { FileText, Star, BarChart2 } from "lucide-react";
import { useResumes } from "@/features/resume/useResume";

export default function ResumeInsights() {
  const { data, isLoading } = useResumes();
  const resumes = data?.resumes || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-5 bg-gray-100 rounded w-1/2 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // Compute insights from resume data
  const scores = resumes
    .filter(r => r.analysis?.overallScore != null)
    .map(r => r.analysis.overallScore);

  const bestScore = scores.length > 0 ? Math.max(...scores) : null;
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  // Gather most-used skills across all resumes
  const skillCount = {};
  resumes.forEach(r => {
    (r.analysis?.skills || []).forEach(skill => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });
  const topSkills = Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([skill]) => skill);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-premium rounded-3xl p-6 border border-white/20 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-blue-500" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Resume Insights</h3>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-8 text-gray-400 italic text-sm">
          Upload your first resume to see insights.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Best Score</span>
              </div>
              <div className="text-3xl font-black text-gray-800">
                {bestScore !== null ? `${bestScore}%` : "–"}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <BarChart2 size={16} className="text-purple-500" />
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Avg Score</span>
              </div>
              <div className="text-3xl font-black text-gray-800">
                {avgScore !== null ? `${avgScore}%` : "–"}
              </div>
            </div>
          </div>

          {topSkills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Most Used Skills</p>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
