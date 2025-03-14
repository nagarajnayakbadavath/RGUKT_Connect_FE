import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRequests } from "./utils/requestsSlice";

const RequestsReceived = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [currentIndex,setCurrentIndex]=useState(0);
  const [button,setButton]=useState(true);

  const requests = useSelector((state) => state.requests);

  console.log("this is the data", requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://rgukt-connect.vercel.app/api/requests/recieved", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(setRequests(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserDetails = async (senderId) => {
    try {
      setButton(false);
      const res = await axios.get(
        `https://rgukt-connect.vercel.app/user/api/profile/${senderId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setUserDetails(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  const handleNextBtn=()=>{
    if(currentIndex<requests.length-1){
      const newIndex=currentIndex+1;
      setCurrentIndex(newIndex);
      fetchUserDetails(requests[newIndex].senderId);
    }else{
      console.log("Yaar this is the last request card");
    }
  }

  const handlePrevBtn=()=>{
    if(currentIndex>0){
      const newIndex=currentIndex-1;
      setCurrentIndex(newIndex);
      fetchUserDetails(requests[newIndex].senderId);
    }else{
      console.log("yaar this is this the first card you have");
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="p-4 border-b">
              <button
                className="btn btn-secondary"
                onClick={() => fetchUserDetails(request.senderId)}>{button?'Know the Requested Guy':''}</button>
              {userDetails && userDetails._id === request.senderId && (
                <div className="card mt-2 bg-gray-100 rounded shadow">
                  <figure>
                    <img src={userDetails.photourl}/>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{userDetails.firstName}</h2>
                    <p>{userDetails.skills}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-secondary" onClick={handlePrevBtn}>Prev Request</button>
                      <button className="btn btn-primary" onClick={handleNextBtn}>Next Request</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p>You have not yet received any requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsReceived;
