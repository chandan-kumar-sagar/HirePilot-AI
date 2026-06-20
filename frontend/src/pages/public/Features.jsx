import React from "react";
import { Sparkles, Target, FileText, Bot, BrainCircuit, Rocket } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "AI Resume Optimization",
      description: "Instantly tailor your resume for specific job descriptions. HirePilot-AI highlights your most relevant skills to pass ATS systems.",
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Smart Application Tracker",
      description: "Keep all your applications organized in a Kanban board. Auto-update statuses by syncing your email.",
    },
    {
      icon: <Bot className="w-6 h-6 text-primary" />,
      title: "Mock Interview Coach",
      description: "Practice answering behavioral and technical questions with our AI voice coach, receiving real-time feedback.",
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      title: "Skills Gap Analysis",
      description: "Discover what skills you are missing for your target role and get personalized course recommendations.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Auto Cover Letters",
      description: "Generate highly personalized, non-robotic cover letters in seconds that sound exactly like you.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Career Trajectory AI",
      description: "Plot your 5-year career path with data-driven insights from millions of successful career progressions.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Supercharge Your Career</h1>
        <p className="text-xl text-muted-foreground">
          HirePilot-AI is the only AI operating system you need to manage, optimize, and accelerate your job search.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
