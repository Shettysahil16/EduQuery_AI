import React from "react";
import forget_password from "../../assets/Forgot-Password_try.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
//import Spinner from "../components/Spinner";
import { setForgetUserDetails } from "../../store/forgetPasswordUserDetails";
import summaryApi from "../../common";
import LoginLoader from "../../assets/loaders/signup_login.svg?react";

function ForgetPassword() {
  const [verificationEmail, setVerificationEmail] = useState();
  //console.log("verificationEmail", verificationEmail);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setVerificationEmail(() => e.target.value);
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responseData = await fetch(
      summaryApi.forget_password.url,
      {
        method: summaryApi.forget_password.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: verificationEmail,
        }),
      }
    );
    setLoading(false);
    const otpEmail = await responseData.json();
    //console.log(otpEmail.data);
    
    if (otpEmail.success) {
      navigate("/verify-password");
      toast.success(otpEmail.message);
      setForgetUserDetails(otpEmail.data);
    }
    if (!otpEmail.success) {
      toast.error(otpEmail.message);
    }
  };
  return (
    <div>
      <div className="bg-Secondary h-screen flex justify-center items-center">
        <div className="bg-Primary min-h-[70%] max-w-[70%] flex justify-center w-full p-2 gap-40 rounded-4xl text-TertiaryText border-[7px]">
          <div className="w-[30%]">
            <img
              src={forget_password}
              alt="forget_password"
              className="h-[15vh] sm:h-[40vh] md:h-[60vh]"
            />
          </div>
          <div className="mt-15 h-full text-white p-2">
            <div className="flex flex-col gap-6">
              <h2 className="font-medium text-PrimaryText text-5xl mb-2">Forgot Password</h2>
              <p className="text-sm text-slate-200 font-medium">
                Enter your email and we'll send you a verification code to reset
                your password
              </p>
            </div>
            <div className="bg-slate-300 p-2 rounded mt-2 text-black">
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                required
                value={verificationEmail}
                placeholder="Enter email"
                className="outline-none h-full w-full bg-transparent p-1 placeholder-black"
              />
            </div>
            <div className="flex flex-col mt-12 gap-5">
              <button
                className={`${loading ? "bg-green-700 py-1" : "bg-green-500 py-4"} flex justify-center  rounded-sm text-white cursor-pointer text-center`}
                onClick={handleOnClick}
                disabled={!verificationEmail}
                style={{
                  opacity: !verificationEmail ? 0.5 : 1,
                  cursor: !verificationEmail ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <LoginLoader className="h-12 w-auto" />
                ) : (
                  <p>Submit</p>
                )}
              </button>
              <Link
                to={"/login"}
                className="flex items-center justify-center gap-2 mx-auto cursor-pointer mb-5"
              >
                <p className="font-bold text-2xl">&lt; </p>
                <p className="text-sm mt-1">Back to Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
