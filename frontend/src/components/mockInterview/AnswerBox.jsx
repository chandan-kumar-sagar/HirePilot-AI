import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const AnswerBox = ({ onSubmit, isLoading }) => {
  const [answer, setAnswer] = useState('');
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const handleSubmit = () => {
    if (!answer.trim() || isLoading) return;
    onSubmit(answer.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.07)] border border-white overflow-hidden"
    >
      <div className="px-8 pt-6 pb-3">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Your Answer</label>
          <span className={`text-xs font-bold ${wordCount > 20 ? 'text-emerald-600' : 'text-gray-400'}`}>
            {wordCount} words {wordCount > 20 ? '✓' : '(aim for 20+)'}
          </span>
        </div>
        <textarea
          className="w-full h-44 bg-gray-50/50 border border-gray-200 rounded-2xl p-4 text-gray-800 text-sm leading-relaxed focus:ring-2 focus:ring-pink-300/50 focus:border-pink-400 resize-none transition-all outline-none placeholder-gray-400"
          placeholder="Start speaking your answer... Be specific, use examples, and explain your reasoning clearly."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="px-8 pb-6 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">Press Ctrl+Enter to submit</span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!answer.trim() || isLoading}
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-black text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 4px 20px rgba(236,72,153,0.35)' }}
        >
          {isLoading ? (
            <><Loader2 className="animate-spin" size={18} /> Evaluating...</>
          ) : (
            <><Send size={18} /> Submit Answer</>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnswerBox;
