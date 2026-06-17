import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../features/auth/authService";
import { getDashboardStats, getRecentActivity } from "../../api/dashboard.api";
import { getJobStats } from "../../api/job.api";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatsCards from "../../components/dashboard/StatsCards";
import ApplicationChart from "../../components/dashboard/ApplicationChart";
import MonthlyActivityChart from "../../components/dashboard/MonthlyActivityChart";
import ResumeInsights from "../../components/dashboard/ResumeInsights";
import AIInsights from "../../components/dashboard/AIInsights";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: getRecentActivity,
  });

  const { data: jobStatsData } = useQuery({
    queryKey: ["jobStats"],
    queryFn: getJobStats,
  });

  const stats = statsData?.stats;
  const activities = activityData?.activities || [];
  const jobStats = jobStatsData?.stats;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Section 1: Hero */}
      <DashboardHero stats={stats} userName={user?.fullName} />

      {/* Section 2: Statistics Cards */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 ml-1">
          Your Overview
        </h2>
        <StatsCards stats={stats} loading={statsLoading} />
      </div>

      {/* Section 3+4: Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationChart stats={jobStats} />
        <MonthlyActivityChart activities={activities} />
      </div>

      {/* Section 5+6: Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeInsights />
        <AIInsights stats={stats} jobStats={jobStats} />
      </div>

      {/* Section 7+8: Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} loading={activityLoading} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
