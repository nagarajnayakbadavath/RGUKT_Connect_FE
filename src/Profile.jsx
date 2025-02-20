import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';

const Profile = () => {
  
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  const user=useSelector((store)=>store.user);

  useEffect(()=>{
    if(!user){
    const fetchUser=async()=>{
      try{
        const res=await axios.get("http://localhost:3000/profile/view",{withCredentials:true});
        dispatch(addUser(res.data));
      }catch(err){
        console.log(err.message);
      }finally{
        setLoading(false);
      }
    };
    fetchUser();
  }else{
    setLoading(false);
  }
  },[user,dispatch]);

  if(loading){
    return <p>Loading...</p>
  }

  if(!user){
    return <p>No user data available.</p>
  }
  
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-60 shadow-xl">
        <figure>
          <img src={user.photourl} alt="user photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName} {user.lastName}</h2>
          <p>{user.about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
