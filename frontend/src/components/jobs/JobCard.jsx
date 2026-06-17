import { useState } from "react";
import { Building2, MapPin, Trash2, GripVertical } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { useDeleteJob } from "@/features/jobs/jobs.hooks";
import JobDetailsDrawer from "./JobDetailsDrawer";

export default function JobCard({ job, index }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const deleteJobMutation = useDeleteJob();

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent opening drawer when deleting
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJobMutation.mutate(job._id);
    }
  };

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (s === "saved") return "bg-blue-100 text-blue-600 border-blue-200";
    if (s === "applied") return "bg-pink-100 text-pink-600 border-pink-200";
    if (s === "interview") return "bg-purple-100 text-purple-600 border-purple-200";
    if (s === "offer") return "bg-green-100 text-green-600 border-green-200";
    if (s === "rejected") return "bg-orange-100 text-orange-600 border-orange-200";
    return "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <>
      <Draggable draggableId={job._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() => setIsDrawerOpen(true)}
            className={`bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition cursor-pointer flex gap-2 ${
              snapshot.isDragging ? "shadow-lg scale-105 z-50 ring-2 ring-[var(--primary)] border-transparent" : "shadow-sm"
            }`}
          >
            {/* Drag Handle */}
            <div 
              {...provided.dragHandleProps} 
              className="flex items-center text-gray-300 hover:text-gray-500 cursor-grab shrink-0 -ml-1 mt-1"
            >
              <GripVertical size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <h3 className="font-bold text-base text-gray-800 truncate leading-tight mt-1">
                {job.jobTitle}
              </h3>

              <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-xs">
                <Building2 size={13} className="shrink-0" />
                <span className="truncate">{job.companyName}</span>
              </div>

              {job.location && (
                <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-xs">
                  <MapPin size={13} className="shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
                
                <button 
                  className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  onClick={handleDelete}
                  disabled={deleteJobMutation.isPending}
                  title="Delete Job"
                >
                  <Trash2 size={14} className={deleteJobMutation.isPending ? "opacity-50" : ""} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <JobDetailsDrawer job={isDrawerOpen ? job : null} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}