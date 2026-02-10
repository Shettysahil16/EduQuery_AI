import React from "react";
import ReactMarkdown from "react-markdown";
import CopyIcon from "../../assets/icons/copy-svgrepo-com.svg?react";
import ShareIcon from "../../assets/icons/share-svgrepo-com.svg?react";
import CopiedTextIcon from "../../assets/icons/tick-svgrepo-com.svg?react";
import RobotIcon from "../../assets/icons/eduquery_icon.svg?react";
import { useState } from "react";
import ShareCard from "../../Components/Share/ShareCard";


const HistoryPageCard = ({ message, loading, userQuestion }) => {
  console.log("user question inside HistoryPageCard", userQuestion);
  //console.log("message inside HistoryPageCard", message);
  const [copied, setCopied] = useState(false);
  const [isShareVisible, setShareVisible] = useState(false);

  //console.log("message inside history card", message);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    setShareVisible(true);
  };

  return (
    <div className="w-full flex flex-col gap-2 p-2 min-h-0">
      <div
        className={`${message.role === "ai" ? "" : "bg-Primary ml-auto max-w-[60%] py-2 px-3 rounded-lg"}`}
      >
        {message.role === "ai" ? (
          <div className="flex gap-2">
              <RobotIcon className="h-6 w-auto fill-Tertiary shrink-0" />
              {message.streaming && !message.content && <div className="animate-breathe bg-slate-300 mt-2 p-2 rounded-full h-2 animate-pulse"></div>}
            
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                key={message._id + message.content.length || 0}
                components={{
                  p: ({ children }) => (
                    <span className="inline leading-relaxed">{children}</span>
                  ),
                }}
              >
                {message.content || "" }
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}

        {message.role === "ai" && !loading && !message.streaming && (
          <div className="pl-8 mt-2 h-8 w-1/2 flex items-center gap-5">
            <div
              onClick={handleCopy}
              className="relative group cursor-pointer flex justify-center items-center px-2"
            >
              <CopyIcon
                className={`absolute w-6 h-auto fill-slate-300 stroke-slate-300 transition-all duration-300 ease-in ${copied ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
              />

              <CopiedTextIcon
                className={`absolute w-6 h-auto  stroke-slate-300 transition-all duration-300 ease-in ${copied ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              />

              <div className="pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 duration-200 ease-out transition-all w-fit -bottom-12 absolute text-xs bg-Primary px-2 py-1 rounded-md font-medium text-center">
                <p>Copy</p>
              </div>
            </div>

            {!loading && (
              <div
                onClick={handleShare}
                className="relative group cursor-pointer flex justify-center items-center"
              >
                <ShareIcon className="w-6 h-auto stroke-slate-200" />
                <div className="pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 duration-200 ease-out transition-all w-fit -bottom-9 absolute text-xs bg-Primary px-2 py-1 rounded-md font-medium text-center">
                  <p>Share</p>
                </div>
              </div>
            )}
            {isShareVisible && (
              <ShareCard
                onClose={() => setShareVisible(false)}
                message={message.content}
                userQuestion={userQuestion?.content}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPageCard;
