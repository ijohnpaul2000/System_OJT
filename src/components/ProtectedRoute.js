import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  console.log("Check user in Private: ", user);
  if (!user) {
    navigate("/");
  }
  return children;
};

export default ProtectedRoute;
