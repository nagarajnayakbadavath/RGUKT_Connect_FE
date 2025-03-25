import React, { useState,useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import axios from 'axios';
import { addUser } from './utils/userSlice';

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [users,setUsers]=useState({});


  const fetchUser=async()=>{
    try{
      const res=await axios.get("http://localhost:3001/profile/view",{withCredentials:true});
      console.log("The data is",res.data);
      dispatch(addUser(res.data));
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[]);
  
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
