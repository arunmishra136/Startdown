import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

const App = () => {
  return(
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>

    </Routes>
  )
};

export default App;
