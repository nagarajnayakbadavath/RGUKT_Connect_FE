import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';
import UserCards from './UserCards';
import Feed from './Feed';

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [users,setUsers]=useState({});
  const location=useLocation();
  

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const res=await axios.get("https://rgukt-connect.vercel.app/api/profile/view",{withCredentials:true});
        dispatch(addUser(res.data));
      }catch(err){
        console.log("Error FE ",err.message);
      }
    }
    fetchUser();
  },[]);

  const fetchUser=async()=>{
    try{
      const res=await axios.get("https://rgukt-connect.vercel.app/api/users",{withCredentials:true});
      const filteredUsers=setUsers(res.data.filter(user=>user.emailId!==localStorage.getItem("userEmail")));
    }catch(err){
      console.log(err.message);
    }
  }

 

  useEffect(()=>{
    if(!localStorage.getItem("userEmail")){
      const email=prompt("enter your email:");
      if(email){
        localStorage.setItem("userEmail",email);
      }
    }
    fetchUser();
  },[]);

  return (
    <div>
      <NavBar/>
      <Outlet/>
      {(location.pathname==="/" || location.pathname==="/feed")  && <Feed users={users}/>}
      {/* <Feed users={users}/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default Body;
