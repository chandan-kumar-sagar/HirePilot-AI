import { Bot, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CoachResponse({ response, onClose }) {
  if (!response) return null;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl relative animate-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Sparkles size={12} /> AI Generated
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 bg-white rounded-full text-gray-500 hover:text-gray-800 shadow-sm border border-gray-100 transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6 pr-32">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center border border-orange-200">
          <Bot size={24} className="text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Coach Response</h2>
          <p className="text-sm text-gray-500 font-medium italic mt-0.5 line-clamp-1 break-all">
            "{response.question}"
          </p>
        </div>
      </div>

      <div className="prose prose-sm sm:prose-base prose-orange max-w-none text-gray-700">
        <ReactMarkdown>{response.answer}</ReactMarkdown>
      </div>
    </div>
  );
}
