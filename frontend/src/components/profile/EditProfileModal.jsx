import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";
import { useUpdateProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function EditProfileModal({ open, onClose, user }) {
  const updateProfileMutation = useUpdateProfile();
  
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      targetRole: user?.targetRole || "",
      bio: user?.bio || "",
    }
  });

  useEffect(() => {
    if (user && open) {
      reset({
        fullName: user.fullName || "",
        targetRole: user.targetRole || "",
        bio: user.bio || "",
      });
    }
  }, [user, open, reset]);

  if (!open) return null;

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        onClose();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="edit-profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input 
                {...register("fullName", { required: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Target Role</label>
              <input 
                {...register("targetRole")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Bio</label>
              <textarea 
                {...register("bio")}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-transparent outline-none transition text-sm resize-none"
              />
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="edit-profile-form"
            disabled={!isDirty || updateProfileMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-6 py-2.5 rounded-xl font-medium transition disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
