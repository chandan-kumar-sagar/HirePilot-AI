import { useState } from "react";
import { Building2, MapPin, Link2, X, Edit, Calendar } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditJobModal from "./EditJobModal";

export default function JobDetailsDrawer({ job, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!job) return null;

  const createdAt = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden bg-white">
        {isEditing ? (
          <div className="relative">
             <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-4 left-4 text-gray-500 hover:text-black z-10 text-sm font-medium"
              >
                ← Back
              </button>
            <EditJobModal job={job} onClose={() => setIsEditing(false)} />
          </div>
        ) : (
          <div className="flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 bg-gray-50 border-b border-gray-100 relative">
               <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white p-1.5 rounded-full shadow-sm"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                  {job.companyName?.charAt(0) || "C"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
                  <p className="text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 size={16} /> {job.companyName}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 capitalize">
                  {job.status}
                </span>
                {job.location && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                  <Calendar size={12} /> {createdAt}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {job.jobUrl && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Job Link</h4>
                  <a 
                    href={job.jobUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[var(--primary)] hover:underline text-sm break-all bg-blue-50/50 p-3 rounded-xl border border-blue-100"
                  >
                    <Link2 size={16} className="shrink-0" />
                    {job.jobUrl}
                  </a>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Notes</h4>
                {job.notes ? (
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {job.notes}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm italic">No notes added.</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium text-sm"
              >
                <Edit size={16} /> Edit Details
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
