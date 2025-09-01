import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiKey, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { verifyOtp } from "../../services/employee/authServices";

const VerifyOTPForm = ({ email, onSuccess, onBack }) => {
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      onSuccess(data.access);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Invalid OTP");
    },
  });

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Join all digits to form the complete OTP
    setOtp(newOtpDigits.join(""));

    // Auto-focus to next input
    if (value && index < 6) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    verifyOTPMutation.mutate({ email, otp });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <button onClick={onBack} className="flex items-center text-blue-500 mb-4">
        <FiArrowLeft className="mr-1" />
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Verify OTP
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Enter the 6-digit code sent to {email}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={verifyOTPMutation.isPending || otp.length !== 6}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {verifyOTPMutation.isPending ? (
            "Verifying..."
          ) : (
            <>
              Verify OTP
              <FiArrowRight className="ml-2" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Didn't receive the code? Check your spam folder or request a new one.
      </p>
    </div>
  );
};

export default VerifyOTPForm;
