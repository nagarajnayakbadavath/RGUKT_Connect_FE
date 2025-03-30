import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {API_URL} from './config';

const Sent = () => {
    const [user,setUser]=useState(null);



    const getSentRequestData=async()=>{
        try{
            const res=await axios.get(`${API_URL}/requests/sent`,{withCredentials:true});
            console.log(res.data);
            setUser(res.data);
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        getSentRequestData();
    },[]);
  return (
    <div className="flex">
      {user?(user.length>0?(
        <>
        {user.map((profiles,index)=>(
            <div key={index} className="flex-wrap">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                        src={profiles.photourl}
                        alt="pic" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{profiles.firstName} {profiles.lastName}</h2>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Pending</button>
                        </div>
                    </div>
                    </div>
            </div>
        ))}
        </>
      ):(<><p>Not sent Any Requests to Anybody...!</p></>)):
      (
        <>
      <p>Loading...!</p></>
    )}
    </div>
  )
}

export default Sent;