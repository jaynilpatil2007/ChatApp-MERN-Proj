import React, { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { useChatStore } from '../store/useChatStore.js';
import { LoaderIcon, LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

function ProfileHeader() {
  const { authUser, logout, updateProfile } = useAuthStore();
  const { toggleSound, isSoundEnable} = useChatStore();

  const [ img , setImg ] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64img = reader.result;
      setImg(base64img);
      await updateProfile({ profilePic: base64img });
    }
  }


  return (
    <div className='p-6 border-b border-slate-700/50'>
      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-3'>
          <div className='avatar avatar-online'>
            <button 
              className='size-14 rounded-full overflow-hidden relative group' 
              onClick={() => fileInputRef.current.click()}
            >
              <img 
                src={img || authUser.profilePic || "/images/avatar.png"} 
                alt="User Image"
                className='size-full object-cover'
              />
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                <span className='text-white text-xs'>Change</span>
              </div>
            </button>
            <input 
              type='file' 
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
            />
          </div>
          <div>
            <h3 className='text-slate-200 text-base font-medium max-w-45 truncate'>
              {authUser.fullname}
            </h3>
            <p className='text-slate-400 text-xs'>Online</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <button 
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={logout}
          >
            <LogOutIcon className="size-5"/>
          </button>
          <button
            className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={toggleSound}
          >
            {
              isSoundEnable ? (
                <Volume2Icon className='size-5'/>
              ) : (
                <VolumeOffIcon className='size-5'/>
              )
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
