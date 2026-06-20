import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap, Zap, Star, Calendar, Building2, BookOpen, Wand2 } from "lucide-react";
import { useResumeDetails } from "@/features/resume/useResumeDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { analyzeResume } from "@/api/resume.api";
import { toast } from "sonner";

// ─── ATS Score Ring ──────────────────────────────────────────────────────────
function ATSRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? "#52C41A" : score >= 50 ? "#FFB86B" : "#FF6B6B";
  const label =
    score >= 75 ? "Excellent" : score >= 50 ? "Good" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64" cy="64" r={radius}
            fill="none" stroke="#F0EBE8" strokeWidth="10"
          />
          <circle
            cx="64" cy="64" r={radius}
            fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">{score}</span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
      <span
        className="text-sm font-semibold px-3 py-1 rounded-full"
        style={{ background: `${color}20`, color }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, color }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
  );
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────
function SkillPill({ skill }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#B692FF]/30 bg-[#B692FF]/10 text-[#7C5CBF] hover:bg-[#B692FF]/20 transition-colors cursor-default">
      {skill}
    </span>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp, index }) {
  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#FF6B6B] border-2 border-white shadow-md" />
      {/* Vertical line */}
      <div className="absolute left-[6px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B6B]/30 to-transparent" />

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-800">{exp.role || "Unknown Role"}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 size={13} className="text-gray-400" />
              <span className="text-sm text-gray-500">{exp.company || "Unknown Company"}</span>
            </div>
          </div>
          {(exp.startDate || exp.endDate) && (
            <div className="flex items-center gap-1.5 bg-[#FF6B6B]/10 text-[#FF6B6B] px-3 py-1 rounded-full text-xs font-medium">
              <Calendar size={11} />
              {exp.startDate} – {exp.endDate || "Present"}
            </div>
          )}
        </div>
        {exp.description && (
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{exp.description}</p>
        )}
      </div>
    </div>
  );
}

// ─── Education Card ───────────────────────────────────────────────────────────
function EducationCard({ edu }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-800">{edu.degree || "Degree"}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <BookOpen size={13} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              {edu.institution || "Institution"}
              {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}
            </span>
          </div>
        </div>
        {(edu.startDate || edu.endDate) && (
          <div className="flex items-center gap-1.5 bg-[#52C41A]/10 text-[#52C41A] px-3 py-1 rounded-full text-xs font-medium">
            <Calendar size={11} />
            {edu.startDate} – {edu.endDate || "Present"}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty Section Placeholder ─────────────────────────────────────────────────
function EmptySection({ message }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200">
      <p className="text-sm text-gray-400">{message}</p>
      <p className="text-xs text-gray-300 mt-1">Run ATS analysis to extract this data</p>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-2xl w-48" />
      <div className="bg-white rounded-3xl p-8 h-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-3xl p-6 h-32" />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useResumeDetails(id);

  const analyzeMutation = useMutation({
    mutationFn: () => analyzeResume(id),
    onSuccess: () => {
      toast.success("Resume analyzed successfully!");
      queryClient.invalidateQueries(["resume", id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to analyze resume");
    }
  });

  if (isLoading) return <LoadingSkeleton />;

  const resume = data?.resume;

  if (!resume) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Resume not found.</p>
      </div>
    );
  }

  const skills = resume.skills || [];
  const experience = resume.experience || [];
  const education = resume.education || [];
  const hasAI = skills.length > 0 || experience.length > 0 || education.length > 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Resume Center
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center">
              <Star size={26} className="text-[#FF6B6B]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{resume.title}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{resume.originalFileName}</p>
              <p className="text-xs text-gray-300 mt-0.5">
                Uploaded {new Date(resume.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ATSRing score={resume.atsScore || 0} />
            <button
              onClick={() => analyzeMutation.mutate()}
              disabled={analyzeMutation.isPending}
              className="flex items-center gap-2 btn-primary py-2 px-4 rounded-xl text-sm font-semibold shadow-md disabled:opacity-50"
            >
              {analyzeMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <>
                  <Wand2 size={16} />
                  Calculate ATS Score
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Skills", value: skills.length, color: "#B692FF" },
            { label: "Experience", value: experience.length, color: "#FF6B6B" },
            { label: "Education", value: education.length, color: "#52C41A" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 text-center"
              style={{ background: `${color}10` }}
            >
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {!hasAI && (
          <div className="mt-4 flex items-center gap-2 bg-[#FFB86B]/10 text-[#c97d00] text-sm px-4 py-3 rounded-2xl border border-[#FFB86B]/30">
            <Zap size={15} />
            <span>AI extraction is running in the background. Refresh in a moment to see skills, experience & education.</span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <SectionHeader icon={Zap} title="Skills" color="#B692FF" />
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => <SkillPill key={i} skill={skill} />)}
          </div>
        ) : (
          <EmptySection message="No skills extracted yet" />
        )}
      </div>

      {/* Experience */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <SectionHeader icon={Briefcase} title="Work Experience" color="#FF6B6B" />
        {experience.length > 0 ? (
          <div className="space-y-1">
            {experience.map((exp, i) => <ExperienceCard key={i} exp={exp} index={i} />)}
          </div>
        ) : (
          <EmptySection message="No experience entries extracted yet" />
        )}
      </div>

      {/* Education */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
        <SectionHeader icon={GraduationCap} title="Education" color="#52C41A" />
        {education.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, i) => <EducationCard key={i} edu={edu} />)}
          </div>
        ) : (
          <EmptySection message="No education entries extracted yet" />
        )}
      </div>
    </div>
  );
}
