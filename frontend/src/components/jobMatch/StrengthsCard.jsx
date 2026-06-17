import { CheckCircle2 } from "lucide-react";

export default function StrengthsCard({ strengths = [] }) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💪</span>
        <h3 className="font-bold text-emerald-800 text-lg">Strengths</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {strengths.map((strength, idx) => (
          <div key={idx} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-sm">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-sm font-medium text-emerald-900">{strength}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
