import React from 'react';

const Login = ({isSignup}) => {
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
                      <input type="text" placeholder="enter your firstName" className="input input-bordered w-full max-w-xs" />

                      <label className="label">
                      <span className="label-text">LastName:</span>
                      </label>
                      <input type="text" placeholder="enter your lastName" className="input input-bordered w-full max-w-xs" />
                </>
              )}
              <label className="label">
                <span className="label-text">EmailId:</span>
              </label>
              <input type="text" placeholder="b201136@rgukt.ac.in" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input type="text" placeholder="enter the password" className="input input-bordered w-full max-w-xs" />
              <button className="btn btn-outline btn-primary m-3 justify-center w-12">{isSignup?'Singup':'Login'}</button>
            </div>
    </div>
  )
}

export default Login;
        