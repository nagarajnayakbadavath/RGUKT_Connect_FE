import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {API_URL} from './config'

const Feed=()=> {

  const [users,setUsers]=useState(null);

  const getAllusers=async()=>{
    try{
      const res=await axios.get(`${API_URL}/Allprofiles`,{withCredentials:true});
      setUsers(res.data);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getAllusers();
  });

  const HandleSendRequest=async(userId)=>{
    try{
      console.log(userId)
      const res=await axios.post(`${API_URL}/request/send/connect/${userId}`,{},{withCredentials:true});
      console.log(res.data);
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className="flex flex-wrap">
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