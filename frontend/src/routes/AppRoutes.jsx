import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ResumeCenter from "../pages/resume/ResumeCenter";
import ResumeDetails from "../pages/resume/ResumeDetails";

import ProtectedRoutes from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected pages — all share the sidebar layout */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume-center" element={<ResumeCenter />} />
            <Route path="/resume/:id" element={<ResumeDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
