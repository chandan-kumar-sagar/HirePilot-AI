import ResumeCard from "./ResumeCard";

export default function ResumeGrid({ resumes, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} onDelete={onDelete} />
      ))}
    </div>
  );
}
