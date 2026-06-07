import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../features/auth/authService";

export default function ProtectedRoutes() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}