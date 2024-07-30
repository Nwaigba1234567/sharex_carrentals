import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


export const IsProtected = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (!isLoggedIn) {
    <Navigate to="/login" />;
  }
  return children;
};