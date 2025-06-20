import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import eye from "../assets/eye.png";
import view from "../assets/view.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const sendDataToApi = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "User created successfully");
        reset();
      } else {
        toast.error(resData.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating user");
    }
  };

  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-[10px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-black shadow-md">
        <h1 className="text-2xl text-center font-semibold">
          Create an account
          <p className="text-2xl mt-1">Join us today.</p>
        </h1>

        <form
          onSubmit={handleSubmit(sendDataToApi)}
          className="flex flex-col w-full gap-3 mt-6"
        >
          <Input
            type="text"
            className="border rounded-[10px] w-full h-[40px] p-2"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <Input
            type="email"
            className="border rounded-[10px] w-full h-[40px] p-2"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border rounded-[10px] w-full h-[40px] p-2"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={handlePasswordVisibility}
            >
              <img
                className="w-6"
                src={showPassword ? view : eye}
                alt="Toggle Password"
              />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="bg-[#f6ca56] mt-6 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-[#828d98] mt-5">
          Already have an account?{" "}
          <Link className="text-black font-semibold" to="/login">
            Login
          </Link>
        </p>

        <hr className="w-full border-black mt-8 border-[1px]" />

        <button className="bg-[#f6ca56] mt-5 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
