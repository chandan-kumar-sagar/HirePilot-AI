import { useQuery } from "@tanstack/react-query";
import { FileText, Briefcase, Users, Mail, ScanSearch } from "lucide-react";
import { getJobStats } from "@/api/job.api";
import { useResumes } from "@/features/resume/useResume";
import { useCoverLetters } from "@/hooks/useCoverLetter";
import { useJobMatches } from "@/hooks/useJobMatch";
import api from "@/api/axios";

export default function ProfileStats() {
  const { data: resumesData } = useResumes();
  const { data: coverLettersData } = useCoverLetters();
  const { data: jobMatchesData } = useJobMatches();
  
  const { data: jobStatsData } = useQuery({
    queryKey: ["jobStats"],
    queryFn: getJobStats,
  });

  const { data: interviewData } = useQuery({
    queryKey: ["interviewsCount"],
    queryFn: async () => {
      const res = await api.get("/interview");
      return res.data;
    }
  });

  const stats = [
    {
      label: "Resumes Created",
      value: resumesData?.resumes?.length || 0,
      icon: FileText,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      label: "Applications",
      value: jobStatsData?.stats?.applied || 0,
      icon: Briefcase,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      label: "Interview Sets",
      value: interviewData?.interviews?.length || 0,
      icon: Users,
      color: "text-orange-500 dark:text-orange-400",
      bg: "bg-orange-500/10"
    },
    {
      label: "Cover Letters",
      value: coverLettersData?.coverLetters?.length || 0,
      icon: Mail,
      color: "text-pink-500 dark:text-pink-400",
      bg: "bg-pink-500/10"
    },
    {
      label: "Job Matches",
      value: jobMatchesData?.jobMatches?.length || 0,
      icon: ScanSearch,
      color: "text-green-500 dark:text-green-400",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <div className="bg-card text-card-foreground rounded-3xl p-6 sm:p-8 shadow-sm border border-border">
      <h2 className="text-xl font-bold mb-6">Activity Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-sm transition">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
