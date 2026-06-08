import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { resumeSchema } from "@/schemas/resume.schema";

import { useUploadResume } from "@/features/resume/useResume";

export default function UploadResumeModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resumeSchema),
  });

  const uploadMutation = useUploadResume();

  const onSubmit = (data) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("resume", file);

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        reset();
        setFile(null);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload Resume</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Resume Title" {...register("title")} />

          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
