import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  // console.log(user);

  const handleLogin = () => {
            setIsLoggedIn(true);
           console.log(`isLoggedIn: ${isLoggedIn}`);
           nav("/login");
     }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    nav("/");
  };
  return (
    <div className="nav-container">
     
      <button onClick={() => nav("/car")}>Cars</button>
      <button onClick={() => nav("/about")}>About Us</button>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default NavBar

