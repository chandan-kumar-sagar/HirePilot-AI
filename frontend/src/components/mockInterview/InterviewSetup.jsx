import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, Plus, X } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'Node.js', 'React', 'JavaScript', 'Python', 'System Design',
  'Data Structures', 'Algorithms', 'TypeScript', 'MongoDB', 'SQL',
  'REST APIs', 'GraphQL', 'AWS', 'Docker', 'Microservices',
];

const DIFFICULTIES = [
  {
    id: 'beginner',
    label: 'Beginner',
    badge: '🥉',
    description: 'Fundamentals & core concepts',
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    gradient: 'from-emerald-400 to-teal-400',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    badge: '🥈',
    description: 'Real-world problem solving',
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    gradient: 'from-orange-400 to-amber-400',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    badge: '🥇',
    description: 'System design & deep dives',
    border: 'border-pink-300',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const QUESTION_COUNTS = [3, 5, 7, 10];

const InterviewSetup = ({ onStart, isLoading }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [totalQuestions, setTotalQuestions] = useState(5);
  const inputRef = useRef(null);

  const allTopics = [...DEFAULT_CATEGORIES, ...customCategories];
  const canStart = selectedTopics.length > 0 && selectedDifficulty;

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const addCustomTopic = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    // Avoid duplicates (case-insensitive)
    const alreadyExists = allTopics.some((t) => t.toLowerCase() === trimmed.toLowerCase());
    if (!alreadyExists) {
      setCustomCategories((prev) => [...prev, trimmed]);
    }
    // Auto-select it
    setSelectedTopics((prev) =>
      prev.map((t) => t.toLowerCase()).includes(trimmed.toLowerCase()) ? prev : [...prev, trimmed]
    );
    setCustomInput('');
    inputRef.current?.focus();
  };

  const removeCustomTopic = (topic) => {
    setCustomCategories((prev) => prev.filter((t) => t !== topic));
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addCustomTopic();
    if (e.key === 'Backspace' && !customInput && customCategories.length > 0) {
      removeCustomTopic(customCategories[customCategories.length - 1]);
    }
  };

  const handleStart = () => {
    if (!canStart || isLoading) return;
    // Join multiple topics into a single category string for the AI
    const category = selectedTopics.join(', ');
    onStart({ category, difficulty: selectedDifficulty, totalQuestions });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-4">

      {/* Topic Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-black text-gray-800">1. Choose Your Topics 🎯</h2>
          {selectedTopics.length > 0 && (
            <motion.span
              key={selectedTopics.length}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold px-3 py-1 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)' }}
            >
              {selectedTopics.length} selected
            </motion.span>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-5 font-medium">Select one or more topics. Mix them for a cross-domain interview!</p>

        {/* Preset Topics */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {DEFAULT_CATEGORIES.map((cat) => {
            const active = selectedTopics.includes(cat);
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTopic(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200 select-none ${
                  active
                    ? 'text-white border-transparent shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600'
                }`}
                style={active ? { background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 4px 20px rgba(236,72,153,0.3)' } : {}}
              >
                {active && <span className="mr-1.5">✓</span>}
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Custom Topics */}
        <AnimatePresence>
          {customCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {customCategories.map((topic) => {
                const active = selectedTopics.includes(topic);
                return (
                  <motion.div
                    key={topic}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold border-2 cursor-pointer transition-all ${
                      active
                        ? 'text-white border-transparent'
                        : 'bg-white text-gray-600 border-purple-200 hover:border-purple-400'
                    }`}
                    style={active ? { background: 'linear-gradient(135deg, #a855f7, #f97316)', boxShadow: '0 4px 20px rgba(168,85,247,0.3)' } : {}}
                    onClick={() => toggleTopic(topic)}
                  >
                    {active && <span>✓</span>}
                    <span>⚡ {topic}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeCustomTopic(topic); }}
                      className="ml-1 hover:scale-110 transition-transform text-current opacity-70 hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Custom Topic Input */}
        <div className="flex gap-2 mt-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border-2 border-dashed border-gray-200 hover:border-purple-300 focus-within:border-purple-400 rounded-xl px-4 py-3 transition-all">
            <Plus size={16} className="text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a custom skill (e.g. Redis, Kafka, Flutter)..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addCustomTopic}
            disabled={!customInput.trim()}
            className="px-5 py-3 rounded-xl text-sm font-black text-white disabled:opacity-40 transition-all"
            style={{ background: 'linear-gradient(135deg, #a855f7, #f97316)' }}
          >
            Add
          </motion.button>
        </div>

        {/* Selected summary chips */}
        <AnimatePresence>
          {selectedTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-5 p-4 rounded-2xl border border-pink-100"
              style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.05), rgba(168,85,247,0.05))' }}
            >
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Interview will cover:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((t) => (
                  <span key={t} className="text-xs font-bold px-2.5 py-1 rounded-lg text-pink-700 bg-pink-50 border border-pink-200">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Difficulty Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white"
      >
        <h2 className="text-lg font-black text-gray-800 mb-5">2. Pick Difficulty Level 🎮</h2>
        <div className="grid grid-cols-3 gap-4">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDifficulty(d.id)}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                selectedDifficulty === d.id
                  ? `${d.border} ${d.bg} shadow-md scale-[1.02]`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{d.badge}</div>
              <div className={`font-black text-base ${selectedDifficulty === d.id ? d.text : 'text-gray-800'}`}>{d.label}</div>
              <div className="text-xs text-gray-500 mt-1">{d.description}</div>
              {selectedDifficulty === d.id && (
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br ${d.gradient}`} />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Question Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white"
      >
        <h2 className="text-lg font-black text-gray-800 mb-5">3. Number of Questions 📋</h2>
        <div className="flex gap-3">
          {QUESTION_COUNTS.map((n) => (
            <button
              key={n}
              onClick={() => setTotalQuestions(n)}
              className={`w-16 h-16 rounded-2xl text-lg font-black border-2 transition-all ${
                totalQuestions === n
                  ? 'text-white border-transparent shadow-lg'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
              }`}
              style={
                totalQuestions === n
                  ? { background: 'linear-gradient(135deg, #a855f7, #f97316)', boxShadow: '0 4px 20px rgba(168,85,247,0.3)' }
                  : {}
              }
            >
              {n}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <motion.button
          whileHover={{ scale: canStart && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: canStart && !isLoading ? 0.98 : 1 }}
          onClick={handleStart}
          disabled={!canStart || isLoading}
          className="w-full py-5 rounded-2xl text-white text-lg font-black flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: canStart
              ? 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #f97316 100%)'
              : '#d1d5db',
            boxShadow: canStart ? '0 8px 30px rgba(236,72,153,0.4)' : 'none',
          }}
        >
          {isLoading ? (
            <><Zap className="animate-spin" size={22} /> Generating Questions...</>
          ) : (
            <>
              <Zap size={22} />
              Start Interview
              {selectedTopics.length > 0 && (
                <span className="text-sm font-bold opacity-80">
                  · {selectedTopics.length === 1 ? selectedTopics[0] : `${selectedTopics.length} topics`}
                </span>
              )}
              <ChevronRight size={20} />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default InterviewSetup;
