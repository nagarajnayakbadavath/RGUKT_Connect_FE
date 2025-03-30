import React,{useEffect, useState} from 'react'
import axios from 'axios';

const Friends = () => {
    
    const [friends,setFriends]=useState(null);

    const HandleFriends=async()=>{
        try{
            const res=await axios.get("http://localhost:3001/getAcceptedProfiles",{withCredentials:true});
            console.log(res.data);
            setFriends(res.data);
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        HandleFriends();
    },[]);

  return (
    <div className="flex">
        {friends?(
            friends.length>0?(
            <>
                {friends.map((friend,index)=>(
                    <div key={index}>
                                <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                            src={friend.photourl}
                            alt="friend photo" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{friend.firstName} {friend.lastName}</h2>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">Chat</button>
                            </div>
                        </div>
                        </div>
                                            </div>
                ))}
            </>):(
            <>
            <p>No friends yet!</p>
            </>)
        ):(<>
        <p>Friends list is Loading...!</p>
        </>)}
    </div>
  )
}

export default Friends;
