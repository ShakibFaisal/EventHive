import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUserEP, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1. Firebase user create
      await createUserEP(data.email, data.password);

      // 2. Upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Firebase profile update
      await updateUser(data.name, photoURL);

      // 4. SAVE USER IN MONGODB
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL,
        role: "user",
        status: "verified",
      };

      await axios.post(
        "https://event-hive-server-team.vercel.app/users",
        userInfo
      );

      // 5. Navigate
      navigate(location?.state || "/", { replace: true });
    } catch (error) {
      let message = "Something went wrong";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered";
      } else if (error.code === "auth/weak-password") {
        message = "Password is too weak";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address";
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-40">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-secondary font-semibold">
          Get in touch <br /> with us in seconds
        </h1>
        <p className="text-xl text-base-content mt-8">
          Plan smarter. Host better. Join EventHive today.
        </p>
      </div>

      {/* Form Center Wrapper */}
      <div className="flex justify-center">
        <div className="card w-full max-w-xl shadow-2xl bg-base-300 p-10">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset">
                {/* Name */}
                <label className="label text-base-content">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full bg-base-100
"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}

                {/* Email */}
                <label className="label text-base-content mt-2">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full bg-base-100
"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}

                {/* Photo */}
                <label className="label text-base-content mt-2">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full bg-base-100
"
                />
                {errors.photo && (
                  <p className="text-red-500">Photo is required</p>
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
                    className="input input-bordered w-full bg-base-100
"
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

                <button className="btn btn-primary mt-6">Register</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>

            <p className="py-4 text-center">
              Already have an account?{' '}
              <Link
                state={location?.state}
                to="/login"
                className="text-[#80ba21] underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
