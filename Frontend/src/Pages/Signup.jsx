import React, { useState } from "react";
import signupImage from "../assets/signup_page.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import summaryApi from "../common";
import LoginLoader from "../assets/loaders/signup_login.svg?react";

const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      setLoading(true);
      try {
        const dataResponse = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const userData = await dataResponse.json();
        setLoading(false);

        if (userData.success) {
          toast.success(userData.message);
          navigate("/login");
        } else if (userData.error) {
          toast.error(userData.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while signing up.");
        console.log("error in signup", error);
      }
    } else {
      toast.error("Passwords do not match.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-20 bg-Secondary">
      <div className="w-full h-16 flex justify-between px-6 items-center font-semibold text-PrimaryText text-xs">
        <div className="text-lg md:text-2xl">EduQuery AI</div>
        <div className="flex gap-8">
          <Link to={"/login"} className="cursor-pointer">
            LOG IN
          </Link>
          <div className="relative">
            <span className="relative z-10">SIGN UP</span>
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-Quaternary rounded-md"></span>
          </div>
        </div>
      </div>
      <div className="container mx-10 w-full max-w-xs md:max-w-3xl  lg:max-w-4xl xl:max-w-6xl bg-Primary text-TertiaryText rounded-4xl border-[7px] flex flex-col md:flex-row md:justify-center md:gap-15 p-4 mb-0 lg:mb-3 xl:mb-0">
        <div className="flex justify-center items-end md:items-center">
          <img
            src={signupImage}
            alt="image"
            className="w-[40vw] h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-[70%] text-PrimaryText pt-0 -mt-3 md:mt-0 md:pt-6 flex flex-col gap-3 md:gap-6">
          <div className="md:flex xs:text-2xl sm:text-3xl text-center md:text-5xl lg:text-6xl font-semibold">
            REGISTRATION!
          </div>
          <form className="md:mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 md:gap-4 text-white">
              <div className="text-xs md:text-xl flex flex-col gap-1">
                <label className="font-medium">Full Name :-</label>
                <div className="w-full bg-white rounded-xs py-2 text-slate-900 font-medium">
                  <input
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleOnChange}
                    className="w-full px-2 outline-none disabled:cursor-no-drop"
                    placeholder="john doe"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="text-xs md:text-xl flex flex-col gap-1">
                <label className="font-medium">E-mail :-</label>
                <div className="w-full bg-white rounded-xs py-2 text-slate-900 font-medium">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full px-2 outline-none disabled:cursor-no-drop"
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
                    className="w-full px-2 outline-none disabled:cursor-no-drop"
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
              </div>
              <div className="text-xs md:text-xl flex flex-col gap-1">
                <label className="font-medium">Confirm Password :-</label>
                <div className="w-full bg-white rounded-xs py-2 text-slate-900 font-medium flex items-center">
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    className="w-full px-2 outline-none disabled:cursor-no-drop"
                    placeholder="johndoe11"
                    disabled={loading}
                  />

                  <div
                    className="flex text-2xl px-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {data.confirmPassword &&
                      (showConfirmPassword ? (
                        <IoMdEyeOff className="text-QuinaryText" />
                      ) : (
                        <IoMdEye className="text-QuinaryText" />
                      ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="h-14 bg-Secondary text-PrimaryText text-center text-md md:text-2xl py-2 font-medium rounded-sm mt-3 md:mt-6 mb-2 md:mb-0 cursor-pointer flex justify-center items-center"
              >
                {loading ? (
                  <LoginLoader className="h-auto w-12" />
                ) : (
                  <p>Sign up</p>
                )}
              </button>
              <div className="flex justify-center font-normal gap-1 -mt-2 text-sm lg:text-base">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  className={`text-PrimaryText font-medium transition-all ${loading ? "pointer-events-none opacity-50 cursor-not-allowed": "cursor-pointer hover:scale-105"}`}>
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

//sm:w-[45vw] md:w-[25vw] sm:h-[25vh] md:h-[35vw]
