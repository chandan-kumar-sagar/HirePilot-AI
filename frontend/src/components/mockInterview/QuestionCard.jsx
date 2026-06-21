import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const DIFFICULTY_STYLES = {
  beginner: { label: '🥉 Beginner', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  intermediate: { label: '🥈 Intermediate', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  advanced: { label: '🥇 Advanced', color: 'text-pink-600', bg: 'bg-pink-50 border-pink-200' },
};

const QuestionCard = ({ question, questionIndex, totalQuestions, category, difficulty }) => {
  const progress = ((questionIndex) / totalQuestions) * 100;
  const diffStyle = DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-white overflow-hidden"
    >
      {/* Progress Header */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-500">Question</span>
            <span className="text-2xl font-black" style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {questionIndex + 1}
            </span>
            <span className="text-sm font-bold text-gray-400">/ {totalQuestions}</span>
          </div>

          <div className="flex items-center gap-2">
            {category && (
              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border bg-purple-50 border-purple-200 text-purple-700">
                <Tag size={11} /> {category}
              </span>
            )}
            {difficulty && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${diffStyle.bg} ${diffStyle.color}`}>
                {diffStyle.label}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #ec4899, #a855f7, #f97316)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question Text */}
      <div className="px-8 py-6 border-t border-gray-50">
        <p className="text-xl font-bold text-gray-900 leading-relaxed">{question}</p>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
