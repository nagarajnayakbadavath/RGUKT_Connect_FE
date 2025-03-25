import React,{useState,useEffect} from 'react'
import axios from 'axios';

const RequestsReceived = () => {

  const [request,setRequest]=useState([]);

  const GetRequest=async()=>{
    try{
      const res=await axios.get('http://localhost:3001/requests/recieved',{withCredentials:true});
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
      const res=await axios.put(`http://localhost:3001/request/${senderId}/accept`,{},{withCredentials:true});
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
      const res=await axios.put(`http://localhost:3001/request/${senderId}/reject`,{},{withCredentials:true});
      console.log(res.data);
      setRequest((prevRequests) =>
        prevRequests.filter((request) => request.senderId !== senderId)
      );
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div>
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
