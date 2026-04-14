import React from 'react'
import {MessageCircleIcon} from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center p-6'>
      <div className='size-20 bg-linear-to-br from-neutral-800/20 to-neutral-500/10 rounded-full flex items-center justify-center mb-6'>
        <MessageCircleIcon className="size-10 text-[#454040]"/>
      </div>
      <h3 className='text-xl font-semibold text-[#4B2E2B]/80 mb-2'>Select a conversation</h3>
      <p className='text-taupe-500 max-w-md'>Choose a contact from the sidebar to start chatting or continue a previous conversation.</p>
    </div>
  )
}

export default NoConversationPlaceholder
