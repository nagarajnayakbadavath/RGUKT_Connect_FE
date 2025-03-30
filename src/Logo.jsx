import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Logo = () => {
  const navigate=useNavigate();
  
    const DirectLoginPage =async() => {
      navigate('/');
    };

    

  return (
      <div className="flex flex-col items-center p-10">
        <div className="avatar mb-8">
          <div className="rounded h-72 w-96">
            <img
              className="cursor-pointer animate-zoom w-full h-full object-contain"
              src="https://raw.githubusercontent.com/nagarajnayakbadavath/ProjectImages/refs/heads/main/ProjectLogo.png"
              onClick={DirectLoginPage}
            />
          </div>
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
                This Website is designed for connecting the rgukt student's in one platform for growing the connectivity among the alumni and senior's,junior's.
                This website is helpful to rgukt students if they are seeking guidance from senior's or alumni or senior's,alumni want to connect ith junior's.
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
