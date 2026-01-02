import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import Heading from "../../componets/Shared/heading/Heading";
import Paragraph from "../../componets/Shared/heading/Paragraph";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, forgetPass } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  const handleForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      inputValidator: (value) => {
        if (!value) {
          return "Email is required";
        }
      },
    });

    if (!email) return;

    try {
      await forgetPass(email);

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Check your inbox for the password reset link.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.message || "Could not send reset email",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            Secure Login
          </div>
          <Heading className=" font-black text-gray-900 ">
            Welcome Back!
          </Heading>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Log in to manage your events and bookings seamlessly.
          </Paragraph>
        </div>

        {/* Centered Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Email is required
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                      })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-200 transition-all bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-lime-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {errors.password?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Password must be at least 6 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Password must include uppercase and lowercase letters
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span
                    onClick={handleForgetPassword}
                    className="text-sm font-semibold text-lime-600 hover:text-lime-700 cursor-pointer hover:underline transition-all"
                  >
                    Forgot password?
                  </span>
                </div>

                <button className="w-full py-3.5 px-6 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                  Login to Account
                </button>
              </form>

              <SocialLogin></SocialLogin>

              <p className="text-center text-gray-600 mt-6">
                New to EventHive?{" "}
                <Link
                  state={location?.state}
                  to="/register"
                  className="text-lime-600 font-bold hover:text-lime-700 hover:underline transition-all"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
