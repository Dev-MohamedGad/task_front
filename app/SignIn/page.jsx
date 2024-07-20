"use client";
import Image from "next/image";

import logo from "../../public/logo.png";
import illustration from "../../public/illustration.png";
import { useState } from "react";
import { sendOTP, verifyOTP } from "../login";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignIn() {
  // state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");

  const router = useRouter();

  // Handle send Otp
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    toast.promise(sendOTP("+2" + phoneNumber), {
      loading: "Sending OTP...",
      success: (result) => {
        setConfirmationResult(result);
        return "OTP sent successfully!";
      },
      error: "Failed to send OTP. Please try again.",
    });
  };

  // Handle Verify Otp
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    toast
      .promise(verifyOTP(confirmationResult, otp), {
        loading: "Verifying OTP...",
        success: "OTP verified successfully!",
        error:
          "Failed to verify OTP. The code might have expired. Please request a new OTP.",
      })
      .then(() => router.replace("/home"));
  };
  return (
    <>
      <Toaster />

      <div className="flex justify-center max-md:text-center items-center h-screen w-screen">
        <div className="w-1/2 h-1/2 max-md:flex-col max-md:justify-center">
          <Image src={logo} width={122.34} height={144.75} alt="Logo" />
          <h1 className="font-bold text-[35px] pt-5">Welcome!</h1>
          <p className="text-gray-500">
            Enter the authentication code we sent at*******896
          </p>
          {confirmationResult ? (
            <form onSubmit={handleVerifyOTP}>
              <input
                className=" border-2 max-md:w-full block mt-9 transition duration-1000 outline-yellow-400 p-2 w-1/2 rounded-md "
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <button
                className="border max-md:w-full border-yellow-500 py-4 w-1/2 rounded-lg mt-10 hover:bg-yellow-500 hover:text-white transition-all duration-500"
                type="submit"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendOTP}>
              <div id="recaptcha-container"></div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number "
                className=" border-2 max-md:w-full block mt-9 transition duration-1000 outline-yellow-400 p-2 w-1/2 rounded-md "
              />
              <button
                type="submit"
                className="border w-1/2 border-yellow-500 py-4 max-md:w-full rounded-lg mt-10 hover:bg-yellow-500 hover:text-white transition-all duration-500"
              >
                Send Code
              </button>
            </form>
          )}
        </div>
        <Image
          className="max-md:hidden"
          src={illustration}
          width={233.33}
          height={200}
          alt="Photo"
        />
      </div>
    </>
  );
}
