import { useForm } from "react-hook-form";
import { useCreateJob } from "@/features/jobs/jobs.hooks";
import { toast } from "sonner";
import { Briefcase, Building2, MapPin, Link2, X } from "lucide-react";

export default function CreateJobModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createJobMutation = useCreateJob();

  const onSubmit = (data) => {
    createJobMutation.mutate(
      {
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        location: data.location || "",
        jobUrl: data.jobUrl || "",
        notes: data.notes || "",
      },
      {
        onSuccess: () => {
          toast.success("Job application added!");
          reset();
          if (onClose) onClose();
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to add application"
          );
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <h2 className="font-bold text-xl text-gray-800">Add Application</h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("companyName", { required: "Company name is required" })}
              placeholder="e.g. Google"
              className={`w-full border ${errors.companyName ? "border-red-400" : "border-gray-200"} rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition`}
            />
          </div>
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("jobTitle", { required: "Job title is required" })}
              placeholder="e.g. Frontend Engineer"
              className={`w-full border ${errors.jobTitle ? "border-red-400" : "border-gray-200"} rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition`}
            />
          </div>
          {errors.jobTitle && (
            <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("location")}
              placeholder="e.g. Bangalore, India"
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
          </div>
        </div>

        {/* Job URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
          <div className="relative">
            <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("jobUrl")}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createJobMutation.isPending}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl py-3 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
        >
          {createJobMutation.isPending ? "Adding..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}