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
    <div className="justify-center bg-[#bcccdc] flex w-full gap-[10px] h-[673px] mt-[5rem]">
      <ToastContainer />
      <div className="lg:absolute lg:mt-10 lg:h-[563px] lg:w-[400px] rounded-[10px] flex flex-col items-center justify-center lg:bg-white text-black">
        <h1 className="text-2xl text-center">
          Create an account
          <p className="text-2xl">Join us today.</p>
        </h1>

        <form
          onSubmit={handleSubmit(sendDataToApi)}
          className="flex flex-col gap-[5px]"
        >
          {/* Username Field */}
          <Input
            type="text"
            className="border-[1px] rounded-[10px] w-[300px] h-[40px] p-2 mt-4"
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

          {/* Email Field */}
          <Input
            type="email"
            className="border-[1px] rounded-[10px] w-[300px] h-[40px] p-2 mt-4"
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

          {/* Password Field */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border-[1px] rounded-[10px] w-[300px] h-[40px] p-2 mt-4"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#f6ca56] mt-10 w-[300px] h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
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

        <hr className="w-[340px] border-black mt-10 border-[1px]" />

        <button className="bg-[#f6ca56] mt-10 w-[300px] h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
