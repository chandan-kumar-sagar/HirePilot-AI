import { Lightbulb } from "lucide-react";

export default function RecommendationsCard({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 border border-purple-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚀</span>
        <h3 className="font-bold text-purple-800 text-lg">Recommendations</h3>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-purple-100 shadow-sm">
            <Lightbulb size={16} className="text-purple-500 mt-0.5 shrink-0" />
            <span className="text-sm text-purple-900 leading-snug">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
