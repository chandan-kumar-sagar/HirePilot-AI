import React from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Software Engineer at TechCorp",
      content: "HirePilot-AI's AI Resume builder helped me pass the ATS screen at 4 different FAANG companies. The mock interview coach was the cherry on top. I landed my dream job in 3 weeks!",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Product Manager",
      content: "I was struggling to write cover letters. The AI generates them in seconds and they sound incredibly authentic. It saved me hundreds of hours during my job hunt.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "The Kanban job tracker is beautiful. I love how it automatically syncs my interview dates and sends me reminders. Best career OS out there.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      content: "The skills gap analysis told me exactly what Python libraries I was missing for Senior roles. Two certificates later, I got the promotion.",
      rating: 4,
    },
    {
      name: "Amanda Lee",
      role: "Marketing Director",
      content: "I've recommended HirePilot-AI to all my peers. It completely demystifies the black box of hiring.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Recent Graduate",
      content: "As a new grad, I had no idea how to position my internships. The AI extracted the perfect bullet points.",
      rating: 5,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Loved by Thousands</h1>
        <p className="text-xl text-muted-foreground">
          Don't just take our word for it. See how HirePilot-AI is transforming careers worldwide.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="break-inside-avoid bg-card p-8 rounded-2xl border border-border shadow-sm">
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg italic text-foreground/90 mb-6">"{t.content}"</p>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
