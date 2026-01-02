import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import summaryApi from "../common";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.userLogout.url, {
        method: summaryApi.userLogout.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const logout = await response.json();

      if (logout.success) {
        toast.success(logout.message);
        dispatch(clearUserDetails());
        navigate("/login");
      }

      if (logout.error) {
        toast.error(logout.message);
      }
    } catch (error) {
      toast.error("An error occurred while loging out.");
      console.log("error in logout", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-400/30 backdrop-blur-xs h-full w-full fixed inset-0 z-10 flex justify-center items-center">
      <div className="bg-white w-[80%] md:w-3xl mx-auto h-[20%] text-black relative shadow-md rounded text-xl md:text-3xl">
        <div className="h-full">
          <div className="w-fit ml-auto">
            <button
              className="px-1 py-1 hover:text-red-500 cursor-pointer"
              onClick={onClose}
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="px-4 font-medium">
            Are you sure? do you want to logout
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-6">
          <button
            onClick={onClose}
            className="border-2 px-7 py-2 rounded-sm cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="border-2 px-7 py-2 rounded-sm cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
