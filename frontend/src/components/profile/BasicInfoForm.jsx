import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Briefcase, MapPin, DollarSign, Link2, FileText, Save } from "lucide-react";
import { useUpdateProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function BasicInfoForm({ user }) {
  const updateProfileMutation = useUpdateProfile();
  
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      targetRole: user?.targetRole || "",
      preferredLocation: user?.preferredLocation || "",
      targetSalary: user?.targetSalary || "",
      linkedinUrl: user?.linkedinUrl || "",
      githubUrl: user?.githubUrl || "",
      portfolioUrl: user?.portfolioUrl || "",
      bio: user?.bio || "",
    }
  });

  // Reset form when user data is fully loaded/updated
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        targetRole: user.targetRole || "",
        preferredLocation: user.preferredLocation || "",
        targetSalary: user.targetSalary || "",
        linkedinUrl: user.linkedinUrl || "",
        githubUrl: user.githubUrl || "",
        portfolioUrl: user.portfolioUrl || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        reset(data); // reset isDirty state to false with new data
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <User className="text-[var(--primary)]" size={20} />
          Basic Information
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("fullName", { required: true })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Target Role */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Target Role</label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("targetRole")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Preferred Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("preferredLocation")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. Remote, New York, London"
              />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Target Salary</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("targetSalary")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. $120,000"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">LinkedIn Profile</label>
            <div className="relative">
              <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("linkedinUrl")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">GitHub Profile</label>
            <div className="relative">
              <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register("githubUrl")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Portfolio Website</label>
          <div className="relative">
            <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              {...register("portfolioUrl")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            Professional Bio
          </label>
          <div className="relative">
            <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
            <textarea 
              {...register("bio")}
              rows={4}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition text-sm resize-none"
              placeholder="Briefly describe your professional background and career goals..."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || updateProfileMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateProfileMutation.isPending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
