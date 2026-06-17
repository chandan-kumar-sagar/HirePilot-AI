import { User, Mail, Briefcase, CreditCard, Edit2 } from "lucide-react";

export default function ProfileInfoCard({ user, onEditClick }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 h-full relative">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <User className="text-pink-500" size={20} />
          Profile Information
        </h2>
        <button 
          onClick={onEditClick}
          className="flex items-center gap-2 text-sm font-medium text-pink-600 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition"
        >
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <User size={18} className="text-gray-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Full Name</div>
            <div className="text-gray-800 font-semibold text-lg">{user.fullName || "-"}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-gray-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Email</div>
            <div className="text-gray-800 font-semibold">{user.email || "-"}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <Briefcase size={18} className="text-gray-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Target Role</div>
            <div className="text-gray-800 font-semibold">{user.targetRole || "-"}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            <CreditCard size={18} className="text-gray-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Subscription</div>
            <div className="text-gray-800 font-semibold capitalize">
              <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold inline-block mt-1">
                {user.subscriptionType || "Free Plan"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
