import React, { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../utils/data";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pin from "./Pin";
const Home = () => {
  const [toogleSidebar, setToogleSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const scrollRef = useRef(null);
  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      console.log("fetch : ", user);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize="40px"
            className="cursor-pointer"
            onClick={() => setToogleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 " />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-20 rounded" />
          </Link>
        </div>
        {toogleSidebar && (
          <div className="fixed top-0 w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-center items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToogleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToogleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="user-profile/userId" element={<userProfile />} />
          <Route path="*" element={<Pin user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
