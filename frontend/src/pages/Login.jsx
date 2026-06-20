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
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">Login to your AI Job OS</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="form-input"
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
            className="form-input"
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
          className="btn-primary w-full mt-4"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:text-accent font-semibold transition-colors">
          Register
        </Link>
      </p>
    </div>
  );
}
