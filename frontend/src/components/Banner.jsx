
import React from 'react';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat min-h-screen md:h-auto flex items-center" style={{ backgroundImage: `url('./images/b.jpg')` }}>
      <div className="flex flex-col md:flex-row justify-between items-start p-8 md:p-24 gap-8 w-full">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4">
            Your <span className='text-orange-500'>Favourite</span>
          </h1>
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4">Food at your</h1>
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-4 text-orange-500">Doorstep</h1>
          <p className="mb-4 text-lg md:text-xl">
            Discover the best food delivery service in town. Order your favorite meals from a variety of restaurants and enjoy quick and reliable delivery.
          </p>
          <div className="flex flex-col md:flex-row items-center w-full md:w-6/8 space-y-4 md:space-y-0">
            <Link
              to="/shop"
              className="bg-orange-500 font-bold rounded-full py-2 px-10"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 justify-center items-center gap-4">
          <img src="./images/img1.jpg" alt="Delicious food 1" className="w-1/2  rounded-lg" />
          <img src="./images/img2.jpg" alt="Delicious food 2" className="w-1/3  rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
