import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [loading,setLoading]=useState(true);
  const user=useSelector((store)=>store.user);
  const [edit,setEdit]=useState(false);

  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [photourl,setPhotourl]=useState('');
  const [about,setAbout]=useState('');
  const [skills,setSkills]=useState('');
  const [toast,setToast]=useState(false);

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
  
  const profileEdit=async()=>{
        try{
          const res=await axios.put("http://localhost:3000/profile/edit",{
            firstName,
            lastName,
            about,
            skills,
            photourl,
          },{withCredentials:true});
          dispatch(addUser(res.data));
          setToast(true);
          setTimeout(()=>{
            setToast(false);
          },3000);
          <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>New mail arrived.</span>
  </div>
</div>
        }catch(err){
          console.log(err.message);
        }
  }


  return (
    <div className="flex justify-center p-6">
      <div className="card bg-base-300 w-60 shadow-xl">
        <figure>
          <img src={user.photourl} alt="user photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName} {user.lastName}</h2>
          <p>{user.about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>setEdit(true)}>Edit Profile</button>
          </div>
        </div>
      </div>

      {edit && <div className="card bg-base-300 w-60 shadow-xl mx-5">
        
        <div className="card-body">
          <label>FirstName</label>
          <input type="text" placeholder={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <label>LastName</label>
          <input type="text" placeholder={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <label>photourl</label>
          <input type="text" placeholder={photourl} onChange={(e)=>setPhotourl(e.target.value)}/>
          <label>Skills</label>
          <input type="text" placeholder={skills} onChange={(e)=>setSkills(e.target.value)}/>
          <label>About</label>
          <input type="text" placeholder={about} onChange={(e)=>setAbout(e.target.value)}/>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={profileEdit}>Save Profile</button>
          </div>
        </div>
      </div>}

      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-info">
        <span>Profile Saved</span>
        </div>
</div>}
    </div>
  )
}

export default Profile;