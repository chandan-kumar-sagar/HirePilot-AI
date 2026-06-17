import { FileText, Building2, Calendar, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DownloadCoverLetter from "@/components/cover-letter/DownloadCoverLetter";

// ─── Single Card ──────────────────────────────────────────────────────────────
function CoverLetterCard({ coverLetter, onPreview, onDelete }) {
  const createdAt = coverLetter?.createdAt
    ? new Date(coverLetter.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="bg-card rounded-3xl p-6 border border-border hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Icon + Title row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/90"
          >
            <FileText size={18} className="text-primary-foreground" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-foreground truncate">
              {coverLetter?.jobTitle || "Untitled"}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 size={11} />
              {coverLetter?.companyName || "—"}
            </p>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(coverLetter._id)}
          className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Snippet */}
      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
        {coverLetter?.content || "No preview available."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={11} />
          {createdAt}
        </span>
        <div className="flex items-center gap-2">
          <DownloadCoverLetter coverLetter={coverLetter} compact />
          <Button
            size="sm"
            variant="outline"
            className="text-xs rounded-xl h-7 px-3"
            onClick={() => onPreview(coverLetter)}
          >
            <Eye size={12} className="mr-1" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Cover Letter History Grid ────────────────────────────────────────────────
export default function CoverLetterHistory({ coverLetters, onPreview, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {coverLetters.map((letter) => (
        <CoverLetterCard
          key={letter._id}
          coverLetter={letter}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
