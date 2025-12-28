import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

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
    <div className="max-w-6xl mx-auto py-40">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-secondary font-semibold">
          Welcome Back!
        </h1>
        <p className="text-xl text-base-content mt-8">
          Log in to manage your events and bookings.
        </p>
      </div>

      {/* Centered Form */}
      <div className="flex justify-center">
        <div className="card w-full max-w-xl shadow-2xl bg-base-300 p-10">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label text-base-content">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full bg-base-100"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}

                {/* Password */}
                <label className="label text-base-content mt-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    })}
                    className="input input-bordered w-full bg-base-100"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must be include uppercase, lowercase letters
                  </p>
                )}

                <div className="text-right mt-2">
                  <span
                    onClick={handleForgetPassword}
                    className="link link-hover"
                  >
                    Forgot password?
                  </span>
                </div>

                <button className="btn btn-primary w-full mt-6">Login</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>

            <p className="py-4 text-center">
              New to EventHive?{' '}
              <Link
                state={location?.state}
                to="/register"
                className="text-[#80ba21] underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
