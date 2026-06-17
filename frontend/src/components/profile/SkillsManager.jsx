import { useState, useEffect } from "react";
import { Wrench, Plus, X, Save } from "lucide-react";
import { useUpdateSkills } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function SkillsManager({ user }) {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const updateSkillsMutation = useUpdateSkills();

  useEffect(() => {
    if (user?.skills) {
      setSkills(user.skills);
    }
  }, [user]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const newSkill = inputValue.trim();
    if (!newSkill) return;

    if (skills.some(s => s.toLowerCase() === newSkill.toLowerCase())) {
      toast.error("Skill already exists");
      return;
    }

    setSkills([...skills, newSkill]);
    setInputValue("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = () => {
    updateSkillsMutation.mutate({ skills }, {
      onSuccess: () => toast.success("Skills updated successfully!"),
      onError: () => toast.error("Failed to update skills")
    });
  };

  // Check if current skills match user's saved skills
  const isDirty = JSON.stringify(skills) !== JSON.stringify(user?.skills || []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Wrench className="text-orange-500" size={20} />
          Technical Skills
        </h2>
      </div>

      <div className="space-y-6">
        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="flex gap-3">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. React, Node.js, Python"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-300 focus:border-transparent outline-none transition text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-4 py-2.5 rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            Add
          </button>
        </form>

        {/* Skills List */}
        <div className="min-h-[100px] bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 italic">
              No skills added yet. Add your core competencies above.
            </div>
          ) : (
            skills.map((skill, idx) => (
              <div 
                key={idx}
                className="group flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm"
              >
                {skill}
                <button 
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md p-0.5 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Save Actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!isDirty || updateSkillsMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateSkillsMutation.isPending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
            ) : (
              <Save size={16} />
            )}
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
}
