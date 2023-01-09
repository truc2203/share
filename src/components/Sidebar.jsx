import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
const Sidebar = ({ user, closeToggle }) => {
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-bold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize";

  const categories = [
    { name: "Animals" },
    { name: "Wallpaers" },
    { name: "Photography" },
    { name: "Gaming" },
    { name: "Coding" },
    { name: "Orthers" },
  ];

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-row justify-between bg-white overflow-y-scroll min-w-210 hide-scrollbar h-screen">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-[60%]" />
        </Link>
        <div className="flex flex-col gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-lg">
            Discovery Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 gap-2 px-5 items-end h-full bg-white"
          onClick={handleCloseSidebar}
        >
          <div className="flex items-center gap-2">
          <img
            src={user.image}
            alt="user-profile"
            className="w-10 h-10 rounded-full"
          />
          <p className="font-semibold">{user.userName}</p>
          </div>
        </Link>
      )}
      </div>
      
    </div>
  );
};

export default Sidebar;
