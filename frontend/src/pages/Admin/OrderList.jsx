import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import Navigation from "../Auth/Navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderList = () => {
  const { data: orders, isLoading, error,refetch } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      // Refetch orders whenever the userInfo (i.e., the logged-in restaurant) changes
      refetch();
    }
  }, [userInfo, refetch]);

  return (
    <>
    <Navigation/>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto px-4">
          <AdminMenu />
          <div className="overflow-x-auto">
            <table className="w-full mt-4 hidden md:table">
              <thead className="border">
                <tr>
                  <th className="text-left px-4 py-2">ITEMS</th>
                  <th className="text-left px-4 py-2">ID</th>
                  <th className="text-left px-4 py-2">USER</th>
                  <th className="text-left px-4 py-2">DATE</th>
                  <th className="text-left px-4 py-2">TOTAL</th>
                  <th className="text-left px-4 py-2">PAID</th>
                  <th className="text-left px-4 py-2">DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="px-4 py-2">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-20"
                      />
                    </td>
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.user ? order.user.username : "N/A"}</td>
                    <td className="px-4 py-2">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                    <td className="px-4 py-2">₹ {order.totalPrice}</td>
                    <td className="px-4 py-2">
                      {order.isPaid ? (
                        <p className="p-1 text-center bg-green-400 w-24 rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-24 rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {order.isDelivered ? (
                        <p className="p-1 text-center bg-green-400 w-24 rounded-full">
                          Completed
                        </p>
                      ) : (
                        <p className="p-1 text-center bg-red-400 w-24 rounded-full">
                          Pending
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-full sm:w-20 h-40 object-cover mb-4 sm:mb-0 sm:mr-4"
                  />
                  <div>
                    <p className="text-gray-800">
                      <strong>ID:</strong> {order._id}
                    </p>
                    <p className="text-gray-800">
                      <strong>USER:</strong> {order.user ? order.user.username : "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <strong>DATE:</strong> {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                    </p>
                    <p className="text-gray-800">
                      <strong>TOTAL:</strong> ₹ {order.totalPrice}
                    </p>
                    <p className="text-gray-800">
                      <strong>PAID:</strong>
                      {order.isPaid ? (
                        <span className="inline-block bg-green-400 text-white px-2 py-1 rounded-full ml-2">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-block bg-red-400 text-white px-2 py-1 rounded-full ml-2">
                          Pending
                        </span>
                      )}
                    </p>
                    <p className="text-gray-800">
                      <strong>DELIVERED:</strong>
                      {order.isDelivered ? (
                        <span className="inline-block bg-green-400 text-white px-2 py-1 rounded-full ml-10">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-block bg-red-400 text-white px-2 py-1 rounded-full ml-10">
                          Pending
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;

