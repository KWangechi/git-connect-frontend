import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../utils/zodSchema";
import { User } from "../../utils/types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "@/state-management/auth";

const Register = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const handleRegister = async (data: User) => {
    await registerUser(data);
  };

  return (
    <div className="flex items-center justify-center h-screen text-gray-300 overflow-auto">
      <div className="w-full max-w-xl p-8 bg-gray-800 rounded-2xl">
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
          Welcome to Git Connect
        </h2>

        {/* Login Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Firstname Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-400"
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              id="firstname"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your firstname"
              required
            />
            <p className="text-red-500 pt-1">{errors.firstName?.message}</p>
          </div>

          {/* Lastname Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-400"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              id="lastname"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your lastname"
              required
            />
            <p className="text-red-500 pt-1">{errors.lastName?.message}</p>
          </div>

          {/* Username*/}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your username"
              required
            />
            <p className="text-red-500 pt-1">{errors.username?.message}</p>
          </div>

          {/* Email*/}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email Address
            </label>
            <input
              {...register("emailAddress")}
              type="text"
              id="email"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your email"
              required
            />
            <p className="text-red-500 pt-1">{errors.emailAddress?.message}</p>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Enter your password"
              required
            />
            <p className="text-red-500 pt-1">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirm_password"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Password Confirmation"
              required
            />
            <p className="text-red-500 pt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-36 py-2 px-4 bg-yellow-400 text-gray-900 font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="register" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
