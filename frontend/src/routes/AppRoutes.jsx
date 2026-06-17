import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import JobTracker from "../pages/jobs/JobTracker";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ResumeCenter from "../pages/resume/ResumeCenter";
import ResumeDetails from "../pages/resume/ResumeDetails";
import InterviewPrep from "../pages/interview/InterviewPrep";
import InterviewDetails from "../pages/interview/InterviewDetails";
import CoverLetters from "../pages/CoverLetters";
import JobMatch from "../pages/jobMatch/JobMatch";
import CareerCoach from "../pages/careerCoach/CareerCoach";
import Profile from "../pages/profile/Profile";

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
            <Route path="/interviews" element={<InterviewPrep />} />
            <Route path="/interviews/:id" element={<InterviewDetails />} />
            <Route path="/jobs" element={<JobTracker />} />
            <Route path="/cover-letters" element={<CoverLetters />} />
            <Route path="/job-matches" element={<JobMatch />} />
            <Route path="/career-coach" element={<CareerCoach />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
