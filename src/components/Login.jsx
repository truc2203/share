import React from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
const Login = () => {
  return (
    <div className="flex items-start justify-start flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay">
          <div className="p-5 ">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl ">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>

            </GoogleOAuthProvider>
            <button className="bg-mainColor flex justify-center items-center rounded p-3 outline-none cursor-pointer opacity-90 hover:opacity-100 duration-150">
              <FcGoogle className="mr-4" />
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
