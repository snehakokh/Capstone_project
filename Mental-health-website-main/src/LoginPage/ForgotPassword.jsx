import React from "react";

const ForgotPassword = () => {
  return (
    <div
      className="min-h-screen flex justify-center px-4 pt-50 pb-20 overflow-y-auto"
      style={{ backgroundColor: "#c3d1e3" }}
    >
      <div className="rounded-lg w-full max-w-lg bg-white shadow-md p-14 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Forgot your password <br />
          </h2>
          <p className="pt-5">
            Please enter the email address you'd like your password reset
            information sent to
          </p>
        </div>
        {/* Form */}
        <form className="space-y-4 flex flex-col gap-6">
          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              placeholder="Enter Username"
              className="w-full px-4 py-2 border border-gray-200 bg-gray-200 rounded-b-sm focus:outline-none focus:ring-2 focus:ring-button1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-button1 py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
