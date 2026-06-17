import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DownloadCoverLetter from "@/components/cover-letter/DownloadCoverLetter";
import { FileText, Building2, Calendar } from "lucide-react";

export default function CoverLetterPreview({ coverLetter, onClose }) {
  const createdAt = coverLetter?.createdAt
    ? new Date(coverLetter.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <Dialog open={!!coverLetter} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={18} className="text-[var(--primary)]" />
            {coverLetter?.jobTitle || "Cover Letter"}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-xs mt-1">
            <span className="flex items-center gap-1">
              <Building2 size={12} />
              {coverLetter?.companyName || "Company"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {createdAt}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable letter body */}
        <div className="flex-1 overflow-y-auto mt-2 pr-1">
          <div className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
            {coverLetter?.content || "No content available."}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <DownloadCoverLetter coverLetter={coverLetter} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
