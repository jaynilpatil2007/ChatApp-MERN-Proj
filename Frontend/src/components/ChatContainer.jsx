import React, { useEffect, useRef } from 'react'
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx"

function ChatContainer() {
  const {message, getMessageByUserId, selectedUser, subcribeToMessage, unSubscribeToMessage} = useChatStore();
  const {authUser} = useAuthStore();

  const messageEndRef = useRef();

  useEffect(() => {
    getMessageByUserId(selectedUser._id);
    subcribeToMessage();

    return () => unSubscribeToMessage();
  }, [selectedUser, getMessageByUserId, subcribeToMessage, unSubscribeToMessage]);

  useEffect(() => {
    if(messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth"})
    }
  }, [message]);

  return (
    <>
      <ChatHeader />
      <div className='flex-1 px-6 py-8 overflow-y-auto'>
        {
          message.length > 0 ? (
            <div className='max-w-3xl mx-auto space-y-6'>
              {
                message.map((msg) => {
                  // Ensure both IDs are strings for robust comparison
                  const isSentByCurrentUser = msg.senderId?.toString() === authUser._id?.toString();
                  return (
                    <div 
                      key={msg._id}
                      className={`chat ${isSentByCurrentUser ? "chat-end" : "chat-start"}`}
                    >
                      <div className={
                        `chat-bubble relative ${
                          isSentByCurrentUser ?
                          "bg-cyan-600 text-white" :
                          "bg-slate-800 text-slate-200"
                        }`
                      }>
                        {
                          msg.image && (
                            <img 
                              src={msg.image} 
                              alt='Shared'
                              className='rounded-lg h-48 object-cover'
                            />
                          )
                        }
                        {
                          msg.text && (
                            <p className='mt-2'>{msg.text}</p>
                          )
                        }
                        <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser.fullname}/>
          )
        }
        <div ref={messageEndRef}/>
      </div>

      <MessageInput />
    </>
  )
}

export default ChatContainer
