import React from "react";
import { NavLink } from "react-router-dom";

const SignUpOption = () => {
  return (
    <div className="pt-16 flex justify-center px-4 bg-[#bcccdc] py-12 min-h-screen overflow-auto">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-10 md:p-16 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Who Are You Logging In As?</h2>
          <p className="pt-4 text-base text-gray-700">
            One platform. Two paths. Choose yours to continue
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <NavLink to="/signup">
            <button
              type="submit"
              className="w-full bg-button1 py-3 rounded-md font-medium hover:opacity-70 transition"
            >
              User
            </button>
          </NavLink>
          <NavLink to="/signup2">
            <button
              type="submit"
              className="w-full bg-button1 py-3 rounded-md font-medium hover:opacity-70 transition"
            >
              * Consultant
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpOption;
