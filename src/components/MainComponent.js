import React, { Component } from "react";
import Login from "./LoginComponent";
/*import Menu from './MenuComponent';
import Contact from './ContactComponent';*/
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SingUpComponent";
import Admin from "./AdminComponent";
import Calification from "./CalificationComponent";

function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/calification" element={<Calification />} />
        */
      </Routes>
    </div>
  );
}
/*<Route exact path="/register" component={() => <User />} />
        <Route exact path="/admin" component={() => <Admin />} />
        <Route exact path="/home" component={() => <Home />} />
        <Route exact path="/calification" component={() => <Calification />} />*/
export default Main;
