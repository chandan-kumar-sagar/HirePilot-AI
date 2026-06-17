import { useState, useEffect } from "react";
import { Wrench, Plus, X, Save } from "lucide-react";
import { useUpdateSkills } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function SkillsCard({ user }) {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const updateSkillsMutation = useUpdateSkills();

  useEffect(() => {
    if (user?.skills) setSkills(user.skills);
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

  const isDirty = JSON.stringify(skills) !== JSON.stringify(user?.skills || []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Wrench className="text-pink-500" size={20} />
          Skills Section
        </h2>
        {isDirty && (
          <button
            onClick={handleSave}
            disabled={updateSkillsMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-opacity disabled:opacity-50"
          >
            {updateSkillsMutation.isPending ? "Saving..." : <><Save size={14} /> Save</>}
          </button>
        )}
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-3 mb-6">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add skill (e.g. Node.js)"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition text-sm"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="bg-pink-50 text-pink-600 hover:bg-pink-100 px-4 py-2.5 rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={18} />
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <div className="text-sm text-gray-400 italic">No skills added yet.</div>
        ) : (
          skills.map((skill, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-1.5 bg-gradient-to-r from-pink-50 to-orange-50 border border-orange-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition hover:shadow-md"
            >
              {skill}
              <button 
                onClick={() => handleRemoveSkill(skill)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 ml-1 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
