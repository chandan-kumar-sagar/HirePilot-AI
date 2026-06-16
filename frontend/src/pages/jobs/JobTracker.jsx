import {
  useJobs,
  useJobStats,
} from "@/features/jobs/jobs.hooks";

import JobColumn from "@/components/jobs/JobColumn";

import JobStats from "@/components/jobs/JobStats";

import CreateJobModal from "@/components/jobs/CreateJobModal";

export default function JobTracker() {
  const { data } = useJobs();

  const { data: statsData } =
    useJobStats();

  const jobs =
    data?.jobs || [];

  const applied = jobs.filter(
    (j) => j.status === "Applied"
  );

  const interview =
    jobs.filter(
      (j) =>
        j.status ===
        "Interview"
    );

  const offer = jobs.filter(
    (j) => j.status === "Offer"
  );

  const rejected =
    jobs.filter(
      (j) =>
        j.status ===
        "Rejected"
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-black">
          Applications
        </h1>

        <p className="text-gray-500 mt-2">
          Track your job search
          journey.
        </p>
      </div>

      <JobStats
        stats={statsData?.stats}
      />

      <CreateJobModal />

      <div className="grid lg:grid-cols-4 gap-6">
        <JobColumn
          title="Applied"
          jobs={applied}
        />

        <JobColumn
          title="Interview"
          jobs={interview}
        />

        <JobColumn
          title="Offer"
          jobs={offer}
        />

        <JobColumn
          title="Rejected"
          jobs={rejected}
        />
      </div>
    </div>
  );
}