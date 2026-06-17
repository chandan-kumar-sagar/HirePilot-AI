import { Check, Trash2, Clock } from "lucide-react";
import { useCareerAdviceHistory, useDeleteCareerAdvice } from "@/hooks/useCareerCoach";

export default function CoachHistory({ onSelect }) {
  const { data, isLoading } = useCareerAdviceHistory();
  const deleteMutation = useDeleteCareerAdvice();

  const history = data?.adviceList || [];

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 italic text-sm border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
        No previous questions found. Ask your first question above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-800 font-bold text-lg mb-4">
        <Clock size={20} className="text-orange-500" />
        Previous Questions
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item._id}
            onClick={() => onSelect(item)}
            className="group flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl hover:border-orange-200 hover:shadow-sm transition cursor-pointer"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Check size={14} className="text-orange-500" />
              </div>
              <span className="text-gray-700 font-medium truncate text-sm">
                {item.question}
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Delete this history item?")) {
                  deleteMutation.mutate(item._id);
                }
              }}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
              disabled={deleteMutation.isPending}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
