import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { forgetPassword } from "../../services/employee/authServices";

const ForgotPasswordForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");

  const requestOTPMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess(email);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to send OTP");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    requestOTPMutation.mutate({ email });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={requestOTPMutation.isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {requestOTPMutation.isPending ? (
            "Sending OTP..."
          ) : (
            <>
              Send OTP
              <FiArrowRight className="ml-2" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        We'll send a verification code to your email
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
