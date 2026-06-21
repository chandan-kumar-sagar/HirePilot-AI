import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Trophy, History } from 'lucide-react';
import InterviewSetup from '../components/mockInterview/InterviewSetup';
import QuestionCard from '../components/mockInterview/QuestionCard';
import AnswerBox from '../components/mockInterview/AnswerBox';
import FeedbackCard from '../components/mockInterview/FeedbackCard';
import InterviewSummary from '../components/mockInterview/InterviewSummary';
import InterviewScore from '../components/mockInterview/InterviewScore';
import api from '../api/axios';
import { toast } from 'sonner';

// State machine phases: "setup" | "question" | "feedback" | "score"
const MockInterview = () => {
  const [phase, setPhase] = useState('setup');
  const [isLoading, setIsLoading] = useState(false);

  // Session state
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  // Answer / feedback state
  const [lastAnswer, setLastAnswer] = useState('');
  const [lastFeedback, setLastFeedback] = useState(null);

  // Final score state
  const [finalResult, setFinalResult] = useState(null);

  // ── Start session ──────────────────────────────────────────────────────────
  const handleStart = async ({ category, difficulty, totalQuestions: tq }) => {
    setIsLoading(true);
    try {
      const res = await api.post('/mock-interview/start', { category, difficulty, totalQuestions: tq });
      const data = res.data.data;
      setSession(data);
      setCurrentQuestion(data.question);
      setCurrentQuestionIndex(data.currentQuestionIndex);
      setTotalQuestions(data.totalQuestions);
      setIsLastQuestion(data.totalQuestions === 1);
      setPhase('question');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to start interview');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Submit answer ──────────────────────────────────────────────────────────
  const handleSubmitAnswer = async (answer) => {
    setIsLoading(true);
    setLastAnswer(answer);
    try {
      const res = await api.post('/mock-interview/answer', {
        sessionId: session.sessionId,
        answer,
      });
      const data = res.data.data;
      setLastFeedback(data);
      setIsLastQuestion(data.isLastQuestion);
      setPhase('feedback');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to evaluate answer');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Next question ──────────────────────────────────────────────────────────
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleFinish();
      return;
    }
    setCurrentQuestion(lastFeedback.nextQuestion);
    setCurrentQuestionIndex(lastFeedback.nextQuestionIndex);
    setLastFeedback(null);
    setLastAnswer('');
    setPhase('question');
  };

  // ── Finish session ─────────────────────────────────────────────────────────
  const handleFinish = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/mock-interview/finish', { sessionId: session.sessionId });
      setFinalResult(res.data.data);
      setPhase('score');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to finish interview');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setPhase('setup');
    setSession(null);
    setCurrentQuestion('');
    setCurrentQuestionIndex(0);
    setLastAnswer('');
    setLastFeedback(null);
    setFinalResult(null);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="fixed top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />
      <div className="fixed top-[40%] right-[20%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)' }}>
            <Mic size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">AI Mock Interview</h1>
            <p className="text-sm text-gray-500">Practice. Get feedback. Ace the real thing.</p>
          </div>
        </div>

        {phase === 'setup' && (
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Trophy size={16} className="text-yellow-500" />
            <span>Earn badges · Track progress</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 px-6 pb-10">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
              <InterviewSetup onStart={handleStart} isLoading={isLoading} />
            </motion.div>
          )}

          {phase === 'question' && (
            <motion.div key="question" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto space-y-6">
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={totalQuestions}
                  category={session?.category}
                  difficulty={session?.difficulty}
                />
                <AnswerBox onSubmit={handleSubmitAnswer} isLoading={isLoading} />
              </div>
            </motion.div>
          )}

          {phase === 'feedback' && lastFeedback && (
            <motion.div key="feedback" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="max-w-3xl mx-auto space-y-6">
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={totalQuestions}
                  category={session?.category}
                  difficulty={session?.difficulty}
                />
                <FeedbackCard
                  feedback={lastFeedback}
                  answer={lastAnswer}
                  isLastQuestion={isLastQuestion}
                  isLoading={isLoading}
                  onNext={handleNextQuestion}
                />
              </div>
            </motion.div>
          )}

          {phase === 'score' && finalResult && (
            <motion.div key="score" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-4xl mx-auto space-y-8">
                <InterviewScore result={finalResult} onReset={handleReset} />
                <InterviewSummary answers={finalResult.answers} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MockInterview;
