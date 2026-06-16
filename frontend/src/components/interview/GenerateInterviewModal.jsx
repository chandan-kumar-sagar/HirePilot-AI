import {
  useForm,
} from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Label,
} from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useGenerateInterview,
} from "@/features/interview/useInterview";

import {
  useResumes,
} from "@/features/resume/useResume";

import { useState } from "react";

import { toast } from "sonner";

export default function GenerateInterviewModal({
  open,
  onClose,
}) {
  const [resumeId, setResumeId] =
    useState("");

  const { data: resumesData } =
    useResumes();

  const generateInterview =
    useGenerateInterview();

  const {
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    if (!resumeId) {
      toast.error(
        "Please select a resume"
      );
      return;
    }

    generateInterview.mutate(
      { resumeId },

      {
        onSuccess: () => {
          toast.success(
            "Interview generated successfully"
          );

          onClose();
        },

        onError: (error) => {
          toast.error(
            error?.response?.data
              ?.message ||
              "Failed to generate interview"
          );
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md rounded-3xl">

        <DialogHeader>

          <DialogTitle>
            Generate Interview
          </DialogTitle>

          <DialogDescription>
            Generate AI interview
            questions from your
            resume.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6"
        >

          <div className="space-y-2">

            <Label>
              Select Resume
            </Label>

            <Select
              value={resumeId}
              onValueChange={
                setResumeId
              }
            >
              <SelectTrigger>

                <SelectValue
                  placeholder="
                  Select Resume
                "
                />

              </SelectTrigger>

              <SelectContent>

                {resumesData?.resumes?.map(
                  (resume) => (
                    <SelectItem
                      key={
                        resume._id
                      }
                      value={
                        resume._id
                      }
                    >
                      {resume.title}
                    </SelectItem>
                  )
                )}

              </SelectContent>

            </Select>

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              generateInterview.isPending
            }
          >

            {generateInterview.isPending
              ? "Generating..."
              : "Generate Questions"}

          </Button>

        </form>

      </DialogContent>
    </Dialog>
  );
}