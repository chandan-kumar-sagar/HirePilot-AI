import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../schemas/auth.schema";
import { registerUser } from "../api/auth.api";
import { setToken } from "../services/token.service";
import useAuthStore from "../features/auth/authService";

export default function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Backend returns { success, token, user } on registration
      if (data.token) {
        setToken(data.token);
      }
      setUser(data.user || data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Create Account</h1>
        <p className="text-muted-foreground">Start your AI career journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            className="form-input"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

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

        {registerMutation.isError && (
          <p className="text-red-500 text-sm">
            {registerMutation.error?.response?.data?.message ||
              "Failed to register"}
          </p>
        )}

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="btn-primary w-full mt-4"
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:text-accent font-semibold transition-colors">
          Login
        </Link>
      </p>
    </div>
  );
}
