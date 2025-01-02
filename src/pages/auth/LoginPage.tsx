const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-900 text-gray-300">
  <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
    {/* Page Title */}
    <h1 className="text-2xl font-bold text-white mb-6 text-center">
      Welcome Back
    </h1>

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
          className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
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
          className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-yellow-400 text-gray-900 font-semibold rounded-md shadow hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
      >
        Login
      </button>
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
