import {
  useInterviews,
} from "@/features/interview/useInterview";

import InterviewCard
  from "@/components/interview/InterviewCard";

  import { useState } from "react";

import GenerateInterviewModal
  from "@/components/interview/GenerateInterviewModal";

import { Button } from "@/components/ui/button";

export default function InterviewPrep() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useInterviews();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Interview Prep
          </h1>
          <p className="text-gray-500 mt-2">
            Practice AI generated interview questions.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
        >
          + Generate Interview
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {data?.interviews?.map(
          (interview) => (
            <InterviewCard
              key={interview._id}
              interview={interview}
            />
          )
        )}

      </div>

      <GenerateInterviewModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}