import React from "react";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for casual job seekers.",
      features: ["3 AI Resumes/month", "Basic Job Tracker", "Community Support"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$19/mo",
      description: "For active job seekers who want an edge.",
      features: ["Unlimited AI Resumes", "Unlimited Cover Letters", "Advanced ATS Scoring", "Mock Interview Coach"],
      buttonText: "Start 7-Day Trial",
      popular: true
    },
    {
      name: "Executive",
      price: "$49/mo",
      description: "Dedicated support for senior roles.",
      features: ["Everything in Pro", "1-on-1 Human Coach Review", "Salary Negotiation AI", "Priority Support"],
      buttonText: "Upgrade to Executive",
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary animate-gradient-text">
          Unleash Your Potential
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Invest in your future with powerful plans dynamically tailored to your job search intensity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {plans.map((plan, idx) => (
          <div key={idx} className={`relative glass-premium p-8 rounded-[2.5rem] border ${plan.popular ? 'border-primary/50 shadow-[0_8px_40px_rgba(255,107,107,0.2)] scale-105 z-10' : 'border-white/20 shadow-lg'} transition-all duration-300 hover:-translate-y-2`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-md">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-extrabold mb-2 text-foreground">{plan.name}</h3>
            <p className="text-muted-foreground mb-6 h-12">{plan.description}</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">{plan.price}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-bold text-[15px] transition-all duration-300 ${plan.popular ? 'btn-primary' : 'bg-white text-foreground border-2 border-transparent hover:border-primary/30 shadow-sm hover:shadow-md'}`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
