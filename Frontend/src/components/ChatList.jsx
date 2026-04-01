import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import UserSkeleton from "./UserSkeleton.jsx";
import NoChatsFound from './NoChatsFound.jsx';
import { useAuthStore } from '../store/useAuthStore.js';

function ChatList() {
  const {isUserLoading, chats, getAllChatParteners, setSelectedUser} = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllChatParteners()
  }, [getAllChatParteners]);

  if(isUserLoading) return <UserSkeleton />
  if(chats.length === 0) return <NoChatsFound />

  return (
    <>
      {chats.data.map((chat) => (
        <div
            key={chat._id}
            className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
            onClick={() => setSelectedUser(chat)}
          >
            <div className='flex items-center gap-3'>
              <div className={`avatar avatar-${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                <div className='size-14 rounded-full'>
                  <img 
                    src={chat.profilePic || "/images/avatar.png"}
                    alt={chat.fullname}
                  />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{chat.fullname}</h4>
            </div>
          </div>
      ))}
    </>
  )
}

export default ChatList
