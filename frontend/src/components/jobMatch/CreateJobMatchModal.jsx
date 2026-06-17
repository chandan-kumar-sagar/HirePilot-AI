import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGenerateJobMatch } from "@/hooks/useJobMatch";
import { useResumes } from "@/features/resume/useResume";
import { toast } from "sonner";

export default function CreateJobMatchModal({ open, onOpen, onClose, onMatchGenerated }) {
  const [resumeId, setResumeId] = useState("");
  const { data: resumesData } = useResumes();
  const generateMatch = useGenerateJobMatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (values) => {
    if (!resumeId) {
      toast.error("Please select a resume");
      return;
    }

    generateMatch.mutate(
      { resumeId, ...values },
      {
        onSuccess: (data) => {
          toast.success("Job Match generated successfully!");
          reset();
          setResumeId("");
          onClose();
          if (onMatchGenerated) {
            onMatchGenerated(data.jobMatch);
          }
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to generate match");
        },
      }
    );
  };

  return (
    <>
      {onOpen && (
        <Button onClick={onOpen} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
          Analyze New Job
        </Button>
      )}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <DialogHeader>
            <DialogTitle>Analyze Job Match</DialogTitle>
            <DialogDescription>
              Check how well your resume matches a specific job description.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
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

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="e.g. Google"
                {...register("companyName", { required: "Company name is required" })}
              />
              {errors.companyName && <p className="text-xs text-red-500">{errors.companyName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Backend Developer"
                {...register("jobTitle", { required: "Job title is required" })}
              />
              {errors.jobTitle && <p className="text-xs text-red-500">{errors.jobTitle.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <textarea
                id="jobDescription"
                rows={5}
                placeholder="Paste the job description here..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                {...register("jobDescription", { required: "Job description is required" })}
              />
              {errors.jobDescription && <p className="text-xs text-red-500">{errors.jobDescription.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90" disabled={generateMatch.isPending}>
              {generateMatch.isPending ? "Analyzing Match..." : "Generate Match"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
