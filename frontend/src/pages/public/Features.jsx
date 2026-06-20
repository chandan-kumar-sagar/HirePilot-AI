import React from "react";
import { Sparkles, Target, FileText, Bot, BrainCircuit, Rocket } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "AI Resume Optimization",
      description: "Instantly tailor your resume for specific job descriptions. HirePilot-AI dynamically highlights your most relevant skills to bypass ATS systems and land interviews.",
    },
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: "Smart Application Tracker",
      description: "Keep all your applications impeccably organized in a vibrant Kanban board. Auto-update statuses by seamlessly syncing your email.",
    },
    {
      icon: <Bot className="w-6 h-6 text-secondary" />,
      title: "Mock Interview Coach",
      description: "Master behavioral and technical questions with our elite AI voice coach, receiving real-time, actionable feedback.",
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-green-500" />,
      title: "Skills Gap Analysis",
      description: "Uncover missing skills for your target role and get highly curated, personalized course recommendations to bridge the gap.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Auto Cover Letters",
      description: "Generate highly personalized, non-robotic cover letters in seconds that perfectly echo your unique professional voice.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-indigo-500" />,
      title: "Career Trajectory AI",
      description: "Strategically plot your 5-year career path leveraging data-driven insights from millions of successful career progressions.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-text">
          Accelerate Your Career
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          HirePilot-AI is the ultimate <span className="font-semibold text-foreground">AI operating system</span> you need to manage, optimize, and massively elevate your job search.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="glass-premium p-8 rounded-3xl border border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
