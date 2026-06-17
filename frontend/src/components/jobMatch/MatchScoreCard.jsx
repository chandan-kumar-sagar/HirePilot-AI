import { Target } from "lucide-react";

export default function MatchScoreCard({ score }) {
  let color = "text-red-500";
  let strokeColor = "#ef4444";
  let label = "Low Match";

  if (score >= 90) {
    color = "text-emerald-500";
    strokeColor = "#10b981";
    label = "Excellent Match";
  } else if (score >= 75) {
    color = "text-green-500";
    strokeColor = "#22c55e";
    label = "Good Match";
  } else if (score >= 60) {
    color = "text-orange-500";
    strokeColor = "#f97316";
    label = "Fair Match";
  }

  // Calculate SVG circle properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col items-center justify-center shadow-sm">
      <div className="flex items-center gap-2 mb-6 w-full justify-start text-gray-800 font-bold text-lg">
        <Target size={20} className={color} />
        Match Score
      </div>
      
      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-black ${color}`}>{score}%</span>
        </div>
      </div>
      
      <div className={`mt-6 font-semibold px-4 py-1.5 rounded-full border bg-opacity-10 ${color.replace('text', 'bg')} ${color} ${color.replace('text', 'border')}`}>
        {label}
      </div>
    </div>
  );
}
