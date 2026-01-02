import React, { useState } from "react";
import RobotIcon from "../../assets/icons/eduquery_icon.svg?react";
import BrainIcon from "../../assets/icons/expert_icon.svg?react";
import ChatIcon from "../../assets/icons/chat_section_icon.svg?react";
import HistoryIcon from "../../assets/icons/history_icon.svg?react";
import SettingIcon from "../../assets/icons/settings_icon.svg?react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
//context imports
import { useSideBarPanel } from '../../Context/SideBarPanel/useSideBarPanel';
import Logout from "../Logout";

const SideBar = ({ expertName, setPanelDetail }) => {

  const { isOpen, openSidebar } = useSideBarPanel();

  const navigate = useNavigate();
  const location = useLocation();

  const isExpertActive = location.pathname === "/expert"
  const isHistoryActive = location.pathname === "/history"
  const isChatActive = location.pathname === "/chats"

  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  

  const handlePanelClick = (pageName) => {
    if (!isOpen) {
      navigate(pageName);
    }
    setPanelDetail(pageName);
  };

  const handleRobotClick = () => {
    openSidebar();
    //console.log("before expertName", expertName);
    
    if(expertName === null){
      setPanelDetail("history")
      //console.log("after expertName", expertName);
    }
  }

  return (
    <div className="hidden fixed z-20 bottom-0 md:relative h-12 md:h-screen w-full md:w-20 bg-Quaternary md:flex md:flex-col items-center md:py-2 justify-between">
      <div className="h-[30%] flex">
        <div
          className={`h-12 relative group transition-all duration-300 ease-in-out transform ${isOpen ? "opacity-0 scale-90 pointer-events-none": "opacity-100 scale-100 pointer-events-auto"}`}>
          <button
            onClick={handleRobotClick}
            className="hidden md:flex h-12 w-12 bg-Primary py-2 px-2 rounded-sm cursor-pointer"
          >
            <RobotIcon className="w-6 md:w-8 h-auto fill-white"/>
            <div className="hidden md:flex font-medium absolute -right-30 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Open sidebar
            </div>
          </button>
        </div>
      </div>
      <div className="relative h-10 w-full flex justify-between px-4 md:h-full md:w-12 md:flex-col md:px-0 md:justify-start md:gap-10">
        <div onClick={() => handlePanelClick("expert")} className="relative group">
          <div className={`${(expertName === "expert" && isOpen || !isOpen && isExpertActive) ? "bg-Secondary" : "bg-Primary"} py-2 px-2 rounded-sm cursor-pointer`}>
            <BrainIcon className="w-6 md:w-8 h-auto fill-white"/>
            <div className="font-medium hidden md:flex absolute -right-30 bottom-3 z-10 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Subject Tutor
            </div>
          </div>
        </div>

        <div onClick={() => handlePanelClick("chats")}>
          <div className={`${(expertName === "chats" && isOpen || !isOpen && isChatActive) ? "bg-Secondary" : "bg-Primary"} py-2 px-2 rounded-sm cursor-pointer relative group`}>
            <ChatIcon className="w-6 md:w-8 h-auto stroke-white"/>
            <div className="hidden md:flex font-medium absolute -right-18 bottom-3 z-10 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Chats
            </div>
          </div>
        </div>

        <div onClick={() => handlePanelClick("history")} className="relative group">
          <button className={`${(expertName === "history" && isOpen || !isOpen && isHistoryActive) ? "bg-Secondary" : "bg-Primary"} py-2 px-2 rounded-sm cursor-pointer`}>
            <HistoryIcon className="w-6 md:w-8 h-auto fill-white"/>
            <div className="hidden md:flex font-medium absolute -right-22 bottom-3 z-10 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              History
            </div>
          </button>
        </div>

        <div className="relative group md:absolute md:bottom-[25%]" onClick={() => setIsLogoutVisible(true)}>
          <div className="bg-Primary py-2 px-2 rounded-sm cursor-pointer">
            <SettingIcon className="w-6 md:w-8 h-auto fill-white"/>
            <div className="font-medium absolute -right-22 bottom-3 z-10 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Settings
            </div>
          </div>
        </div>
        {
          isLogoutVisible && (
            <Logout onClose={() => setIsLogoutVisible(false)}/>
          )
        }
      </div>
    </div>
  );
};

export default SideBar;
