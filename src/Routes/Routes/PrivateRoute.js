import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  if (user) {
    return children;
  }
};

export default PrivateRoute;
