import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  CalendarPlus,
  MapPin,
  Image as ImageIcon,
  Type,
  DollarSign,
  FileText,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddEvent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const eventData = {
      ...data,
      organizerEmail: user?.email,
      organizerName: user?.displayName,
      organizerPhoto: user?.photoURL,
    };
    console.log(eventData);

    try {
      const res = await axiosSecure.post("/events", eventData);
      if (res.data.insertedId) {
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
          {/* Row 1: Name & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Event Name</label>
              <div className="relative">
                <Type
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="e.g. Tech Conference 2024"
                  className={`${inputClass} pl-10`}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  Name is required
                </span>
              )}
            </div>

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
          </div>

          {/* Row 2: Image URL & Date */}
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
              <label className={labelClass}>Event Date</label>
              <input
                {...register("date", { required: true })}
                type="date"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3: Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className={labelClass}>Total Seats</label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={16}
                />
                <input
                  {...register("totalSeats", { required: true })}
                  type="number"
                  placeholder="10/20"
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
