import React from 'react'
import { useSelector } from 'react-redux';

const Feed = ({users}) => {
  const user=useSelector((store)=>store.user);
  console.log("This are the users I got",{users});


  return (
    <div className="flex flex-wrap">
            {users && users.length > 0 ? (
          users.map((user, index) => (
          <div key={index} className="user-card justify-center">
              <div className="card bg-base-300 h-96 w-60 shadow-xl mx-5 my-5">
                <figure>
                  <img
                    src={user.photourl}
                    alt="profile photo"/>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {user.firstName} {user.lastName}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{user.about}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Connect</div>
                  </div>
                </div>
              </div>


          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default Feed;