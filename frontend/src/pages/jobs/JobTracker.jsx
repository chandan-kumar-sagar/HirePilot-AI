import JobBoard from "@/components/jobs/JobBoard";

export default function JobTracker() {
  // JobTracker acts as the primary page container, rendering the full JobBoard
  return (
    <div className="h-full">
      <JobBoard />
    </div>
  );
}