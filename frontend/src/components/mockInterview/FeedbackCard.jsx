import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lightbulb, CheckCircle2 } from 'lucide-react';

const ScoreRing = ({ label, value, color }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 10) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
          <circle cx="36" cy="36" r={radius} fill="none" strokeWidth="6" stroke="#f3f4f6" />
          <motion.circle
            cx="36" cy="36" r={radius}
            fill="none" strokeWidth="6"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black text-gray-800">{value}</span>
        </div>
      </div>
      <span className="text-xs font-bold text-gray-500 text-center leading-tight">{label}</span>
    </div>
  );
};

const FeedbackCard = ({ feedback, answer, isLastQuestion, isLoading, onNext }) => {
  const { scores, feedback: feedbackText, improvements } = feedback;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-white overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(168,85,247,0.06))' }}>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          <span className="font-black text-gray-800">AI Feedback</span>
        </div>
        <span className="text-2xl font-black" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {scores?.overall}/10
        </span>
      </div>

      {/* Score Rings */}
      <div className="px-8 py-6 border-b border-gray-50">
        <div className="flex justify-around">
          <ScoreRing label="Technical Accuracy" value={scores?.technicalAccuracy || 0} color="#ec4899" />
          <ScoreRing label="Communication" value={scores?.communication || 0} color="#a855f7" />
          <ScoreRing label="Confidence" value={scores?.confidence || 0} color="#f97316" />
        </div>
      </div>

      {/* Feedback Text */}
      <div className="px-8 py-5 border-b border-gray-50">
        <p className="text-gray-700 text-sm leading-relaxed">{feedbackText}</p>
      </div>

      {/* Your Answer (collapsed) */}
      <div className="px-8 py-4 border-b border-gray-50 bg-gray-50/40">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Answer</p>
        <p className="text-gray-600 text-sm line-clamp-3">{answer}</p>
      </div>

      {/* Improvements */}
      {improvements?.length > 0 && (
        <div className="px-8 py-5 border-b border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-yellow-500" />
            <span className="text-sm font-black text-gray-700">How to Improve</span>
          </div>
          <ul className="space-y-2">
            {improvements.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5 shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #facc15)' }}>{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Button */}
      <div className="px-8 py-5 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          disabled={isLoading}
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black text-white disabled:opacity-50 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #a855f7, #f97316)', boxShadow: '0 4px 20px rgba(168,85,247,0.35)' }}
        >
          {isLastQuestion ? '🏁 Finish & See Results' : <>Next Question <ChevronRight size={18} /></>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;
