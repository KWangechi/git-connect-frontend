import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/zodSchema";
import { LoginCredentials } from "../../utils/types";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const { login, loading } = useAuth();

  const handleLogin = async (data: LoginCredentials) => {
    await login(data);
  };

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="w-full max-w-xl p-8 bg-[rgba(34,51,29,0.9)] rounded-2xl">
        <div className="">
          <div className="flex items-center justify-center">
            <img
              src="/git_connect_logo.png"
              alt="Git Connect"
              className="h-8 w-auto"
            />
          </div>
        </div>
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Email/Username Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Username/Email
            </label>
            <input
              {...register("emailAddress")}
              type="text"
              id="email"
              name="emailAddress"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your email or username"
              required
            />
            <p className="text-red-500 pt-1">{errors.emailAddress?.message}</p>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Enter your password"
              required
            />
            <p className="text-red-500 pt-1">{errors.password?.message}</p>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-36 py-2 px-4 bg-[#E6AF2E] text-gray-900 font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition rounded"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="text-lg text-gray-900">Login</span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#E6AF2E] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
