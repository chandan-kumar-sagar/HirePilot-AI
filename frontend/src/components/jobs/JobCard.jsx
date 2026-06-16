import {
  Building2,
  MapPin,
  Trash2,
} from "lucide-react";

import { useDeleteJob } from "@/features/jobs/jobs.hooks";

export default function JobCard({
  job,
}) {
  const deleteJobMutation = useDeleteJob();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJobMutation.mutate(job._id);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border hover:shadow-md transition">
      <h3 className="font-bold text-lg">
        {job.jobTitle}
      </h3>

      <div className="flex items-center gap-2 mt-2 text-gray-500">
        <Building2 size={16} />
        {job.companyName}
      </div>

      <div className="flex items-center gap-2 text-gray-500 mt-1">
        <MapPin size={16} />
        {job.location}
      </div>

      <div className="mt-4">
        <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
          {job.status}
        </span>
      </div>

      <button 
        className="mt-4 text-red-500 hover:text-red-700 transition-colors"
        onClick={handleDelete}
        disabled={deleteJobMutation.isPending}
      >
        <Trash2 size={18} className={deleteJobMutation.isPending ? "opacity-50" : ""} />
      </button>
    </div>
  );
}