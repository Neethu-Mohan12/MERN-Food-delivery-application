
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navigation from "./Auth/Navigation";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  if (isError) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
    <Navigation/>
      <Banner />
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error?.message || "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl md:text-5xl mb-4">Recommended Foods</h1>
            <Link
              to="/shop"
              className="bg-orange-500 font-bold rounded-full py-2 px-10 mb-10"
            >
              Buy Now
            </Link>
          </div>

          <div className="flex justify-center flex-wrap mt-10">
            {data.products.map((product) => (
              <div key={product._id} className="m-4">
                <Product product={product} />
              </div>
            ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
