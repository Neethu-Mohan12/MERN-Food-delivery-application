import React from "react";

function Footer() {
  return (
    <div className="p-4 z-50 bottom-0 flex flex-col justify-center items-center bg-orange-500 backdrop-blur">
      <div className="flex justify-center items-center text-white text-xs space-x-6 mb-2">
        <h1 className="text font-bold">About us</h1>
        <h1 className="text font-bold">Contact us</h1>
        <h1 className="text font-bold">Help & Support</h1>
      </div>
      <div className="text-sm text-white">
      <i className="fa-brands fa-instagram cursor-pointer me-2"></i>
      <i className="fa-brands fa-facebook cursor-pointer me-2"></i>
      <i className="fa-brands fa-twitter cursor-pointer me-2"></i>
      </div>
      <div>
        <p className="text-white text-xs">@2024 All right reserved</p>
      </div>
    </div>
  );
}

export default Footer;
