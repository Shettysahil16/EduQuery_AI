import React from "react";
import loginImage from "../assets/login_page_final.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../Context/Auth/useAuth";
import summaryApi from "../common";
import LoginLoader from "../assets/loaders/signup_login.svg?react";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { fetchAuthUserDetails } = useAuth();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataResponse = await fetch(summaryApi.login.url, {
        method: summaryApi.login.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userData = await dataResponse.json();

      if (userData.success) {
        toast.success(userData.message);
        fetchAuthUserDetails();
        navigate("/");
      } else if (userData.error) {
        toast.error(userData.message);
      }
    } catch (error) {
      toast.error("An error occurred while loging.");
      console.log("error in login", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-20 bg-Secondary">
      <div className="w-full h-16 flex justify-between px-6 items-center font-semibold text-PrimaryText text-xs">
        <div className="text-lg md:text-2xl">EduQuery AI</div>
        <div className="flex gap-8">
          <div className="relative">
            <span className="relative z-10">LOG IN</span>
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-Quaternary rounded-md"></span>
          </div>
          <Link to={"/signup"} className="cursor-pointer">
            SIGN UP
          </Link>
        </div>
      </div>
      <div className="container mx-10 w-full max-w-xs md:max-w-3xl  lg:max-w-4xl xl:max-w-6xl bg-Primary text-TertiaryText rounded-4xl border-[7px] flex flex-col md:flex-row md:justify-center md:gap-15 p-4 mb-0 lg:mb-3 xl:mb-0">
        <div className="flex justify-center items-end md:items-center xl:items-start">
          <img
            src={loginImage}
            alt="image"
            className="w-[37vw] h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-[70%] text-PrimaryText pt-0 mt-2 md:mt-0 md:pt-16 flex flex-col gap-3 md:gap-6">
          <div className="md:flex xs:text-xl sm:text-3xl text-center md:text-start md:text-5xl lg:text-6xl font-semibold">
            WELCOME BACK!
          </div>
          <form className="md:mt-4" onSubmit={handleSubmitUserData}>
            <div className="flex flex-col gap-2 md:gap-4 text-white">
              <div className="text-xs md:text-xl flex flex-col gap-1">
                <label className="font-medium">E-mail :-</label>
                <div className="w-full bg-white rounded-xs py-2 text-slate-900 font-medium">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full px-2 outline-none"
                    placeholder="johndoe@gmail.com"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="text-xs md:text-xl flex flex-col gap-1">
                <label className="font-medium">Password :-</label>
                <div className="w-full bg-white rounded-xs py-2 text-slate-900 font-medium flex items-center">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full px-2 outline-none"
                    placeholder="johndoe11"
                    disabled={loading}
                  />

                  <div
                    className="flex text-2xl px-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {data.password &&
                      (showPassword ? (
                        <IoMdEyeOff className="text-QuinaryText" />
                      ) : (
                        <IoMdEye className="text-QuinaryText" />
                      ))}
                  </div>
                </div>
                <Link to={'/foget-password'} className="w-fit ml-auto font-normal text-sm md:text-lg cursor-pointer hover:underline">
                  forget password?
                </Link>
              </div>
              <div
                onClick={handleSubmitUserData}
                className={`h-14 ${
                  loading ? "bg-Denary" : "bg-Secondary"
                } text-PrimaryText text-center text-md md:text-2xl  font-medium rounded-sm mt-3 md:mt-8 mb-2 md:mb-0 cursor-pointer flex justify-center items-center`}
              >
                {loading ? (
                  <LoginLoader className="h-auto w-12" />
                ) : (
                  <p>Login</p>
                )}
              </div>
              <div className="flex justify-center font-medium gap-1 md:gap-2 text-[10px] lg:text-base mt-4 pb-4">
                <p>DON’T HAVE AN ACCOUNT?</p>
                <Link
                  to={"/signup"}
                  className={`text-PrimaryText font-medium transition-all ${loading ? "pointer-events-none opacity-50 cursor-not-allowed": "cursor-pointer hover:scale-105"}`}>
                  CREATE AN ACCOUNT
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
