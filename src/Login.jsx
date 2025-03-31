import React,{useState} from 'react';
import { addUser } from './utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from './config';

const Login = ({isSignup}) => {

  const [emailId,setEmailId]=useState('');
  const [password,setPassword]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [about,setAbout]=useState('');
  const [skills,setSkills]=useState('');
  const [photourl,setPhotourl]=useState('');

  const [error,setError]=useState('');

  const [emailIdError,setEmailIdError]=useState('');
  const [passwordError,setPasswordError]=useState('');

  const [firstNameError,setFirstNameError]=useState('');
  const [lastNameError,setLastNameError]=useState('');
  const [photourlError,setPhotourlError]=useState('');
  const [skillsError,setSkillsError]=useState('');
  const [aboutError,setAboutError]=useState('');

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validateSignup=()=>{
    let correct=true;
    if(!firstName){
      setFirstNameError('firstName should be entered');
      correct=false;
    }else if(!lastName){
      setLastNameError('lastName should be entered');
      correct=false;
    }else if(!about){
      setAboutError('write about?');
      correct=false;
    }else if(!skills){
      setSkillsError('mention skills');
      correct=false;
    }else if(!photourl){
      setPhotourlError('photourl is compulsory');
      correct=false;
    }
    return correct;
  }

  const validateForm=()=>{
    let isValid=true;

    if(!emailId){
      setEmailIdError('Email is required');
      isValid=false;
    }else if(!validateEmail(emailId)){
      setEmailIdError('Invalid format');
      isValid=false;
    }else{
      setEmailIdError('');
    }

    if(!password){
      setPasswordError('password is required');
      isValid=false;
    }else if(password.length<6){
      setPasswordError('password must be at least 6 characters');
      isValid=false;
    }else{
      setPasswordError('');
    }
    return isValid;
  }


  const handleLogin=async()=>{
    if(!validateForm()) return;
    try{
      const res=await axios.post(`${API_URL}/login`,{
        emailId,
        password,
      },{withCredentials:true});
      const { newuser, token } = res.data; // ✅ Extract user & token
        localStorage.setItem("token", token);
        dispatch(addUser(newuser));
      navigate("/feed");
    }catch(err){
      if(err.response.status===401){
        setError(err.response.data.message || "Invalid credentials.");
      }else{
        setError('something went wrong!');
      }
      console.log(err.message);
    }
  }



  const handleSignUp=async()=>{
    if(!validateForm()) return;
    if(!validateSignup()) return;
    try{
      console.log('I am in the try block');
      const res=await axios.post(`${API_URL}/signup`,{
        emailId,
        password,
        firstName,
        lastName,
        about,
        skills,
        photourl,
      },{withCredentials:true});
      if (res.status === 200) {
        navigate("/login");
      } else {
        setError(true);
      }
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
                      <input type="text" required placeholder={firstName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)}/>
                      {firstNameError && <span className="text-red-500 text-sm">{firstNameError}</span>}
                      <label className="label">
                      <span className="label-text">LastName:</span>
                      </label>
                      <input type="text" required placeholder={lastName} className="input input-bordered w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)}/>
                      {lastNameError && <span className="text-red-500 text-sm">{lastNameError}</span>}
                </>
              )}
              {error && <span className="text-red-500 text-sm">{error}</span>}
              <label className="label">
                <span className="label-text">EmailId:</span>
              </label>
              <input type="text" value={emailId} required placeholder='ex:- b201136@rgukt.ac.in' className="input input-bordered w-full max-w-xs" onChange={(e)=>setEmailId(e.target.value)}/>
              {emailIdError && <span className="text-red-500 text-sm">{emailIdError}</span>}
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input type="text" value={password} required placeholder='enter your password' className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)}/>
              {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}

              {isSignup && (
              <>
              <label className="label">
                <span className="label-text">PhotoURL:</span>
              </label>
              <input type="text" required placeholder={photourl} className="input input-bordered w-full max-w-xs" onChange={(e)=>setPhotourl(e.target.value)}/>
              {photourlError && <span className="text-red-500 text-sm">{photourlError}</span>}
              <label className="label">
              <span className="label-text">Skills:</span>
              </label>
              <input type="text" required placeholder={skills} className="input input-bordered w-full max-w-xs" onChange={(e)=>setSkills(e.target.value)}/>
              {skillsError && <span className="text-red-500 text-sm">{skillsError}</span>}
              <label className="label">
              <span className="label-text">About:</span>
              </label>
              <input type="text" required placeholder={about} className="input input-bordered w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)}/>
              {aboutError && <span className="text-red-500 text-sm">{aboutError}</span>}
              </>)}
              <h1>{error?'something went wrong':``}</h1>
              <button className="btn btn-outline btn-primary m-3 justify-center w-15" onClick={isSignup?handleSignUp:handleLogin}>{isSignup?'Signup':'Login'}</button>
            </div>
    </div>
  )
}

export default Login;