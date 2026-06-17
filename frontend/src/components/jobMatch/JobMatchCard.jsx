import { Trash2, Building2, Target } from "lucide-react";
import { useDeleteJobMatch } from "@/hooks/useJobMatch";

export default function JobMatchCard({ match, onClick }) {
  const deleteMatchMutation = useDeleteJobMatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job match analysis?")) {
      deleteMatchMutation.mutate(match._id);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-50 border-emerald-100";
    if (score >= 75) return "text-green-500 bg-green-50 border-green-100";
    if (score >= 60) return "text-orange-500 bg-orange-50 border-orange-100";
    return "text-red-500 bg-red-50 border-red-100";
  };

  const createdAt = new Date(match.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div 
      onClick={() => onClick(match)}
      className="bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-md transition cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 overflow-hidden">
            <h3 className="font-bold text-gray-800 text-lg truncate">{match.jobTitle}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <Building2 size={14} className="shrink-0" />
              <span className="truncate">{match.companyName}</span>
            </div>
          </div>
          <button 
            onClick={handleDelete}
            className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition"
            disabled={deleteMatchMutation.isPending}
            title="Delete Match"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-sm ${getScoreColor(match.matchScore)}`}>
          <Target size={14} />
          {match.matchScore}% Match
        </div>
        <div className="text-xs text-gray-400">
          {createdAt}
        </div>
      </div>
    </div>
  );
}
