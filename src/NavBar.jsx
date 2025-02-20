import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from './utils/userSlice';


const NavBar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user);
  

  const handleLogout=async()=>{
    try{
      const res=await axios.post("http://localhost:3000/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate('/feed');
    }catch(err){
      console.log(err.message);
    }
  }

  

  return (
    <div>
            <div className="navbar bg-base-300">
              <div className="flex-1">
    <Link to="/feed" className="btn  normal-case text-xl text-white">RGUKT_Connect</Link>
            </div>
  <div className="flex-none gap-2">
    <div className="form-control">
    <div className="">{user? `Welcome ${user.lastName}`:<h1>"Don't just stare! Click that button!👉</h1>}</div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar toggle-primary">
        <div className="w-10 rounded-full">
          <img src={user?user.photourl:'https://tse3.mm.bing.net/th?id=OIP.Fzc56xo8ma3tT05oY5lpQgHaHa&pid=Api&P=0&h=180'} alt="profile"/>
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {user && <li>
          <Link to="/profile/view" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li> }
        {!user && <li><Link to="/signup">SignUp</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {user && <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>}
      </ul>
    </div>
  </div>
            </div>
    </div>
  )
}

export default NavBar
