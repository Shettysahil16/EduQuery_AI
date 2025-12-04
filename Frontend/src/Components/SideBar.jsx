import React from "react";
import robotIcon from "../assets/icons/robot-svgrepo.svg";
import brainIcon from "../assets/icons/brain-engine-svgrepo-com.svg";
import chatIcon from "../assets/icons/send-svgrepo-com.svg";
import historyIcon from "../assets/icons/history-svgrepo-com.svg";
import settingIcon from "../assets/icons/settings-svgrepo-com.svg";

const SideBar = () => {
  return (
    <div className="fixed bottom-0 md:relative h-12 md:h-screen w-full md:w-20 bg-Quaternary flex md:flex-col items-center md:py-2 justify-between">
      <div className="h-[30%] flex">
        <div className="h-12 relative group">
          <button className="hidden md:flex h-12 w-12 bg-Primary py-2 px-2 rounded-sm cursor-pointer">
            <img
              src={robotIcon}
              alt="icon"
              className="w-6 md:w-8 h-auto object-contain "
            />
            <div className="hidden md:flex font-medium absolute -right-30 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Open sidebar
            </div>
          </button>
        </div>
      </div>
      <div className="relative h-10 w-full flex justify-between px-4 md:h-full md:w-12 md:flex-col md:px-0 md:justify-start md:gap-10">
        <div className="relative group">
          <button className="bg-Primary py-2 px-2 rounded-sm cursor-pointer">
            <img
              src={brainIcon}
              alt="icon"
              className="w-6 md:w-8 h-auto object-contain "
            />
            <div className="font-medium hidden md:flex absolute -right-30 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Subject Tutor
            </div>
          </button>
        </div>

        <div className="relative group">
          <button className="bg-Primary py-2 px-2 rounded-sm cursor-pointer">
            <img
              src={chatIcon}
              alt="icon"
              className="w-6 md:w-8 h-auto object-contain "
            />
            <div className="hidden md:flex font-medium absolute -right-18 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Chats
            </div>
          </button>
        </div>

        <div className="relative group">
          <button className="bg-Primary py-2 px-2 rounded-sm cursor-pointer">
            <img
              src={historyIcon}
              alt="icon"
              className="w-6 md:w-8 h-auto object-contain "
            />
            <div className="hidden md:flex font-medium absolute -right-22 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              History
            </div>
          </button>
        </div>

        <div className="relative group md:absolute md:bottom-30 ">
          <button className="bg-Primary py-2 px-2 rounded-sm cursor-pointer ">
            <img
              src={settingIcon}
              alt="icon"
              className="w-6 md:w-8 h-auto object-contain "
            />
            <div className="font-medium absolute -right-22 bottom-3 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Settings
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
