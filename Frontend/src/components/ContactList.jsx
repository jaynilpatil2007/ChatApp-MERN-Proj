import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore.js"
import UserSkeleton from "./UserSkeleton.jsx";

function ContactList() {
  const {isUserLoading, allContacts, getAllContacts, setSelectedUser} = useChatStore();

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts]);

  if(isUserLoading) return <UserSkeleton />

  return (
    <>
      {allContacts.map((contact) => (
        <div
            key={contact._id}
            className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
            onClick={() => setSelectedUser(contact)}
          >
            <div className='flex items-center gap-3'>
              <div className="avatar avatar-online">
                <div className='size-14 rounded-full'>
                  <img 
                    src={contact.profilePic || "/images/avatar.png"}
                    alt={contact.fullname}
                  />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{contact.fullname}</h4>
            </div>
          </div>
      ))}
    </>
  )
}

export default ContactList

