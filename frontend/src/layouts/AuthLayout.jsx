import { Outlet } from "react-router-dom";
import { Briefcase, Sparkles, Target } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-[#FFF8F3]">
      {/* Left side: Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--primary)] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AI Career OS</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Supercharge your job search with AI.
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Track applications, analyze resumes, and prepare for interviews all
            in one place.
          </p>
        </div>

        {/* Features List with Icons */}
        <div className="relative z-10 space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <span>Smart Application Tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Target className="w-5 h-5" />
            </div>
            <span>AI Resume Optimization</span>
          </div>
        </div>

        {/* Abstract Illustration Background */}
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
          <svg
            width="400"
            height="400"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.6,75.2,43.4C66.9,56.2,54.8,66.5,41.2,74.1C27.6,81.7,13.8,86.6,-0.4,87.2C-14.5,87.9,-29.1,84.4,-41.8,76.5C-54.5,68.6,-65.4,56.3,-74.2,42.4C-83,28.5,-89.7,14.3,-90.1,-0.2C-90.5,-14.7,-84.6,-29.4,-75.7,-41.9C-66.8,-54.4,-54.9,-64.7,-41.5,-72.4C-28.1,-80.1,-14,-85.2,0.9,-86.7C15.8,-88.2,31.7,-86.1,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      {/* Right side: Form (Outlet) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
