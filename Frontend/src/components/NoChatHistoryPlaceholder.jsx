import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-linear-to-br from-neutral-800/20 to-neutral-500/10 rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-8 text-[#454040]" />
      </div>
      <h3 className="text-lg font-medium text-[#4B2E2B]/80 mb-3">
        Start your conversation with {name}
      </h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-taupe-700 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-xs font-medium text-olive-600 bg-olive-500/10 rounded-full hover:bg-olive-500/20 transition-colors">
          👋 Say Hello
        </button>
        <button className="px-4 py-2 text-xs font-medium text-olive-600 bg-olive-500/10 rounded-full hover:bg-olive-500/20 transition-colors">
          🤝 How are you?
        </button>
        <button className="px-4 py-2 text-xs font-medium text-olive-600 bg-olive-500/10 rounded-full hover:bg-olive-500/20 transition-colors">
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;