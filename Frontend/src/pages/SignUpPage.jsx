import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { LoaderIcon } from 'lucide-react';
import { Link } from 'react-router';

function SignUpPage() {
  const [formData, setFormData] = useState({fullname:"", email:"", password:""});
  const { signUp, isSigningCheck} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(formData);
  }
  return (
    <div className="bg-[#FBE8CE] flex items-center justify-center min-h-screen">
      <div className='flex bg-[#FFF8F0] rounded-2xl w-[900px] h-[600px] overflow-hidden outline-2 outline-[#545454]/50'>
        <div className='w-1/2 my-6 ml-6 relative bg-[#F2EAE0] rounded-2xl'>
          <div className="absolute size-40 rounded-full bg-[#44A194] top-0 left-0"></div>
          <img src="/images/illustration.jpg" alt="illustration" className="relative z-10 w-[330px] h-[330px] ml-[60px] mt-[111px] rounded-xl"/>
          <div className="absolute size-40 rounded-full bg-[#44A194] bottom-0 right-0"></div>
        </div>


        <div className='w-1/2 font-[Dongle]'>
              <h1 className="text-2xl font-bold text-[#000000] ml-38 mt-15">Get Started</h1>
              <p className='text-[#7E7E7E] ml-28 mt-2'>
                Already have an account? 
                <Link to={"/login"} className='text-blue-500 underline'> Login</Link>
              </p>

              <form onSubmit={handleSubmit} className="mt-16 text-sm">
                <p className='text-[#7E7E7E] ml-23'>Full Name</p>
                <div>
                  <input 
                    type="text" 
                    value={formData.fullname}  
                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                    placeholder='John Deo' 
                    className="input bg-[#D9D9D9] border-[#545454] ml-23 outline-none border rounded-lg w-64 h-8 pl-5 pr-5 text-[#000000]"
                  />
                </div>

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
                  disabled={isSigningCheck}
                  className="bg-[#519A66] w-64 h-8 rounded-lg mt-7 ml-23 cursor-pointer hover:bg-[#519A66]/80">
                    {
                      isSigningCheck ? ( <LoaderIcon className='w-full h-5 animate-spin text-center' />) : ( "Create Account" )
                    }  
                </button>
              </form>


              <div className='flex items-center mt-8 ml-30'>
                <img src="/logos/google.svg" className="w-8 cursor-pointer"/>
                <img src="/logos/facebook.svg" className="w-7 ml-10 cursor-pointer"/>
                <img src="/logos/github.svg" className="w-7 ml-10 cursor-pointer"/>
              </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
