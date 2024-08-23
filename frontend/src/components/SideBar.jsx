import React from 'react';

const SideBar = ({ setView, logoutHandler, isAdmin, userType }) => {
  const commonLinks = [
    { name: "EDIT PROFILE", view: "edit" }
  ];

  const adminLinks = [
    { name: "Dashboard", view: "admin_dashboard" },
    { name: "Users", view: "admin_users" },
    { name: "Orders", view: "admin_orders" }
  ];

  const RestaurantLinks = [
    { name: "Products", view: "restaurant_products" },
    { name: "All Orders", view: "restaurant_orders" },
    { name: "All Products", view: "restaurant_allproducts" },
    { name: "categories", view: "restaurant_categories" }
  ];

  return (
    <div className='flex flex-col -mt-2 lg:w-60  p-5  lg:fixed lg:h-full lg:overflow-y-auto lg:p-5 bg-gray-200'>
      {commonLinks.map((link) => (
        <div
          key={link.name}
          className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
          onClick={() => setView(link.view)}
        >
          {link.name}
        </div>
      ))}
      {userType === 'user' && !isAdmin && (
        <>
        <div
          className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
          onClick={() => setView('order')}
        >
          MY ORDERS
        </div>
         <div
         className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
         onClick={() => setView('favourite')}
       >
         FAVOURITES
       </div>
        <div
        className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
        onClick={() => setView('cart')}
      >
        CART
      </div>
      </>
      )}
      {isAdmin && adminLinks.map((link) => (
        <div
          key={link.name}
          className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
          onClick={() => setView(link.view)}
        >
          {link.name}
        </div>
      ))}
      {userType === 'restaurant' && RestaurantLinks.map((link) => (
        <div
          key={link.name}
          className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 mb-2 rounded-md mt-7 uppercase'
          onClick={() => setView(link.view)}
        >
          {link.name}
        </div>
      ))}
      <div 
        className='cursor-pointer hover:bg-orange-400 hover:text-white p-2 rounded-md mt-5 mb-7 uppercase'
        onClick={logoutHandler}
      >
        LOGOUT
      </div>
    </div>
  );
};

export default SideBar;