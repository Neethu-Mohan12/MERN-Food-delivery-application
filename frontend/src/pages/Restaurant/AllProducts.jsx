import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import RestaurantMenu from "./RestaurantMenu";
import Navigation from "../Auth/Navigation";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
    <Navigation/>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4">
            <div className="text-xl font-bold mb-4 text-center">
              All Products ({products.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 ">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/restaurant/product/update/${product._id}`}
                  className="block bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between mb-2">
                        <h5 className="text-xl font-semibold">{product.name}</h5>
                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {product.description.substring(0, 160)}...
                      </p>

                      {/* <div className="flex justify-between items-center"> */}
                      <p className="ml-10 my-4">₹ {product.price}</p>
                        <Link
                          to={`/restaurant/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                     
                      {/* </div> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 mt-4 md:mt-0">
            <RestaurantMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;



