import JobCard from "./JobCard";

export default function JobColumn({
  title,
  jobs,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm w-full md:w-1/3 md:min-w-[300px]">
      <h2 className="font-bold text-xl mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}
      </div>
    </div>
  );
}