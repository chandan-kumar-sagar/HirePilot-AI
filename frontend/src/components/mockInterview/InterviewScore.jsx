import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';

const BADGE_CONFIG = {
  gold: { emoji: '🥇', label: 'Gold', gradient: 'from-yellow-400 to-amber-500', shadow: 'rgba(251,191,36,0.5)' },
  silver: { emoji: '🥈', label: 'Silver', gradient: 'from-slate-400 to-gray-500', shadow: 'rgba(148,163,184,0.5)' },
  bronze: { emoji: '🥉', label: 'Bronze', gradient: 'from-orange-400 to-amber-600', shadow: 'rgba(251,146,60,0.5)' },
};

// Simple count-up animation hook
const useCountUp = (target, duration = 1500) => {
  const [current, setCurrent] = React.useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return current;
};

const InterviewScore = ({ result, onReset }) => {
  const { overallScore, badge, strengths, weaknesses, summary, totalAnswered } = result;
  const animatedScore = useCountUp(overallScore);
  const badgeCfg = BADGE_CONFIG[badge] || BADGE_CONFIG.bronze;

  return (
    <div className="space-y-6">
      {/* Hero Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white overflow-hidden text-center py-12 px-8"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-5" style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7, #f97316)' }} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-4"
        >
          {badgeCfg.emoji}
        </motion.div>

        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-black text-white mb-6 bg-gradient-to-r ${badgeCfg.gradient}`}>
          {badgeCfg.label} Badge Earned
        </div>

        <div className="text-8xl font-black mb-2" style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {animatedScore}
        </div>
        <div className="text-gray-500 font-bold text-lg mb-4">out of 100</div>

        {summary && (
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed mb-6">{summary}</p>
        )}

        <div className="text-xs text-gray-400 font-medium">{totalAnswered} questions answered</div>
      </motion.div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-5">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-emerald-500" />
            <h3 className="font-black text-gray-800">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">{s}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-orange-400" />
            <h3 className="font-black text-gray-800">Improve On</h3>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <span className="text-orange-400 font-bold mt-0.5">→</span>
                <span className="text-gray-700">{w}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Try Again */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black text-white shadow-lg"
          style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 6px 25px rgba(236,72,153,0.4)' }}
        >
          <RotateCcw size={18} /> Try Another Interview
        </motion.button>
      </div>
    </div>
  );
};

export default InterviewScore;
