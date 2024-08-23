import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import Footer from "../components/Footer";
import Navigation from "./Auth/Navigation";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleUsernameClick = (username) => {
    const productsByUsername = filteredProductsQuery.data?.filter(
      (product) => product.username === username
    );
    dispatch(setProducts(productsByUsername));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueUsername = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.username)
          .filter((username) => username !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="bg-orange-400 p-3 mt-2 mb-2 md:w-1/4">
            <h2 className="h4 text-center py-2 bg-orange-700 rounded-full mb-2">
              Filter by Categories
            </h2>
            <div className="p-5 w-full">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="h4 text-center py-2 bg-orange-700 rounded-full mb-2">
              Filter by Restaurant
            </h2>
            <div className="p-5 w-full">
              {uniqueUsername?.map((username) => (
                <div key={username} className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id={username}
                    name="username"
                    onChange={() => handleUsernameClick(username)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={username}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {username}
                  </label>
                </div>
              ))}
            </div>
            <h2 className="h4 text-center py-2 bg-orange-700 rounded-full mb-2">
              Filter by Price
            </h2>
            <div className="p-5 w-full">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full my-4 bg-orange-950 text-white hover:bg-black hover:text-yellow-300"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3 md:w-3/4">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;

