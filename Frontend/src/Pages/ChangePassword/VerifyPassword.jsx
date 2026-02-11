import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verify_password from "../../assets/verify_password-removebg-preview.png";
import { toast } from "react-toastify";
import { forgetUserDetails } from "../../store/forgetPasswordUserDetails";
import summaryApi from "../../common";
import LoginLoader from "../../assets/loaders/signup_login.svg?react";

function VerifyPassword() {
  const [verifyCode, setVerifyCode] = useState("");
  //console.log("verificationEmail", verificationEmail);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(2 * 60);

  const handleOnChange = (e) => {
    setVerifyCode(() => e.target.value);
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataResponse = await fetch(summaryApi.verify_password.url, {
      method: summaryApi.verify_password.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        otp: verifyCode,
      }),
    });
    setLoading(false);
    const verifiedEmail = await dataResponse.json();
    //console.log("verifiedEmail", verifiedEmail.data.email);

    if (verifiedEmail.success) {
      navigate("/new-password");
      toast.success(verifiedEmail.message);
    }
    if (!verifiedEmail.success) {
      toast.error(verifiedEmail.message);
    }
  };

  const handleResendVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responseData = await fetch(summaryApi.forget_password.url, {
      method: summaryApi.forget_password.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: forgetUserDetails.email,
      }),
    });
    setLoading(false);
    const otpEmail = await responseData.json();
    //console.log(otpEmail.data);

    if (otpEmail.success) {
      toast.success(otpEmail.message);
    }
    if (!otpEmail.success) {
      toast.error(otpEmail.message);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="h-screen w-full bg-Secondary flex items-center">
      <div className="bg-Primary rounded-4xl border-[7px] text-TertiaryText py-4 container mx-auto max-w-[50%] flex flex-col items-center">
        <div>
          <img
            src={verify_password}
            alt="verify_password_image"
            className="ml-25 w-2xl"
          />
        </div>
        <div className="flex flex-col gap-4 -mt-15">
          <div className="flex flex-col gap-2">
            <h2 className="text-PrimaryText text-center text-3xl font-medium">
              Enter your code
            </h2>
          </div>
          <div>
            <h4 className="text-sm text-white mt-5 mb-1">
              We sent a 6-digit OTP to you gmail {forgetUserDetails.email}
            </h4>
            <div className="input-group flex items-center border border-white rounded-sm py-1 text-white">
              <input
                type="number"
                placeholder="OTP"
                className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:outline-none px-2"
                onChange={handleOnChange}
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
              />
              <button
                className="px-2 ml-auto cursor-pointer text-sm"
                onClick={handleResendVerificationCode}
                disabled={timeLeft > 0}
                style={{
                  cursor: timeLeft > 0 ? "not-allowed" : "pointer",
                  opacity: timeLeft > 0 ? 0.5 : 1,
                }}
              >
                Resend
              </button>
            </div>
            <div className="text-slate-300 text-sm font-medium w-fit ml-auto pr-2 flex gap-0.5">
              {minutes} <p>:</p> {seconds}
            </div>
          </div>
          <div></div>
          <div className="text-center text-white ">
            <button
              className={`${loading ? 'py-1' : 'py-2'} border border-white w-full rounded-sm cursor-pointer flex justify-center`}
              onClick={handleSubmitCode}
            >
              {loading ? (
                <LoginLoader className="h-8 w-auto" />
              ) : (
                <p>Continue</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPassword;
