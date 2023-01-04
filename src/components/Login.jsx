import React from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {client} from '../client'
const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (response) => {
    const token = response.credential;

    const user_decode = jwt_decode(token);

    localStorage.setItem("user", JSON.stringify(user_decode));

    const { name, picture, sub } = user_decode;

    const doc  = { 
      _id : sub,
      _type : 'user',
      userName : name,
      image : picture
    }

    client.createIfNotExists(doc).then(() => {
      navigate('/',{replace : true})
    })

  };

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
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                responseGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
            {/* <button className="bg-mainColor flex justify-center items-center rounded p-3 outline-none cursor-pointer opacity-90 hover:opacity-100 duration-150">
              <FcGoogle className="mr-4" />
              Sign In With
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
