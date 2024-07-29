import './App.css'
import { Routes, Route } from "react-router-dom";

import Login from './components/Dashboard/Login/Login';

function App() {
  

  return (
    <>
    <Route path="/Login" element={<Login />} />
    <Route path="/home" 
      element={
        <IsProtected>
      <DashboardPage  />
      </IsProtected>}
      />
    </>
  );
}

export default App
