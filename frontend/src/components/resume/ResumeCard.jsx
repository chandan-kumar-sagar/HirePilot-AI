import { FileText, Trash2, Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";

// ATS score colour helper
function atsColor(score) {
  if (score >= 75) return "#52C41A";
  if (score >= 50) return "#FFB86B";
  return "#FF6B6B";
}

// Mini circular ATS indicator
function ATSBadge({ score }) {
  const color = atsColor(score);
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 5px ${color}88` }}
      />
      <span className="text-sm font-bold" style={{ color }}>
        {score}%
      </span>
    </div>
  );
}

export default function ResumeCard({ resume, onDelete }) {
  const navigate = useNavigate();
  const skillCount = resume.skills?.length || 0;

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
      onClick={() => navigate(`/resume/${resume._id}`)}
    >
      {/* Top row: icon + delete */}
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
          <FileText className="text-[#FF6B6B]" size={20} />
        </div>

        {/* Delete — stop propagation so clicking it doesn't navigate */}
        <Dialog>
          <DialogTrigger onClick={(e) => e.stopPropagation()}>
            <span className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
              <Trash2 size={18} />
            </span>
          </DialogTrigger>
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Delete Resume</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">"{resume.title}"</span>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 gap-2 sm:gap-0">
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(resume._id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-semibold text-gray-800 line-clamp-1" title={resume.title}>
        {resume.title}
      </h3>

      {/* Original file name */}
      {resume.originalFileName && (
        <p className="text-xs text-gray-400 mt-0.5 truncate">{resume.originalFileName}</p>
      )}

      {/* ATS + Skills row */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-medium text-gray-400">ATS</p>
          <ATSBadge score={resume.atsScore || 0} />
        </div>

        {skillCount > 0 && (
          <div className="flex items-center gap-1 bg-[#B692FF]/10 text-[#7C5CBF] px-2.5 py-1 rounded-full text-xs font-medium">
            <Zap size={11} />
            {skillCount} skills
          </div>
        )}
      </div>

      {/* View details hint */}
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-[#FF6B6B] transition-colors">
        View Details <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}
