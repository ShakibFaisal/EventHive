import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  CalendarPlus,
  MapPin,
  Image as ImageIcon,
  Type,
  DollarSign,
  FileText,
  Tag,
  Users,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AddEvent = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const eventData = {
      ...data,
      price: Number(data.price),
      totalSeats: Number(data.totalSeats),
      organizerEmail: user?.email,
      organizerName: user?.displayName,
      organizerPhoto: user?.photoURL,
    };
    console.log(eventData);

    try {
      const res = await axiosSecure.post("/events", eventData);
      // Backend returns the created document with _id
      if (res.data._id) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Event created successfully.",
          icon: "success",
          confirmButtonColor: "#000",
          customClass: { popup: "rounded-2xl", confirmButton: "rounded-xl" },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create event.",
        icon: "error",
        customClass: { popup: "rounded-2xl", confirmButton: "rounded-xl" },
      });
    }
  };

  // Input Style Helper
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50/30 placeholder:text-gray-400 text-sm";
  const labelClass =
    "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to publish your event
          </p>
        </div>
        <div className="bg-black/5 p-3 rounded-xl text-black">
          <CalendarPlus size={24} />
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Event Title</label>
              <div className="relative">
                <Type
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="e.g. Tech Conference 2024"
                  className={`${inputClass} pl-10`}
                />
              </div>
              {errors.title && (
                <span className="text-red-500 text-xs mt-1">
                  Title is required
                </span>
              )}
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <select
                  {...register("category", { required: true })}
                  className={`${inputClass} pl-10`}
                >
                  <option value="">Select Category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Concert">Concert</option>
                  <option value="Sports">Sports</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.category && (
                <span className="text-red-500 text-xs mt-1">
                  Category is required
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Price & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Price ($)</label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="0.00"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Event Date</label>
              <input
                {...register("date", { required: true })}
                type="date"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3: Image URL & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Image URL</label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("image", { required: true })}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("location", { required: true })}
                  type="text"
                  placeholder="e.g. Grand Convention Center, NY"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Row 4: Total Seats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Total Seats</label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("totalSeats", { required: true })}
                  type="number"
                  placeholder="100"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label className={labelClass}>Description</label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3.5 text-gray-400"
                size={16}
              />
              <textarea
                {...register("description", { required: true })}
                rows="4"
                placeholder="Write a detailed description about the event..."
                className={`${inputClass} pl-10`}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CalendarPlus size={18} />
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
