import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownloadCoverLetter } from "@/hooks/useCoverLetter";
import { toast } from "sonner";

/**
 * DownloadCoverLetter
 *
 * Props:
 *  - coverLetter  {object}  The cover letter object (needs _id, jobTitle, companyName, content)
 *  - compact      {boolean} If true, renders a small icon-only button (for use inside cards)
 */
export default function DownloadCoverLetter({ coverLetter, compact = false }) {
  const downloadMutation = useDownloadCoverLetter();

  const handleDownload = () => {
    // If the backend returns a blob, use that; otherwise fall back to
    // creating a .txt file from the content stored in state.
    if (coverLetter?._id) {
      downloadMutation.mutate(coverLetter._id, {
        onSuccess: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${coverLetter.jobTitle || "cover-letter"}_${
            coverLetter.companyName || "company"
          }.txt`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success("Cover letter downloaded");
        },
        onError: () => {
          // Graceful fallback — generate .txt from content
          fallbackDownload();
        },
      });
    } else {
      fallbackDownload();
    }
  };

  const fallbackDownload = () => {
    const text = coverLetter?.content || "";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${coverLetter?.jobTitle || "cover-letter"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Cover letter downloaded");
  };

  if (compact) {
    return (
      <button
        onClick={handleDownload}
        disabled={downloadMutation.isPending}
        className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
        title="Download"
      >
        <Download size={15} />
      </button>
    );
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={downloadMutation.isPending}
      className="gap-2"
    >
      <Download size={15} />
      {downloadMutation.isPending ? "Downloading..." : "Download"}
    </Button>
  );
}
