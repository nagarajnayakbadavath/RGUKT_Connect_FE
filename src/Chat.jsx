import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from './socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const {targetUserId}=useParams();
    console.log(targetUserId);
    const [messages,setMessages]=useState([]);
    const [newMessages,setNewMessages]=useState("");
    const user=useSelector(store=>store.user);
    const userId=user?._id;

    useEffect(()=>{
        if(!userId){
            return;
        }
        const socket=createSocketConnection();
        //As soon as the page loaded the socket connection is made and joinChat event is emitted
        socket.emit("joinChat",{firstName:user.firstName,userId,targetUserId});

        socket.on("messageReceived",({firstName,text})=>{
            console.log(firstName," ",text);
            setMessages((messages)=>[...messages,{firstName:user.firstName,text}])
        });

        return ()=>{
            socket.disconnect();
        }
    },[userId,targetUserId]);

    const sendMessage=()=>{
        try{
        const socket=createSocketConnection();
        socket.emit("sendMessage",{firstName:user.firstName,userId,targetUserId,text:newMessages});
        }catch(err){
            console.log(err.message);
        }
    }

  return (
    <div>
        {messages.map((msg, index) => {
                return (
                    <div key={index}>
                        <h1>{msg.firstName}</h1>
                        <h1>{msg.text}</h1>
                    </div>
                    );
                })}
        <input value={newMessages} type="text" placeholder="Write a message" className="input input-primary" onChange={(e)=>setNewMessages(e.target.value)}/>
        <button className="btn btn-soft btn-success" onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat
