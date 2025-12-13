import React from "react";
import CloseSideBarIcon from "../../assets/icons/close_sidebarpanel_icon.svg?react";
import History from "../HistoryCard/HistoryCard";
import ExpertCard from "../ExpertCard/ExpertCard";
import { useLocation } from "react-router-dom";
import ChatUsers from "../ChatUsers/ChatUsers";
import { useSideBarPanel } from '../../Context/SideBarPanel/useSideBarPanel';

const SideBarPanel = ({ expertName }) => {
  
  const location = useLocation();
  const { closeSidebar } = useSideBarPanel();

  const isExpertActive = location.pathname === "/expert"
  const isHistoryActive = location.pathname === "/history"
  const isChatActive = location.pathname === "/chats"
  
  return (
    <div className="hidden h-screen w-full md:w-[22vw] bg-Tertiary text-QuinaryText border-s-2 py-3 px-2 md:flex flex-col gap-4">
      <div className="w-fit ml-auto relative group cursor-pointer">
        <button className="rounded-sm cursor-pointer">
          <CloseSideBarIcon
            onClick={closeSidebar}
            className="h-8 w-8 fill-Secondary"
          />
          <div className="w-28 hidden md:flex justify-center font-medium absolute z-10 right-10 top-1 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Close sidebar
          </div>
        </button>
      </div>
      {expertName === null && <History />}

      {(expertName === "expert" || isExpertActive) && <ExpertCard />}

      {(expertName === "history" || isHistoryActive) && <History />}

      {(expertName === "chats" || isChatActive) && <ChatUsers/>}
    </div>
  );
};

export default SideBarPanel;