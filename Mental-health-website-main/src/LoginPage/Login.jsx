import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http } from "../config/Axios";

import eye from "../assets/eye.png";
import view from "../assets/view.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await http.post("/user/login", data);
      toast.success(response.data.message);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#bcccdc] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-[10px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-black shadow-md">
        <h1 className="text-2xl text-center">
          Welcome back. Your well-being
          <p className="text-2xl">starts here.</p>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[5px]"
        >
          <Input
            type="text"
            className="border rounded-[10px] w-full h-[40px] p-2 mt-4"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border rounded-[10px] w-full h-[40px] p-2 mt-4"
              id="password"
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
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="bg-[#f6ca56] mt-10 w-[300px] h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-[#828d98] mt-5">
          Don't have an account?{" "}
          <Link className="text-black font-semibold" to="/signup">
            Signup
          </Link>
        </p>
        <hr className="w-[340px] border-black mt-5 border-[1px]" />
        <button className="flex items-center justify-center gap-3 bg-[#f6ca56] mt-5 w-full h-[40px] rounded-[10px] text-black px-4 py-2 hover:bg-amber-300 hover:shadow-lg transition duration-300">
          Continue with{" "}
          <img src="google.webp" alt="Google" className="w-5 h-5" />
        </button>
        <a href="/forgotPw" className="font-bold hover:underline mt-5">
          Forgot password?
        </a>{" "}
      </div>
    </div>
  );
};

export default Login;
