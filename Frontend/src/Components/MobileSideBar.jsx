import React from "react";
import CloseSideBarIcon from "../assets/icons/close_sidebarpanel_icon.svg?react";
import HomeIcon from "../assets/icons/home_icon.svg?react"
import BrainIcon from "../assets/icons/expert_icon.svg?react";
import HistoryIcon from "../assets/icons/history_icon.svg?react";
import SettingIcon from "../assets/icons/settings_icon.svg?react";
import LogoutIcon from "../assets/icons/logout_icon.svg?react";
import ChatIcon from "../assets/icons/chat_section_icon.svg?react"
import { Link } from "react-router-dom";

const MobileSideBar = ({ closeSidebar }) => {
  return (
    <div className="h-screen w-full bg-Tertiary text-black flex flex-col">
      <div className="p-2 w-fit ml-auto">
        <CloseSideBarIcon
          onClick={() => closeSidebar(false)}
          className="h-8 w-8 fill-Secondary"
        />
      </div>

      <div className="flex flex-col gap-2 text-QuinaryText text-xl mt-10">
        
        <div className="border-b-2 border-t-2 py-6 px-2 flex gap-4 items-center">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <HomeIcon className="h-6 w-6 fill-white"/>
            </div>
            <p>Home</p>
        </div>

        <div className="border-b-2 py-6 px-2 flex gap-4 items-center">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <BrainIcon className="h-6 w-6 fill-white"/>
            </div>
            <p>Experts</p>
        </div>

        <Link to={"/chats"} className="border-b-2 py-6 px-2 flex gap-4 items-center">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <ChatIcon className="h-6 w-6 stroke-white"/>
            </div>
            <p>Chat</p>
        </Link>

        <div className="border-b-2 py-6 px-2 flex gap-4 items-center">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <HistoryIcon className="h-6 w-6 fill-white"/>
            </div>
            <p>History</p>
        </div>

        <div className="border-b-2 py-6 px-2 flex gap-4 items-center">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <SettingIcon className="h-6 w-6 fill-white"/>
            </div>
            <p>Settings</p>
        </div>

        <div className="flex gap-4 items-center py-6 px-2">
            <div className="h-9 w-9 bg-Primary flex items-center justify-center rounded-full p-2">
              <LogoutIcon className="h-6 w-6 fill-white"/>
            </div>
            <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
