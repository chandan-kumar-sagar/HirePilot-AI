import { AlertTriangle } from "lucide-react";

export default function MissingSkillsCard({ missingSkills = [] }) {
  if (!missingSkills || missingSkills.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={20} className="text-orange-500" />
        <h3 className="font-bold text-orange-800 text-lg">Missing Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {missingSkills.map((skill, idx) => (
          <div key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-orange-100 shadow-sm">
            <span className="text-sm font-medium text-orange-900">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
