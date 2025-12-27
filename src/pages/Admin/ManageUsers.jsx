import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaUserTie } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // ১. সব ইউজার ডাটা নিয়ে আসা
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ২. ম্যানেজার বানানোর ফাংশন
  const handleMakeManager = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} will be promoted to Manager!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Promote!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/make-manager/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: `${user.name} is now a Manager!`,
              icon: "success",
              confirmButtonColor: "#000",
            });
          }
        });
      }
    });
  };

  // ৩. ইউজার ডিলিট করার ফাংশন (Optional)
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              confirmButtonColor: "#000",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Manage Users</h1>
          <p className="text-gray-600 font-bold mt-1">
            Total Users: {users.length}
          </p>
        </div>

        {/* Stat Badge */}
        <div className="bg-yellow-100 px-6 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg">
          <span className="font-bold text-yellow-800">
            🔔 Pending Requests:{" "}
            {users.filter((u) => u.status === "requested").length}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-100 text-black font-black uppercase text-sm border-b-2 border-black">
            <tr>
              <th className="py-4 pl-6">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <th className="pl-6 font-bold">{index + 1}</th>

                {/* Name */}
                <td>
                  <div className="font-bold text-gray-700">{user.name}</div>
                </td>

                {/* Email */}
                <td className="font-mono text-sm text-gray-600">
                  {user.email}
                </td>

                {/* Role Badge */}
                <td>
                  {user.role === "admin" ? (
                    <span className="flex items-center gap-1 font-bold text-red-600 bg-red-100 px-2 py-1 rounded w-fit border border-red-200">
                      <FaUserShield /> Admin
                    </span>
                  ) : user.role === "manager" ? (
                    <span className="flex items-center gap-1 font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded w-fit border border-blue-200">
                      <FaUserTie /> Manager
                    </span>
                  ) : (
                    <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded w-fit border border-green-200">
                      User
                    </span>
                  )}
                </td>

                {/* Status / Request Check */}
                <td>
                  {user.status === "requested" ? (
                    <span className="animate-pulse font-black text-xs bg-yellow-300 text-black px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      REQUESTED!
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs font-bold">
                      Verified
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="flex justify-center gap-3 py-4">
                  {/* Make Manager Button */}
                  {user.role === "manager" ? (
                    <button
                      disabled
                      className="btn btn-sm btn-disabled bg-gray-200 text-gray-400 border border-gray-300"
                    >
                      Manager
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeManager(user)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                      title="Promote to Manager"
                    >
                      <FaUserTie /> Make Manager
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
