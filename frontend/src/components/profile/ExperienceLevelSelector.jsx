import { useState, useEffect } from "react";
import { Award, Save } from "lucide-react";
import { useUpdateExperienceLevel } from "@/hooks/useProfile";
import { toast } from "sonner";

const LEVELS = [
  { id: "entry", label: "Entry Level", desc: "0-2 years of experience. Just starting out." },
  { id: "mid", label: "Mid Level", desc: "3-5 years of experience. Solid understanding." },
  { id: "senior", label: "Senior Level", desc: "5+ years of experience. Leadership & architecture." },
  { id: "lead", label: "Lead / Manager", desc: "Managing teams or technical roadmaps." },
];

export default function ExperienceLevelSelector({ user }) {
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Award className="text-blue-500" size={20} />
          Experience Level
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        {LEVELS.map((level) => (
          <div 
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${
              selectedLevel === level.id 
                ? "border-blue-500 bg-blue-50 shadow-sm" 
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedLevel === level.id ? "border-blue-500" : "border-gray-300"
              }`}>
                {selectedLevel === level.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
              </div>
              <div>
                <div className={`font-bold ${selectedLevel === level.id ? "text-blue-700" : "text-gray-700"}`}>
                  {level.label}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {level.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!isDirty || !selectedLevel || updateMutation.isPending}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateMutation.isPending ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
          ) : (
            <Save size={16} />
          )}
          Save Level
        </button>
      </div>
    </div>
  );
}
