import { useState, useEffect } from "react";
import CoachHero from "@/components/careerCoach/CoachHero";
import SuggestedQuestions from "@/components/careerCoach/SuggestedQuestions";
import AskQuestionCard from "@/components/careerCoach/AskQuestionCard";
import CoachResponse from "@/components/careerCoach/CoachResponse";
import CoachHistory from "@/components/careerCoach/CoachHistory";

export default function CareerCoach() {
  const [currentResponse, setCurrentResponse] = useState(null);
  const [suggestedQuestion, setSuggestedQuestion] = useState("");

  const handleSuggestionSelect = (q) => {
    setSuggestedQuestion(q);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('ask-question-input')?.focus();
  };

  const handleNewResponse = (response) => {
    setCurrentResponse(response);
    setSuggestedQuestion("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Section 1: Hero */}
      <CoachHero />

      {/* Section 4: AI Response (Shown if active) */}
      {currentResponse && (
        <div className="mb-8">
          <CoachResponse 
            response={currentResponse} 
            onClose={() => setCurrentResponse(null)} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 2: Suggested Questions */}
          <SuggestedQuestions onSelect={handleSuggestionSelect} />

          {/* Section 3: Question Input */}
          <AskQuestionCard 
            initialQuestion={suggestedQuestion}
            onResponse={handleNewResponse} 
          />
        </div>

        <div className="lg:col-span-1">
          {/* Section 5: History */}
          <CoachHistory onSelect={handleNewResponse} />
        </div>
      </div>
    </div>
  );
}
