import './App.css'
import { Route, Routes } from "react-router-dom";
import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';
import { IsProtected } from './components/IsProtected/IsProtected';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import { About } from './components/About/About';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
import { Car } from './components/Car/Car';
import CarDetail from './components/Detail/CarDetail';


import "./components/Signup/Signup.css";
import "./components/Login/Login.css";
import "./components/Footer/Footer.css";
import "./components/NavBar/NavBar.css";
import "./components/About/About.css";
import "./components/Detail/CarDetail.css";
import "./components/Car/Car.css"



function App() {
  return (
    <>
  <NavBar/>
   <Routes>
   <Route path="/" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/about" element={<About />} />
  
  <Route path="/signup" element={<IsProtected><Signup /></IsProtected>} /> 
  <Route path="/car" element={<IsProtected><Car /></IsProtected>} />

  <Route path="/car/:carId"
       element={
        <IsProtected>
          <CarDetail />
        </IsProtected>
      } />
   </Routes>
   <Footer />
    </>
  );
}

export default App
