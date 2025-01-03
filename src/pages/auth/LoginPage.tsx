const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen text-gray-300">
      <div className="w-full max-w-xl p-8 bg-gray-800 rounded-2xl">
        <div className="">
          <div className="flex items-center justify-center">
            <img
              src="/vite.svg"
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
        <form className="space-y-6">
          {/* Email/Username Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Username/Email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded shadow-sm"
              placeholder="Enter your email or username"
              required
            />
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
              type="password"
              id="password"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-36 py-2 px-4 bg-yellow-400 text-gray-900 font-semibold hover:bg-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-yellow-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
