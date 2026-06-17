import { useState, useEffect } from "react";
import { Award, Save } from "lucide-react";
import { useUpdateExperienceLevel } from "@/hooks/useProfile";
import { toast } from "sonner";

const LEVELS = [
  { id: "fresher", label: "Fresher", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
  { id: "junior", label: "Junior", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/20", text: "text-green-600 dark:text-green-400" },
  { id: "mid", label: "Mid", bg: "from-yellow-500/10 to-yellow-500/5", border: "border-yellow-500/20", text: "text-yellow-600 dark:text-yellow-400" },
  { id: "senior", label: "Senior", bg: "from-red-500/10 to-red-500/5", border: "border-red-500/20", text: "text-red-600 dark:text-red-400" },
];

export default function ExperienceCard({ user }) {
  const [selectedLevel, setSelectedLevel] = useState("");
  const updateMutation = useUpdateExperienceLevel();

  useEffect(() => {
    if (user?.experienceLevel) {
      setSelectedLevel(user.experienceLevel);
    }
  }, [user]);

  const handleSave = () => {
    updateMutation.mutate({ experienceLevel: selectedLevel }, {
      onSuccess: () => toast.success("Experience level updated!"),
      onError: () => toast.error("Failed to update experience level")
    });
  };

  const isDirty = selectedLevel !== (user?.experienceLevel || "");

  return (
    <div className="bg-card text-card-foreground rounded-3xl p-6 sm:p-8 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award className="text-primary" size={20} />
          Experience Level
        </h2>
        {isDirty && (
          <button
            onClick={handleSave}
            disabled={!selectedLevel || updateMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium transition-opacity disabled:opacity-50"
          >
            {updateMutation.isPending ? "Saving..." : <><Save size={14} /> Save</>}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {LEVELS.map((level) => {
          const isSelected = selectedLevel === level.id;
          return (
            <div 
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`cursor-pointer rounded-2xl p-4 transition-all border-2 flex items-center gap-3 ${
                isSelected 
                  ? `bg-gradient-to-br ${level.bg} ${level.border} shadow-sm` 
                  : "border-border hover:border-muted-foreground/30 bg-card"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected ? level.border.replace("border-", "border-") : "border-muted"
              }`}>
                {isSelected && <div className={`w-2.5 h-2.5 rounded-full ${level.text.replace("text-", "bg-").split(" ")[0]}`}></div>}
              </div>
              <div className={`font-bold ${isSelected ? level.text : "text-muted-foreground"}`}>
                {level.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
