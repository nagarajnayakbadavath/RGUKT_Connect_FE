import React from 'react'
import { useSelector } from 'react-redux';

const Feed = () => {
  const user=useSelector((store)=>store.user);
  return (
    <div className="">
      <div className="flex card card-side bg-base-300 shadow-xl m-10">
        <figure>
        <img
          src={user?user.photourl:'https://tse3.mm.bing.net/th?id=OIP.Fzc56xo8ma3tT05oY5lpQgHaHa&pid=Api&P=0&h=180'} alt="profile photo" />
        </figure>
        <div className="card-body">
        {user && <h2 className="card-title font-serif font-extrabold">{user.lastName}   {user.firstName}</h2>}
        {user && <h3>{user.about}</h3>}
        {user && <h3>{user.skills}</h3>}
        
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Not Now</button>
            <button className="btn btn-primary">Send Connection</button>
          </div>
          </div>
      </div>
        



      {/* <div className="carousel carousel-vertical rounded-box h-96">
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" />
  </div>
  <div className="carousel-item h-full">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" />
  </div>
</div> */}
    </div>
  )
}

export default Feed;