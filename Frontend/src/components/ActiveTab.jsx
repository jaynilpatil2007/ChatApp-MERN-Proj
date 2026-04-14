import React from 'react'
import { useChatStore } from "../store/useChatStore.js"

function ActiveTab() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className='tabs tabs-boxed bg-transparent p-2 m-2 flex justify-center gap-20'>
      <button 
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats" ? "bg-olive-500/50 text-olive-700" : "text-olive-400"
        }`}
      >
          Chats
      </button>
      <button 
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts" ? "bg-olive-500/50 text-olive-700" : "text-olive-400"
        }`}
      >
        Contacts
      </button>
    </div>
  )
}

export default ActiveTab
