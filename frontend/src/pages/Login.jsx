import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../schemas/auth.schema";
import { loginUser } from "../api/auth.api";
import { setToken } from "../services/token.service";
import useAuthStore from "../features/auth/authService";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Assuming the API returns { token, user } or similar
      if (data.token) {
        setToken(data.token);
      }
      setUser(data.user || data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-6">Login to your AI Job OS</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm">
            {loginMutation.error?.response?.data?.message || "Failed to login"}
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-[var(--primary)] hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
