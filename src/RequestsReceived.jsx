import React,{useState,useEffect} from 'react'
import axios from 'axios';

const RequestsReceived = () => {

  const [request,setRequest]=useState(null);

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
                            <button className="btn btn-primary">Reject</button>
                            <button className="btn btn-secondary">Accept</button>
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
