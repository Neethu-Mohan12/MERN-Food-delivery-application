import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import "./ProductCarousel.css";
import { useNavigate } from "react-router";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleNavigate = (productId) => {
    window.scrollTo(0, 0);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="mb-10">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product._id} className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg object-cover h-[25rem]"
                onClick={() => handleNavigate(product._id)}
              />
              <div className="mt-4 flex flex-col md:flex-row justify-between">
                <div>
                  <h2>{product.name}</h2>
                  <p> ₹ {product.price}</p>
                  <p className="w-full md:w-96">
                    {product.description.substring(0, 170)} ...
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full md:w-96 mt-4 md:mt-0">
                  <div>
                    <h1 className="flex items-center mb-2">
                      <FaStore className="mr-2 text-white" /> Restaurant: {product.brand}
                    </h1>
                  </div>
                  <div>
                    <h1 className="flex items-center mb-2">
                      <FaStar className="mr-2 text-white" /> Ratings: {Math.round(product.rating)}
                    </h1>
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;

