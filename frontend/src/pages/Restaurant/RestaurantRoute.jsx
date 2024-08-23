import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.userType==='restaurant'? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default RestaurantRoute;