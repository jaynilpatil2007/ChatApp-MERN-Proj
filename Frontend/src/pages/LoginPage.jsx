import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { LoaderIcon } from 'lucide-react';
import { Link } from 'react-router';

function LoginPage() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const {isLoggedInCheck, login} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }
  return (
    <div className="bg-[#FBE8CE] flex items-center justify-center min-h-screen">
      <div className='flex bg-[#FFF8F0] rounded-2xl w-225 h-150 overflow-hidden outline-2 outline-[#545454]/50'>
        <div className='w-1/2 font-[Dongle]'>
              <h2 className="text-2xl font-bold text-[#000000] ml-38 mt-15">Welcome Back</h2>
              <p className='text-[#7E7E7E] ml-34 mt-2'>Login to access your account</p>
              

              <form onSubmit={handleSubmit} className="mt-16 text-sm">
                <p className='text-[#7E7E7E] ml-23 mt-5'>Email</p>
                <div>
                  <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder='johndoe@gmail.com' 
                  className="bg-[#D9D9D9] border-[#545454] ml-23 outline-none border rounded-lg w-64 h-8 pl-5 pr-5 text-[#000000]"
                />
                </div>

                <p className='text-[#7E7E7E] ml-23 mt-5'>Password</p>
                <div>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder='Enter your password' 
                  className="bg-[#D9D9D9] border-[#545454] ml-23 outline-none border rounded-lg w-64 h-8 pl-5 pr-5 text-[#000000]"
                />
                </div>

                <br></br>
                <button 
                  type='submit'
                  disabled={isLoggedInCheck}
                  className="bg-[#519A66] w-64 h-8 rounded-lg mt-7 ml-23 cursor-pointer hover:bg-[#519A66]/80">
                    {
                      isLoggedInCheck ? ( <LoaderIcon className='w-full h-5 animate-spin text-center' /> ) : ("Login")
                    }
                </button>
              </form>

              <p className='text-[#7E7E7E] ml-28 mt-2'>
                Don't have an account?  
                <Link to={"/signup"} className='text-blue-500 underline'>sign up</Link>
              </p>

        </div>
        <div className='w-1/2 my-6 mr-6 relative bg-[#F2EAE0] rounded-2xl'>
          <div className="absolute size-40 rounded-full bg-[#44A194] top-0 left-0"></div>
          <img src="/images/Programmer.jpg" alt="illustration" className="relative z-10 w-82.5 h-82.5 ml-15 mt-27.75 rounded-xl"/>
          <div className="absolute size-40 rounded-full bg-[#44A194] bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
