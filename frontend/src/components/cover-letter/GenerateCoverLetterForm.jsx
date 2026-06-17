import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateCoverLetter } from "@/hooks/useCoverLetter";
import { useResumes } from "@/features/resume/useResume";
import { toast } from "sonner";

export default function GenerateCoverLetterForm({ open, onOpen, onClose }) {
  const [resumeId, setResumeId] = useState("");

  const { data: resumesData } = useResumes();
  const generateCoverLetter = useGenerateCoverLetter();

  const { handleSubmit, reset } = useForm();

  const onSubmit = () => {
    if (!resumeId) {
      toast.error("Please select a resume");
      return;
    }

    generateCoverLetter.mutate(
      { resumeId },
      {
        onSuccess: () => {
          toast.success("Cover letter generated successfully");
          reset();
          setResumeId("");
          onClose();
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to generate cover letter"
          );
        },
      }
    );
  };

  return (
    <>
      <Button onClick={onOpen}>+ Generate Cover Letter</Button>

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle>Generate Cover Letter</DialogTitle>
            <DialogDescription>
              AI will craft a tailored cover letter based solely on your resume.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Resume Select */}
            <div className="space-y-2">
              <Label>Select Resume</Label>
              <Select value={resumeId} onValueChange={setResumeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resumesData?.resumes?.map((resume) => (
                    <SelectItem key={resume._id} value={resume._id}>
                      {resume.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={generateCoverLetter.isPending}
            >
              {generateCoverLetter.isPending ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
