
import { useState, useEffect } from "react";
import {
  AiOutlineHome,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfileNavigation = () => {

  const navigate = useNavigate();

  
  return (
    <div
      style={{ zIndex: 9999 }}
      className="flex justify-between items-center p-4 text-black bg-gray-200 w-full h-auto md:h-[60px] fixed top-0 left-0"
      id="navigation-container"
    >
      <div className="flex items-center ">
        <i className="fa-solid fa-truck cursor-pointer sm:text-sm lg:text-xl text-orange-600"></i>
        <h1 className="sm:text-xs lg:text-xl font-bold lg:ml-3">Orderly</h1>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500"
        >
          <AiOutlineHome className="text-xl" />
        </Link>
    </div>
    </div>
      
  );
};

export default ProfileNavigation;