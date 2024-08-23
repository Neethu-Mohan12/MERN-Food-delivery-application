import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { ToastContainer, toast } from "react-toastify";
import { isProfilePage } from "../../Utils/checkPath"; // Import the utility function

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopClick = () => {
    if (!userInfo) {
      toast.error("Please log in to continue.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname); // Update the path on route change
    if (userInfo) {
      console.log("Current user type:", userInfo.userType);
    }
  }, [userInfo]);

  return (
    <div
      style={{ zIndex: 9999 }}
      className="flex justify-between items-center p-4 text-black bg-gray-200 w-full h-auto md:h-[60px] fixed top-0 left-0"
      id="navigation-container"
    >
      <div className="flex items-center ">
        <i className="fa-solid fa-truck cursor-pointer sm:block hidden lg:text-xl text-orange-600"></i>
        <h1 className="sm:text-xs lg:text-xl font-bold lg:ml-3">Orderly</h1>
      </div>

      <div className="flex sm:space-x-1 lg:space-x-2">
      {isProfilePage(currentPath) && (
          <>
            <Link
              to="/"
              className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500 "
            >
              <AiOutlineHome size={20} className=" sm:text-xl md:text-xl sm:ms-1" />
            </Link>
            </>
            )}
        {!isProfilePage(currentPath) && (
          <>
            <Link
              to="/"
              className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500 sm:text-xs"
            >
              <AiOutlineHome size={20} className=" lg:text-xl sm:text-xl sm:ms-1" />
            </Link>
            {userInfo ? (
              <Link
                to="/shop"
                className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500 sm:text-xs"
              >
                <AiOutlineShopping className="text-lg md:text-xl sm:text-xl ms-3" />
              </Link>
            ) : (
              <div
                onClick={handleShopClick}
                className="flex items-center cursor-pointer transition-transform transform hover:translate-y-2 hover:text-orange-500"
              >
                <AiOutlineShopping className="text-lg sm:text-xl md:text-xl sm:ms-1" />
              </div>
            )}
          </>
        )}
        <ToastContainer />

        {userInfo && userInfo.userType !== "restaurant" && !userInfo.isAdmin && (
          <>
            <Link to="/cart" className="flex relative">
              <div className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500">
                <AiOutlineShoppingCart className="text-lg sm:text-xl md:text-xl sm:ms-1" />
              </div>
              <div className="absolute -top-2 -right-2">
                {cartItems.length > 0 && (
                  <span className="px-1 py-0 text-sm text-white bg-orange-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
            </Link>
          </>
        )}
        {!userInfo && (
          <>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-y-2 sm:text-xs"
            >
              <AiOutlineLogin className="text-lg sm:text-xl ms-4" />
            </Link>
            {/* {/* <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-y-2"
            >
              <AiOutlineUserAdd size={26} />
            </Link> */}
          </>
        )}
      </div>
      {!isProfilePage(currentPath) && (
      <div className="relative flex items-center ">
        {userInfo ? (
          <>
            <button
  onClick={toggleDropdown}
  className="flex items-center text-gray-800 focus:outline-none"
>
  <i className="fas fa-user lg:text-lg sm:text-base"></i>
  <span className="text-black font-bold hidden sm:block">{userInfo.username}</span>


              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 top-12  mt-2 space-y-2 bg-gray-200 text-black">
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Users
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left hover:bg-orange-500"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {userInfo.userType !== "restaurant" && (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left hover:bg-orange-500"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {userInfo.userType === "restaurant" && (
                  <>
                    <li>
                      <Link
                        to="/restaurant/productlist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/restaurant/allproductslist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/restaurant/categorylist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Manage categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/restaurant/restaurantorderlist"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-orange-500"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block w-full px-4 py-2 text-left hover:bg-orange-500"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </>
        ) : (
          <></>
         
        )}
      </div>
      )}
    </div>
  );
};

export default Navigation;

