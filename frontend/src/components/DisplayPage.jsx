import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../src/components/SideBar";
import Profile from "../pages/User/Profile";
import Orders from "../pages/Orders/Order";
import AdminDashboard from '../pages/Admin/AdminDashboard';
import OrderList from "../pages/Admin/OrderList";
import UserList from '../pages/Admin/UserList';
import ProductList from '../pages/Admin/ProductList';
import RestaurantOrderList from '../pages/Restaurant/RestaurantOrderList';
import AllProducts from '../pages/Restaurant/AllProducts';


import { useLogoutMutation, useProfileMutation } from '../../../frontend/src/redux/api/usersApiSlice';
import { setCredentials, logout } from '../../../frontend/src/redux/features/auth/authSlice';
import Loader from './Loader';// Import the Loader component
import CategoryList from '../pages/Admin/CategoryList';
import UserOrder from '../pages/User/UserOrder';
import ProfileNavigation from './ProfileNavigation';
import Favorites from '../pages/Products/Favorites';
import Cart from '../pages/Cart';

const DisplayPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState('default');
  const [logoutApiCall] = useLogoutMutation();
  const [profileApiCall] = useProfileMutation();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileApiCall().unwrap();
        dispatch(setCredentials(profileData));
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    if (!userInfo) {
      fetchProfile();
    } else {
      setLoading(false); // Set loading to false if userInfo is already available
    }
  }, [profileApiCall, dispatch, userInfo]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'edit':
        return <Profile />;
      case 'order':
        return <UserOrder/>;
        case 'favourite':
          return <Favorites/>;
          case 'cart':
            return <Cart/>;
      case 'orders':
        return <Orders />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      case 'admin_users':
        return <UserList />;
      case 'admin_orders':
        return <OrderList />;
      case 'restaurant_products':
        return <ProductList />;
      case 'restaurant_orders':
        return <RestaurantOrderList />;
      case 'restaurant_allproducts':
        return <AllProducts />;
      case 'restaurant_categories':
        return <CategoryList />;
      default:
       return (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90%] max-w-[90%] sm:max-w-[200px] md:max-w-[450px] lg:max-w-[500px] rounded bg-orange-300 bg-opacity-80 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
    <h1 className="font-light mb-4 text-center text-sm sm:text-xl md:text-2xl lg:text-3xl">YOUR FAVOURITE FOOD AT YOUR DOORSTEP</h1>
    <h1 className="text-xs sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-600 mb-4 md:mb-6 lg:mb-8 text-center">Welcome, {userInfo?.username}</h1>
    <div className="mb-2 md:mb-4 text-center text-sm lg:text-xl">
      <label className="font-semibold">Name:</label>
      <span className="ml-2">{userInfo?.username}</span>
    </div>
    <div className="mb-2 md:mb-4 text-center text-sm lg:text-xl">
      <label className="font-semibold">Email:</label>
      <span className="ml-2">{userInfo?.email}</span>
    </div>
  </div>
);

    }
  };

  return (
    <>
    <ProfileNavigation/>
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-60 w-full text-black ">
        <SideBar 
          setView={setView} 
          logoutHandler={logoutHandler} 
          isAdmin={userInfo?.isAdmin} 
          userType={userInfo?.userType} 
        />
      </div>
      <div className="flex-1 relative h-full">
        {loading ? (
          <Loader/> // Show loader while fetching data
        ) : (
          <>
            {view === 'default' && (
              <img 
                src="../images/bg2.jpg" 
                alt="image" 
                className="h-full w-full object-cover"
              />
            )}
            <div className=''>
            {renderContent()}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default DisplayPage;