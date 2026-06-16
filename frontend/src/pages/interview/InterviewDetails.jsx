import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInterviewById } from "@/api/interview.api";
import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

// Friendly display names for category keys
const CATEGORY_LABELS = {
  nodejs: "Node.js",
  javascript: "JavaScript",
  react: "React",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  systemDesign: "System Design",
  behavioral: "Behavioral",
  llm: "LLM / AI",
  hld: "High Level Design (HLD)",
  lld: "Low Level Design (LLD)",
  deployments: "Deployments & DevOps",
  hrRound: "HR Round",
};

// Rotating color themes for each category card
const COLOR_THEMES = [
  {
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-500",
    text: "text-violet-700",
    count: "bg-violet-100 text-violet-600",
    dot: "🟣",
    divider: "border-violet-100",
    numBg: "bg-violet-500",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-500",
    text: "text-emerald-700",
    count: "bg-emerald-100 text-emerald-600",
    dot: "🟢",
    divider: "border-emerald-100",
    numBg: "bg-emerald-500",
  },
  {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-500",
    text: "text-orange-700",
    count: "bg-orange-100 text-orange-600",
    dot: "🟠",
    divider: "border-orange-100",
    numBg: "bg-orange-500",
  },
  {
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-500",
    text: "text-sky-700",
    count: "bg-sky-100 text-sky-600",
    dot: "🔵",
    divider: "border-sky-100",
    numBg: "bg-sky-500",
  },
  {
    bg: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-500",
    text: "text-pink-700",
    count: "bg-pink-100 text-pink-600",
    dot: "🩷",
    divider: "border-pink-100",
    numBg: "bg-pink-500",
  },
  {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-400",
    text: "text-yellow-700",
    count: "bg-yellow-100 text-yellow-600",
    dot: "🟡",
    divider: "border-yellow-100",
    numBg: "bg-yellow-400",
  },
  {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-500",
    text: "text-red-700",
    count: "bg-red-100 text-red-600",
    dot: "🔴",
    divider: "border-red-100",
    numBg: "bg-red-500",
  },
  {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    badge: "bg-indigo-500",
    text: "text-indigo-700",
    count: "bg-indigo-100 text-indigo-600",
    dot: "🟤",
    divider: "border-indigo-100",
    numBg: "bg-indigo-500",
  },
  {
    bg: "bg-teal-50",
    border: "border-teal-200",
    badge: "bg-teal-500",
    text: "text-teal-700",
    count: "bg-teal-100 text-teal-600",
    dot: "🩵",
    divider: "border-teal-100",
    numBg: "bg-teal-500",
  },
  {
    bg: "bg-lime-50",
    border: "border-lime-200",
    badge: "bg-lime-500",
    text: "text-lime-700",
    count: "bg-lime-100 text-lime-600",
    dot: "🟩",
    divider: "border-lime-100",
    numBg: "bg-lime-500",
  },
];

function CategoryCard({ category, questions, theme, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border-2 ${theme.border} ${theme.bg} overflow-hidden transition-all duration-300`}
    >
      {/* Card Header — always visible */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          {/* Colored dot emoji */}
          <span className="text-2xl leading-none">{theme.dot}</span>

          <div>
            <h2 className={`text-xl font-bold ${theme.text}`}>
              {CATEGORY_LABELS[category] || category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <span
              className={`inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full ${theme.count}`}
            >
              {questions.length} Questions
            </span>
          </div>
        </div>

        <span className={`${theme.text} transition-transform duration-200`}>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {/* Expandable Questions List */}
      {expanded && (
        <div className={`border-t-2 ${theme.divider} px-6 py-4 space-y-3`}>
          {questions.map((question, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span
                className={`mt-0.5 min-w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold text-white ${theme.numBg}`}
              >
                {i + 1}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed">{question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InterviewDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewById(id),
  });

  const interview = data?.interview;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading questions...
      </div>
    );
  }

  if (!interview) return null;

  const categories = Object.entries(interview.categories || {}).filter(
    ([, qs]) => Array.isArray(qs) && qs.length > 0
  );

  const totalQuestions = categories.reduce((acc, [, qs]) => acc + qs.length, 0);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to="/interviews"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Interviews
      </Link>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Interview Questions</h1>
        <p className="text-gray-500 mt-2">
          {interview.resume?.title || "Resume Based Questions"} —{" "}
          <span className="font-semibold text-gray-700">
            {totalQuestions} questions across {categories.length} topics
          </span>
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4">
        {categories.map(([category, questions], index) => (
          <CategoryCard
            key={category}
            category={category}
            questions={questions}
            theme={COLOR_THEMES[index % COLOR_THEMES.length]}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}