import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
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

import Features from "../pages/public/Features";
import Pricing from "../pages/public/Pricing";
import Testimonials from "../pages/public/Testimonials";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsOfService from "../pages/public/TermsOfService";
import CookiePolicy from "../pages/public/CookiePolicy";
import ContactUs from "../pages/public/ContactUs";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public pages */}
        <Route element={<MainLayout />}>
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

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
