import React, { useState } from "react";
import secure_image from "../../assets/Adobe Express - file.png";
import { IoIosLock } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { forgetUserDetails } from "../../store/forgetPasswordUserDetails";
import { toast } from "react-toastify";
import summaryApi from "../../common";
import LoginLoader from "../../assets/loaders/signup_login.svg?react";

function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      setLoading(true);
      const dataResponse = await fetch(summaryApi.new_password.url, {
        method: summaryApi.new_password.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: forgetUserDetails.email,
          newPassword: newPassword,
        }),
      });
      setLoading(false);
      const updatedUser = await dataResponse.json();
      if (updatedUser.success) {
        navigate("/login");
        toast.success(updatedUser.message);
      }
      if (!updatedUser.success) {
        toast.error(updatedUser.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="bg-Secondary h-screen flex items-center">
      <div className="bg-Primary min-h-[70%] container mx-auto max-w-[70%] rounded-4xl border-[7px] text-TertiaryText flex gap-20 items-center justify-center">
        <div>
          <img src={secure_image} alt="secure_image" className="w-[30vw]" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="font-medium text-5xl text-PrimaryText">
            Change Password
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-white">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group flex gap-1 items-center border px-2 py-1 rounded-sm focus-within:border-blue-500 transition">
                <IoIosLock />
                <input
                  id="newPassword"
                  type={`${isPasswordVisible ? "text" : "password"}`}
                  className="focus:outline-none w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassword &&
                  (isPasswordVisible ? (
                    <IoMdEyeOff
                      onClick={() => setIsPasswordVisible(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoMdEye
                      onClick={() => setIsPasswordVisible(true)}
                      className="cursor-pointer"
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-group flex gap-1 items-center border px-2 py-1 rounded-sm focus-within:border-blue-500 transition">
                <IoIosLock />
                <input
                  id="confirmPassword"
                  type={`${isConfirmPasswordVisible ? "text" : "password"}`}
                  className="focus:outline-none w-full"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {confirmNewPassword &&
                  (isConfirmPasswordVisible ? (
                    <IoMdEyeOff
                      onClick={() => setIsConfirmPasswordVisible(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoMdEye
                      onClick={() => setIsConfirmPasswordVisible(true)}
                      className="cursor-pointer"
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-white">
            <Link
              to={"/login"}
              className=" font-medium text-center border w-full py-1 rounded-xs cursor-pointer hover:bg-red-500 hover:border-red-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              className="font-medium border w-full py-1 rounded-xs cursor-pointer hover:bg-green-500 hover:border-green-500 transition-colors flex justify-center"
              onClick={handleChangePassword}
            >
              {loading ? (
                <LoginLoader className="h-6 w-auto" />
              ) : (
                <p>Submit</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;
