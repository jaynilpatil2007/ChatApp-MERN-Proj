import { useChatStore } from "../store/useChatStore.js"
import { ContactList } from "../components/ContactList.jsx";
import { ChatList } from "../components/ChatList.jsx";
import { ActiveTab } from "../components/ActiveTab.jsx";
import { ProfileHeader } from "../components/ProfileHeader.jsx";
import { ChatContainer } from "../components/ChatContainer.jsx";
import { NoConversationPlaceholder } from "../components/NoConversationPlaceholder.jsx";


function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return ( 
    <div className="bg-[#FBE8CE] flex items-center justify-center min-h-screen">
      <div className='flex bg-[#FFF8F0] rounded-2xl w-225 md:h-150 h-200 overflow-hidden outline-2 outline-[#545454]/50'>
        <div className="w-80 bg-[#F4C994]/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTab />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            { activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        <div className="flex flex-1 flex-col backdrop-blur-sm bg-[#A5C89E]/70">
          { selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
