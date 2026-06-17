import { useState } from "react";
import { FileText } from "lucide-react";
import GenerateCoverLetterForm from "@/components/cover-letter/GenerateCoverLetterForm";
import CoverLetterHistory from "@/components/cover-letter/CoverLetterHistory";
import CoverLetterPreview from "@/components/cover-letter/CoverLetterPreview";
import { useCoverLetters, useDeleteCoverLetter } from "@/hooks/useCoverLetter";

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200 flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center">
        <FileText size={36} className="text-[#FF6B6B]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">No Cover Letters Yet</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Generate your first AI-powered cover letter tailored to any job description.
        </p>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function CoverLetterSkeleton() {
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

// ─── Cover Letters Page ───────────────────────────────────────────────────────
export default function CoverLetters() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const { data, isLoading } = useCoverLetters();
  const deleteCoverLetter = useDeleteCoverLetter();

  const coverLetters = data?.coverLetters || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Cover Letters</h1>
          <p className="text-gray-400 mt-1 text-sm">
            AI-generated cover letters tailored to your resume & job description.
          </p>
        </div>
        <GenerateCoverLetterForm
          open={isFormOpen}
          onOpen={() => setIsFormOpen(true)}
          onClose={() => setIsFormOpen(false)}
        />
      </div>

      {/* Count badge */}
      {!isLoading && coverLetters.length > 0 && (
        <p className="text-sm font-medium text-gray-400">
          {coverLetters.length} cover letter{coverLetters.length !== 1 ? "s" : ""} generated
        </p>
      )}

      {/* Grid / loading / empty */}
      {isLoading ? (
        <CoverLetterSkeleton />
      ) : coverLetters.length === 0 ? (
        <EmptyState />
      ) : (
        <CoverLetterHistory
          coverLetters={coverLetters}
          onPreview={(letter) => setSelectedLetter(letter)}
          onDelete={(id) => deleteCoverLetter.mutate(id)}
        />
      )}

      {/* Preview Modal */}
      {selectedLetter && (
        <CoverLetterPreview
          coverLetter={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      )}
    </div>
  );
}
