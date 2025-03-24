import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Logo = () => {
  const navigate=useNavigate();
  
    const DirectLoginPage =async() => {
      navigate('/');
    };

  return (
    <div className='flex justify-center p-10'>
        <div className="avatar">
        <div className="rounded h-72 w-96">
            <img className='cursor-pointer animate-zoom w-full h-full object-contain' src="https://raw.githubusercontent.com/nagarajnayakbadavath/ProjectImages/refs/heads/main/ProjectLogo.png"
            onClick={DirectLoginPage}
            />
        </div>
        </div>
      </div>
  )
}

export default Logo;
