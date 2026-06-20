import { Outlet } from "react-router-dom";
import { Briefcase, Target, Sparkles, LayoutDashboard } from "lucide-react";
import Footer from "../components/ui/Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 animate-mesh"
        style={{
          backgroundImage: "radial-gradient(at 0% 0%, hsla(353,100%,71%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(28,100%,71%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(260,100%,76%,1) 0, transparent 50%)",
        }}
      />
      
      {/* Floating abstract elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float-reverse"></div>

      <div className="flex-1 flex relative z-10 container mx-auto max-w-7xl">
        {/* Left side: Illustration & Branding */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-start">
          <div className="glass-panel p-10 rounded-3xl animate-slide-in-left border-l-0 border-t-0 shadow-lg border border-white/20 relative w-full">
            <div className="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-xl animate-float delay-100">
              <Sparkles className="text-accent w-8 h-8" />
            </div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md p-2">
                <img src="/logo.svg" alt="HirePilot-AI" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-extrabold animate-gradient-text tracking-tight">HirePilot-AI</h1>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 leading-[1.15] text-foreground">
              Supercharge your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                job search with AI.
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
              Track applications, analyze resumes, and prepare for interviews all
              in one beautifully designed platform.
            </p>

            {/* Features List with Icons */}
            <div className="space-y-5">
              <div className="flex items-center gap-4 bg-white/40 p-3 rounded-xl backdrop-blur-sm border border-white/30 transform transition hover:scale-[1.02] hover:bg-white/60">
                <div className="p-3 bg-gradient-to-br from-primary to-[#ff4757] text-white rounded-lg shadow-sm">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground">Smart Application Tracking</span>
              </div>
              <div className="flex items-center gap-4 bg-white/40 p-3 rounded-xl backdrop-blur-sm border border-white/30 transform transition hover:scale-[1.02] hover:bg-white/60">
                <div className="p-3 bg-gradient-to-br from-accent to-[#9c75ff] text-white rounded-lg shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground">AI Resume Optimization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Form (Outlet) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div className="w-full max-w-md perspective-1000">
            <div className="glass-premium rounded-[2rem] p-8 sm:p-10 shadow-2xl relative">
               <Outlet />
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
