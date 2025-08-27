import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/oidc/authenticate/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
  <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    
    {/* Header with subtle background */}
    <div className="bg-gray-50 p-5 border-b border-gray-100 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 border border-gray-200">
          <img
            src="/logo.png"  // <-- replace with your logo path
            alt="App Logo"
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Dev Assets Manager</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your assets smartly</p>
      </div>
    </div>

    {/* Form Container */}
    <div className="p-6">
      <h2 className="text-lg font-medium text-center text-gray-700 mb-5">
        Welcome back
      </h2>

      {/* Email & Password form in one row */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-gray-600 text-xs font-medium mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-gray-600 text-xs font-medium mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="h-3 w-3 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-blue-500 hover:text-blue-700 transition">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-5">
        <hr className="flex-grow border-gray-200" />
        <span className="px-2 text-gray-400 text-xs">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Continue with Google */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700 font-medium"
      >
        <FcGoogle className="text-lg" />
        <span>Continue with Google</span>
      </button>

      {/* Sign up link */}
      <div className="text-center mt-5 text-xs text-gray-500">
        Need an Account?{" "}
        <a href="#" className="text-blue-500 font-medium hover:text-blue-700 transition">
          Contanct Admin
        </a>
      </div>
    </div>
  </div>
</div>
    );
  };
