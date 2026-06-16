import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
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
  X
} from "lucide-react";
import useAuthStore from "../features/auth/authService";
import { removeToken } from "../services/token.service";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Resumes", path: "/resume-center" },
  { icon: Target, label: "Jobs", path: "/jobs" },
  { icon: Briefcase, label: "Applications", path: "/applications" },
  { icon: Users, label: "Interviews", path: "/interviews" },
  { icon: Mail, label: "Cover Letters", path: "/cover-letters" },
  { icon: Target, label: "Job Matches", path: "/job-matches" },
  { icon: Bot, label: "Career Coach", path: "/career-coach" },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const firstName = user?.fullName?.split(" ")[0] || "User";

  const handleLogout = () => {
    removeToken();
    logout();
    navigate("/login");
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--background)" }}>
      {/* ── Mobile Header ─────────────────────────────────────── */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm z-20 relative">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary)" }}
          >
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: "var(--text)" }}>
            AI Career OS
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* ── Mobile Sidebar Overlay ─────────────────────────────────────── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 flex flex-col p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "var(--card)" }}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between gap-2 mb-10">
          <div className="flex items-center gap-2">
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
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-gray-800"
            onClick={closeSidebar}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left ${
                  isActive ? "text-white" : "hover:bg-[var(--background)]"
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "#fff" : "var(--subtext)",
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t pt-4 mt-2" style={{ borderColor: "#f0e8e0" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "var(--primary)" }}
            >
              {firstName[0]?.toUpperCase()}
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

      {/* ── Page Content ─────────────────────────────────────── */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 w-full overflow-x-hidden min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
