import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import Heading from "../../componets/Shared/heading/Heading";
import Paragraph from "../../componets/Shared/heading/Paragraph";

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Join EventHive
          </div>
          <Heading className=" font-bold text-gray-900 ">
            Get Started Today
          </Heading>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan smarter. Host better. Join EventHive and transform your events.
          </Paragraph>
        </div>

        {/* Form Center Wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <form
                onSubmit={handleSubmit(handleRegistration)}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Name is required
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Email is required
                    </p>
                  )}
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer"
                  />
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      Photo is required
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
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all bg-gray-50 focus:bg-white"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-emerald-600 transition-colors"
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

                <button className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl mt-2">
                  Create Account
                </button>
              </form>

              <SocialLogin></SocialLogin>

              <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  state={location?.state}
                  to="/login"
                  className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-all"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
