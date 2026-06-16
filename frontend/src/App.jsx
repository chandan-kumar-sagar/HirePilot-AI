import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { getToken } from "./services/token.service";
import { getProfile } from "./api/auth.api";
import useAuthStore from "./features/auth/authService";
import { Toaster } from "sonner";

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData.user || userData);
        } catch (error) {
          console.error("Auto login failed:", error);
          // Optional: clear token if it's invalid
          // import { removeToken } from "./services/token.service";
          // removeToken();
        }
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, [setUser]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}
