import React,{useState} from 'react';
import { addUser } from './utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({isSignup}) => {

  const [emailId,setEmailId]=useState('');
  const [password,setPassword]=useState('Naga_1136');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [about,setAbout]=useState('');
  const [skills,setSkills]=useState('');
  const [photourl,setPhotourl]=useState('');
  const [error,setError]=useState(false);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogin=async()=>{
    try{
      const res=await axios.post('https://rgukt-connect.vercel.app/api/login',{
        emailId,
        password,
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/feed");
    }catch(err){
      console.log(err.message);
    }
  }

  const handleSignUp=async()=>{
    try{
      const res=await axios.post("https://rgukt-connect.vercel.app/api/signup",{
        emailId,
        password,
        firstName,
        lastName,
        about,
        skills,
        photourl,
      },{withCredentials:true});
      navigate("/login");
    }catch(err){
      setError(true);
      console.log("FE ERR",err.message);
    }
  }
  
  return (
    <div className="flex justify-center">
            <div className="form-control w-full max-w-xs">
              <label className="label justify-center font-serif font-bold">
                <span className="label-text">{isSignup ?'Signup':'Login'}</span>
              </label>

              {isSignup && (
                <>
                      <label className="label">
                      <span className="label-text">FirstName:</span>
                      </label>
                      <input type="text" placeholder={firstName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)}/>

                      <label className="label">
                      <span className="label-text">LastName:</span>
                      </label>
                      <input type="text" placeholder={lastName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)}/>
                </>
              )}
              <label className="label">
                <span className="label-text">EmailId:</span>
              </label>
              <input type="text" placeholder={emailId} className="input input-bordered w-full max-w-xs" onChange={(e)=>setEmailId(e.target.value)}/>
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input type="text" placeholder={password} className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)}/>
              
              {isSignup && (
              <>
              <label className="label">
                <span className="label-text">PhotoURL:</span>
              </label>
              <input type="text" placeholder={photourl} className="input input-bordered w-full max-w-xs" onChange={(e)=>setPhotourl(e.target.value)}/>
              
              <label className="label">
              <span className="label-text">Skills:</span>
              </label>
              <input type="text" placeholder={skills} className="input input-bordered w-full max-w-xs" onChange={(e)=>setSkills(e.target.value)}/>

              <label className="label">
              <span className="label-text">About:</span>
              </label>
              <input type="text" placeholder={about} className="input input-bordered w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)}/>
              </>)}
              <h1>{error?'something went wrong':``}</h1>
              <button className="btn btn-outline btn-primary m-3 justify-center w-12" onClick={isSignup?handleSignUp:handleLogin}>{isSignup?'Singup':'Login'}</button>
            </div>
    </div>
  )
}

export default Login;