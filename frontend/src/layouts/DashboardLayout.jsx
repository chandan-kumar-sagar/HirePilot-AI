import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/ui/Footer";

import {
  FileText,
  Briefcase,
  Users,
  Mail,
  Target,
  LayoutDashboard,
  Bot,
  Sparkles,
  LogOut,
  Menu,
  X,
  ScanSearch,
  User,
  ArrowLeft
} from "lucide-react";
import useAuthStore from "../features/auth/authService";
import { removeToken } from "../services/token.service";
import ThemeToggle from "../components/ThemeToggle";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Resumes", path: "/resume-center" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: Users, label: "Interviews", path: "/interviews" },
  { icon: Mail, label: "Cover Letters", path: "/cover-letters" },
  { icon: ScanSearch, label: "Job Matches", path: "/job-matches" },
  { icon: Bot, label: "Career Coach", path: "/career-coach" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const firstName = user?.fullName?.split(" ")[0] || "User";

  const handleLogout = () => {
    removeToken();
    logout();
    navigate("/login");
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-200">
      {/* ── Mobile Header ─────────────────────────────────────── */}
      <header className="md:hidden flex items-center justify-between p-4 bg-card shadow-sm z-20 relative transition-colors duration-200 border-b border-border">
        <div className="flex items-center gap-2">
          {location.pathname !== "/dashboard" ? (
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-muted text-muted-foreground hover:bg-accent/10 transition-colors mr-1"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.svg" alt="HirePilot-AI" className="w-full h-full object-contain" />
            </div>
          )}
          <span className="text-lg font-bold text-foreground animate-gradient-text">
            {location.pathname !== "/dashboard" ? "Back" : "HirePilot-AI"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent/10 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile Sidebar Overlay ─────────────────────────────────────── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={closeSidebar}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 flex flex-col p-6 shadow-lg z-50 transform transition-all duration-300 ease-in-out md:translate-x-0 bg-card border-r border-border ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between gap-2 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/logo.svg" alt="HirePilot-AI" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold text-foreground animate-gradient-text">
              HirePilot-AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-border pt-4 mt-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-primary-foreground text-sm bg-primary shadow-sm">
              {firstName[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">
                {user?.fullName}
              </p>
              <p className="text-xs truncate text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg w-full transition-all text-destructive hover:bg-destructive/10"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Page Content ─────────────────────────────────────── */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 w-full overflow-x-hidden min-h-screen bg-background transition-colors duration-200 flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
