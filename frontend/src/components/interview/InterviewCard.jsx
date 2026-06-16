import { Link }
  from "react-router-dom";

export default function InterviewCard({ interview }) {
  const totalQuestions = Object.values(interview.categories || {}).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0),
    0
  );

  return (
    <Link
      to={`/interviews/${interview._id}`}
    >

      <div
        className="
        bg-white
        rounded-3xl
        p-6
        border
        hover:shadow-xl
        transition
      "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-2
        "
        >
          AI Interview
        </h2>

        <p className="text-gray-500">
          {interview.resume?.title || "Resume Based Questions"}
        </p>

        <div className="mt-4">

          <span
            className="
            bg-purple-100
            text-purple-600
            px-3
            py-1
            rounded-full
          "
          >
            {totalQuestions} Questions
          </span>

        </div>

      </div>

    </Link>
  );
}