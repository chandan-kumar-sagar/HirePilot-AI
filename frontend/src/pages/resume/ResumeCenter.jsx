import UploadResumeModal from "@/components/resume/UploadResumeModal";
import ResumeGrid from "@/components/resume/ResumeGrid";
import { useResumes, useDeleteResume } from "@/features/resume/useResume";
import { FileText } from "lucide-react";

// ─── Loading skeleton grid ────────────────────────────────────────────────────
function ResumeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl p-6 animate-pulse border border-gray-100">
          <div className="flex justify-between">
            <div className="w-10 h-10 rounded-xl bg-gray-100" />
            <div className="w-8 h-8 rounded-lg bg-gray-100" />
          </div>
          <div className="mt-4 h-4 bg-gray-100 rounded-full w-3/4" />
          <div className="mt-2 h-3 bg-gray-100 rounded-full w-1/2" />
          <div className="mt-4 flex justify-between">
            <div className="h-3 bg-gray-100 rounded-full w-16" />
            <div className="h-5 bg-gray-100 rounded-full w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200 flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center">
        <FileText size={36} className="text-[#FF6B6B]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">No Resumes Yet</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Upload your first resume to begin AI-powered ATS analysis, skill extraction, and job matching.
        </p>
      </div>
    </div>
  );
}

// ─── Resume Center Page ───────────────────────────────────────────────────────
export default function ResumeCenter() {
  const { data, isLoading } = useResumes();
  const deleteResume = useDeleteResume();
  const resumes = data?.resumes || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Resume Center</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your resumes · AI extraction runs automatically on upload
          </p>
        </div>
        <UploadResumeModal />
      </div>

      {/* Count badge */}
      {!isLoading && resumes.length > 0 && (
        <p className="text-sm font-medium text-gray-400">
          {resumes.length} resume{resumes.length !== 1 ? "s" : ""} uploaded
        </p>
      )}

      {/* Grid / loading / empty */}
      {isLoading ? (
        <ResumeSkeleton />
      ) : resumes.length === 0 ? (
        <EmptyState />
      ) : (
        <ResumeGrid
          resumes={resumes}
          onDelete={(id) => deleteResume.mutate(id)}
        />
      )}
    </div>
  );
}
