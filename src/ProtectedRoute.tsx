// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state: any) => state.user);
  // console.log("🚀 ~ userToken", userToken);

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
