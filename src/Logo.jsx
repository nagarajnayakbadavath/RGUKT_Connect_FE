import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {API_URL} from './config';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { addCarouselProfiles } from './utils/carouselSlice';
import { useNavigate } from 'react-router-dom';
const Logo = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [profiles,setProfiles]=useState([]);

    const fetchUsers=async()=>{
        try{
            const res=await axios.get(`${API_URL}/Carouselprofiles`,{withCredentials:true});
            setProfiles(res.data);
            // dispatch(addUser(res.data));
            dispatch(addCarouselProfiles(res.data));
        }catch(err){
          console.log(err.message);
        }
    }
    
    useEffect(()=>{
        fetchUsers();
    },[]);

    const HandleLogin=()=>{
      try{
        navigate('/login');
      }catch(err){
        console.log(err.message);
      }
    }
  return (
    <div>
<div className='flex justify-center m-20'>
      {profiles.length > 0 && (
        <div className="carousel w-96 h-96">
          {profiles.map((profile, index) => (
          <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
        <img src={profile.photourl} className="w-full object-cover h-full" alt="profile" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-end p-5">
        <h1 className="text-white text-2xl font-semibold">{profile.firstName} {profile.lastName}</h1>
        <p className="text-white text-md">{profile.skills.join(", ")}</p>
        <p className="text-white text-sm mt-2">{profile.about}</p>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <button
  onClick={() => {
    const prevSlideId = `slide${(index - 1 + profiles.length) % profiles.length + 1}`;
    document.getElementById(prevSlideId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }}
  className="btn btn-circle"
>❮</button>
<button
  onClick={() => {
    const nextSlideId = `slide${(index + 1) % profiles.length + 1}`;
    document.getElementById(nextSlideId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }}
  className="btn btn-circle"
>❯</button>

    </div>
  </div>
))}
        </div>
      )}
    </div>
      <div className='flex justify-self-center'>
     <button className="btn btn-success animate-bounce text-xl" onClick={HandleLogin}>Login</button>
    </div>
        <div className="hero  min-h-screen w-full">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://avatars.githubusercontent.com/u/192697405?v=4"
              className="max-w-60 rounded-lg shadow-2xl mb-6 lg:mb-0"
            />
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Founder’s Note</h1>
              <p className="py-6">
              This website is helpful to rgukt students if they are seeking guidance from seniors or alumni. Seniors or alumni who want to connect with juniors can also benefit from it.
                <h1>Thank you!</h1>
              </p>
              <a href="https://m.youtube.com/channel/UCOYRU8XV8LSzAWFKzs0Wjnw?fbclid=PAY2xjawIhXa1leHRuA2FlbQIxMQABpj3KcNIGRIYN8Kuwca2r2XkJK0umPcRmDhR3wcQA10aFq45_hqwpzm07zw_aem_Y7Y0T-RzTRZPwoQO8NzaxA" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Logo;
