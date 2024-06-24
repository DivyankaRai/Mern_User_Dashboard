import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/Register/Register';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Navbar from './Navbar';
import Verify from './Pages/Login/Verify';

function App() {
  const user = useSelector((state) => state.user);
  const[isLoggedIn,setIsLoggedIn] = useState(false)
  

  console.log((isLoggedIn))


  useEffect(()=>{
    setIsLoggedIn(user.isLoggedIn)
  },[user])

  return (
<Router>
      <Navbar />
      <Routes>
        <Route path="/verify" element={<Verify/>} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
