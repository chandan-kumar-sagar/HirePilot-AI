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
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Invest in your career with plans tailored to your job search intensity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {plans.map((plan, idx) => (
          <div key={idx} className={`relative bg-card p-8 rounded-3xl border ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border shadow-sm'} transition-transform`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
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
            <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground hover:bg-accent/50'}`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
