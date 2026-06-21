import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const ScoreDot = ({ value }) => {
  const color = value >= 8 ? '#22c55e' : value >= 6 ? '#f97316' : '#ec4899';
  return (
    <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
      {value}/10
    </span>
  );
};

const AnswerAccordion = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-4 text-left group hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)' }}>
            {index + 1}
          </span>
          <span className="font-semibold text-gray-800 text-sm truncate pr-4">{item.question}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreDot value={item.scores?.overall || 0} />
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="px-6 py-5 space-y-4 bg-gray-50/30">
              {/* Score breakdown */}
              <div className="flex gap-3 flex-wrap">
                <span className="text-xs font-bold text-gray-500">Tech: <span className="text-gray-800">{item.scores?.technicalAccuracy}/10</span></span>
                <span className="text-xs font-bold text-gray-500">Comm: <span className="text-gray-800">{item.scores?.communication}/10</span></span>
                <span className="text-xs font-bold text-gray-500">Confidence: <span className="text-gray-800">{item.scores?.confidence}/10</span></span>
              </div>

              {/* Answer */}
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1.5">Your Answer</p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
              </div>

              {/* Feedback */}
              {item.feedback && (
                <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(168,85,247,0.06))', border: '1px solid rgba(236,72,153,0.12)' }}>
                  <MessageSquare size={14} className="text-pink-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{item.feedback}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InterviewSummary = ({ answers }) => {
  if (!answers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
        <MessageSquare size={20} className="text-purple-500" />
        Full Q&A Review
      </h2>
      <div className="space-y-3">
        {answers.map((item, i) => (
          <AnswerAccordion key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

export default InterviewSummary;
