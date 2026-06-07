import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FileText,
  Briefcase,
  Users,
  Mail,
  Target,
  Bell,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  ChevronRight,
  LayoutDashboard,
  Bot,
} from "lucide-react";
import useAuthStore from "../features/auth/authService";
import { removeToken } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { getDashboardStats, getRecentActivity } from "../api/dashboard.api";

// --- Animated Counter Component ---
function AnimatedCounter({ value, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!value) return;
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

// --- Typewriter Component ---
function Typewriter({ texts, speed = 80, pause = 2000 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplayed(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setIdx((i) => (i + 1) % texts.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// --- Activity Icon ---
function ActivityIcon({ type }) {
  const map = {
    Resume: { icon: FileText, color: "var(--primary)" },
    Application: { icon: Briefcase, color: "var(--accent)" },
    "Cover Letter": { icon: Mail, color: "var(--purple)" },
    "Job Match": { icon: Target, color: "var(--secondary)" },
  };
  const item = map[type] || { icon: Bell, color: "var(--subtext)" };
  const Icon = item.icon;
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: item.color + "22" }}
    >
      <Icon size={16} style={{ color: item.color }} />
    </div>
  );
}

// --- Stat Card ---
function StatCard({ label, value, icon: Icon, color, loading }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
      style={{ background: "var(--card)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--subtext)" }}>
          {label}
        </span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + "22" }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div className="text-4xl font-bold" style={{ color: "var(--text)" }}>
        {loading ? (
          <div className="h-10 w-16 rounded-lg animate-pulse" style={{ background: "#eee" }} />
        ) : (
          <AnimatedCounter value={value || 0} />
        )}
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: "var(--accent)" }}>
        <TrendingUp size={12} />
        <span>All time</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: getRecentActivity,
  });

  const stats = statsData?.stats;
  const activities = activityData?.activities || [];

  const statCards = [
    {
      label: "Resumes",
      value: stats?.resumes,
      icon: FileText,
      color: "var(--primary)",
    },
    {
      label: "Applications",
      value: stats?.applications,
      icon: Briefcase,
      color: "var(--accent)",
    },
    {
      label: "Interviews",
      value: stats?.interviews,
      icon: Users,
      color: "var(--purple)",
    },
    {
      label: "Cover Letters",
      value: stats?.coverLetters,
      icon: Mail,
      color: "var(--pink)",
    },
    {
      label: "Job Matches",
      value: stats?.jobMatches,
      icon: Target,
      color: "var(--secondary)",
    },
  ];

  const handleLogout = () => {
    removeToken();
    logout();
    navigate("/login");
  };

  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full w-64 flex flex-col p-6 shadow-lg z-10"
        style={{ background: "var(--card)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary)" }}
          >
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: "var(--text)" }}>
            AI Career OS
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FileText, label: "Resumes" },
            { icon: Briefcase, label: "Applications" },
            { icon: Users, label: "Interviews" },
            { icon: Mail, label: "Cover Letters" },
            { icon: Target, label: "Job Matches" },
            { icon: Bot, label: "Career Coach" },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left"
              style={{
                background: active ? "var(--primary)" : "transparent",
                color: active ? "#fff" : "var(--subtext)",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "var(--background)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t pt-4" style={{ borderColor: "#f0e8e0" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "var(--primary)" }}
            >
              {firstName[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
                {user?.fullName}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--subtext)" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg w-full transition-all hover:bg-red-50"
            style={{ color: "var(--primary)" }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Hero Header */}
        <div
          className="rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--pink))",
          }}
        >
          {/* Abstract blobs */}
          <div
            className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20"
            style={{
              background: "white",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute right-16 bottom-0 w-40 h-40 rounded-full opacity-10"
            style={{
              background: "white",
              transform: "translateY(40%)",
            }}
          />

          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hello, {firstName}!
            </h1>
            <p className="text-white/90 text-lg font-medium h-7">
              <Typewriter
                texts={[
                  "Ready to land your dream job?",
                  "Your AI career assistant is here.",
                  "Let's optimize your resume today!",
                  "Track your applications smarter.",
                  "Crush your next interview!",
                ]}
              />
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <h2
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--subtext)" }}
        >
          Your Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} loading={statsLoading} />
          ))}
        </div>

        {/* Bottom Grid: Activity + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div
            className="lg:col-span-2 rounded-2xl p-6 shadow-sm"
            style={{ background: "var(--card)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-base" style={{ color: "var(--text)" }}>
                Recent Activity
              </h3>
              <button
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--primary)" }}
              >
                View all <ChevronRight size={14} />
              </button>
            </div>

            {activityLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "var(--background)" }}
                >
                  <Clock size={28} style={{ color: "var(--subtext)" }} />
                </div>
                <p className="font-medium" style={{ color: "var(--text)" }}>
                  No activity yet
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--subtext)" }}>
                  Start by uploading your first resume!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--background)] cursor-pointer"
                  >
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--subtext)" }}>
                        {item.type} •{" "}
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--subtext)" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{ background: "var(--card)" }}
          >
            <h3 className="font-semibold text-base mb-5" style={{ color: "var(--text)" }}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: FileText,
                  label: "Upload Resume",
                  sub: "Analyze with AI",
                  color: "var(--primary)",
                },
                {
                  icon: Briefcase,
                  label: "Track Application",
                  sub: "Add a new job",
                  color: "var(--accent)",
                },
                {
                  icon: Mail,
                  label: "Generate Cover Letter",
                  sub: "AI-powered",
                  color: "var(--purple)",
                },
                {
                  icon: Target,
                  label: "Find Job Matches",
                  sub: "Smart matching",
                  color: "var(--secondary)",
                },
                {
                  icon: Bot,
                  label: "Career Coach",
                  sub: "Ask AI anything",
                  color: "var(--pink)",
                },
              ].map(({ icon: Icon, label, sub, color }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--background)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 4px 16px ${color}33`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: color + "22" }}
                  >
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--subtext)" }}>
                      {sub}
                    </p>
                  </div>
                  <ChevronRight size={14} className="ml-auto" style={{ color: "var(--subtext)" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}