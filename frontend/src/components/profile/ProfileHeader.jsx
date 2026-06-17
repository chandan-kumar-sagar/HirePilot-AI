import React from "react";

export default function ProfileHeader({ user }) {
  const firstName = user?.fullName?.split(" ")[0] || "User";

  return (
    <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg mb-8">
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            👋 Welcome Back, {firstName}
          </h1>
          <div className="flex flex-col gap-1 mt-4 text-white/90 text-lg font-medium">
            <span>{user?.targetRole || "Role Not Set"}</span>
            <span className="capitalize">{user?.experienceLevel || "Level Not Set"}</span>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-pink-300 opacity-20 rounded-full blur-2xl mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
