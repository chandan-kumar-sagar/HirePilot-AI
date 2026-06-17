import { Lightbulb } from "lucide-react";

export default function SuggestedQuestions({ onSelect }) {
  const suggestions = [
    "What should I learn after React?",
    "How do I become a Senior Backend Engineer?",
    "Roadmap for Full Stack Developer",
    "Best projects for freshers",
    "How can I improve my resume?",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-700 font-medium ml-1">
        <Lightbulb size={18} className="text-orange-500" />
        Suggested Questions
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="bg-white border border-orange-100 hover:border-orange-300 hover:bg-orange-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
