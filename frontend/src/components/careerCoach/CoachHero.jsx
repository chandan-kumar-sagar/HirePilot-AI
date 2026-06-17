import { Bot } from "lucide-react";

export default function CoachHero() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🧠</span>
          <h1 className="text-3xl sm:text-4xl font-black">AI Career Coach</h1>
        </div>
        <p className="text-white/90 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg">
          Get personalized career advice, learning roadmaps, and job guidance.
        </p>
        <button 
          onClick={() => document.getElementById('ask-question-input').focus()}
          className="bg-white text-orange-500 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition shadow-sm"
        >
          Ask Anything
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute -top-20 right-20 w-60 h-60 bg-yellow-300 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>
    </div>
  );
}
