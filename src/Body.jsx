import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [users,setUsers]=useState({});
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <main className="flex-grow"></main>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body;
