import { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyOTPForm from "./VerifyOTPForm";
import ResetPasswordForm from "./ResetPasswordForm";

const ForgotPasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState("request");
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleOTPSuccess = (userEmail) => {
    setEmail(userEmail);
    setCurrentStep("verify");
  };

  const handleVerifySuccess = (token) => {
    setAccessToken(token);
    setCurrentStep("reset");
  };

  const handleResetSuccess = () => {
    setCurrentStep("success");
  };

  const handleBackToRequest = () => {
    setCurrentStep("request");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      {currentStep === "request" && (
        <ForgotPasswordForm onSuccess={handleOTPSuccess} />
      )}

      {currentStep === "verify" && (
        <VerifyOTPForm
          email={email}
          onSuccess={handleVerifySuccess}
          onBack={handleBackToRequest}
        />
      )}

      {currentStep === "reset" && (
        <ResetPasswordForm
          accessToken={accessToken}
          onSuccess={handleResetSuccess}
        />
      )}

      {currentStep === "success" && (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your password has been changed successfully.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordFlow;
