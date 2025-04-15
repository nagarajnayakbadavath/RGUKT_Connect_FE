import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {API_URL} from './config';

const RequestsReceived = () => {

  const [request,setRequest]=useState([]);

  const getToken=()=>localStorage.getItem('token');

  const GetRequest=async()=>{
    try{
      const token=getToken();
      const res=await axios.get(`${API_URL}/requests/recieved`,{headers:{Authorization:`Bearer ${token}`},withCredentials:true});
      console.log(res.data);
      setRequest(res.data);
    }catch(err){
      console.log(err.message);
    }
  }


  useEffect(()=>{
    GetRequest();
  },[]);

  const HandleAccept=async(senderId)=>{
    try{
      const token=getToken();
      const res=await axios.put(`${API_URL}/request/${senderId}/accept`,{},{headers:{Authorization:`Bearer ${token}`},withCredentials:true});
      console.log(res.data);
      setRequest((prevRequests) =>
        prevRequests.filter((request) => request.senderId !== senderId)
      );
    }catch(err){
      console.log(err.message);
    }
  }

  const HandleReject=async(senderId)=>{
    try{
      const token=getToken();
      const res=await axios.put(`${API_URL}/request/${senderId}/reject`,{},{headers:{Authorization:`Bearer ${token}`},withCredentials:true});
      console.log(res.data);
      setRequest((prevRequests) =>
        prevRequests.filter((request) => request.senderId !== senderId)
      );
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 m-10">
      {request?(
        request.length>0?(<div>
          {request.map((requests,index)=>(
            <div key={index}>
                          <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                          <img
                            src={requests.photourl}
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{requests.lastName} {requests.firstName}</h2>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={()=>HandleReject(requests.senderId)}>Reject</button>
                            <button className="btn btn-secondary" onClick={()=>HandleAccept(requests.senderId)}>Accept</button>
                          </div>
                        </div>
                      </div>
            </div>
          ))}
        </div>):(
          <>
          <p>Requests are not received Yet!</p>
        </>)
      ):(
        <>
        <p>Request Loading...!</p>
        </>)}
    </div>
  )
}

export default RequestsReceived;
