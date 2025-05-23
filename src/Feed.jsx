import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {API_URL} from './config'

const Feed=()=> {

  const [users,setUsers]=useState(null);

  const getToken=()=>localStorage.getItem('token');

  const getAllusers=async()=>{
    try{
      const token=getToken();
      if(!token){
          console.error('token not found please login');
          return;
      }
      console.log("the token you are getting from localStorage",token);
      const res=await axios.get(`${API_URL}/Allprofiles`,{headers: { Authorization: `Bearer ${token}`}, withCredentials:true});
      setUsers(res.data);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getAllusers();
  },[]);

  const HandleSendRequest=async(userId)=>{
    try{
      const token=getToken();
      console.log("the token is ",token);
      console.log("sending request to ",userId);
      const res=await axios.post(`${API_URL}/request/send/connect/${userId}`,{},{headers:{Authorization:`Bearer ${token}`},withCredentials:true});
      console.log(res.data);
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-4">
            {users && users.length > 0 ? (
          users.map((user, index) => (
          <div key={index} className="user-card justify-center">
              <div className="card bg-base-300 h-96 w-60 shadow-xl mx-5 my-5">
                <figure>
                  <img
                    src={user.photourl}
                    alt="profile photo"/>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {user.firstName} {user.lastName}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{user.about}</p>
                  <div className="card-actions justify-end">
                  <button className="btn btn-soft btn-success" onClick={()=>HandleSendRequest(user._id)}>Connect</button>
                  </div>
                </div>
              </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default Feed;