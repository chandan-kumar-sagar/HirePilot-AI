import { useState, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { useAskCareerCoach } from "@/hooks/useCareerCoach";

export default function AskQuestionCard({ initialQuestion, onResponse }) {
  const [question, setQuestion] = useState("");
  const askCoach = useAskCareerCoach();

  // Update input if a suggested question is clicked
  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    askCoach.mutate(
      { question },
      {
        onSuccess: (data) => {
          onResponse(data.careerAdvice);
          setQuestion("");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 text-gray-800 font-bold text-lg mb-4">
        <Bot size={22} className="text-orange-500" />
        Ask AI Coach
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          id="ask-question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your career question here..."
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition resize-none pr-14"
        />
        <button
          type="submit"
          disabled={!question.trim() || askCoach.isPending}
          className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {askCoach.isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
}
